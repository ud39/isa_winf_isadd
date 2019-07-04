using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using Dapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Npgsql;
using WinfADD.Controllers;
using WinfADD.Models;

namespace WinfADD.Repositories
{
    public class EventRepository : GenericBaseRepository<Event, EventViewModel>

    {
        public EventRepository(IConfiguration _config) : base(_config)
        {
            this._config = _config;

            TableName = "event";


            NpgsqlConnection.GlobalTypeMapper.MapComposite<Address>("address");
            _MappingM2DB = Models.Mapping.MappingM2DB.EventMap;
            DefaultTypeMap.MatchNamesWithUnderscores = true;

            //helper strings
            Keys.Add("id");


            var keyCompare = "";

            foreach (var keyString in Keys)
            {
                //compute keyCompare, CSKeys, AtCSKeys
                if (keyCompare.Length > 0)
                {
                    keyCompare += " AND " + keyString + " = @" + keyString.Replace("_", "");
                }
                else
                {
                    keyCompare += keyString + " = @" + keyString.Replace("_", "");
                }
            }



            //Update sql query: UpdateString = "UPDATE table SET property1=@property1, property2=@property2... WHERE key1=@key1, key2=@key2...";
            UpdateString = "UPDATE " + TableName + " SET ";


            var possibleProperties = typeof(Event).GetProperties();
            var temp = "";
            foreach (PropertyInfo property in possibleProperties)
            {
                var propertyName = property.Name.ToLower();
                if (temp.Length > 0) temp += ", " + _MappingM2DB[propertyName] + "= @" + propertyName;
                else
                {
                    temp += _MappingM2DB[propertyName] + "= @" + propertyName;
                }
            }

            UpdateString += temp + " WHERE " + keyCompare;

            //Delete sql query
            DeleteString = "DELETE FROM" + " " + TableName + " WHERE " + keyCompare;


            GetByIdString = "select distinct on (id) id, * from ( " +
                            "select e .*, i.file_name from event_image ei, image i, event e where e.id = ei.event_id and e.id = @id and ei.image_file_name = i.file_name and content_type = 'preview' " +
                            "union select e1.*, null as file_name from event e1 where e1.id = @id order by id, file_name) as t where id =@id; " +
                            "select i.* from event_image ei, image i, event e where e.id = ei.event_id and e.id = @id and ei.image_file_name = i.file_name and i.content_type != 'preview';" +
                            " select c.* from coffee_shop c, located l, event e where c.id = l.coffee_shop_id and e.id = l.event_id and e.id = @id; " +
                            " select location_address from coffee_shop c, located l, event e where c.id = l.coffee_shop_id and e.id = l.event_id and e.id = @id";


          //  GetAllString = "select distinct on (id) id, * from ( " +
          //                 " select e.*, i.file_name from event_image ei, image i, event e " +
          //                 " where e.id = ei.event_id and ei.image_file_name = i.file_name and i.content_type = 'preview' " +
           //                " union select e1.*, null as file_name from event e1 order by id, file_name) as t where t.end_time > Now()";
           GetAllString =
               "select distinct on (id) id, * from (  select e.*, i.file_name from event_image ei, image i, event e " +
               " where e.id = ei.event_id and ei.image_file_name = i.file_name and i.content_type = 'preview' "+
               " union select e1.*, null as file_name from event e1 ) as t left join located l on id = l.coffee_shop_id "+
               " where t.end_time > Now() order by  id, file_name";


        }


        public new virtual async Task<Event> GetById(Event e)
        {
            using (IDbConnection conn = Connection)
            {

                var queryResult = await conn.QueryMultipleAsync(GetByIdString, e);

                var result = queryResult.Read<Event>().FirstOrDefault();

                if (result != null)
                {
                    result.Image  = queryResult.Read<Image>().FirstOrDefault();
                    result.CoffeeShops = queryResult.Read<CoffeeShopPreview>();
                    result.Address = queryResult.Read<Address>().FirstOrDefault();

                }

                return result;
            }
        }


        public new async Task<IEnumerable<EventViewModel>> GetAll()
        {

            Console.WriteLine(GetAllString);
            using (IDbConnection conn = Connection)
            {
                var result = await conn.QueryAsync<EventViewModel>(GetAllString);

                return result;
            }


        }

        public async Task<IEnumerable<Event>> GetEvents(SearchEventModel searchQuery)
        {

            var time = "'" + searchQuery.Time + "'" + "::date";
            var sql = "select e.* from event e where ";

            if (!string.IsNullOrEmpty(searchQuery.Name))
            {
                sql += " name like '%" + searchQuery.Name + "%'";

                if (!string.IsNullOrEmpty(searchQuery.Time))
                    sql += " and (" + time + " <= e.start_time or (e.start_time >= " + time + " and " + time +
                           " >= e.end_time)) " +
                           " and e.start_time <" + time + " + 90 ";

            }
            else if (!string.IsNullOrEmpty(searchQuery.Time))
                sql += " (" + time + " <= e.start_time or (e.start_time >= " + time + " and " + time +
                       " >= e.end_time)) " +
                       " and e.start_time <" + time + " + 90 ";

            sql += " and e.end_time > Now() order by end_time";
            Console.WriteLine(sql);
            using (IDbConnection conn = Connection)
            {
                var result = await conn.QueryAsync<Event>(sql, searchQuery);

                return result;
            }

        }

        public override async Task<bool> InsertTable(Event eventObj, IDictionary<string, dynamic> insertProperties)
        {

            var eventSqlInsert = "INSERT INTO event ";
            var organisedSqlInsert =
                "INSERT INTO organised_by (coffee_shop_id, event_id) VALUES (@coffee_shop_id, @event_id)";
            var eventImageSqlInsert =
                "INSERT INTO event_image (image_file_name, event_id) VALUES (@image_file_name, @event_id) ";

            var locationSqlInsert = "";
            var locatedSqlInsert = "";

            //get all Event+Location properties
            PropertyInfo[] possibleProperties = typeof(Event).GetProperties();
            var dbFiledNames = "";
            var modelFieldNames = "";


            foreach (PropertyInfo property in possibleProperties)
            {
                //set first character to lower
                var propertyName = char.ToLower(property.Name[0]).ToString() + property.Name.Substring(1);


                if (!(insertProperties.ContainsKey(propertyName))
                    || propertyName.Equals("id")
                    || propertyName.Equals("image")) continue;
                if (propertyName.Equals("address")) 
                {
                    Console.WriteLine("IN ADDRESS");
                    locationSqlInsert = "INSERT INTO location (address, description) VALUES(@address, @description) ON CONFLICT ON CONSTRAINT location_pkey DO NOTHING ";

                                        locatedSqlInsert =
                                            "INSERT INTO located (location_address, coffee_shop_id, event_id) VALUES (@location_address, @coffee_shop_id, @event_id) ON CONFLICT ON CONSTRAINT located_pkey DO NOTHING ";
                    continue; //no address for coffeeShop
                }

                if (dbFiledNames.Length > 0)
                {
                    dbFiledNames += ", " + _MappingM2DB[propertyName.ToLower()];
                    modelFieldNames += ",@" + propertyName;
                }
                else
                {
                    dbFiledNames += _MappingM2DB[propertyName.ToLower()];
                    modelFieldNames += "@" + propertyName;
                }
            }


            eventSqlInsert += "(" + dbFiledNames + ")" + " VALUES " + "(" + modelFieldNames + ") RETURNING id";
            Console.WriteLine("INSERT Event:: " + eventSqlInsert);


            using (var conn = Connection)
            {

                conn.Open();
                using (var transaction = conn.BeginTransaction())
                {
                    var rowsAffected = 0;
                    try
                    {
                        var eventID =
                            await conn.ExecuteScalarAsync<int>(eventSqlInsert, eventObj, transaction: transaction);

                       if(eventObj.Image != null )
                       {
                           var image = eventObj.Image;

                            await conn.ExecuteAsync(eventImageSqlInsert,
                                new {image_file_name = image.FileName, event_id = eventID},
                                transaction: transaction);
                            //load preview image
                            await conn.ExecuteAsync(eventImageSqlInsert,
                                new { image_file_name = image.FileName + "-preview.png", event_id = eventID}, transaction: transaction);
                        }

                        foreach (var shop in eventObj.CoffeeShops)
                        {

                            await conn.ExecuteAsync(organisedSqlInsert,
                                new {event_id = eventID, coffee_shop_id = shop.Id}, transaction: transaction);

                            if (locationSqlInsert.Length > 0)
                            {

                                Console.WriteLine();
                                await conn.ExecuteAsync(locationSqlInsert,
                                    new {address = eventObj.Address, description = eventObj.Description},
                                    transaction: transaction);
                                await conn.ExecuteAsync(locatedSqlInsert,
                                    new {event_id = eventID, coffee_shop_id = shop.Id,
                                        location_address = eventObj.Address}, transaction: transaction);

                            }
                        }

                        transaction.Commit();

                    }
                    catch (Exception e)
                    {
                        Console.WriteLine(e);
                        transaction.Rollback();
                        conn.Close();
                        return false;
                    }

                    return true;
                }

            }

        }


        public override async Task<bool> DeleteTable(Event eventObj)
        {
            using (IDbConnection conn = Connection)
            {Console.WriteLine("\n Delete::" + DeleteString);


                var imageSQL = "select i.* from image i, event_image ei where ei.event_id = "
                               + eventObj.Id+ " AND ei.image_file_name = i.file_name";

                var imageResult = conn.QueryMultiple(imageSQL);

                var Images  = imageResult.Read<Image>().ToList();

                foreach (var image in Images)
                {
                    ImageController.deleteImageInternal(image.FileName, image.ContentType);
                }

                var rowsAffected = await conn.ExecuteAsync(DeleteString, eventObj );
                return (rowsAffected > 0);
            }
        }
    }
}
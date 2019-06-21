using System;
using System.Collections.Generic;
using System.Globalization;
using System.Reflection;
using Dapper;

namespace WinfADD.Models.Mapping
{
    public static class MappingConfigurator
    {
        
            public static Dictionary<string, string> PreviewMap = new Dictionary<string, string>
                {
                    {"file_name", "ImageFileName"},
                    {"id", "Id"},
                    {"name", "Name"},
                    {"description", "Description"}
                };

            public static   Dictionary<string, string> EventMap = new Dictionary<string, string>
                {
                    {"event_id", "Id"},
                    {"time", "Time"},
                    {"access_fee", "AccessFee"},
                    {"description", "Description"}
    
                };

            public static Func<Type, string, PropertyInfo> PreviewMapper =
              new Func<Type, string, PropertyInfo>((type, columnName)
                  => type.GetProperty(PreviewMap.ContainsKey(columnName) ? PreviewMap[columnName] : columnName));

            
            public static Func<Type, string, PropertyInfo> DefaultMapper = new Func<Type, string, PropertyInfo>((type, columnName) =>
            {

                var result = CultureInfo.CurrentCulture.TextInfo.ToTitleCase(columnName.ToLower());
                return type.GetProperty(result = result.Replace("_", ""));
            });
    
            public static CustomPropertyTypeMap CreateMap (Type t, Func<Type, string, PropertyInfo> mapper = null)
            {
                
                return mapper==null? new CustomPropertyTypeMap(t, DefaultMapper): 
                    new CustomPropertyTypeMap(t, mapper);
            }

    }
}
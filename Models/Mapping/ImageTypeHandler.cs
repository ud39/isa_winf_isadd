using System.Data;
using Dapper;

namespace WinfADD.Models.Mapping
{
    public class ImageTypeHandler : SqlMapper.TypeHandler<Image>
    {

        //handles data to save into DB
        public override void SetValue(IDbDataParameter parameter, Image value)
        {
            parameter.Value = new Image{FileName = value.FileName, ContentType = value.ContentType};
        }

        //deserialized data from DB into object
        public override Image Parse(object value)
        {
            return  (Image)value;
        }
    }
}
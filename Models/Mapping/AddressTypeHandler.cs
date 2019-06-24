using System;
using System.Data;
using Dapper;

namespace WinfADD.Models.Mapping
{
    public class AddressTypeHandler : SqlMapper.TypeHandler<Address>
    {
        public override void SetValue(IDbDataParameter parameter, Address value)
        {
            parameter.Value = new Address(){Country = value.Country, Town = value.Town, PostalCode = value.PostalCode,
                StreetName = value.StreetName, StreetNumber = value.StreetNumber};
        }

        public override Address Parse(object value)
        {
            return (Address) value;
        }
    }
}
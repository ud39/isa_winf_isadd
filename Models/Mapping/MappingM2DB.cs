using System.Collections.Generic;

namespace WinfADD.Models.Mapping
{
    public static class MappingM2DB
    {

        public static Dictionary<string, string> CoffeShopMap = new Dictionary<string, string>
        {
            {"id", "id"},
            {"name", "name"},
            {"foundingyear", "founding_year"},
            {"seats", "seats"},
            {"website", "website"},
            {"food", "food"},
            {"priceclass", "price_class"},
            {"franchise", "franchise"},
            {"wlan", "wlan"},
            {"disabledfriendly", "disabled_friendly"},
            {"fairtrade", "fair_trade"},
            {"childfriendly", "child_friendly"},
            {"workstation", "workstation"},
            {"latteart", "latte_art"},
            {"petsfriendly", "pets_friendly"},
            {"outdoor", "outdoor"},
            {"description", "description"},
            {"address", "address"},
            {"openingtimes", "openingtimes"},
            {"warmfood", "warm_food"},
            {"coldfood", "cold_food"},
            {"preparations", "preparations"},
            {"busstation", "bus_station_name"},
            {"warmFood", "warm_food"},
            {"coldFood", "cold_food"},
            {"poi", "poi_name"},
            {"streetnumber", "(address).street_number"},
            {"streetname", "(address).street_name"},
            {"town", "(address).town"},
            {"country", "(address).country"},
            {"postalcode", "(address).postal_code"},
            {"equipmentcategories", "equipment_category_name"},
            {"busstations", "bus_station_name"},
            {"blends", "blend_name"},
            {"beans", "bean_name"},
            {"roast", "roast"}

        };


        public static Dictionary<string, string> BlendMap = new Dictionary<string, string>
        {
            {"name", "name"},
            {"manufacturername", "manufacturer_name"},
            {"provenance", "provenance"},
            {"priceclass", "price_class"},
            {"description", "description"},
            {"PreviewImage", "image_file_name"}
        };
       
        public static Dictionary<string, string> PoiMap = new Dictionary<string, string>
        {
            {"name", "name"},
            {"address", "address"},
            {"description", "description"},
            {"imagefilename", "image_file_name"}  ,
            {"streetnumber", "(address).street_number"},
            {"streetname", "(address).street_name"},
            {"town", "(address).town"},
            {"country", "(address).country"},
            {"postalcode", "(address).postal_code"}
        };

       
        public static Dictionary<string, string> EquipmentCategoryMap = new Dictionary<string, string>
        {
            {"name", "name"},
            {"imagefilename", "image_file_name"}
        };


        public static Dictionary<string, string> BeanMap = new Dictionary<string, string>
        {
            {"name", "name"},
            {"manufacturername", "manufacturer_name"},
            {"provenance", "provenance"},
            {"priceclass", "priceclass"},
            {"fairtrade", "fairtrade"},
            {"description", "description"},
            {"previewimage", "image_file_name"},
            {"roast", "roast"},
            {"grind", "grind"}
        };

        public static Dictionary<string, string> BusStationMap = new Dictionary<string, string>
        {
            {"name", "bus_station_name"},
            {"line", "bus_station_line"}
        };

        public static Dictionary<string, string> CoffeeDrinkMap = new Dictionary<string, string>
        {
            {"name", "name"},
            {"description", "description"},
            {"type", "type"},
            {"vegan", "vegan"},
            {"preparations", "preparations"}
        };

        public static Dictionary<string, string> EventMap = new Dictionary<string, string>
        {
            {"id", "id"},
            {"name", "name"},
            {"starttime", "start_time"},
            {"endtime", "end_time"},
            {"accessfee", "access_fee"},
            {"description", "description"},
            {"previewimagefilename", "preview_image_filename"},
            {"image", "image_filename"},
            {"address", "address"},
            {"image", "image"},
            {"coffeeshops", "coffeeshops"}

        };









    }
}
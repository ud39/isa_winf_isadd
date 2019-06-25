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
            {"preparations", "preparations"}
        };



        public static Dictionary<string, string> BlendMap = new Dictionary<string, string>
        {
            {"name", "name"},
            {"manufacturername", "manufacturer_name"},
            {"provenance", "provenance"},
            {"priceclass", "price_class"},
            {"description", "description"},
        };
    }
}
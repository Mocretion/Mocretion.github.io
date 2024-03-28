/**
 * Replaces codewords in a string with an image
 * @param {String} string The string to replace the codewords in
 * @returns A string with /images embeded
 */
function replaceCodeWords(string){
    // Bundles
    string = string.replace("#BUNDLE_GREEN#", "<img style=\'display:inline-block; height:1em; width:auto; transform:translate(0, 0.1em)\' src=/images/Bundle_Green.png>");
    string = string.replace("#BUNDLE_ORANGE#", "<img style=\'display:inline-block; height:1em; width:auto; transform:translate(0, 0.1em)\' src=/images/Bundle_Orange.png>");
    string = string.replace("#BUNDLE_RED#", "<img style=\'display:inline-block; height:1em; width:auto; transform:translate(0, 0.1em)\' src=/images/Bundle_Red.png>");
    string = string.replace("#BUNDLE_PURPLE#", "<img style=\'display:inline-block; height:1em; width:auto; transform:translate(0, 0.1em)\' src=/images/Bundle_Purple.png>");
    string = string.replace("#BUNDLE_TEAL#", "<img style=\'display:inline-block; height:1em; width:auto; transform:translate(0, 0.1em)\' src=/images/Bundle_Teal.png>");
    string = string.replace("#BUNDLE_YELLOW#", "<img style=\'display:inline-block; height:1em; width:auto; transform:translate(0, 0.1em)\' src=/images/Bundle_Yellow.png>");
    string = string.replace("#BUNDLE_BLUE#", "<img style=\'display:inline-block; height:1em; width:auto; transform:translate(0, 0.1em)\' src=/images/Bundle_Blue.png>");

    // Weather
    string = string.replace("#RAIN#", "<img style=\'display:inline-block; height:1em; width:auto; transform:translate(0, 0.1em)\' src=/images/Rain.png>");
    string = string.replace("#WIND#", "<img style=\'display:inline-block; height:1em; width:auto; transform:translate(0, 0.1em)\' src=/images/Windy.png>");
    string = string.replace("#SUN#", "<img style=\'display:inline-block; height:1em; width:auto; transform:translate(0, 0.1em)\' src=/images/Sunny.png>");

    // Monsters
    string = string.replace("#SLIME#", "<img style=\'display:inline-block; height:1em; width:auto; transform:translate(0, 0.1em)\' src=/images/Slimes.png>");
    string = string.replace("#SLIME_BLUE#", "<img style=\'display:inline-block; height:1em; width:auto; transform:translate(0, 0.1em)\' src=/images/Slimes_Blue.png>");
    string = string.replace("#BAT#", "<img style=\'display:inline-block; height:1em; width:auto; transform:translate(0, 0.1em)\' src=/images/Bat.png>");
    string = string.replace("#GHOST#", "<img style=\'display:inline-block; height:1em; width:auto; transform:translate(0, 0.1em)\' src=/images/Ghost.png>");
    string = string.replace("#METAL_HEAD#", "<img style=\'display:inline-block; height:1em; width:auto; transform:translate(0, 0.1em)\' src=/images/Metal_Head.png>");
    string = string.replace("#SQUID_KID#", "<img style=\'display:inline-block; height:1em; width:auto; transform:translate(0, 0.1em)\' src=/images/Squid_Kid.png>");
    string = string.replace("#SHADOW_BRUTE#", "<img style=\'display:inline-block; height:1em; width:auto; transform:translate(0, 0.1em)\' src=/images/Shadow_Brute.png>");
    string = string.replace("#SHADOW_SHAMAN#", "<img style=\'display:inline-block; height:1em; width:auto; transform:translate(0, 0.1em)\' src=/images/Shadow_Shaman.png>");
    string = string.replace("#ROCK_CRAB#", "<img style=\'display:inline-block; height:1em; width:auto; transform:translate(0, 0.1em)\' src=/images/Rock_Crab.png>");

    // Animals
    string = string.replace("#CHICKEN#", "<img style=\'display:inline-block; height:1em; width:auto; transform:translate(0, 0.1em)\' src=/images/Brown_Chicken.png>");
    string = string.replace("#COW#", "<img style=\'display:inline-block; height:1em; width:auto; transform:translate(0, 0.1em)\' src=/images/Brown_Cow.png>");
    string = string.replace("#GOAT#", "<img style=\'display:inline-block; height:1em; width:auto; transform:translate(0, 0.1em)\' src=/images/Goat.png>");
    string = string.replace("#DUCK#", "<img style=\'display:inline-block; height:1em; width:auto; transform:translate(0, 0.1em)\' src=/images/Duck.png>");
    string = string.replace("#SHEEP#", "<img style=\'display:inline-block; height:1em; width:auto; transform:translate(0, 0.1em)\' src=/images/Sheep.png>");
    string = string.replace("#RABBIT#", "<img style=\'display:inline-block; height:1em; width:auto; transform:translate(0, 0.1em)\' src=/images/Rabbit.png>");
    string = string.replace("#PIG#", "<img style=\'display:inline-block; height:1em; width:auto; transform:translate(0, 0.1em)\' src=/images/Pig.png>");

    // Characters
    string = string.replace("#QUEEN#", "<img style=\'display:inline-block; height:1em; width:auto; transform:translate(0, 0.1em)\' src=/images/Cooking_Channel.png>");
    string = string.replace("#GUS#", "<img style=\'display:inline-block; height:1em; width:auto; transform:translate(0, 0.1em)\' src=/images/Gus_Icon.png>");
    string = string.replace("#MARNIE#", "<img style=\'display:inline-block; height:1em; width:auto; transform:translate(0, 0.1em)\' src=/images/Marnie_Icon.png>");
    string = string.replace("#MERCHANT#", "<img style=\'display:inline-block; height:1em; width:auto; transform:translate(0, 0.1em)\' src=/images/Traveling_Cart_Icon.png>");

    // Tools
    string = string.replace("#SCYTHE#", "<img style=\'display:inline-block; height:1em; width:auto; transform:translate(0, 0.1em)\' src=/images/Scythe.png>");
    string = string.replace("#HOE#", "<img style=\'display:inline-block; height:1em; width:auto; transform:translate(0, 0.1em)\' src=/images/Hoe.png>");
    string = string.replace("#TAPPER#", "<img style=\'display:inline-block; height:1em; width:auto; transform:translate(0, 0.1em)\' src=/images/Tapper.png>");
    string = string.replace("#OIL_MAKER#", "<img style=\'display:inline-block; height:1em; width:auto; transform:translate(0, 0.1em)\' src=/images/Oil_Maker.png>");
    string = string.replace("#KEG#", "<img style=\'display:inline-block; height:1em; width:auto; transform:translate(0, 0.1em)\' src=/images/Keg.png>");
    string = string.replace("#PRESERVES_JAR#", "<img style=\'display:inline-block; height:1em; width:auto; transform:translate(0, 0.1em)\' src=/images/Preserves_Jar.png>");
    string = string.replace("#LOOM#", "<img style=\'display:inline-block; height:1em; width:auto; transform:translate(0, 0.1em)\' src=/images/Loom.png>");
    string = string.replace("#CHEESE_PRESS#", "<img style=\'display:inline-block; height:1em; width:auto; transform:translate(0, 0.1em)\' src=/images/Cheese_Press.png>");
    string = string.replace("#FURNACE#", "<img style=\'display:inline-block; height:1em; width:auto; transform:translate(0, 0.1em)\' src=/images/Furnace.png>");
    string = string.replace("#BEE_HOUSE#", "<img style=\'display:inline-block; height:1em; width:auto; transform:translate(0, 0.1em)\' src=/images/Bee_House.png>");

    // Colors
    string = string.replace("#RED#", "<span style=\'color: red\'>");
    string = string.replace('#RED#', "</span>");
    string = string.replace("#GOLD#", "<span style=\'color: orange\'>");
    string = string.replace('#GOLD#', "</span>");
    return string;
}
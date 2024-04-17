/**
 * Replaces codewords in a string with an image
 * @param {String} string The string to replace the codewords in
 * @returns A string with /images embeded
 */
function replaceCodeWords(string){

    // Weather
    string = string.replace("#RAIN#", "<img style=\'display:inline-block; height:1em; width:auto; transform:translate(0, 0.1em)\' src=/images/Rain.png>");
    string = string.replace("#WIND#", "<img style=\'display:inline-block; height:1em; width:auto; transform:translate(0, 0.1em)\' src=/images/Windy.png>");
    string = string.replace("#SUN#", "<img style=\'display:inline-block; height:1em; width:auto; transform:translate(0, 0.1em)\' src=/images/Sunny.png>");

    // Monsters
    string = string.replace("#SLIME#", "<img style=\'display:inline-block; height:1em; width:auto; transform:translate(0, 0.1em)\' src=/images/Slimes.png>");
    string = string.replace("#SLIME_BLUE#", "<img style=\'display:inline-block; height:1em; width:auto; transform:translate(0, 0.1em)\' src=/images/Slimes_Blue.png>");

    // Animals
    string = string.replace("#CHICKEN#", "<img style=\'display:inline-block; height:1em; width:auto; transform:translate(0, 0.1em)\' src=/images/Brown_Chicken.png>");
    string = string.replace("#COW#", "<img style=\'display:inline-block; height:1em; width:auto; transform:translate(0, 0.1em)\' src=/images/Brown_Cow.png>");

    // Characters
    string = string.replace("#QUEEN#", "<img style=\'display:inline-block; height:1em; width:auto; transform:translate(0, 0.1em)\' src=/images/Cooking_Channel.png>");
    string = string.replace("#GUS#", "<img style=\'display:inline-block; height:1em; width:auto; transform:translate(0, 0.1em)\' src=/images/Gus_Icon.png>");
    string = string.replace("#MARNIE#", "<img style=\'display:inline-block; height:1em; width:auto; transform:translate(0, 0.1em)\' src=/images/Marnie_Icon.png>");
    string = string.replace("#MERCHANT#", "<img style=\'display:inline-block; height:1em; width:auto; transform:translate(0, 0.1em)\' src=/images/Traveling_Cart_Icon.png>");

    // Colors
    string = string.replace("#RED#", "<span style=\'color: red\'>");
    string = string.replace('#RED#', "</span>");
    string = string.replace("#GOLD#", "<span style=\'color: orange\'>");
    string = string.replace('#GOLD#', "</span>");

    // FOOD
    string = string.replace("#HEALTH#", "<img style=\'display:inline-block; height:1em; width:auto; transform:translate(0, 0.1em)\' src=/images/Health.png>");

    // Farming
    string = string.replace("#EGG#", "<img style=\'display:inline-block; height:1em; width:auto; transform:translate(0, 0.1em)\' src=/images/Large_Egg.png>");
    string = string.replace("#EGG_BROWN#", "<img style=\'display:inline-block; height:1em; width:auto; transform:translate(0, 0.1em)\' src=/images/Large_Brown_Egg.png>");
    string = string.replace("#MILK#", "<img style=\'display:inline-block; height:1em; width:auto; transform:translate(0, 0.1em)\' src=/images/Large_Milk.png>");
    string = string.replace("#BEAN#", "<img style=\'display:inline-block; height:1em; width:auto; transform:translate(0, 0.1em)\' src=/images/Green_Bean.png>");

    // Other
    string = string.replace("#CLOCK#", "<img style=\'display:inline-block; height:1em; width:auto; transform:translate(0, 0.1em)\' src=/images/Time_Icon.png>");

    let regex = new RegExp("#[A-Z | _]*#");
    let results = regex.exec(string);
    while(results != null){
        results.forEach(result =>{
            result = result.replaceAll('#', '')
            var words = result.split("_");
            var potentialName = "";
            words.forEach(word => {
                word = word.toLowerCase();

                if(potentialName != "")
                    potentialName += "_";

                potentialName += word[0].toUpperCase() + word.substring(1);
            });
            string = string.replace("#" + result + "#", "<img style=\'display:inline-block; height:1em; width:auto; transform:translate(0, 0.1em)\' src=/images/" + potentialName + ".png>");
        });

        results = regex.exec(string);
    }

    return string;
}

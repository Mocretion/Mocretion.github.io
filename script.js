let springEnabled = false;
let summerEnabled = false;
let fallEnabled = false;
let winterEnabled = false;

const container = document.getElementById("container");

const springCircle = document.getElementById("spring");
const summerCircle = document.getElementById("summer");
const fallCircle = document.getElementById("fall");
const winterCircle = document.getElementById("winter");
const winterCircle2 = document.getElementById("winter2");
const anySeasonContainer = document.getElementById("any-season-container");

const springCircleText = document.getElementById("springText");
const summerCircleText = document.getElementById("summerText");
const fallCircleText = document.getElementById("fallText");
const winterCircleText = document.getElementById("winterText");
const winterCircleText2 = document.getElementById("winterText2");
const anySeasonText = document.getElementById("anySeasonText");

const infoElement = document.getElementById("info");
const infoLeft = document.getElementById("infoLeft");
const infoRight = document.getElementById("infoRight");

const springChildren = Array.from(document.getElementsByClassName("spring-child"));
const summerChildren = Array.from(document.getElementsByClassName("summer-child"));
const fallChildren = Array.from(document.getElementsByClassName("fall-child"));
const winterChildren = Array.from(document.getElementsByClassName("winter-child"));
const anySeasonChildren = Array.from(document.getElementsByClassName("anyseason-child"));
const allItems = new Set(springChildren.concat(summerChildren).concat(fallChildren).concat(winterChildren).concat(anySeasonChildren));

const enabledOpacity = 1;
const disabledOpacity = 0.5;
const blurDiv = document.getElementById("blur");

const cutQuantityProportion = 4.5;

let dict = {};
const overwriteDictMax ={
    "#BUNDLE_PURPLE# Exotic Foraging": 5,
    "#BUNDLE_TEAL# Quality Crops": 3,
    "#BUNDLE_PURPLE# Artisan": 6,
    "#BUNDLE_PURPLE# Crab Pot": 5,
    "#BUNDLE_RED# Animal": 5,
    "#BUNDLE_PURPLE# Adventurers": 2,
    "#BUNDLE_PURPLE# The Missing Bundle": 5
}
/**
 * Gets executed on page load
 * Fills "dict" with bundle entries
 */
function initBundles(){
    let entry;
    allItems.forEach(x => {
        entry = getItemInfoBundleName(x);
        if(dict[entry] === undefined){
            dict[entry] = [x];
        }else{
            dict[entry].push(x);
        }

        const cookie = getCookie(getCookieName(x));
        if(cookie == "false") toggleItem(x);
    });
}

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookieName(element){
    return getItemInfoName(element).replace("\\", "").replace("'", "") + " " + getItemInfoBundleName(element).replace("\\", "").replace("'", "");
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

/**
 * Sets the background-color alpha value
 * @param {HTMLElement} element The elemnt to change the alpha in
 * @param {Number} alpha The value to set. Must be between 0 and 1
 */
function setBackgroundAlpha(element, alpha){
    const cssObj = window.getComputedStyle(element, null);
    const property = cssObj.getPropertyValue('background-color');
    let colors = property.split(', ');
    colors[0] = parseFloat(colors[0].split('(')[1]);
    colors[1] = parseFloat(colors[1]);
    colors[2] = parseFloat(colors[2]);
    colors[3] = alpha;
    colors = 'rgba(' + colors.join(',') + ')';
    element.style.backgroundColor = colors;
}

function getCircleBorder(circleCenter, radius, degree){
    const x = circleCenter + radius * Math.cos(degree * Math.PI / 180);
    const y = circleCenter + radius * Math.sin(degree * Math.PI / 180);

    return [x, y];
}

/**
 * Changes the z-Index of all items but with a specific ID
 * @param {String} except The ID no to influence
 * @param {Number} amount The amount to add
 */
function changeitemsZIndexExcept(except, amount){

    allItems.forEach(x =>{
        if(x.className.includes(except)) return;

        changeZIndex(x, amount);
    });
}

/**
 * @param {HTMLElement} element The element to change the z-Index in
 * @param {Number} amount The amount to add
 */
function changeZIndex(element, amount){
    element.style.zIndex = parseInt(window.getComputedStyle(element).getPropertyValue("z-index")) + amount;
}

/**
 * Removes focus from all season circles
 */
function deselectAllCircles(){
    if(springEnabled) toggleSpring();
    if(summerEnabled) toggleSummer();
    if(fallEnabled) toggleFall();
    if(winterEnabled) toggleWinter();
}

/**
 * Toggles focus from the spring circle
 */
function toggleSpring() {

    if(springEnabled){
        setBackgroundAlpha(springCircle, disabledOpacity);
        blurDiv.style.opacity = 0;
        springCircle.style.zIndex = "auto";

        changeitemsZIndexExcept("spring-child", 80);

    }else{
        deselectAllCircles();
        setBackgroundAlpha(springCircle, enabledOpacity);
        blurDiv.style.opacity = 0.6;
        springCircle.style.zIndex = 50;

        changeitemsZIndexExcept("spring-child", -80);
    }

    springEnabled = !springEnabled;
}

/**
 * Toggles focus from the summer circle
 */
function toggleSummer() {
    if(summerEnabled){
        setBackgroundAlpha(summerCircle, disabledOpacity);
        blurDiv.style.opacity = 0;
        summerCircle.style.zIndex = "auto";

        changeitemsZIndexExcept("summer-child", 80);
    }else{
        deselectAllCircles();
        setBackgroundAlpha(summerCircle, enabledOpacity);
        blurDiv.style.opacity = 0.6;
        summerCircle.style.zIndex = 50;
        
        changeitemsZIndexExcept("summer-child", -80);
    }

    summerEnabled = !summerEnabled;
}

/**
 * Toggles focus from the fall circle
 */
function toggleFall() {
    if(fallEnabled){
        setBackgroundAlpha(fallCircle, disabledOpacity);
        fallCircle.style.zIndex = "auto";
        blurDiv.style.opacity = 0;
        fallCircle.style.zIndex = "auto";

        changeitemsZIndexExcept("fall-child", 80);
    }else{
        deselectAllCircles();
        setBackgroundAlpha(fallCircle, enabledOpacity);
        blurDiv.style.opacity = 0.6;
        fallCircle.style.zIndex = 50;

        changeitemsZIndexExcept("fall-child", -80);
    }

    fallEnabled = !fallEnabled;
}

/**
 * Toggles focus from the winter circles
 */
function toggleWinter() {
    if(winterEnabled){
        setBackgroundAlpha(winterCircle, disabledOpacity);
        setBackgroundAlpha(winterCircle2, disabledOpacity);
        blurDiv.style.opacity = 0;
        winterCircle.style.zIndex = "auto";
        winterCircle2.style.zIndex = "auto";

        changeitemsZIndexExcept("winter-child", 80);
    }else{
        deselectAllCircles();
        setBackgroundAlpha(winterCircle, enabledOpacity);
        setBackgroundAlpha(winterCircle2, enabledOpacity);
        blurDiv.style.opacity = 0.6;
        winterCircle.style.zIndex = 50;
        winterCircle2.style.zIndex = 50;

        changeitemsZIndexExcept("winter-child", -80);
    }
    winterEnabled = !winterEnabled;
}

const blink = [
    {filter: "brightness(100%", transform: "matrix(1, 0, 0, 1, 0, 0)"},
    {filter: "brightness(200%", transform: "matrix(1.3, 0, 0, 0.7, 0, 0)"},
    {filter: "brightness(100%", transform: "matrix(1, 0, 0, 1, 0, 0)"},
]

const blinkTiming = {
    duration: 500,
    iterations: 5
}

/**
 * Emphasizes items in the same bundle
 * @param event 
 * @param {HTMLElement} element Item in a bundle to get the information from
 */
function showBundleItems(event, element){
    
    getItemsInSameBundle(element).forEach(x => {
        console.log(x.style.backgroundColor);
        x.animate(blink, blinkTiming);
    });

    event.preventDefault();
}

/**
 * Enlarges all items to normal size
 */
function enableAllItems(){
    allItems.forEach(x =>{
        if(x.style.opacity == 0.3)
            toggleItem(x);
    })
}

/**
 * Shrinks all items
 */
function disableAllItems(){
    allItems.forEach(x =>{
        if(x.style.opacity == 1 || window.getComputedStyle(x).getPropertyValue("opacity") == 1)
            toggleItem(x);
    })
}

/**
 * Shrinks or enlarges the item
 * @param {HTMLElement} element The item to toggle
 */
function toggleItem(element){
    const opacity = window.getComputedStyle(element).getPropertyValue("opacity");
    if(opacity == 0.3){
        element.style.opacity = 1;
        element.style.transform = 'scale(1)';
    }
    else{
        element.style.opacity = 0.3;
        element.style.transform = 'scale(0.7)';
    }

    const index = infoRight.innerHTML.replace("(", "").indexOf("(");

    let itemsInBundle = getItemsInBundleCompleted(element) > getItemsNeededInBundle(element) ? getItemsNeededInBundle(element) : getItemsInBundleCompleted(element);
    infoRight.innerHTML = infoRight.innerHTML.slice(0, index + 2) + itemsInBundle + infoRight.innerHTML.slice(index + 3);

    if(getItemsInBundleCompleted(element) >= getItemsNeededInBundle(element))
    infoElement.style.borderColor = "gold";
    else{
        infoElement.style.borderColor = "black";
    }

    setCookie(getCookieName(element), element.style.opacity == 0.3 ? "false" : "true", 60);
}

/**
 * Shows the info div which appears when hovering over an item
 */
function showInfo(e, element, ...lines){
    calculateLines(element, lines);

    if(e.clientX / window.innerWidth < 0.7)  // Show info text on left of mouse
        infoElement.style.left = e.clientX + 30;
    else
        infoElement.style.left = e.clientX - 30 - infoElement.clientWidth;

    if(e.clientY / window.innerHeight > 0.8)  // Show info text on left of mouse
        infoElement.style.top = e.clientY -infoElement.clientHeight;
    else
        infoElement.style.top = e.clientY;

    infoElement.style.opacity = 1;
    infoElement.style.visibility = 'visible';
    if(getItemsInBundleCompleted(element) >= getItemsNeededInBundle(element))
        infoElement.style.borderColor = "gold";
    else{
        infoElement.style.borderColor = "black";
    }
}

/**
 * Hides the info div which appears when hovering over an item
 */
function hideInfo(){
    infoElement.style.opacity = 0;
    infoElement.style.visibility = 'hidden';
}

/**
 * Generates the text inside the info div 
 * @param {HTMLElement} element The item to get information from
 * @param lines String to fill the div
 */
function calculateLines(element, lines){
    let contentLeft = "";
    let contentRight = "";
    let j = 0;
    lines.forEach(x => {
        contentLeft += "<div><b>" + replaceCodeWords(x[0]) + "</b></div>";  // Set Item Info Type (e.x Source or Weather)
        if(x.length == 1){
            contentRight += "<div style=\"opacity:0\"> . </div>";
        }else{
            let i = 0;
            x.forEach(y =>{
                if(i > 0){
                    if(j == 0){  // Set Bundle Info
                        let itemsInBundle = getItemsInBundleCompleted(element) > getItemsNeededInBundle(element) ? getItemsNeededInBundle(element) : getItemsInBundleCompleted(element);
                        contentRight += "<div>" + replaceCodeWords(y) + " (" + itemsInBundle  + "/" + getItemsNeededInBundle(element) + ") </div>";
                    }else{  // Set Item Info
                        contentRight += "<div>" + replaceCodeWords(y) + "</div>";
                    }
                    if(i > 1){
                        contentLeft += "<div style=\"opacity:0\"> . </div>";
                    }
                }
                i++;
            });
        }
        j++;
    });

    infoLeft.innerHTML = contentLeft;
    infoRight.innerHTML = contentRight;
}

/**
 * @param {HTMLElement} element The item-element in the bundle to get the information from
 * @returns Amount of items completed in bundle
 */
function getItemsInBundleCompleted(element){
    let finishedItemsInBundle = 0;
    for(const [key, value] of Object.entries(dict)){
        if(key == getItemInfoBundleName(element)){
            value.forEach(z =>{
                if(z.style.opacity == 0.3){
                    finishedItemsInBundle++;
                }
            
            });
        }
    }

    return finishedItemsInBundle;
}
 
/**
 * @param {HTMLElement} element The item-element in the bundle to get the information from
 * @returns The amount of items needed to complete a bundle
 */
function getItemsNeededInBundle(element){
    const elementKey = getItemInfoBundleName(element);
    for(const [key, value] of Object.entries(overwriteDictMax)){
        if(key == elementKey) return value;
    }

    return dict[elementKey].length;
}

/**
 * @param {HTMLElement} element The item-element in the bundle to get the information from
 * @returns All item-HTMLElements belonging to a bundle
 */
function getItemsInSameBundle(element){
    const elementKey = getItemInfoBundleName(element);
    for(const [key, value] of Object.entries(dict)){
        if(key == elementKey) return value;
    }

    return [];
}

/**
 * @param {HTMLElement} element item to get the info from
 * @returns item name from their info div
 */
function getItemInfoName(element){
    return element.onmousemove.toString().trim().split('\'')[1]
}

/**
 * @param {HTMLElement} element item to get the info from
 * @returns bundle name from their info div
 */
function getItemInfoBundleName(element){
    return element.onmousemove.toString().trim().split('\'')[3]
}

/**
 * Replaces codewords in a string with an image
 * @param {String} string The string to replace the codewords in
 * @returns A string with images embeded
 */
function replaceCodeWords(string){
    // Bundles
    string = string.replace("#BUNDLE_GREEN#", "<img style=\'display:inline-block; height:1em; width:auto; transform:translate(0, 0.1em)\' src=images/Bundle_Green.png>");
    string = string.replace("#BUNDLE_ORANGE#", "<img style=\'display:inline-block; height:1em; width:auto; transform:translate(0, 0.1em)\' src=images/Bundle_Orange.png>");
    string = string.replace("#BUNDLE_RED#", "<img style=\'display:inline-block; height:1em; width:auto; transform:translate(0, 0.1em)\' src=images/Bundle_Red.png>");
    string = string.replace("#BUNDLE_PURPLE#", "<img style=\'display:inline-block; height:1em; width:auto; transform:translate(0, 0.1em)\' src=images/Bundle_Purple.png>");
    string = string.replace("#BUNDLE_TEAL#", "<img style=\'display:inline-block; height:1em; width:auto; transform:translate(0, 0.1em)\' src=images/Bundle_Teal.png>");
    string = string.replace("#BUNDLE_YELLOW#", "<img style=\'display:inline-block; height:1em; width:auto; transform:translate(0, 0.1em)\' src=images/Bundle_Yellow.png>");
    string = string.replace("#BUNDLE_BLUE#", "<img style=\'display:inline-block; height:1em; width:auto; transform:translate(0, 0.1em)\' src=images/Bundle_Blue.png>");

    // Weather
    string = string.replace("#RAIN#", "<img style=\'display:inline-block; height:1em; width:auto; transform:translate(0, 0.1em)\' src=images/Rain.png>");
    string = string.replace("#WIND#", "<img style=\'display:inline-block; height:1em; width:auto; transform:translate(0, 0.1em)\' src=images/Windy.png>");
    string = string.replace("#SUN#", "<img style=\'display:inline-block; height:1em; width:auto; transform:translate(0, 0.1em)\' src=images/Sunny.png>");

    // Monsters
    string = string.replace("#SLIME#", "<img style=\'display:inline-block; height:1em; width:auto; transform:translate(0, 0.1em)\' src=images/Slimes.png>");
    string = string.replace("#SLIME_BLUE#", "<img style=\'display:inline-block; height:1em; width:auto; transform:translate(0, 0.1em)\' src=images/Slimes_Blue.png>");
    string = string.replace("#BAT#", "<img style=\'display:inline-block; height:1em; width:auto; transform:translate(0, 0.1em)\' src=images/Bat.png>");
    string = string.replace("#GHOST#", "<img style=\'display:inline-block; height:1em; width:auto; transform:translate(0, 0.1em)\' src=images/Ghost.png>");
    string = string.replace("#METAL_HEAD#", "<img style=\'display:inline-block; height:1em; width:auto; transform:translate(0, 0.1em)\' src=images/Metal_Head.png>");
    string = string.replace("#SQUID_KID#", "<img style=\'display:inline-block; height:1em; width:auto; transform:translate(0, 0.1em)\' src=images/Squid_Kid.png>");
    string = string.replace("#SHADOW_BRUTE#", "<img style=\'display:inline-block; height:1em; width:auto; transform:translate(0, 0.1em)\' src=images/Shadow_Brute.png>");
    string = string.replace("#SHADOW_SHAMAN#", "<img style=\'display:inline-block; height:1em; width:auto; transform:translate(0, 0.1em)\' src=images/Shadow_Shaman.png>");

    // Animals
    string = string.replace("#CHICKEN#", "<img style=\'display:inline-block; height:1em; width:auto; transform:translate(0, 0.1em)\' src=images/Brown_Chicken.png>");
    string = string.replace("#COW#", "<img style=\'display:inline-block; height:1em; width:auto; transform:translate(0, 0.1em)\' src=images/Brown_Cow.png>");
    string = string.replace("#GOAT#", "<img style=\'display:inline-block; height:1em; width:auto; transform:translate(0, 0.1em)\' src=images/Goat.png>");
    string = string.replace("#DUCK#", "<img style=\'display:inline-block; height:1em; width:auto; transform:translate(0, 0.1em)\' src=images/Duck.png>");
    string = string.replace("#SHEEP#", "<img style=\'display:inline-block; height:1em; width:auto; transform:translate(0, 0.1em)\' src=images/Sheep.png>");
    string = string.replace("#RABBIT#", "<img style=\'display:inline-block; height:1em; width:auto; transform:translate(0, 0.1em)\' src=images/Rabbit.png>");
    string = string.replace("#PIG#", "<img style=\'display:inline-block; height:1em; width:auto; transform:translate(0, 0.1em)\' src=images/Pig.png>");

    // Characters
    string = string.replace("#QUEEN#", "<img style=\'display:inline-block; height:1em; width:auto; transform:translate(0, 0.1em)\' src=images/Cooking_Channel.png>");
    string = string.replace("#GUS#", "<img style=\'display:inline-block; height:1em; width:auto; transform:translate(0, 0.1em)\' src=images/Gus_Icon.png>");
    string = string.replace("#MARNIE#", "<img style=\'display:inline-block; height:1em; width:auto; transform:translate(0, 0.1em)\' src=images/Marnie_Icon.png>");

    // Tools
    string = string.replace("#SCYTHE#", "<img style=\'display:inline-block; height:1em; width:auto; transform:translate(0, 0.1em)\' src=images/Scythe.png>");
    string = string.replace("#HOE#", "<img style=\'display:inline-block; height:1em; width:auto; transform:translate(0, 0.1em)\' src=images/Hoe.png>");
    string = string.replace("#TAPPER#", "<img style=\'display:inline-block; height:1em; width:auto; transform:translate(0, 0.1em)\' src=images/Tapper.png>");
    string = string.replace("#OIL_MAKER#", "<img style=\'display:inline-block; height:1em; width:auto; transform:translate(0, 0.1em)\' src=images/Oil_Maker.png>");
    string = string.replace("#KEG#", "<img style=\'display:inline-block; height:1em; width:auto; transform:translate(0, 0.1em)\' src=images/Keg.png>");
    string = string.replace("#PRESERVES_JAR#", "<img style=\'display:inline-block; height:1em; width:auto; transform:translate(0, 0.1em)\' src=images/Preserves_Jar.png>");
    string = string.replace("#LOOM#", "<img style=\'display:inline-block; height:1em; width:auto; transform:translate(0, 0.1em)\' src=images/Loom.png>");
    string = string.replace("#CHEESE_PRESS#", "<img style=\'display:inline-block; height:1em; width:auto; transform:translate(0, 0.1em)\' src=images/Cheese_Press.png>");
    string = string.replace("#FURNACE#", "<img style=\'display:inline-block; height:1em; width:auto; transform:translate(0, 0.1em)\' src=images/Furnace.png>");
    string = string.replace("#BEE_HOUSE#", "<img style=\'display:inline-block; height:1em; width:auto; transform:translate(0, 0.1em)\' src=images/Bee_House.png>");

    return string;
}

const observer = new ResizeObserver(entries => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    anySeasonText.style.left = anySeasonContainer.clientWidth / 2 - anySeasonText.clientWidth / 2;

    entries.forEach(entry => {
        entry.target.style.width = entry.target.clientHeight;

        const center = entry.target.clientWidth / 2;
        let border;

        switch(entry.target.id){
            case "spring":
                entry.target.style.left = -entry.target.clientWidth + entry.target.clientWidth / cutQuantityProportion;

                springCircleText.style.fontSize = width / 80;
                border = getCircleBorder(center, center, 130);

                springCircleText.style.left = border[0] - springCircleText.clientWidth / 2;
                springCircleText.style.bottom = border[1] - springCircleText.clientHeight / 2;

                break;
            case "summer":
                entry.target.style.left = -entry.target.clientWidth / cutQuantityProportion;

                summerCircleText.style.fontSize = width / 80;
                border = getCircleBorder(center, center, 60);

                summerCircleText.style.left = border[0] - summerCircleText.clientWidth / 2;
                summerCircleText.style.bottom = border[1] - summerCircleText.clientHeight / 2;
                break
            case "fall":
                entry.target.style.left = -entry.target.clientWidth / 2.05;
                entry.target.style.top = entry.target.clientHeight / 2.3;

                fallCircleText.style.fontSize = width / 80;
                border = getCircleBorder(center, center, 290);

                fallCircleText.style.left = border[0] - fallCircleText.clientWidth / 2;
                fallCircleText.style.bottom = border[1] - fallCircleText.clientHeight / 2;
                break;
            case "winter":
                entry.target.style.width = entry.target.clientHeight / 1.5;
                entry.target.style.left = -entries[0].target.clientWidth / 1.55;
                winterCircleText.style.fontSize = width / 80;

                border = getCircleBorder(center, center, 230);
                winterCircleText.style.left = border[0] - winterCircleText.clientWidth / 2;
                winterCircleText.style.bottom = border[1] - winterCircleText.clientHeight / 1.2;
                break;
            case "winter2":
                entry.target.style.width = entry.target.clientHeight;
                entry.target.style.left = entries[0].target.clientWidth / 2.15;
                winterCircleText2.style.fontSize = width / 80;

                border = getCircleBorder(center, center, 50);
                winterCircleText2.style.left = border[0] - winterCircleText2.clientWidth / 2;
                winterCircleText2.style.bottom = border[1] - winterCircleText2.clientHeight / 1.2;
                break;
        }
    });

    container.style.left = entries[0].target.clientHeight - entries[0].target.clientHeight / cutQuantityProportion + 30;
});

observer.observe(springCircle);
observer.observe(summerCircle);
observer.observe(fallCircle);
observer.observe(winterCircle);
observer.observe(winterCircle2);

window.onload = initBundles();
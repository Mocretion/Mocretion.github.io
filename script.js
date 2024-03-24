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

function setAlpha(element, alpha){
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

function disableItemsExcept(except){

    allItems.forEach(x =>{
        if(x.className.includes(except)) return;

        disableItem(x);
    });
}

function enableItemsExcept(except){

    allItems.forEach(x =>{
        if(x.className.includes(except)) return;

        enableItem(x);
    });
}

function deselectAllCircles(){
    if(springEnabled) toggleSpring();
    if(summerEnabled) toggleSummer();
    if(fallEnabled) toggleFall();
    if(winterEnabled) toggleWinter();
}

function toggleSpring() {

    if(springEnabled){
        setAlpha(springCircle, disabledOpacity);
        blurDiv.style.opacity = 0;
        springCircle.style.zIndex = "auto";

        enableItemsExcept("spring-child");

    }else{
        deselectAllCircles();
        setAlpha(springCircle, enabledOpacity);
        blurDiv.style.opacity = 0.6;
        springCircle.style.zIndex = 50;

        disableItemsExcept("spring-child");
    }

    springEnabled = !springEnabled;
}

function toggleSummer() {
    if(summerEnabled){
        setAlpha(summerCircle, disabledOpacity);
        blurDiv.style.opacity = 0;
        summerCircle.style.zIndex = "auto";

        enableItemsExcept("summer-child");
    }else{
        deselectAllCircles();
        setAlpha(summerCircle, enabledOpacity);
        blurDiv.style.opacity = 0.6;
        summerCircle.style.zIndex = 50;

        disableItemsExcept("summer-child");
    }

    summerEnabled = !summerEnabled;
}

function toggleFall() {
    if(fallEnabled){
        setAlpha(fallCircle, disabledOpacity);
        fallCircle.style.zIndex = "auto";
        blurDiv.style.opacity = 0;
        fallCircle.style.zIndex = "auto";

        enableItemsExcept("fall-child");
    }else{
        deselectAllCircles();
        setAlpha(fallCircle, enabledOpacity);
        blurDiv.style.opacity = 0.6;
        fallCircle.style.zIndex = 50;

        disableItemsExcept("fall-child");
    }

    fallEnabled = !fallEnabled;
}

function toggleWinter() {
    if(winterEnabled){
        setAlpha(winterCircle, disabledOpacity);
        setAlpha(winterCircle2, disabledOpacity);
        blurDiv.style.opacity = 0;
        winterCircle.style.zIndex = "auto";
        winterCircle2.style.zIndex = "auto";

        enableItemsExcept("winter-child");
    }else{
        deselectAllCircles();
        setAlpha(winterCircle, enabledOpacity);
        setAlpha(winterCircle2, enabledOpacity);
        blurDiv.style.opacity = 0.6;
        winterCircle.style.zIndex = 50;
        winterCircle2.style.zIndex = 50;

        disableItemsExcept("winter-child");
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
    iterations: 2
}

function showBundleItems(event, element){
    
    getItemsInSameBundle(element).forEach(x => {
        console.log(x.style.backgroundColor);
        x.animate(blink, blinkTiming);
    });

    event.preventDefault();
}

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
}

function disableItem(element){
    element.style.zIndex = parseInt(window.getComputedStyle(element).getPropertyValue("z-index")) - 80;
}

function enableItem(element){
    element.style.zIndex = parseInt(window.getComputedStyle(element).getPropertyValue("z-index")) + 80;
}

function initBundles(){
    let entry;
    allItems.forEach(x => {
        entry = x.onmousemove.toString().trim().split('\'')[3];
        if(dict[entry] === undefined){
            dict[entry] = [x];
        }else{
            dict[entry].push(x);
        }
    });
}

function replaceCodeWords(string){
    string = string.replace("#BUNDLE_GREEN#", "<img style=\'display:inline-block; height:1em; width:auto; transform:translate(0, 0.1em)\' src=images/Bundle_Green.png>");
    string = string.replace("#BUNDLE_ORANGE#", "<img style=\'display:inline-block; height:1em; width:auto; transform:translate(0, 0.1em)\' src=images/Bundle_Orange.png>");
    string = string.replace("#BUNDLE_RED#", "<img style=\'display:inline-block; height:1em; width:auto; transform:translate(0, 0.1em)\' src=images/Bundle_Red.png>");
    string = string.replace("#BUNDLE_PURPLE#", "<img style=\'display:inline-block; height:1em; width:auto; transform:translate(0, 0.1em)\' src=images/Bundle_Purple.png>");
    string = string.replace("#BUNDLE_TEAL#", "<img style=\'display:inline-block; height:1em; width:auto; transform:translate(0, 0.1em)\' src=images/Bundle_Teal.png>");
    string = string.replace("#BUNDLE_YELLOW#", "<img style=\'display:inline-block; height:1em; width:auto; transform:translate(0, 0.1em)\' src=images/Bundle_Yellow.png>");
    string = string.replace("#BUNDLE_BLUE#", "<img style=\'display:inline-block; height:1em; width:auto; transform:translate(0, 0.1em)\' src=images/Bundle_Blue.png>");

    string = string.replace("#RAIN#", "<img style=\'display:inline-block; height:1em; width:auto; transform:translate(0, 0.1em)\' src=images/Rain.png>");
    string = string.replace("#WIND#", "<img style=\'display:inline-block; height:1em; width:auto; transform:translate(0, 0.1em)\' src=images/Windy.png>");
    string = string.replace("#SUN#", "<img style=\'display:inline-block; height:1em; width:auto; transform:translate(0, 0.1em)\' src=images/Sunny.png>");

    string = string.replace("#SLIME#", "<img style=\'display:inline-block; height:1em; width:auto; transform:translate(0, 0.1em)\' src=images/Slimes.png>");
    string = string.replace("#BAT#", "<img style=\'display:inline-block; height:1em; width:auto; transform:translate(0, 0.1em)\' src=images/Bat.png>");
    string = string.replace("#GHOST#", "<img style=\'display:inline-block; height:1em; width:auto; transform:translate(0, 0.1em)\' src=images/Ghost.png>");
    string = string.replace("#METAL_HEAD#", "<img style=\'display:inline-block; height:1em; width:auto; transform:translate(0, 0.1em)\' src=images/Metal_Head.png>");
    string = string.replace("#SQUID_KID#", "<img style=\'display:inline-block; height:1em; width:auto; transform:translate(0, 0.1em)\' src=images/Squid_Kid.png>");
    string = string.replace("#SHADOW_BRUTE#", "<img style=\'display:inline-block; height:1em; width:auto; transform:translate(0, 0.1em)\' src=images/Shadow_Brute.png>");
    string = string.replace("#SHADOW_SHAMAN#", "<img style=\'display:inline-block; height:1em; width:auto; transform:translate(0, 0.1em)\' src=images/Shadow_Shaman.png>");

    string = string.replace("#QUEEN#", "<img style=\'display:inline-block; height:1em; width:auto; transform:translate(0, 0.1em)\' src=images/Cooking_Channel.png>");
    string = string.replace("#GUS#", "<img style=\'display:inline-block; height:1em; width:auto; transform:translate(0, 0.1em)\' src=images/Gus_Icon.png>");

    return string;
}

function showInfo(e, element, ...lines){
    calculateLines(element, lines);

    console.log(e.clientX / window.innerWidth);

    if(e.clientX / window.innerWidth < 0.77)  // Show info text on left of mouse
        infoElement.style.left = e.clientX + 30;
    else
        infoElement.style.left = e.clientX - 30 - infoElement.clientWidth;

    infoElement.style.top = e.clientY;
    infoElement.style.opacity = 1;
    infoElement.style.visibility = 'visible';
    if(getItemsInBundleCompleted(element) >= getItemsNeededInBundle(element))
        infoElement.style.borderColor = "gold";
    else{
        infoElement.style.borderColor = "black";
    }
}

function calculateLines(element, ...lines){
    let contentLeft = "";
    let contentRight = "";
    lines = lines[0];
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

function getItemsInBundleCompleted(element){
    let finishedItemsInBundle = 0;
    for(const [key, value] of Object.entries(dict)){
        if(key == element.onmousemove.toString().trim().split('\'')[3]){
            value.forEach(z =>{
                if(z.style.opacity == 0.3){
                    finishedItemsInBundle++;
                }
            
            });
        }
    }

    return finishedItemsInBundle;
}

function getItemsNeededInBundle(element){
    const elementKey = element.onmousemove.toString().trim().split('\'')[3];
    for(const [key, value] of Object.entries(overwriteDictMax)){
        if(key == elementKey) return value;
    }

    return dict[elementKey].length;
}

function getItemsInSameBundle(element){
    const elementKey = element.onmousemove.toString().trim().split('\'')[3];
    for(const [key, value] of Object.entries(dict)){
        if(key == elementKey) return value;
    }

    return [];
}

function hideInfo(){
    infoElement.style.opacity = 0;
    infoElement.style.visibility = 'hidden';
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

let degreeSpring = 0;
let degreeSummer = 0;
let degreeFall = 0;

function rotateSpring(){
    const center = springCircle.clientWidth / 2;

    border = getCircleBorder(center, center, degreeSpring);
    springCircleText.style.left = border[0] - springCircleText.clientWidth / 2;
    springCircleText.style.bottom = border[1] - springCircleText.clientHeight / 2;

    degreeSpring += 1;
}

function rotateSummer(){
    const center = summerCircle.clientWidth / 2;

    border = getCircleBorder(center, center, degreeSummer + 120);
    summerCircleText.style.left = border[0] - summerCircleText.clientWidth / 2;
    summerCircleText.style.bottom = border[1] - summerCircleText.clientHeight / 2;

    degreeSummer += 1;
}

function rotateFall(){
    const center = fallCircle.clientWidth / 2;

    border = getCircleBorder(center, center, degreeFall + 200);
    fallCircleText.style.left = border[0] - fallCircleText.clientWidth / 2;
    fallCircleText.style.bottom = border[1] - fallCircleText.clientHeight / 2;

    degreeFall += 1;
}

//setInterval(rotateSpring, 2);
//setInterval(rotateSummer, 10);
//setInterval(rotateFall, 6);

window.onload = initBundles();
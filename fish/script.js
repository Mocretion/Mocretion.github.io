const container = document.getElementById("container");

let springEnabled, summerEnabled, fallEnabled, winterEnabled, sunEnabled = false;
const springCircle = document.getElementById("spring");
const summerCircle = document.getElementById("summer");
const fallCircle = document.getElementById("fall");
const winterCircle = document.getElementById("winter");
const winterCircle2 = document.getElementById("winter2");
const winterCircle3 = document.getElementById("winter3");
const anySeasonContainer = document.getElementById("any-season-container");
const sliderContainer = document.getElementById("slider-container");

const springCircleText = document.getElementById("springText");
const summerCircleText = document.getElementById("summerText");
const fallCircleText = document.getElementById("fallText");
const winterCircleText = document.getElementById("winterText");
const winterCircleText2 = document.getElementById("winterText2");
const winterCircleText3 = document.getElementById("winterText3");
const anySeasonText = document.getElementById("anySeasonText");

const infoElement = document.getElementById("info");
const infoLeft = document.getElementById("infoLeft");
const infoRight = document.getElementById("infoRight");

const sunChidlren = Array.from(document.getElementsByClassName("sun-child"));
const springChildren = Array.from(document.getElementsByClassName("spring-child"));
const summerChildren = Array.from(document.getElementsByClassName("summer-child"));
const fallChildren = Array.from(document.getElementsByClassName("fall-child"));
const winterChildren = Array.from(document.getElementsByClassName("winter-child"));
const anySeasonChildren = Array.from(document.getElementsByClassName("anyseason-child"));
const allItems = new Set(springChildren.concat(summerChildren).concat(fallChildren).concat(winterChildren).concat(anySeasonChildren).concat(sunChidlren));

const enabledOpacity = 1;
const disabledOpacity = 0.5;
const blurDiv = document.getElementById("blur");

const cutQuantityProportion = 3.5;

let filters = [];

function initCookies(){
    let entry;
    allItems.forEach(x => {
        const cookie = getCookie(getCookieName(x));
        if(cookie == "false") toggleItem(x);
    });
}

function getCookieName(element){
    return "FISH " + getItemInfoName(element).replace("\\", "").replace("'", "");
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
function changeitemsZIndexExceptClass(except, amount){

    allItems.forEach(x =>{
        if(x.className.includes(except)) return;
        
        changeZIndex(x, amount);
    });
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
 * Changes the z-Index of all items but with a specific ID
 * @param {[String]} except The info no to influence
 * @param {Number} amount The amount to add
 */
function changeitemsZIndexExceptInfo(except, amount, doBlink = false){

    let regex;

    allItems.forEach(x =>{

        let elementExcepted = true; 
        except.forEach(y =>{

            regex = new RegExp("(\\s|')" + y + "(,|'|\\s)");
            if(!regex.test(x.onmousemove.toString())){
                elementExcepted = false;
                return;
            }

        });

        if(!elementExcepted)
            changeZIndex(x, amount);
        else if(doBlink)
            x.animate(blink, blinkTiming);
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
    if(sunEnabled) toggleSun();
}

/**
 * Toggles focus from the sun circle
 */
function toggleSun() {

    if(sunEnabled){
        setBackgroundAlpha(sunCircle, disabledOpacity);
        blurDiv.style.opacity = 0;
        sunCircle.style.zIndex = "auto";

        changeitemsZIndexExceptClass("sun-child", 80);

    }else{
        deselectAllCircles();
        setBackgroundAlpha(sunCircle, enabledOpacity);
        blurDiv.style.opacity = 0.6;
        sunCircle.style.zIndex = 50;

        changeitemsZIndexExceptClass("sun-child", -80);
    }

    sunEnabled = !sunEnabled;
}

/**
 * Toggles focus from the spring circle
 */
function toggleSpring() {

    if(springEnabled){
        setBackgroundAlpha(springCircle, disabledOpacity);
        blurDiv.style.opacity = 0;
        springCircle.style.zIndex = "auto";

        changeitemsZIndexExceptClass("spring-child", 80);

    }else{
        deselectAllCircles();
        setBackgroundAlpha(springCircle, enabledOpacity);
        blurDiv.style.opacity = 0.6;
        springCircle.style.zIndex = 50;

        changeitemsZIndexExceptClass("spring-child", -80);
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

        changeitemsZIndexExceptClass("summer-child", 80);
    }else{
        deselectAllCircles();
        setBackgroundAlpha(summerCircle, enabledOpacity);
        blurDiv.style.opacity = 0.6;
        summerCircle.style.zIndex = 50;
        
        changeitemsZIndexExceptClass("summer-child", -80);
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

        changeitemsZIndexExceptClass("fall-child", 80);
    }else{
        deselectAllCircles();
        setBackgroundAlpha(fallCircle, enabledOpacity);
        blurDiv.style.opacity = 0.6;
        fallCircle.style.zIndex = 50;

        changeitemsZIndexExceptClass("fall-child", -80);
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
        setBackgroundAlpha(winterCircle3, disabledOpacity);
        blurDiv.style.opacity = 0;
        winterCircle.style.zIndex = "auto";
        winterCircle2.style.zIndex = "auto";
        winterCircle3.style.zIndex = "auto";

        changeitemsZIndexExceptClass("winter-child", 80);
    }else{
        deselectAllCircles();
        setBackgroundAlpha(winterCircle, enabledOpacity);
        setBackgroundAlpha(winterCircle2, enabledOpacity);
        setBackgroundAlpha(winterCircle3, enabledOpacity);
        blurDiv.style.opacity = 0.6;
        winterCircle.style.zIndex = 50;
        winterCircle2.style.zIndex = 50;
        winterCircle3.style.zIndex = 50;

        changeitemsZIndexExceptClass("winter-child", -80);
    }
    winterEnabled = !winterEnabled;
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

    setCookie(getCookieName(element), element.style.opacity == 0.3 ? "false" : "true", 60);
}

function changeFilters(element, filterWord){

    if(filters.length > 0)
        changeitemsZIndexExceptInfo(filters, 80);

    if(element.checked){
        filters.push(filterWord);
    }else{
        let index = filters.indexOf(filterWord);
        if(index != -1)
            filters.splice(index, 1);
    }
    if(filters.length > 0)
        blurDiv.style.opacity = 0.6;
    else
        blurDiv.style.opacity = 0;

    changeitemsZIndexExceptInfo(filters, -80, element.checked);
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

    if(e.clientY / window.innerHeight > 0.7)  // Show info text on left of mouse
        infoElement.style.top = e.clientY -infoElement.clientHeight;
    else
        infoElement.style.top = e.clientY;

    infoElement.style.opacity = 1;
    infoElement.style.visibility = 'visible';
    infoElement.style.borderColor = "black";
    
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
        if(j == 0)
            contentLeft += "<div><b>" + replaceCodeWords(x[0]) + "</b></div>";  // Set Item Info Type (e.x Source or Weather)
        else
            contentLeft += "<div style=\"margin-top:5px\"><b>" + replaceCodeWords(x[0]) + "</b></div>";  // Set Item Info Type (e.x Source or Weather)

        if(x.length == 1){
            contentRight += "<div style=\"opacity:0\"> . </div>";
        }else{
            let i = 0;
            x.forEach(y =>{
                if(i > 0){
                    if(i == 1){
                        contentRight += "<div style=\"margin-top:5px\">" + replaceCodeWords(y) + "</div>";
                    }else{
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
 * @param {HTMLElement} element item to get the info from
 * @returns item name from their info div
 */
function getItemInfoName(element){
    return element.onmousemove.toString().trim().split('\'')[1]
}

function getItemInfoLocations(element){
    return element.onmousemove.toString().trim().split('\'')[5];
}


const observer = new ResizeObserver(entries => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    const anySeasonLeft = summerCircle.clientWidth * (1- 1 / cutQuantityProportion) + winterCircle2.clientWidth / 2.2;
    anySeasonContainer.style.left = anySeasonLeft;
    anySeasonContainer.style.width = width * 0.7685 - anySeasonLeft;
    anySeasonContainer.style.height = height * 0.3;
    anySeasonText.style.left = anySeasonContainer.clientWidth / 2 - anySeasonText.clientWidth / 2;

    sliderContainer.style.left = anySeasonLeft;
    sliderContainer.style.width = width * 0.7685 - anySeasonLeft;
    sliderContainer.style.height = height * 0.638

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
                border = getCircleBorder(center, center, 50);

                summerCircleText.style.left = border[0] - summerCircleText.clientWidth / 2;
                summerCircleText.style.bottom = border[1] - summerCircleText.clientHeight / 2;
                break
            case "fall":
                entry.target.style.left = -entry.target.clientWidth / 1.7;
                entry.target.style.top = entry.target.clientHeight / 3;

                fallCircleText.style.fontSize = width / 80;
                border = getCircleBorder(center, center, 310);

                fallCircleText.style.left = border[0] - fallCircleText.clientWidth / 2;
                fallCircleText.style.bottom = border[1] - fallCircleText.clientHeight / 2;

                border = getCircleBorder(center, center, 186);
                winterCircleText.style.fontSize = width / 80;
                winterCircleText.style.left = border[0] -winterCircleText.clientWidth / 2;
                winterCircleText.style.bottom = border[1] - winterCircleText.clientHeight / 2;
                break;
            case "winter":
                entry.target.style.width = entry.target.clientHeight / 3;
                entry.target.style.left = -entries[0].target.clientWidth / 1.55;

                break;
            case "winter2":
                entry.target.style.width = entry.target.clientHeight;
                entry.target.style.left = entries[0].target.clientWidth / 3;
                winterCircleText2.style.fontSize = width / 80;

                border = getCircleBorder(center, center, 300);
                winterCircleText2.style.left = border[0] - winterCircleText2.clientWidth / 2;
                winterCircleText2.style.bottom = border[1] - winterCircleText2.clientHeight / 1.2;
                break;
            case "winter3":
                entry.target.style.width = entry.target.clientHeight * 2;
                entry.target.style.left = -entry.target.clientWidth / 1.2;

                winterCircleText3.style.fontSize = width / 80;
                border = getCircleBorder(center, center, 105);

                winterCircleText3.style.left = entry.target.clientWidth / 1.2 - winterCircleText3.clientWidth / 2;
                winterCircleText3.style.bottom = border[1] - winterCircleText3.clientHeight / 2;

                entry.target.style.top = -container.clientHeight * 0.05 + winterCircleText3.clientHeight;

                break;
        }
    });

    container.style.left = entries[0].target.clientHeight - entries[0].target.clientHeight / cutQuantityProportion + 30;
    container.style.top = entries[1].target.clientHeight / 15;
});

observer.observe(springCircle);
observer.observe(summerCircle);
observer.observe(fallCircle);
observer.observe(winterCircle);
observer.observe(winterCircle2);
observer.observe(winterCircle3);

window.onload = initCookies();
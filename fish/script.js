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

const cutQuantityProportion = 4.5;

let filters = [];

function initCookies(){
    if(getCookie("darkMode") == "true"){
        toggleDarkMode();
    }

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
        
        if(filters.length > 0) return;

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
function changeitemsZIndexExceptInfo(amount, doBlink = false){

    allItems.forEach(x =>{

        let elementExcepted = isItemInFilter(x);

        if(!elementExcepted)
            changeZIndex(x, amount);
        else if(doBlink)
            x.animate(blink, blinkTiming);
    });
}

function isItemInFilter(element){

    let inFilter = true;
    filters.forEach(x =>{
        let regex = new RegExp("(\\s|')" + x + "[A-Z]*#?(,|'|\\s)");
        if(!regex.test(element.onmousemove.toString())){
            inFilter = false;
            return;
        }

    });

    return inFilter;
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
        if(filters.length == 0)
            blurDiv.style.opacity = 0;
        springCircle.style.zIndex = "auto";

        changeitemsZIndexExceptClass("spring-child", 80);

    }else{
        deselectAllCircles();
        setBackgroundAlpha(springCircle, enabledOpacity);
        blurDiv.style.opacity = 0.8;
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
        if(filters.length == 0)
            blurDiv.style.opacity = 0;
        summerCircle.style.zIndex = "auto";

        changeitemsZIndexExceptClass("summer-child", 80);
    }else{
        deselectAllCircles();
        setBackgroundAlpha(summerCircle, enabledOpacity);
        blurDiv.style.opacity = 0.8;
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
        if(filters.length == 0)
            blurDiv.style.opacity = 0;
        fallCircle.style.zIndex = "auto";

        changeitemsZIndexExceptClass("fall-child", 80);
    }else{
        deselectAllCircles();
        setBackgroundAlpha(fallCircle, enabledOpacity);
        blurDiv.style.opacity = 0.8;
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
        if(filters.length == 0)
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
        blurDiv.style.opacity = 0.8;
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
    const opacity = element.style.opacity;
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
        changeitemsZIndexExceptInfo(80);

    if(element.checked){
        filters.push(filterWord);
    }else{
        let index = filters.indexOf(filterWord);
        if(index != -1)
            filters.splice(index, 1);
    }
    if(filters.length > 0)
        blurDiv.style.opacity = 0.8;
    else if(!springEnabled && !summerEnabled && !fallEnabled && !winterEnabled)
        blurDiv.style.opacity = 0;

    changeitemsZIndexExceptInfo(-80, element.checked);
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

    if(e.clientY / window.innerHeight > 0.66)  // Show info text on left of mouse
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

function dropSafeFile(event){
    if(event.dataTransfer.files.length == 0) return;

    var file = event.dataTransfer.files[0];
    var reader = new FileReader();
    reader.readAsText(file);

    reader.addEventListener(
        "load",
        () => {
            let parser = new DOMParser();
            let xmlDoc = parser.parseFromString(reader.result, "text/xml");
            let elements = xmlDoc.getElementsByTagName("fishCaught");
            let fishCaughtList = [];
            for (let i = 0; i < elements.length; i++) {
                const element = elements[i];
                if(element.parentNode.nodeName == "Farmer"){
                    fishCaughtList = element;
                    break;
                }                
            }

            enableAllItems();

            fishCaughtList.childNodes.forEach(x =>{
                let id = x.childNodes[0].childNodes[0].childNodes[0].nodeValue.toString();
                id = id.replace("(O)", "");

                let item = getItemByInfoName(getNameById(id));
                if(item == null) return;
                
                toggleItem(item);
            });
        },
        false,
      );

    event.preventDefault();
}

function dragSafeFileOver(event){
    event.preventDefault();
}

/**
 * @param {HTMLElement} element item to get the info from
 * @returns item name from their info div
 */
function getItemInfoName(element){
    return element.onmousemove.toString().trim().split('\'')[1]
}

/**
 * @param {HTMLElement} element 
 * @returns item locations from their info div
 */
function getItemInfoLocations(element){
    return element.onmousemove.toString().trim().split('\'')[5];
}

/**
 * @param {String} name items name 
 * @returns the items HTMLElement
 */
function getItemByInfoName(name){
    let element = null;
    allItems.forEach(x =>{
        if(x.onmousemove.toString().trim().split('\'')[1] == name){
            element = x;
            return;
        }
    });

    return element;
}

/**
 * Resizes the circles
 */
function resizeWindow(){
    console.log("resize");

    const width = window.innerWidth;
    const height = window.innerHeight;

    if(height > width){
        container.style.height = "70%";
        resizeCirclesVertically();
        resizeAnySeasonVertically(width, height);
    }
    else{
        container.style.height = "90%";
        resizeCirclesHorizontally();
        resizeAnySeasonHorizontally(width, height);
    }
}

/**
 * Apply portrait mode
 */
function resizeCirclesVertically(){
    const width = window.innerWidth;
    const height = window.innerHeight;

    resizeSpring(width, height, "45%");
    resizeSummer(width, height, "56.25%");
    resizeFall(width, height, "52.5%");
    resizeWinter(width, height, "13.75%");
    resizeWinter2(width, height, "45%");
    resizeWinter3(width, height, "20.25%");

    container.style.left = springCircle.clientHeight - springCircle.clientHeight / cutQuantityProportion + 30;
    container.style.top = summerCircle.clientHeight / 15;
}

/**
 * Apply landscape mode
 */
function resizeCirclesHorizontally(){
    const width = window.innerWidth;
    const height = window.innerHeight;

    resizeSpring(width, height, "60%");
    resizeSummer(width, height, "75%");
    resizeFall(width, height, "70%");
    resizeWinter(width, height, "55%");
    resizeWinter2(width, height, "60%");
    resizeWinter3(width, height, "13.5%");

    container.style.left = springCircle.clientHeight - springCircle.clientHeight / cutQuantityProportion + 30;
    container.style.top = summerCircle.clientHeight / 15;
}

function resizeAnySeasonVertically(width, height){
    anySeasonContainer.style.left = 10;
    anySeasonContainer.style.right = 10;
    anySeasonContainer.style.width = null;
    anySeasonContainer.style.height = height * 0.2;
    anySeasonContainer.style.top = springCircle.clientHeight + fallCircle.clientHeight / 1.4;
    anySeasonText.style.left = anySeasonContainer.clientWidth / 2 - anySeasonText.clientWidth / 2;

    sliderContainer.style.left = 10;
    sliderContainer.style.right = 10;
    sliderContainer.style.width = null;
    sliderContainer.style.height = null;
    sliderContainer.style.top = anySeasonContainer.offsetTop + anySeasonContainer.clientHeight + 10;
    sliderContainer.style.bottom = 10;
}

function resizeAnySeasonHorizontally(width, height){
    const anySeasonLeft = summerCircle.clientWidth * (1- 1 / cutQuantityProportion) + winterCircle2.clientWidth / 2.8 + container.offsetLeft;
    anySeasonContainer.style.left = anySeasonLeft;
    anySeasonContainer.style.right = null;
    anySeasonContainer.style.top = "1%";
    anySeasonContainer.style.width = width * 0.7685 - anySeasonLeft + container.offsetLeft;
    anySeasonContainer.style.height = height * 0.3;
    anySeasonText.style.left = anySeasonContainer.clientWidth / 2 - anySeasonText.clientWidth / 2;

    sliderContainer.style.left = anySeasonLeft;
    sliderContainer.style.right = null;
    sliderContainer.style.width = width * 0.7685 - anySeasonLeft + container.offsetLeft;
    sliderContainer.style.height = null;
    sliderContainer.style.top = "34%";
    sliderContainer.style.bottom = 10;
}

function resizeSpring(width, height, radius){
    // Make circle
    if(height > width){
        springCircle.style.width = stringToPercentage(radius) * window.innerWidth;
        springCircle.style.height = springCircle.clientWidth;
    }else{
        springCircle.style.height = radius;
        springCircle.style.width = springCircle.clientHeight;
    }

    const center = springCircle.clientWidth / 2;

    springCircle.style.left = -springCircle.clientWidth + springCircle.clientWidth / cutQuantityProportion;  // Set position

    // Set textbox position
    const border = getCircleBorder(center, center, 130);
    springCircleText.style.left = border[0] - springCircleText.clientWidth / 2;
    springCircleText.style.bottom = border[1] - springCircleText.clientHeight / 2;
}

function resizeSummer(width, height, radius){
    // Make circle
    if(height > width){
        summerCircle.style.width = stringToPercentage(radius) * window.innerWidth;
        summerCircle.style.height = summerCircle.clientWidth;
    }
    else{
        summerCircle.style.height = radius;
        summerCircle.style.width = summerCircle.clientHeight;
    }

    const center = summerCircle.clientWidth / 2;

    summerCircle.style.left = -summerCircle.clientWidth / cutQuantityProportion;  // Set position

    // Set textbox position
    const border = getCircleBorder(center, center, 50);
    summerCircleText.style.left = border[0] - summerCircleText.clientWidth / 2;
    summerCircleText.style.bottom = border[1] - summerCircleText.clientHeight / 2;
}

function resizeFall(width, height, radius){
    // Make circle
    if(height > width){
        fallCircle.style.width = stringToPercentage(radius) * window.innerWidth;
        fallCircle.style.height = fallCircle.clientWidth;
    }
    else{
        fallCircle.style.height = radius;
        fallCircle.style.width = fallCircle.clientHeight;
    }

    const center = fallCircle.clientWidth / 2;

    // Set position
    fallCircle.style.left = -fallCircle.clientWidth / 1.7;
    fallCircle.style.top = fallCircle.clientHeight / 2.3;

    // Set texbox position
    const border = getCircleBorder(center, center, 310);
    fallCircleText.style.left = border[0] - fallCircleText.clientWidth / 2;
    fallCircleText.style.bottom = border[1] - fallCircleText.clientHeight / 2;
}

function resizeWinter(width, height, radius){
    // Make Oval
    if(height > width){
        winterCircle.style.width = stringToPercentage(radius) * window.innerWidth;
        winterCircle.style.height = winterCircle.clientWidth * 3;  // Scale to oval
    }else{
        winterCircle.style.height = radius;
        winterCircle.style.width = winterCircle.clientHeight / 3;  // Scale to oval
    }

    // Set Position
    winterCircle.style.top = fallCircle.clientWidth / 1.62;
    winterCircle.style.left = -springCircle.clientWidth / 1.55;

    const center = fallCircle.clientWidth / 2;

    // Set texbox position based on fall circle position
    const border = getCircleBorder(center, center, 186);
    winterCircleText.style.left = border[0] -winterCircleText.clientWidth / 2;
    winterCircleText.style.bottom = border[1] - winterCircleText.clientHeight / 2;
}

function resizeWinter2(width, height, radius){
    // Make circle
    if(height > width){
        winterCircle2.style.width = stringToPercentage(radius) * window.innerWidth;
        winterCircle2.style.height = winterCircle2.clientWidth;
    }
    else{
        winterCircle2.style.height = radius;
        winterCircle2.style.width = winterCircle2.clientHeight;
    }

    const center = winterCircle2.clientWidth / 2;

    winterCircle2.style.top = summerCircle.clientWidth / 2.5;  // Set position
    winterCircle2.style.left = springCircle.clientWidth / 4;  // Set position

    // Set texbox position
    const border = getCircleBorder(center, center, 300);
    winterCircleText2.style.left = border[0] - winterCircleText2.clientWidth / 2;
    winterCircleText2.style.bottom = border[1] - winterCircleText2.clientHeight / 1.2;
}

function resizeWinter3(width, height, radius){
    // Make Oval
    if(height > width){
        winterCircle3.style.width = stringToPercentage(radius) * window.innerWidth;
        winterCircle3.style.height = winterCircle3.clientWidth / 2;  // Scale to oval
    }else{
        winterCircle3.style.height = radius;
        winterCircle3.style.width = winterCircle3.clientHeight * 2;  // Make oval
    }

    // Set position
    winterCircle3.style.left = -winterCircle3.clientWidth / 1.3;  

    // Set textbox position
    winterCircleText3.style.left = winterCircle3.clientWidth / 2 - winterCircleText3.clientWidth / 2;
    winterCircleText3.style.bottom = winterCircle3.clientHeight - winterCircleText3.clientHeight / 2;

    // Adjust position based on textbox size
    winterCircle3.style.top = springCircle.clientHeight * 0.05;
}

window.onload = initCookies();
resizeWindow();
window.addEventListener("resize", resizeWindow);
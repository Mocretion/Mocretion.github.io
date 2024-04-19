const infoElement = document.getElementById("info");
const infoLeft = document.getElementById("infoLeft");
const infoRight = document.getElementById("infoRight");

const homeButton = document.getElementById("home");

function initCookies(){
    if(getCookie("darkMode") == "true"){
        toggleDarkMode();
    }
}

/**
 * Shows the info div which appears when hovering over an item
 */
function showInfo(e, element, ...lines){
    calculateLines(element, lines);

    if(e.clientX / window.innerWidth < 0.7)  // Show info text on left of mouse
        infoElement.style.left = e.clientX + window.scrollX + 30;
    else
        infoElement.style.left = e.clientX + window.scrollX - 30 - infoElement.clientWidth;

    if(e.clientY / window.innerHeight > 0.66)  // Show info text on left of mouse
        infoElement.style.top = e.clientY + window.scrollY -infoElement.clientHeight;
    else
        infoElement.style.top = e.clientY + window.scrollY;

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
                    if(i == 1 && j > 0){
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

window.onload = initCookies();
window.onscroll = function(){homeButton.style.bottom = 5 - window.scrollY}
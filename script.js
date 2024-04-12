function initCookies(){
    if(getCookie("darkMode") == "true"){
        toggleDarkMode();
    }
}

window.onload = initCookies();
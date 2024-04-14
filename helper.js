let darkMode = false;

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
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

function toggleDarkMode() {
    if(!darkMode)
        document.body.style.backgroundColor = 'rgba(100, 100, 100, 1)';
    else
        document.body.style.backgroundColor = 'rgba(255, 255, 255, 1)';

    darkMode = !darkMode;
    setCookie("darkMode", darkMode, 60);
}

function stringToPercentage(str){
    str = str.replace("%", "");
    str = "0." + str;
    return parseFloat(str);
}
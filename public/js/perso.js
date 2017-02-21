(function getChrono(){
  // Récupération des informations du chrono en session si existante
  if(window.localStorage.min == ""){
      $('#timer_minute').text("00")
  } else if(window.localStorage.min != undefined){
    $('#timer_minute').text(window.localStorage.min)
  }

  if(window.localStorage.sec == ""){
      $('#timer_minute').text("00")
  } else if(window.localStorage.sec != undefined){
    $('#timer_seconds').text(window.localStorage.sec)
  }
})(window.onload);

(function saveChrono(){
  // Enregistrement du temps du chrono avant de fermer la page
  window.onbeforeunload = function(){
    window.localStorage.setItem('sec', $('#timer_seconds').text())
    window.localStorage.setItem('min', $('#timer_minute').text())
  };
})(window);


/*(function getChrono(){
    const cMin = getCookie('min');
    const cSec = getCookie('sec');

    // Récupération des informations du chrono cookie si existante
    if(!cMin){
        $('#timer_minute').text("00");
    } else {
        $('#timer_minute').text(cMin)
    }

    if(!cSec){
        $('#timer_minute').text("00");
    } else {
        $('#timer_seconds').text(cSec)
    }
})(window.onload);

(function saveChrono(){
    // Enregistrement du temps du chrono avant de fermer la page
    window.onbeforeunload = function(){
        setCookie('sec', $('#timer_seconds').text(), 365);
        setCookie('min', $('#timer_minute').text(), 365);
    };
})(window);

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return false;
}

/!*function checkCookie() {
    let user = getCookie("username");
    if (user != "") {
        alert("Welcome again " + user);
    } else {
        user = prompt("Please enter your name:", "");
        if (user != "" && user != null) {
            setCookie("username", user, 365);
        }
    }
}*!/*/

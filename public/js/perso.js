(function recuperationTime(){
  // Récupération des informations du chrono en session si existante
  if(window.localStorage.min != undefined){
    $('#timer_minute').text(window.localStorage.min)
  }
  if(window.localStorage.sec != undefined){
    $('#timer_seconds').text(window.localStorage.sec)
  }
})(window.onload);

(function(){
  // Enregistrement du temps du chrono avant de fermer la page
  window.onbeforeunload = function(){
    window.localStorage.setItem('sec', $('#timer_seconds').text())
    window.localStorage.setItem('min', $('#timer_minute').text())
  };
})(window);

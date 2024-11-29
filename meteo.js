function recevoirTemperature(ville) {
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + ville + '&appid=dc8c9152e8adaad0ec8bf635818c0d42&units=metric';
    let request = new XMLHttpRequest;
    request.open('POST',url);
    request.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    request.responseType= 'json';
    request.send(ville);
    
    request.onload = function() {
        if(request.readyState === XMLHttpRequest.DONE) {
            if(request.status === 200) {
                let data = request.response;
                console.log('myData',data);
                let temperature = data.main.temp;
                 let ville = data.name;
                 document.querySelector('#temperature_label').textContent = temperature;
                 document.querySelector('#ville').textContent = ville;
                 
            }
            else {
                alert('Un problème est intervenu, merci de revenir plus tard');
            }
        }
    }
}
let villeChoisie = document.querySelector('#changer');
villeChoisie.addEventListener('click',(e)=>{
 ville = prompt('Quelle ville souhaitez-vous voir ?');
 recevoirTemperature(ville);
 });


 if("geolocation" in navigator) {
    // *** recuperer la position actuelle (logitude,latitude)
  navigator.geolocation.watchPosition((position)=>{
      // console.log(position.coords.latitude);
      // console.log(position.coords.longitude);
      const url = 'https://api.openweathermap.org/data/2.5/weather?lon=' + position.coords.longitude 
      + '&lat=' +position.coords.latitude + '&appid=dc8c9152e8adaad0ec8bf635818c0d42&units=metric';
      console.log(url);
      let request = new XMLHttpRequest;
      request.open('POST',url);
      request.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
      request.responseType= 'json';
      request.send(ville);
      
      request.onload = function() {
          if(request.readyState === XMLHttpRequest.DONE) {
              if(request.status === 200) {
                  let data = request.response;
                  console.log('myData',data);
                  let temperature = data.main.temp;
                   let ville = data.name;
                   document.querySelector('#temperature_label').textContent = temperature;
                   document.querySelector('#ville').textContent = ville;
                   
              }
              else {
                  alert('Un problème est intervenu, merci de revenir plus tard');
              }
          }
      }
  
  }, erreur , options);
  
  }
  else {
      ville = 'Paris';
      recevoirTemperature(ville);
  }

  var options = {
    enableHightAccuracy : true
}
function erreur() {
    // Used in case the user denies location permission we display the temperature of the city of Paris.
    ville = 'Paris';
    recevoirTemperature(ville);
}
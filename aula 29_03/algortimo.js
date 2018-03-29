window.onload = function() {

  //Criar classe dos simbolos
  var Simbolo = L.Icon.extend({
  options: {
  iconSize: [30, 30],
  iconAnchor: [15, 15],
  popupAnchor: [0, -15]
  }
  });

    var simbolo = [];
    for(var i=0; i<=174; i++) {
    simbolo[i] = new Simbolo({iconUrl: "simbolos/" + i + ".svg"});
  }


  var mapa = L.map("meumapa",{
    center: [-25.5, -49.25],
    zoom: 11
});

//mapa do leaflet
  var osmazul = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, Tiles courtesy of <a href="http://hot.openstreetmap.org/" target="_blank">Humanitarian OpenStreetMap Team</a>'
}).addTo(mapa);

mapa.locate({
  setView: true,
  maxZoom: 15,
  timeout: 100000

  });

//evento que mostra a localização
//  mapa.on("locationfound", function(evento) {
    //L.marker(evento.latlng, {icon: simbolo[8]}).addTo(mapa);
  //  L.circle(evento.latlng, evento.accuracy).addTo(mapa);
//  });

  L.marker([-25.5, -49.25], {icon: simbolo[139]}).addTo(mapa).bindPopup("minha localização!");

//evento que mostra erro da localização
  //mapa.on("locationerror", function(evento) {
  //  alert("Não foi possivel encontrar sua localização");
//  });
}

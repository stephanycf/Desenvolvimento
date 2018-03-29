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

var osm2 = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
maxZoom: 19,
attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, Tiles courtesy of <a href="http://hot.openstreetmap.org/" target="_blank">Humanitarian OpenStreetMap Team</a>'
});

// var osmazul = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
// maxZoom: 19,
// attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, Tiles courtesy of <a href="http://hot.openstreetmap.org/" target="_blank">Humanitarian OpenStreetMap Team</a>'
// }).addTo(mapa);

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

// L.marker([-25.5, -49.25], {icon: simbolo[139]}).addTo(mapa).bindPopup("minha localização!");

    var pontos = [ {
        type: "Feature",
        properties: {
          id: 1,
          descricao: "Meu primeiro ponto em GeoJSON"
        },
        geometry: {
          type: "Point",
          coordinates: [-49.2,-25.5]
        }
    },
    {
        type: "Feature",
        properties: {
          id: 2,
          descricao: "Meu segundo ponto em GeoJSON"
        },
        geometry: {
          type: "Point",
          coordinates: [-49.29,-25.57]
        }
    }];

    //Adicionar ao mapa
    L.geoJSON(pontos, {
      pointToLayer: function(feicao, posicao){
        if(feicao.properties.id == 1) {
        return L.marker(posicao, {icon: simbolo[10]});
          } else {
        return L.marker(posicao, {icon: simbolo[4]});
          }
      },
      onEachFeature: function(feicao, camada) {
      //  camada.bindPopup(feicao.properties.descricao);
        //  camada.bindPopup("ID: "+feicao.properties.id);
          camada.bindPopup("ID: "+feicao.properties.id + "<br/> Descrição: " + feicao.properties.descricao);
    }
    }).addTo(mapa);

    L.geoJSON(bairros, {
        style: function(feicao) {
          cores  = ["#a6cee3","#1f78b4","#b2df8a","#33a02c","#fb9a99","#e31a1c","#fdbf6f","#ff7f00","#cab2d6","#cab2d6","#6a3d9a","#ffff99","#b15928"]

          return{
            weight: 0.2,
            color:"#000",
            fillColor: cores[feicao.properties.CD_REGIONA-1],
            fillOpacity: 1
          }
        },
        onEachFeature: function(feicao, camada) {
          camada.bindPopup(feicao.properties.NOME);
      }
      }).addTo(mapa);

      var miniMap = new L.Control.MiniMap(osm2).addTo(mapa);
  //  L.geoJSON
//evento que mostra erro da localização
  //mapa.on("locationerror", function(evento) {
  //  alert("Não foi possivel encontrar sua localização");
//  });
}

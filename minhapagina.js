//document.write ("Teste arquivo externo da teté")document.write("Teste arquivo externo");
window.onload = function(){
//criação do mapa
var mapa = L.map("meumapa").setView([-25.45,-49.27],11);
//Tile open street map
var osm = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
//Open mapbox
var mapbox = L.tileLayer(
"https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}",
{
id: "mapbox.wheatpaste",
accessToken: "pk.eyJ1Ijoic3RlcGhhbnljIiwiYSI6ImNqZjJyYmpxZzAybXEyd28xM2o1NnR0eDgifQ.bkqJM-02WZzjWxs46F-5Qw"
}
).addTo(mapa);

//Adicionar camada WMS ao mapa
var states = L.tileLayer.wms('http://localhost:8082/geoserver/wms', {
layers: 'topp:states',
transparent: 'true',
format: 'image/png'
}).addTo(mapa);

//Pontos
var ponto1 = L.marker([-25.45, -49.27]);
ponto2 = L.marker([-25.43, -49.29]);

//Linhas
var linha1 = L.polyline([[-25.4, -49.2], [-25.5, -49.1]]);
linha2 = L.polyline([[-25.4, -49.1], [-25.5, -49.2]]);


//Polígono
var poligono = L.polygon([
[-25.3, -49.3],
[-25.3, -49.5],
[-25.6, -49.5],
[-25.6, -49.3],
],{
  color:'red',
  fillColor: "#i03",
  fillOpacity: 0.3
});

//Círculo
var circulo = L.circle(
[-25.45, -49.35],
{
color: "yellow",
fillColor: "#a01",
fillOpacity: 0.5,
radius: 5000
}
);

//Agrupar camadas de pontos
var pontos = L.layerGroup([ponto1, ponto2]).addTo(mapa);
//Agrupar camadas de linhas
var linhas = L.layerGroup([linha1, linha2]).addTo(mapa);
//Agrupar camadas de pontos e linhas
//var combinacao = L.layerGroup([ponto1, ponto2, linha1, linha2, osm]).addTo(mapa);

//Anexar popups
//ponto.bindPopup("Eu sou um ponto!");
//linha.bindPopup("Eu sou uma linha!");
//poligono.bindPopup("Eu sou um polígono!");
//circulo.bindPopup("Eu sou um círculo");

//Abrir popus
//ponto.openPopup();
//linha.openPopup();
//poligono.openPopup();
//circulo.openPopup();

//Popup em local específico do mapa
// var popup = L.popup()
// .setLatLng([-25.44, -49.51])
// .setContent("Eu sou uma popup!")
// .openOn(mapa);


//Evento disparado após o clique do usuário
//mapa.on('dblclick', function (evento) {
//alert("Você clicou em: " + evento.latlng);
//});
//Evento disparado após arrastar o mapa
//mapa.on('dragend', function (evento));

//Funçao acionada pelo evento criado
//function moverMapa (evento) {
//alert("Você moveu o mapa por : " + evento.distance.toFixed() + " pixels");
//});



//Adicionar legenda WMS
//Adicionar legenda WMS
//var uri = "http://localhost:8082/geoserver/wms?REQUEST=GetLegendGraphic&FORMAT=image/jpeg&LAYER=topp:states";
//document.getElementById('legenda').src = uri;

//Mapas base
var baseCartografica = {

"Base OpenStreetMap": osm,
"Mapbox Streets": mapbox
}


//Mapas de sobreposiçao
var informacaoTematica = {
"Pontos": pontos,
"Linhas": linhas,
"Poligono": poligono,
"Geoserver": states
}

//Adicionar objetos ao controle de camadas
L.control.layers(baseCartografica, informacaoTematica).addTo(mapa);
//Escala gráfica
L.control.scale({position: 'bottomleft'}).addTo(mapa);
}

window.onload = function(){

  var map = L.map("teresopolis").setView([-22.33,-42.87],10);
  var osmt = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
  var mapboxt = L.tileLayer(
  "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}",
  {
    id:"mapbox.comic",
    accessToken: "pk.eyJ1Ijoic3RlcGhhbnljIiwiYSI6ImNqZjJyYmpxZzAybXEyd28xM2o1NnR0eDgifQ.bkqJM-02WZzjWxs46F-5Qw"
    }
    ).addTo(map);

    //Adicionar camada WMS ao mapa
    var state = L.tileLayer.wms('http://localhost:8082/geoserver/wms', {
    layers: 'step:teresopolis',
    transparent: 'true',
    format: 'image/png'
    }).addTo(map);

    var pto = L.marker([-22.35,-42.87]).addTo(map);
    var line = L.polyline([[-22.20,-42.80],[-22.50,-42.99]]).addTo(map);
    var polig = L.polygon([
      [-22.20, -42.79],
      [-22.20, -42.90],
      [-22.30, -42.90]]).addTo(map);
    var circ = L.circle(
      [-22.39, -42.92],
      {
        color: "green",
        fillColor: "#a07",
        fillOpacity: 0.3,
        radius: 4000
      }
).addTo(map);



  }

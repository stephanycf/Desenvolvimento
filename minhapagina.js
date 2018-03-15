//document.write ("Teste arquivo externo da teté")document.write("Teste arquivo externo");
window.onload = function(){
var mapa = L.map("meumapa").setView([-25.45,-49.27],11);

//Open Street map
L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(mapa);

var ponto = L.marker([-25.45, -49.47]).addTo(mapa);
}

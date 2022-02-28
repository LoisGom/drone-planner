function dimensiones(){
    var anchoSensorTxt = parseInt(document.getElementById("anchoSensor").value)*10**-3;
    var altoSensorTxt = parseInt(document.getElementById("altoSensor").value)*10**-3;
    var alturaVueloTxt = parseInt(document.getElementById("alturaVuelo").value);
    var distanciaFocalTxt = parseInt(document.getElementById("distanciaFocal").value)*10**-3;

    var resultadoAncho = ((alturaVueloTxt * anchoSensorTxt) / distanciaFocalTxt).toFixed(3)
    var resultadoAlto =  ((alturaVueloTxt * altoSensorTxt) / distanciaFocalTxt).toFixed(3)

    document.getElementById("anchoFotografia").value = resultadoAncho
    document.getElementById("altoFotografia").value = resultadoAlto
}
function distanciaSolape(){
    var anchoFotografiaTxt = parseInt(document.getElementById("anchoFotografia").value);
    var altoFotografiaTxt = parseInt(document.getElementById("altoFotografia").value);
    var overlapTxt = parseInt(document.getElementById("overlap").value)/100;
    var sidelapTxt = parseInt(document.getElementById("sidelap").value)/100;

    var resultadoOverlap = (altoFotografiaTxt*overlapTxt).toFixed(3)
    var resultadoSidelap = (anchoFotografiaTxt*sidelapTxt).toFixed(3)

    document.getElementById("distanciaOverlap").value = resultadoOverlap
    document.getElementById("distanciaSidelap").value = resultadoSidelap
  }
function resolucion(){
    var anchoFotografiaTxt = parseInt(document.getElementById("anchoFotografia").value);
    var altoFotografiaTxt = parseInt(document.getElementById("altoFotografia").value);
    var anchoPixelTxt = parseInt(document.getElementById("anchoPixel").value);
    var altoPixelTxt = parseInt(document.getElementById("altoPixel").value);

    var resultadoAnchoResolucion = ((altoFotografiaTxt/altoPixelTxt)*100).toFixed(3)
    var resultadoAltoResolucion = ((anchoFotografiaTxt/anchoPixelTxt)*100).toFixed(3)

    document.getElementById("anchoResolucion").value = resultadoAnchoResolucion
    document.getElementById("altoResolucion").value = resultadoAltoResolucion
}
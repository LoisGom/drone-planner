let state = "";
let backColor = '#000000';
let strokeColor = '#000000';
let photocenter;
let photo;
let dronePath;
function fillState(_state,_stroke,_back){
     state = _state;
     strokeColor=_stroke;
     backColor=_back;
}

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
function dimensionesArea(){
    var anchoAreaVar = parseInt(document.getElementById("anchoArea").value);
    var altoAreaVar = parseInt(document.getElementById("altoArea").value);
    var coordXVar = parseInt(document.getElementById("coordX").value);
    var coordYVar = parseInt(document.getElementById("coordY").value);

    let vbox = coordXVar + " " + coordYVar + " " + anchoAreaVar + " " + altoAreaVar;
    svgArea = document.getElementById('svgContainer');
    svgArea.setAttribute("viewBox",vbox);
}


var svgNS = "http://www.w3.org/2000/svg"


function getCoors(evt){
    console.log(evt);
    let xy = translateXY(evt.layerX,evt.layerY)
    fillinTextBox(xy);
    let x = xy[0];
    let y = xy[1];
    if(state !=='')
    { 
    let circ = document.getElementById(state)
    if (circ){
        circ.setAttributeNS(null,"cx",x);
        circ.setAttributeNS(null,"cy",y);
    }
    else
    {
        let Circle = document.createElementNS(svgNS,"circle");    
        Circle.setAttributeNS(null,"cx",x);
        Circle.setAttributeNS(null,"cy",y);
        Circle.setAttributeNS(null,"r",5);
        Circle.setAttributeNS(null,"fill",backColor);
        Circle.setAttributeNS(null,"stroke",strokeColor);
        Circle.setAttributeNS(null,"id",state);

        document.getElementById("svgContainer").appendChild(Circle);
    }
}
    state = '';
}

function fillinTextBox(xy){
    if(state ==="despegue" ) {
        document.getElementById('despegueX').value = xy[0];
        document.getElementById('despegueY').value = xy[1];
    }
    if(state ==="aterrizaje" ) {
        document.getElementById('aterrizajeX').value = xy[0];
        document.getElementById('aterrizajeY').value = xy[1];
    }
    if(state ==="AM_min" ) {
        document.getElementById('xMin').value = xy[0];
        document.getElementById('yMin').value = xy[1];
    }
    if(state ==="AM_max" ) {
        document.getElementById('xMax').value = xy[0];
        document.getElementById('yMax').value = xy[1];
    }
}
   

function translateXY(x,y){
    svgArea = document.getElementById('svgContainer');
    let vbox = svgArea.getAttribute('viewBox');
    vbox = vbox.split(" ");
    vbox = vbox.map(e => parseInt(e));
    let newY = (parseFloat(vbox[3])/parseFloat(svgArea.getAttribute('height'))) * y
    let newX = (parseFloat(vbox[2])/parseFloat(svgArea.getAttribute('width'))) * x
    newX = newX + vbox[0]
    newY = newY + vbox[1]
    let xt = [newX, newY];
    return xt;
}


function PaintAreaPath(){

    let xmin = parseInt(document.getElementById("xMin").value);
    let xmax = parseInt(document.getElementById("xMax").value);
    let ymin = parseInt(document.getElementById("yMin").value);
    let ymax = parseInt(document.getElementById("yMax").value);

    let _xmin = xmin
    if(_xmin > xmax)    {
        xmin = xmax;
        xmax = _xmin;
    }
    let _ymin = ymin
    if(_ymin > ymax)    {
        ymin = ymax;
        ymax = _ymin;
    }
   
    const data = `M${xmin},${ymin} L${xmin},${ymax} L${xmax},${ymax} L${xmax},${ymin} Z`;
    let pathId = 'areaPath';
    let AreaPath = document.getElementById(pathId);    
    if(AreaPath){
        AreaPath.setAttributeNS(null,"d",data)
    }
    else
    {
    AreaPath = document.createElementNS(svgNS,"path");
    AreaPath.setAttributeNS(null,"id","areaPath");
    AreaPath.setAttributeNS(null,"d",data);
    AreaPath.setAttributeNS(null,"fill","none");
    AreaPath.setAttributeNS(null,"stroke","red");
    document.getElementById("svgContainer").appendChild(AreaPath);
    }
}

function paintCircle(x,y){

    let photocenter = document.createElementNS(svgNS,"circle");
    photocenter.setAttributeNS(null,"cx",x);
    photocenter.setAttributeNS(null,"cy",y);
    photocenter.setAttributeNS(null,"r",5);
    photocenter.setAttributeNS(null,"fill",backColor);
    photocenter.setAttributeNS(null,"stroke",strokeColor);
    photocenter.setAttributeNS(null,"id",state);
    return photocenter;
}

function paintRect(x,y){

    let xRectangle = x - parseFloat((document.getElementById('anchoFotografia').value)/2);
    let yRectangle = y - parseFloat((document.getElementById('altoFotografia').value)/2);

    let rectWidth = parseFloat((document.getElementById('anchoFotografia').value));
    let rectHeight = parseFloat((document.getElementById('altoFotografia').value));

    let rect = document.createElementNS(svgNS,"rect");
    rect.setAttributeNS(null,"x",xRectangle);
    rect.setAttributeNS(null,"y",yRectangle);
    rect.setAttributeNS(null,"width",rectWidth);
    rect.setAttributeNS(null,"height",rectHeight);
    rect.setAttributeNS(null,"fill", "#00FFFF");
    rect.setAttributeNS(null,"stroke","#3360FF"); 
    rect.setAttributeNS(null,"id",state);


    return rect;
}
function createmission(){

    d3.select(photo).remove();
    d3.select(photocenter).remove();
    d3.select(dronePath).remove();


    let xmin = parseInt(document.getElementById('xMin').value);
    let ymin = parseInt(document.getElementById('yMin').value);
    let xmax = parseInt(document.getElementById('xMax').value);
    let ymax = parseInt(document.getElementById('yMax').value);
    let  tofx =  parseInt(document.getElementById('despegueX').value);
    let  tofy =  parseInt(document.getElementById('despegueY').value);
    let  landx =  parseInt(document.getElementById('aterrizajeX').value);
    let  landy =  parseInt(document.getElementById('aterrizajeY').value);

    let _xmin = xmin;
    if(_xmin>xmax){
        xmin = xmax;
        xmax = _xmin
    }

    let _ymin = ymin;
    if(_ymin>ymax){
        ymin = ymax;
        ymax = _ymin
    }

    
    let puntos = [];
    let x = xmin;
	let y = ymin;
    let distanciaSidelap=parseFloat(document.getElementById('distanciaSidelap').value);
    let distanciaOverlap=parseFloat(document.getElementById('distanciaOverlap').value);
    let anchoFotografia =  parseFloat(document.getElementById("anchoFotografia").value);
    let altoFotografia = parseFloat(document.getElementById("altoFotografia").value);

    let ascendente

    puntos.push([tofx, tofy]);

    stepHorizontal = anchoFotografia-distanciaSidelap;
    stepVertical = altoFotografia-distanciaOverlap;

    let distancia1  = []; //xmin ymin
    let distancia2  = []; //xmin ymax
    let distancia3  = []; //xmax ymin
    let distancia4  = []; // xmax ymax
    distancia1 = Math.sqrt(Math.pow(xmin-tofx,2)+Math.pow(ymin-tofy,2));
    distancia2 = Math.sqrt(Math.pow(xmin-tofx,2)+Math.pow(ymax-tofy,2));
    distancia3 = Math.sqrt(Math.pow(xmax-tofx,2)+Math.pow(ymin-tofy,2));
    distancia4 = Math.sqrt(Math.pow(xmax-tofx,2)+Math.pow(ymax-tofy,2));

    photocenter = document.createElementNS(svgNS,"g");
    document.getElementById("svgContainer").appendChild(photocenter);

    photo= document.createElementNS(svgNS,"g");
    document.getElementById("svgContainer").appendChild(photo);



    if(distancia1<distancia2 && distancia1<distancia3 && distancia1<distancia4){ //xmin ymin
        puntos.push([xmin,ymin]);
        ascendente = false;
        
        for (let i=xmin ;i<xmax; i+= stepHorizontal){
            if (ascendente){
                for (let j=ymax;j>ymin; j-= stepVertical){
                    x = i;
                    y = j;
                
                    puntos.push([x, y]);
                    photo.appendChild(paintRect(x,y));
                    photocenter.appendChild(paintCircle(x,y));
                } 
            }else{
                for (let j=ymin;j<ymax; j+= stepVertical){
                    x = i;
                    y = j;
                    
                    puntos.push([x, y]);
                    photo.appendChild(paintRect(x,y));
                    photocenter.appendChild(paintCircle(x,y));
                }
        
            }
            ascendente = !ascendente;
            document.getElementById("svgContainer").appendChild(photo);
            document.getElementById("svgContainer").appendChild(photocenter);

        }
    }else if(distancia2<distancia1 && distancia2<distancia3 && distancia2<distancia4){  //xmin ymax
        puntos.push([xmin,ymax]);
        ascendente = true;
        for (let i=xmin ;i<xmax; i+= stepHorizontal){
            if (ascendente){
                for (let j=ymax;j>ymin; j-= stepVertical){
                    x = i;
                    y = j;
                
                    puntos.push([x, y]);
                    photo.appendChild(paintRect(x,y));
                    photocenter.appendChild(paintCircle(x,y));
                } 
            }else{
                for (let j=ymin;j<ymax; j+= stepVertical){
                    x = i;
                    y = j;
                    
                    puntos.push([x, y]);
                    photo.appendChild(paintRect(x,y));
                    photocenter.appendChild(paintCircle(x,y));
                }
        
            }
            ascendente = !ascendente;
            document.getElementById("svgContainer").appendChild(photo);
            document.getElementById("svgContainer").appendChild(photocenter);

        }
    }else if(distancia3<distancia1 && distancia3<distancia2 && distancia3<distancia4){  //xmax ymin
        puntos.push([xmax,ymin]);
        ascendente = false;
        for (let i=xmax ;i>xmin; i-= stepHorizontal){
            if (ascendente){
                for (let j=ymax;j>ymin; j-= stepVertical){
                    x = i;
                    y = j;
                
                    puntos.push([x, y]);
                    photo.appendChild(paintRect(x,y));
                    photocenter.appendChild(paintCircle(x,y));
                } 
            }else{
                for (let j=ymin;j<ymax; j+= stepVertical){
                    x = i;
                    y = j;
                    
                    puntos.push([x, y]);
                    photo.appendChild(paintRect(x,y));
                    photocenter.appendChild(paintCircle(x,y));
                }
        
            }
            ascendente = !ascendente;
            document.getElementById("svgContainer").appendChild(photo);
            document.getElementById("svgContainer").appendChild(photocenter);
        }

    }else if(distancia4<distancia1 && distancia4<distancia2 && distancia4<distancia3){  //xmax ymax
        puntos.push([xmax,ymax]);
        ascendente = true;
        for (let i=xmax ;i>xmin; i-= stepHorizontal){
            if (ascendente){
                for (let j=ymax;j>ymin; j-= stepVertical){
                    x = i;
                    y = j;
                
                    puntos.push([x, y]);
                    photo.appendChild(paintRect(x,y));
                    photocenter.appendChild(paintCircle(x,y));
                } 
            }else{
                for (let j=ymin;j<ymax; j+= stepVertical){
                    x = i;
                    y = j;
                    
                    puntos.push([x, y]);
                    photo.appendChild(paintRect(x,y));
                    photocenter.appendChild(paintCircle(x,y));
                }
        
            }
            ascendente = !ascendente;
            document.getElementById("svgContainer").appendChild(photo);
            document.getElementById("svgContainer").appendChild(photocenter);
        }   
    
    }
    puntos.push([landx,landy]);
    paintpath(puntos);
}

function paintpath(puntos){

        dronePath = document.createElementNS(svgNS,"path"); 
        let data = `M ${puntos[0][0]},${puntos[0][1]} `; 
        for(let i=1; i<puntos.length; i++){
            data +=  `L ${puntos[i][0]},${puntos[i][1]}`
        }

        dronePath.setAttributeNS(null,"id","mycircle");
        dronePath.setAttributeNS(null,"d",data);
        dronePath.setAttributeNS(null,"fill","none");
        dronePath.setAttributeNS(null,"stroke","red");
        document.getElementById("svgContainer").appendChild(dronePath);
    
}
function hidePhoto(){

    let switx2 = document.getElementById("flexSwitchCheckDefault2");
    
    if (switx2.checked){
        photo.style.display = "block";
    } else {
        photo.style.display = "none";
    }

    console.log(switx2);
}
function hidePhotocenter(){

    let switx2 = document.getElementById("flexSwitchCheckDefault2");
    
    if (switx2.checked){
        photocenter.style.display = "block";
    } else {
        photocenter.style.display = "none";
    }

    console.log(switx2);
}
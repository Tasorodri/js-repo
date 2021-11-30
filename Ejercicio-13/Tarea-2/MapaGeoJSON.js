class GEOJSONManager {
    constructor (){
        this.info;
        this.map;
        this.rutas;
    }
    processFile(files ) {
        var archivo = files[0];

        var lector =  new FileReader();

        lector.onloadend = function () {
            var datos = JSON.parse(lector.result);

            for(var i = 0 ; i < datos.features.length; i++){
                var coordenadas = datos.features[i].geometry.coordinates;
                var name = datos.features[i].properties.name;
                var punto = new Object();
                console.log(coordenadas)
                punto.lat = parseFloat(coordenadas[0][1]);                        
                punto.lng = parseFloat(coordenadas[0][0]);
                console.log(punto)
                var marker = new google.maps.Marker({
                    position: punto,
                    title: name
                  });
                marker.setMap(manager.map);           
            }
        }  
        lector.readAsText(archivo); 
    }    

    initialize() {

        var oviedo = new google.maps.LatLng(43.3503, -5.84376,0 );
        var mapOptions = {
            zoom: 9,
            napTypeId: "terrain",
            center: oviedo
        };
        this.map = new google.maps.Map(document.getElementById("mapa"), mapOptions);

        
    }


}
manager = new GEOJSONManager();

//var cal =  new Calculadora();
//cal.escribe();
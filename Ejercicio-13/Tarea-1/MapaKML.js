"use strict";
class kmlManager {
    constructor (){
        this.info;
        this.map;
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


    processFile(archivos) {
        var archivo = archivos[0];
        var lector =  new FileReader();

        lector.onloadend = function () {

            //parseamos el documento
            var placemarks = $(lector.result).find("Placemark");
            for(var i = 0 ; i < placemarks.length; i++){
                var coordenadas = $(placemarks).find("coordinates")[i].innerText;
                var name = $(placemarks).find("name")[i].innerText;
                var desc = $(placemarks).find("description")[i];
                var punto = new Object();
                var splitCoord = coordenadas.split(",");
                console.log(splitCoord)
                punto.lat = parseFloat(splitCoord[1]);                        
                punto.lng = parseFloat(splitCoord[0]);
                 
                var marker = new google.maps.Marker({
                    position: punto,
                    title: name
                  });
                marker.setMap(manager.map);          
            }
        }  
        lector.readAsText(archivo);
    } 

    loadScript(){
        $("#footer").append("<script async defer src=\"https://maps.googleapis.com/maps/api/js?key=AIzaSyC6j4mF6blrc4kZ54S6vYZ2_FpMY9VzyRU&callback=manager.initialize\"></script>  ");
    }

   
}
var manager = new kmlManager();
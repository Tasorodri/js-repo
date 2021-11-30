class MapaHandler {
    constructor (){
        this.map;
        this.key = "AIzaSyBqURIIoOTwpK1OzrYeUEWQYSGfhHBN-3w";
        this.flickrAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
        this.consulta = "";
    }


    initialize() {
        var paris = new google.maps.LatLng( 40,  0);
        var mapOptions = {
        zoom: 3,
        center: paris
        };
        this.map = new google.maps.Map(document.getElementById('mapa'), mapOptions);

        
    }

    getCentro(){
        console.log(this.map)
        return this.map.getCenter();
    }


   
    marcador(){
        console.log()
        var lat  = document.getElementById("lat").value * 1;
        var long = document.getElementById("long").value * 1; 
        var marcador = {lat: lat, lng: long};
        var marcador = new google.maps.Marker({position:marcador,map:this.map});

    }
 



    addKeyword(keyw){
        if(keyw ==""){
            return;
        }
        if(this.consulta.includes(keyw))
            return;
        this.consulta = this.consulta + ","+keyw;
        var idbtn = "btn" +keyw;
        $("#keywords").append("<p class : 'tag'> -" + keyw +"<p/>");
        $("#textInput").val("");
        
    }

    getValue(id) {
        return $("#" + id).val()
    }

    removekeywords(){
        this.consulta = "";
        $("#keywords").empty();
    }
    removeImages(){
        $("#imagenes").empty();
    }

    fullScreen(){
        document.getElementById("mapa").requestFullscreen();
    }


}
mapa = new MapaHandler();

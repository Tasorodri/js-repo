class MapaHandler {
    constructor (){
        this.map;
        this.key = "AIzaSyBqURIIoOTwpK1OzrYeUEWQYSGfhHBN-3w";
        navigator.geolocation.getCurrentPosition(this.getPosicion.bind(this), this.verErrores.bind(this));
    }


    getPosicion(posicion){
        this.longitud         = posicion.coords.longitude; 
        this.latitud          = posicion.coords.latitude;  

    }

    verErrores(error){
        switch(error.code) {
        case error.PERMISSION_DENIED:
            this.mensaje = "El usuario no permite la petición de geolocalización"
            break;
        case error.POSITION_UNAVAILABLE:
            this.mensaje = "Información de geolocalización no disponible"
            break;
        case error.TIMEOUT:
            this.mensaje = "La petición de geolocalización ha caducado"
            break;
        case error.UNKNOWN_ERROR:
            this.mensaje = "Se ha producido un error desconocido"
            break;
        }
    }
    getLongitud(){
        return this.longitud;
    }
    getLatitud(){
        return this.latitud;
    }
    initialize() {
        navigator.geolocation.getCurrentPosition(this.getPosicion.bind(this), this.verErrores.bind(this));
        var paris = new google.maps.LatLng( 40,  0);
        var mapOptions = {
        zoom: 6,
        center: paris
        };
        this.map = new google.maps.Map(document.getElementById('mapa'), mapOptions);
        this.centrar()
        
    }
    centrar(){
        var pos = new google.maps.LatLng( this.latitud,   this.longitud);
        this.marcador = new google.maps.Marker({position:pos,map:this.map});
        this.map.panTo(pos);

    }
}
map = new MapaHandler();

class meteoHandler {
    constructor(){
        
        this.apikey = "47b790fd0fc41878c80c57c9846132cb";
        this.unidades = "&units=metric";
        this.idioma = "&lang=es";        
    }

    
    generate(city){
        this.ciudad = city;
        this.url = "http://api.openweathermap.org/data/2.5/weather?q=" + this.ciudad +",ES"+ this.unidades + this.idioma + "&APPID=" + this.apikey;
        this.error = "<h2>¡problemas! No puedo obtener información de <a href='http://openweathermap.org'>OpenWeatherMap</a></h2>";
        this.cargarDatos()
    }
    cargarDatos(){
        
        $.ajax({
            dataType: "json",
            url: this.url,
            method: 'GET',
            success: this.procesaDatos,
            error:function(){
               $("#content").append(localerror);    
            }
        });
    }

    procesaDatos(data){
        var iconcode = data.weather[0].icon;
       var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
        $("#content").empty();
        $("#content").append("<h3>Resumen:</h2>");
        $("#content").append("<h3>" + data.name + " " + data.main.temp+ " " + data.weather[0].description + "<div id=\"icon\"><img id=\"wicon\" src=\"\" alt=\"Weather icon\" </h2>");
        $("#content").append("<h3>Mas informacion:</h2>");
       $("#content").append("<p>Ciudad: " + data.name + ", " +data.sys.country + "</p>");
       $("#content").append("<p>Coordenadas (lat,long): " + data.coord.lat + ", " + data.coord.lon + " grados</p>");
       $("#content").append("<p>Temperatura: " + data.main.temp + " ºC " + " maxima: " + data.main.temp_max + "ºC minima: " + data.main.temp_min +" ºC  </p>");
       $("#content").append("<p>Presión: " + data.main.pressure + " hPa, Humedad: " + data.main.humidity + "% </p>");
       $("#content").append("<p>Amanece a las: " + new Date(data.sys.sunrise *1000).toLocaleTimeString() + "</p>"); 
       $("#content").append("<p>Oscurece a las: " + new Date(data.sys.sunset *1000).toLocaleTimeString() + "</p>"); 
       $("#content").append("<p>Viento: Velocidad " + data.wind.speed + "direccion: " + data.wind.deg + "  grados</p>");
       $("#content").append("<p>Medido a las: " + new Date(data.dt *1000).toLocaleTimeString() + " del: " +new Date(data.dt *1000).toLocaleDateString() + "</p>");
       $('#wicon').attr('src', iconurl);
       $("#content").append("<p>Visibilidad: " + data.visibility + " metros</p>");
       $("#content").append("<p>Nubosidad: " + data.clouds.all + " %</p>");
    }
 
      
    
}


meteoH = new meteoHandler();
//var cal =  new Calculadora();
//cal.escribe();
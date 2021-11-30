class Meteo {
    constructor(){
        this.apikey = "47b790fd0fc41878c80c57c9846132cb";
        this.tipo = "&mode=xml";
        this.unidades = "&units=metric";
        this.idioma = "&lang=es";
        this.url = "http://api.openweathermap.org/data/2.5/weather?q=" + this.ciudad +",ES"+ this.tipo + this.unidades + this.idioma + "&APPID=" + this.apikey;
        this.correcto = "¡Todo correcto! XML recibido de <a href='http://openweathermap.org/'>OpenWeatherMap</a>"
    }

    generate(city){
        this.ciudad = city;
        this.url = "http://api.openweathermap.org/data/2.5/weather?q=" + this.ciudad +",ES"+ this.tipo + this.unidades + this.idioma + "&APPID=" + this.apikey;
        this.cargarDatos()
    }
    cargarDatos(){
        $.ajax({
            dataType: "xml",
            url: this.url,
            method: 'GET',
            success: function(datos){
                
                    //Presentación del archivo XML en modo texto
                    $("h5").text((new XMLSerializer()).serializeToString(datos));
                
                    //Extracción de los datos contenidos en el XML
                    var totalNodos            = $('*',datos).length; // cuenta los elementos de XML: son los nodos del árbol DOM de XML
                    var ciudad                = $('city',datos).attr("name");
                    var longitud              = $('coord',datos).attr("lon");
                    var latitud               = $('coord',datos).attr("lat");
                    var pais                  = $('country',datos).text();
                    var amanecer              = $('sun',datos).attr("rise");
                    var minutosZonaHoraria    = new Date().getTimezoneOffset();
                    var amanecerMiliSeg1970   = Date.parse(amanecer);
                        amanecerMiliSeg1970  -= minutosZonaHoraria * 60 * 1000;
                    var amanecerLocal         = (new Date(amanecerMiliSeg1970)).toLocaleTimeString("es-ES");
                    var oscurecer             = $('sun',datos).attr("set");          
                    var oscurecerMiliSeg1970  = Date.parse(oscurecer);
                        oscurecerMiliSeg1970  -= minutosZonaHoraria * 60 * 1000;
                    var oscurecerLocal        = (new Date(oscurecerMiliSeg1970)).toLocaleTimeString("es-ES");
                    var temperatura           = $('temperature',datos).attr("value");
                    var temperaturaMin        = $('temperature',datos).attr("min");
                    var temperaturaMax        = $('temperature',datos).attr("max");
                    var temperaturaUnit       = $('temperature',datos).attr("unit");
                    var humedad               = $('humidity',datos).attr("value");
                    var humedadUnit           = $('humidity',datos).attr("unit");
                    var presion               = $('pressure',datos).attr("value");
                    var presionUnit           = $('pressure',datos).attr("unit");
                    var velocidadViento       = $('speed',datos).attr("value");
                    var nombreViento          = $('speed',datos).attr("name");
                    var direccionViento       = $('direction',datos).attr("value");
                    var codigoViento          = $('direction',datos).attr("code");
                    var nombreDireccionViento = $('direction',datos).attr("name");
                    var nubosidad             = $('clouds',datos).attr("value");
                    var nombreNubosidad       = $('clouds',datos).attr("name");
                    var visibilidad           = $('visibility',datos).attr("value");
                    var precipitacionValue    = $('precipitation',datos).attr("value");
                    var precipitacionMode     = $('precipitation',datos).attr("mode");
                    var descripcion           = $('weather',datos).attr("value");
                    var horaMedida            = $('lastupdate',datos).attr("value");
                    var horaMedidaMiliSeg1970 = Date.parse(horaMedida);
                        horaMedidaMiliSeg1970 -= minutosZonaHoraria * 60 * 1000;
                    var horaMedidaLocal       = (new Date(horaMedidaMiliSeg1970)).toLocaleTimeString("es-ES");
                    var fechaMedidaLocal      = (new Date(horaMedidaMiliSeg1970)).toLocaleDateString("es-ES");
                    var descripcion      = $('weather',datos).attr("value");

                    var iconcode = $('weather',datos).attr("icon");
                    var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
                    $("#content").empty();
                    $("#content").append("<h3>Resumen:</h2>");
                    $("#content").append("<h3>" + ciudad + " " + temperatura+ " " + descripcion + "<div id=\"icon\"><img id=\"wicon\" src=\"\" alt=\"Weather icon\" </h2>");
                    $('#wicon').attr('src', iconurl);
                    $("#content").append("<h3>Mas informacion:</h2>");
                    $("#content").append("<p>Ciudad: " + ciudad + ", " +pais + "</p>");
                    $("#content").append("<p>Coordenadas (lat,long): " + latitud + ", " + longitud + " grados</p>");
                    $("#content").append("<p>Temperatura: " + temperatura + " ºC " + " maxima: " + temperaturaMax + "ºC minima: " + temperaturaMin +" ºC  </p>");
                    $("#content").append("<p>Presión: " + presion + +" " +presionUnit +", Humedad: " + humedad + " " + humedadUnit + "</p>");
                    $("#content").append("<p>Amanece a las: " + amanecerLocal + "</p>"); 
                    $("#content").append("<p>Oscurece a las: " + oscurecerLocal + "</p>"); 
                    $("#content").append("<p>Viento: " + nombreViento +", Velocidad: " + velocidadViento + "direccion: " + direccionViento + "  grados</p>");
                    $("#content").append("<p>Medido a las: " + horaMedidaLocal + " del: " +fechaMedidaLocal + "</p>");                    
                    $("#content").append("<p>Visibilidad: " + visibilidad + " metros</p>");
                    $("#content").append("<p>Nubosidad: " + nubosidad + " %</p>");
                                   
                },
            error:function(){
                $("h3").html("¡Tenemos problemas! No puedo obtener XML de <a href='http://openweathermap.org'>OpenWeatherMap</a>"); 
                $("h4").remove();
                $("h5").remove();
                $("p").remove();
                }
        });
    }
    crearElemento(tipoElemento, texto, insertarAntesDe){
        // Crea un nuevo elemento modificando el árbol DOM
        // El elemnto creado es de 'tipoElemento' con un 'texto' 
        // El elemnto se coloca antes del elemnto 'insertarAntesDe'
        var elemento = document.createElement(tipoElemento); 
        elemento.innerHTML = texto;
        $(insertarAntesDe).before(elemento);
    }
}

var meteo = new Meteo();

//var cal =  new Calculadora();
//cal.escribe();
class FileLoader {
    constructor (){
        this.map;
        this.key = "AIzaSyBqURIIoOTwpK1OzrYeUEWQYSGfhHBN-3w";
    }

    precessFile() {
        var nBytes = 0,
        archivos = document.getElementById("subirArchivos").files,
        nArchivos = archivos.length;
        for (var i = 0; i < nArchivos; i++) {
            nBytes += archivos[i].size;
        }
        var nombresTiposTamaños="";
        for (var i = 0; i < nArchivos; i++) {
            nombresTiposTamaños += "<p id = 'p" + i + "'>Archivo[" + i +"] = "+ archivos[i].name  + " Tamaño: " + archivos[i].size +" bytes " + " Tipo: " + archivos[i].type+"</p>" ;
            var tipoTexto = /text.*/;
            if(archivos[i].type == "text/json" || archivos[i].type == "application/json" || archivos[i].type == "text/xml" || archivos[i].type == "text/plain"){
               this.vuelcaContenido(archivos[i]);
            }
        }
        
        document.getElementById("numero").innerHTML = nArchivos;
        document.getElementById("tamaño").innerHTML = nBytes + " bytes";
        document.getElementById("nombres").innerHTML = nombresTiposTamaños;        
    }
    vuelcaContenido(archivo, i){
       
        var nombre = document.getElementById("nombreArchivo");
        var tamaño = document.getElementById("tamañoArchivo");
        var tipo = document.getElementById("tipoArchivo");
        var ultima = document.getElementById("ultimaModificacion");
        var contenido = document.getElementById("contenidoArchivo");
        var areaVisualizacion = document.getElementById("areaTexto");
        contenido.innerText="Contenido del archivo \"" + archivo.name + "\": ";
        var lector = new FileReader();
        lector.onload = function (evento) {
          //El evento "onload" se lleva a cabo cada vez que se completa con éxito una operación de lectura
          //La propiedad "result" es donde se almacena el contenido del archivo
          //Esta propiedad solamente es válida cuando se termina la operación de lectura
          areaVisualizacion.innerText = lector.result;
          }      
        lector.readAsText(archivo);

        }
}

loader = new FileLoader();
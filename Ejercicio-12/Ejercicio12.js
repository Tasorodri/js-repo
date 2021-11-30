class FileLoader {
    constructor (){
        this.map;
        this.key = "AIzaSyBqURIIoOTwpK1OzrYeUEWQYSGfhHBN-3w";
    }

    precessFile(archivos) {
        $("main").empty()
        var nBytes = 0,
        nArchivos = archivos.length;
        for (var i = 0; i < nArchivos; i++) {
            nBytes += archivos[i].size;
        }
        $("main").append("<p>Numero de archivos: "+ nArchivos + " </p>")
        $("main").append("<p>Numero total de bytes: "+ nBytes + " </p>")
        var nombresTiposTamaños="";
        for (var i = 0; i < nArchivos; i++) {
            nombresTiposTamaños += "<p id = 'p" + i + "'>Archivo[" + i +"] = "+ archivos[i].name  + " Tamaño: " + archivos[i].size +" bytes " + " Tipo: " + archivos[i].type+"</p>" ;
            var tipoTexto = /text.*/;
            if(archivos[i].type == "text/json" || archivos[i].type == "application/json" || archivos[i].type == "text/xml" || archivos[i].type == "text/plain"){
               this.vuelcaContenido(archivos[i]);
            }
        }
        $("main").append(nombresTiposTamaños)    
    }
    vuelcaContenido(archivo, i){
        var lector = new FileReader();
        lector.onloadend = function (evento) {
            $("main").append("<p>Contenido del archivo \"" + archivo.name + "\": </p>");            
            $("main").append("<div id =  \'" +archivo.name + "\'> " + String(lector.result) + " </div>") 
            document.getElementById(archivo.name).innerText = lector.result
          }      
        lector.readAsText(archivo);   

        }
}

loader = new FileLoader();
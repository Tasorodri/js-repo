class jqueryHandler {
    constructor(){
        this.masc = true;
    }

    mostrar(){
            $(document);
            $("p").show();
    }

    ocultar(){
        $(document);
        $("p").hide();
    }

    setText(id, text){
        $("#" + id).text(text);

    }
    getValue(id) {
        return $("#" + id).val()
    }
    writeName(){
        this.alternateGender();
        this.alternateGender();
    }
    after(text){
        $("#addZone").after("<p id = \"added\">"+text+"</p>");
    }
    remove(text){
        $("#"+text).remove();
    }
    alternateGender(){
        if(this.masc){
            $("#cabeceraNombre").text("Nombre de la Alumna: " +  $("#campoNombre").val());
            this.masc = false;
        }
        else{
            $("#cabeceraNombre").text("Nombre del Alumno: " +  $("#campoNombre").val());
            this.masc = true;
        }
    }

    recorrerHtml(){
        var text = " ";
        $("*", document.body).each(function() {
            var etiquetaPadre = $(this).parent().get(0).tagName;
            text = text + "<p>" + "Etiqueta padre : "  + etiquetaPadre + " elemento : " + $(this).get(0).tagName +" id: " +$(this).get(0).id + "</p>";
        });
        $("#arbol").append(text);
    }

    sumar(){
        var sum = 0; 
        $("table td").each( function(){
            sum += Number.parseInt($(this).text());
        });
        $("#suma").text("La suma de las filas y columnas es: " + sum);
    }

    
}

qhandler = new jqueryHandler();
//var cal =  new Calculadora();
//cal.escribe();
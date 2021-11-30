class Prize {
   
    constructor(){
        this.flickrAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
        this.urlToSearch = "https://apidatos.ree.es/es/datos/mercados/precios-mercados-tiempo-real?start_date=2021-11-22T00:00&end_date=2021-11-22T23:59&time_trunc=hour"
        this.consulta = "";
    }


    cargarInfo(){
        var dateI = "2021-11-22"
        this.urlToSearch = "https://apidatos.ree.es/es/datos/mercados/precios-mercados-tiempo-real?start_date=" + dateI +"T00:00&end_date="+ dateI +"T23:59&time_trunc=day"

        $.getJSON(this.urlToSearch, 
            {
                tags: this.consulta,
                tagmode: multi,
                format: "json",
                geo_context: lugar
            }).done(function(data) {
                    $.each(data.items, function(i,item ) {
                        $("<img class = 'flickimg' width='200' height='200'>").attr( "src", item.media.m).appendTo( "#imagenes" );
                        if ( i === 15 ) {
                                return false;
                                }
                    });
        });
    }
    cargarPreciosHora(){
        $("#content").empty();
        
        var date = $("input[type=date]").val();
        console.log(date)
        this.urlToSearch = "https://apidatos.ree.es/es/datos/mercados/precios-mercados-tiempo-real?start_date=" +date+"T00:00&end_date="+date+"T23:59&time_trunc=hour"
        $.getJSON(this.urlToSearch, 
            {
            }).done(function(data) {
                var atributos = data.included[0].attributes
                console.log(data)
                $("#content").append("<table> <thead>   <tr> <th>Hora</th><th>Precio(€/mw-h)</th>   </tr> </thead> <tbody> </tbody></table>");
                $.each(atributos.values, function(i,item ) {
                    var date = item.datetime.substring(11,16)
                    $("tbody").append("<tr><td>"+date+"</td><td>"+item.value+"</td></tr>")
                });
        });
    }

    cargarPreciosMes(){
        $("#content").empty();
        
        var date = $("input[type=date]").val();
        var dateI = date.substring(0,8) + "00"
        this.urlToSearch = "https://apidatos.ree.es/es/datos/mercados/precios-mercados-tiempo-real?start_date=" +dateI+"T20:00&end_date="+date+"T23:59&time_trunc=hour"
        console.log(this.urlToSearch)
        $.getJSON(this.urlToSearch, 
            {
            }).done(function(data) {
                var atributos = data.included[0].attributes
                console.log(data)
                console.log($())
                $("#content").append("<table> <thead> <tr> <th>Hora</th><th>Precio(€ kw-h)</th> </tr> </thead> <tbody> </tbody></table>");
                $.each(atributos.values, function(i,item ) {
                    var date = $(":input")[0];
                    console.log(date)
                    //$("<img class = 'flickimg' width='200' height='200'>").attr( "src", item.media.m).appendTo( "#imagenes" );
                    $("tbody").append("<tr><td>"+i+"</td><td>"+item.value+"</td></tr>")

                });
        });
    }




    


}

var buscador = new Prize();

//var cal =  new Calculadora();
//cal.escribe();
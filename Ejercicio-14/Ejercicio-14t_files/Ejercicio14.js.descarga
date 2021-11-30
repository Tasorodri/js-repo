class Chess {
    constructor (){
        this.loadBoard();
    }

    loadBoard(){
        
        $("#juego").empty();
        var string = "<table id = 'tablero'>";

        for(var i = 0; i< 8; i++){
            string += "<tr >";
            for(var j = 0; j<8; j++){
                string += "<td ondrop='chess.drop(event)' id = "+(j +1)+''+(i+1) +" ondragover='chess.allowDrop(event)'></td>";
            }
            string += "</tr>";
        }
    
        string += "</table>"; 
        $("#juego").append(string); 
        this.loadFichas();
        

    }

    loadFichas(){
        //cargamos los peones
        for(var i = 1; i<9 ; i++){            
        $("#"+i +"7").append("<img class = 'ficha' id= 'pb"+i +"7' src='./img/cPeonB.png' draggable='true' ondragstart='chess.drag(event)' width='70' height='70'></img>");
        $("#"+i +"2").append("<img class = 'ficha' id='pn"+i +"2' src='./img/cPeonN.png' draggable='true' ondragstart='chess.drag(event)' width='70' height='70'></img>");
        }

        //fichas negras
        //torre negra
        $("#11").append("<img class = 'ficha' id='tn11' src='./img/cTorreN.png' draggable='true' ondragstart='chess.drag(event)' width='70' height='70'></img>");
        $("#81").append("<img class = 'ficha' id='tn18' src='./img/cTorreN.png' draggable='true' ondragstart='chess.drag(event)' width='70' height='70'></img>");

        //caballo negro
        $("#21").append("<img class = 'ficha' id='cn12' src='./img/cCaballoN.png' draggable='true' ondragstart='chess.drag(event)' width='70' height='70'></img>");
        $("#71").append("<img class = 'ficha' id='cn17' src='./img/cCaballoN.png' draggable='true' ondragstart='chess.drag(event)' width='70' height='70'></img>");

        //alfil negro
        $("#31").append("<img class = 'ficha' id='an13' src='./img/cAlfilN.png' draggable='true' ondragstart='chess.drag(event)' width='70' height='70'></img>");
        $("#61").append("<img class = 'ficha' id='an16' src='./img/cAlfilN.png' draggable='true' ondragstart='chess.drag(event)' width='70' height='70'></img>");

        //reina rey negro
        $("#41").append("<img class = 'ficha' id='qn' src='./img/cReinaN.png' draggable='true' ondragstart='chess.drag(event)' width='70' height='70'></img>");
        $("#51").append("<img class = 'ficha' id='kn' src='./img/cReyN.png' draggable='true' ondragstart='chess.drag(event)' width='70' height='70'></img>");

        //fichas blancas
        //torre blanca
        $("#18").append("<img class = 'ficha' id='tb81' src='./img/cTorreB.png' draggable='true' ondragstart='chess.drag(event)' width='70' height='70'></img>");
        $("#88").append("<img class = 'ficha' id='tb88' src='./img/cTorreB.png' draggable='true' ondragstart='chess.drag(event)' width='70' height='70'></img>");

        //caballo blanco
        $("#28").append("<img class = 'ficha' id='cb82' src='./img/cCaballoB.png' draggable='true' ondragstart='chess.drag(event)' width='70' height='70'></img>");
        $("#78").append("<img class = 'ficha' id='cb87' src='./img/cCaballoB.png' draggable='true' ondragstart='chess.drag(event)' width='70' height='70'></img>");

        //alfil blanco
        $("#38").append("<img class = 'ficha' id='ab83' src='./img/cAlfilB.png' draggable='true' ondragstart='chess.drag(event)' width='70' height='70'></img>");
        $("#68").append("<img class = 'ficha' id='ab86' src='./img/cAlfilB.png' draggable='true' ondragstart='chess.drag(event)' width='70' height='70'></img>");

        //reina rey blanco
        $("#48").append("<img class = 'ficha' id='qb' src='./img/cReinaB.png' draggable='true' ondragstart='chess.drag(event)' width='70' height='70'></img>");
        $("#58").append("<img class = 'ficha' id='kb' src='./img/cReyB.png' draggable='true' ondragstart='chess.drag(event)' width='70' height='70'></img>");
        
    }

    allowDrop(ev) {
        ev.preventDefault();
    }

    drag(ev) {
        ev.dataTransfer.setData("text", ev.target.id);
    }

    drop(ev) {
        $("#"+ ev.target.id).empty();
        ev.preventDefault();
        var data = ev.dataTransfer.getData("text");
        
        if(ev.target.id === "kn"){
            
            alert( "Ganan Las Blancas");
        }
        else if(ev.target.id === "kb"){
            
            alert( "Ganan Las Negras");
        }
        ev.target.src = document.getElementById(data).src;
        $("#data").empty();
        ev.target.appendChild(document.getElementById(data));
    }

    saveData(){
        var save = $("#juego").html();
        localStorage.setItem("partida",save);
        alert(localStorage.getItem("partida"))
    }
    loadSave(){
        $("#juego").empty();
        alert(localStorage.getItem("partida"));
        $("#juego").append(localStorage.getItem("partida"));
    }

    fullScreen(){
        document.getElementById("tablero").requestFullscreen();
    }
  
}
    
var chess = new Chess();
chess.loadBoard()
//var cal =  new Calculadora();
//cal.escribe();
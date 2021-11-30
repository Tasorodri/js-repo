"use strict";
class CalculadoraBasica {

    
    constructor (){
        this.pantalla = ""; //texto en la pantalla 
        this.numberBuffer = "" //para almacenar lo que meteremos como un Number
        this.calculatorBuffer = ""  //almacenamos lo mismo que en pantalla pero usando Number para guardarlo, es lo que le pasaremos a eval
        this.memoria = ""; //memoria de la calculadora 
        this.escucharTeclas();
    }

    escucharTeclas(){
        document.addEventListener('keydown', (event) => {
            const keyName = event.key;
            if(isFinite(keyName)){
                this.dígitos(keyName);
            }
            else if (keyName == "+"){
                this.suma()
            }
            else if (keyName == "-"){
                this.resta()
            }
            else if (keyName == "*"){
                this.multiplicación()
            }
            else if (keyName == "/"){
                this.división()
            }
            else if (keyName == "="){
                this.igual()
            }
            else if (keyName == "."){
                this.punto()
            }
            else if (keyName == "c"){
                this.borrar()
            }
          });
    }

    /*
    * añade un digito a la pantalla y al buffer
    */
    dígitos(digito){ 
        this.pantalla += digito; 
        this.numberBuffer += digito;
        this.actualizar(); 
    }

    /*
    * Añade un punto decimal a la pantalla
    */
    punto(){
        this.pantalla += "."; 
        this.numberBuffer += ".";
        this.actualizar();       
    }

    /*
    * se encarga de hacer las operacions
    */
    operation(symbol){        
        this.pantalla += symbol
        if(this.numberBuffer != '')
            this.calculatorBuffer += Number(this.numberBuffer);
        this.calculatorBuffer += symbol;
        this.numberBuffer = "";
        this.actualizar();
    }

    /*
    * Añade el símbolo de suma a la pantalla
    */
    suma(){ 
        this.operation("+")  
    }

    /*
    * Añade el símbolo de resta a la pantalla
    */
    resta(){
        this.operation("-")     
    }

    /*
    * Añade el símbolo de multiplicación a la pantalla 
    */
    multiplicación(){
        this.operation("*")      
    }

    /*
    * Añade el símbolo de división a la pantalla 
    */
    división(){
        this.operation("/")      
    }

    /*
    * Añade a la pantalla el valor acumulado en memoria  
    */
    mrc(){ 
        this.pantalla = ""
        this.pantalla += this.memoria; 
        this.numberBuffer = "";
        this.calculatorBuffer = this.memoria;
        this.actualizar(); 
        this.memoria = ""
    }

    /*
    * Resta el numero en pantalla a la memoria. Si hay una operacion en pantalla se hará primero
        Resetea la pantalla
    */
    mMenos(){ 
        this.igual(); 
        if(this.pantalla.charAt(0) == "-"){ //Menos y menos es más 
            this.memoria += "+" + this.pantalla.substring(1,this.pantalla.length); 
        }
        else{ //Menos y más es menos 
            this.memoria += "-"; 
            this.memoria += this.pantalla;
        }
        try{ //Se controla si no se inserta en memoria nada malicioso
            this.memoria = eval(this.memoria); 
            this.actualizar();  
        }
        catch{
            document.getElementById("screen").value = "Error de sintáxis";
            this.pantalla = ""; 
            this.memoria = ""; 
        }
         
    }

    /*
    * Suma el numero o operacion en pantalla a la memoria
    */
    mMas(){
        this.igual();
        this.memoria += "+"; 
        this.memoria += Number(this.calculatorBuffer); 
        try{ //comprobamos errores de sintaxis
            this.memoria = eval(this.memoria); 
            this.actualizar();  
        }
        catch{
            document.getElementById("screen").value = "Error de sintáxis";
            this.pantalla = ""; 
            this.memoria = ""; 
        }
    }

    /*
    * Se limpia la memoria y la pantalla 
    */
    borrar(){ 
       this.pantalla = "";
       this.memoria = "";  
       this.numberBuffer = ""
       this.calculatorBuffer = ""
       this.actualizar(); 
       this.PuedeIgual = false;
    }

    /*
    * Hacemos el calculo, tenemos que meter el ultimo numero en el buffer (si hay) como Number
    * 
    */
    igual(){
        var lastNumber = Number(this.numberBuffer);
        if(this.numberBuffer != ''){
            this.calculatorBuffer += lastNumber
        }  
        console.log(this.calculatorBuffer) 
        console.log(this.pantalla)       
        this.numberBuffer = ""
        try{ //Se prueba a realizar la operación 
            this.pantalla = "" + eval(this.calculatorBuffer);
            this.calculatorBuffer = "" + this.pantalla;
            this.actualizar();  
            console.log(this.calculatorBuffer) 
            console.log(this.pantalla) 
        }catch(error){ //Si error de sintaxis 
            document.getElementById("screen").value = "Error de sintáxis";
            this.pantalla = ""; 
            this.memoria = ""; 
        }
    }

    /*
    * Actualiza el contenido de la pantalla 
    */
    actualizar(){ 
        document.getElementById("screen").value = this.pantalla;
    }

    /*
    * borra el contenido de la pantalla (y el buffer)
    */
   borrarPantalla(){ 
    this.pantalla = ""; 
    this.calculatorBuffer = "";
    this.actualizar();
    }

}

var calculadora = new CalculadoraBasica(); 

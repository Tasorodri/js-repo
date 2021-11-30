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
                this.digitos(keyName);
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
    digitos(digito){ 
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
    * Añade a la pantalla el valor acumulado en memoria y borra la memoria
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
            this.calculatorBuffer = "";
            this.numberBuffer = ""
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
    * Hacemos el calculo, tenemos que meter el ultimo numero en el buffer como Number
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

class CalculadoraCientifica extends CalculadoraBasica {
    
    constructor (){
        super(); //LLama al constructo de la super clase
        this.modoShift = false;
    }


    /**
     * No borra la memoria
     */
    borrarEntry(){ 
        this.pantalla = "";
        this.numberBuffer = ""
        this.calculatorBuffer = ""
        this.actualizar(); 
        this.PuedeIgual = false;
     }

     /**
      * pi o E en funcion del shift
      */
    pi(){
        if(this.modoShift){
            this.operation(Math.E)

        }
        else{
            this.operation(Math.PI)
        }
    }


    /*
    * Añade un paréntesis abierto a la pantalla   
    */
    parentesisLeft(){
        this.operation("(")
    }

    /*
    * Añade un paréntesis cerrado a la pantalla   
    */
    parentesisRight(){
        this.operation(")")
    }
  
    /*
    * Realiza el logaritmo neperiano ( en base 10) de lo que está actualmente en pantalla.
    * Si la pantalla tiene una expresión , primero se evalua 
    */
    logaritmoNeperiano(){
        this.igual()
        if(this.modoShift){
            this.calculatorBuffer = Math.log10(eval(this.pantalla)); 

        }
        else{
            this.calculatorBuffer = Math.log(eval(this.pantalla)); 
        }
        this.pantalla = this.calculatorBuffer 
        this.actualizar();   
    }


    /*
    * Realiza una potencia con base e y tomando como exponente el valor de la pantalla.
    * Si la pantalla tiene una expresión , primero se evalua
    */
    expo(){ 
        this.igual()
        this.calculatorBuffer = Math.exp(eval(this.pantalla)); 
        this.pantalla = this.calculatorBuffer 
        this.actualizar();    
    }

    /*
    * Realiza una potencia con base 10 y tomando como exponente el valor de la pantalla.
    * Si la pantalla tiene una expresión , primero se evalua
    */
    exponencial10(){
        this.igual()
        this.calculatorBuffer = Math.pow(10,eval(this.pantalla)); 
        this.pantalla = this.calculatorBuffer 
        this.actualizar();   
    }

    /*
    * Realiza la raíz cuadrada de lo que está actualmente en pantalla.
    * Si la pantalla tiene una expresión , primero se evalua 
    */
    raiz(){
        this.igual()
        this.calculatorBuffer = Math.sqrt(eval(this.pantalla)); 
        this.pantalla = this.calculatorBuffer 
        this.actualizar(); 
    }

    /*
    * Pide el segundo numero por pantalla
    */
    potencia(){
        this.igual()
        this.calculatorBuffer = Math.pow(eval(this.pantalla),prompt("Exponente:","0")); 
        this.pantalla = this.calculatorBuffer 
        this.actualizar();  
    }

    /*
    * Potencia base 2 o 3
    */
    potencia2(){
        if(this.modoShift){
            this.pantalla = "" + Math.pow(eval(this.pantalla),3); 

        }
        else{
            this.pantalla = "" + Math.pow(eval(this.pantalla),2);
        } 
        this.actualizar(); 
    }
 
    /*
    * calcula el seno o arcoseno de la pantalla
    */
    sin(){
        this.igual()
        if(this.modoShift){
            this.calculatorBuffer = Math.asin(this.calculatorBuffer);

        }
        else{
            this.calculatorBuffer = Math.sin(this.calculatorBuffer);

        }
        this.pantalla = this.calculatorBuffer
        this.actualizar();   
    }

    /*
    * coseno o arcoseno de la pantalla
    */
    coseno(){
        this.igual()
        if(this.modoShift){
            this.calculatorBuffer = Math.acos(this.calculatorBuffer);

        }
        else{
            this.calculatorBuffer = Math.cos(this.calculatorBuffer);

        }
        this.pantalla = this.calculatorBuffer
        this.actualizar();   
    }
 
  
    /*
    * tangente o arcotangente de la pantalla
    */
    tangente(){
        this.igual()
        if(this.modoShift){
            this.calculatorBuffer = Math.atan(this.calculatorBuffer);
            
        }
        else{
            this.calculatorBuffer = Math.tan(this.calculatorBuffer);

        }
        this.pantalla = this.calculatorBuffer
        this.actualizar();  
    }

    
    /*
    * calcula el valor absoluto
    */
    modulo(){
        this.igual()
        this.calculatorBuffer = Math.abs(this.calculatorBuffer);
        this.pantalla = this.calculatorBuffer 
        this.actualizar();   
    }

    
    /*
    * Elimina el último carácter introducido en la pantalla 
    * lo elimina tambien de los buffers para asegurar que funciona correctamente
    */
    atras(){
        this.pantalla = this.pantalla.substring(0,this.pantalla.length-1);         
        this.calculatorBuffer = this.calculatorBuffer.substring(0,this.calculatorBuffer.length-1); 
        this.numberBuffer = this.numberBuffer.substring(0,this.numberBuffer.length-1); 
        this.actualizar();   
    }

    mc(){
        this.memoria = "";
    }

    mc(){
        this.pantalla = this.memoria
        this.calculatorBuffer = Number(this.memoria)
        this.numberBuffer = ""
    }

    /**
     * revierte el signo
     */
    signo(){
        this.igual()
        this.calculatorBuffer = "-1*" + this.calculatorBuffer;
        this.igual()
    }

    /**
     * aalmacena en memoria el numero mostrado
     */
    ms(){
        this.igual();
        this.memoria = this.calculatorBuffer;
    }

    /**
     * factorial del numero en pantalla (tiene que ser entero)
     */
    factorial(){
        this.igual();
        try{
            var n  = Number(this.pantalla)
            var result = this.factorialRecursivo(n);
            console.log(result + "  D")
            this.calculatorBuffer = Number(result);
            this.pantalla = result
            this.actualizar()
        }
        catch{
            document.getElementById("screen").value = "Error de sintáxis";
            this.memoria = ""; 
            this.calculatorBuffer = "";
            this.numberBuffer = ""
        }
    }

    /**
     * calcula el factorial para el numero dado
     */
     factorialRecursivo(n) {
        console.log(n)
        if (n == 0){ 
            console.log(1)
            return 1; 
        }
        var result = n * this.factorialRecursivo(n-1);
        return result; 
    }

    /**
     * cambia las funciones
     */
    shift(){
        if(this.modoShift){
            this.modoShift = false;
            document.getElementById('sin').value = "sin";
            document.getElementById('cos').value = "cos";
            document.getElementById('tan').value = "tan";;
            document.getElementById('log').value = "log";
            document.getElementById('PI').value = "PI";
            document.getElementById('cuad').value = "x^2";
        }
        else{
            this.modoShift = true;
            document.getElementById('sin').value = "asin";
            document.getElementById('cos').value = "acos";
            document.getElementById('tan').value = "atan";
            document.getElementById('log').value = "log10";
            document.getElementById('PI').value = "E";
            document.getElementById('cuad').value = "x^3";
        }
    }
}

var calculadora = new CalculadoraCientifica(); 

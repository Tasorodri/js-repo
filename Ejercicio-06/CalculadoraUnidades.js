class CalculadoraRPN {
    constructor(){
        this.modoShift = false;
        this.pila = new Array();
        this.escucharTeclas()
    }

    escucharTeclas(){
        document.addEventListener('keydown', (event) => {
            const keyName = event.key;
            console.log(keyName);
            if(isFinite(keyName)){
                this.escribe(keyName);
            }
            else if (keyName == "+"){
                this.mas()
            }
            else if (keyName == "-"){
                this.menos()
            }
            else if (keyName == "*"){
                this.mult()
            }
            else if (keyName == "/"){
                this.div()
            }
            else if (keyName == "Enter"){
                this.enter()
            }
            else if (keyName == "."){
                this.escribe(keyName);
            }
            else if (keyName == "c"){
                this.reset()
            }
          });
    }
   
    sqrt(){
        this.calcula();
        document.getElementById('pantalla').value = Math.sqrt(document.getElementById('pantalla').value);
    }
    resetAll(){
        document.getElementById('pantalla').value = "";
        this.memory = 0;
    }

    factorial () {
        this.calcula()
        var total = 1; 
        var n = document.getElementById('pantalla').value;
        for (var i=1; i<=n; i++) {
            total = total * i; 
        }
        document.getElementById('pantalla').value = total;
    }
    push(valor){
        this.pila.push(valor);
    }
    pop(){
        return (this.pila.pop());
    }
    procesaPila(){
        //var stringPila = "<h2>Pila</h2>" + "<ul>";
        var stringPila  = "<ul>";
        for (var i in this.pila) stringPila += "<li>Pila[" + i + "] = " + this.pila[i] + "</li>";
        stringPila += "</ul>"
        return stringPila;
    }
    estadValid(num){
        var num = Number(num);
        if(Number(this.pila.length) < num){
            return false;
        }
        return true;
    }
    mostrar(){
        document.getElementById("pila").innerHTML = this.procesaPila();
        this.reset();
    }
    enter(){
        if(this.estadValid(11)){
            document.getElementById('pantalla').value = "Stack Error";
            return;
        }
        if(document.getElementById('pantalla').value === "Stack Error"){
            document.getElementById('pantalla').value = "";
            return;
        }
        if(document.getElementById('pantalla').value === ""){
            return;
        }
        this.push(document.getElementById('pantalla').value);
        this.mostrar();
    }

    escribe(numero){
        if(document.getElementById('pantalla').value === "Stack Error"){
            document.getElementById('pantalla').value = "";
            return;
        }
        document.getElementById('pantalla').value =document.getElementById('pantalla').value + numero;
     }
     reset(){
         document.getElementById('pantalla').value = "";
     }
    resetAll(){
        this.reset();
        this.pila = new Array();
        this.mostrar();
    }
    mas(){
        if(!this.estadValid(2)){
            document.getElementById('pantalla').value = "Stack Error";
            return;
        }
        var o1 = Number(this.pop());
        var o2 = Number(this.pop());
        this.push(o2+o1);
        this.mostrar();
    }
    menos(){
        if(!this.estadValid(2)){
            document.getElementById('pantalla').value = "Stack Error";
            return;
        }
        var o1 = Number(this.pop());
        var o2 = Number(this.pop());
        this.push(o2-o1);
        this.mostrar();
    }
    mult(){
        if(!this.estadValid(2)){
            document.getElementById('pantalla').value = "Stack Error";
            return;
        }
        var o1 = Number(this.pop());
        var o2 = Number(this.pop());
        this.push(o2*o1);
        this.mostrar();
    }
    div(){
        if(!this.estadValid(2)){
            document.getElementById('pantalla').value = "Stack Error";
            return;
        }
        var o1 = Number(this.pop());
        var o2 = Number(this.pop());
        this.push(o2/o1);
        this.mostrar();
    }
    log(){
        if(!this.estadValid(1)){
            document.getElementById('pantalla').value = "Stack Error";
            return;
        }
        var o1 = Number(this.pop());        
        this.push(Math.log(o1));
        this.mostrar();
    }
    exp(){
        if(!this.estadValid(1)){
            document.getElementById('pantalla').value = "Stack Error";
            return;
        }
        var o1 = Number(this.pop());        
        this.push(Math.exp(o1));
        this.mostrar();
    }
    cos(){
        if(!this.estadValid(1)){
            document.getElementById('pantalla').value = "Stack Error";
            return;
        }
        var o1 = Number(this.pop());        
        this.push(Math.cos(o1));
        this.mostrar();
    }
    sin(){
        if(!this.estadValid(1)){
            document.getElementById('pantalla').value = "Stack Error";
            return;
        }
        var o1 = Number(this.pop());        
        this.push(Math.sin(o1));
        this.mostrar();
    }
    tan(){
        if(!this.estadValid(1)){
            document.getElementById('pantalla').value = "Stack Error";
            return;
        }
        var o1 = Number(this.pop());        
        this.push(Math.tan(o1));
        this.mostrar();
    }
    pot(){
        if(!this.estadValid(2)){
            document.getElementById('pantalla').value = "Stack Error";
            return;
        }
        var o1 = Number(this.pop());
        var o2 = Number(this.pop());      
        this.push(o2**o1);
        this.mostrar();
    }
    cuad(){
        if(!this.estadValid(1)){
            document.getElementById('pantalla').value = "Stack Error";
            return;
        }
        var o1 = Number(this.pop());        
        this.push(o1**2);
        this.mostrar();
    }
    sqrt(){
        if(!this.estadValid(1)){
            document.getElementById('pantalla').value = "Stack Error";
            return;
        }
        var o1 = Number(this.pop());        
        this.push(Math.sqrt(o1));
        this.mostrar();
    }
    opu(){
        if(!this.estadValid(1)){
            document.getElementById('pantalla').value = "Stack Error";
            return;
        }
        var o1 = Number(this.pop());        
        this.push(-o1);
        this.mostrar();
    }
    inv(){
        if(!this.estadValid(1)){
            document.getElementById('pantalla').value = "Stack Error";
            return;
        }
        var o1 = Number(this.pop());        
        this.push(o1**(-1));
        this.mostrar();
    }


    
    
}

class CalculadoraUnidades extends CalculadoraRPN{
    
    constructor(){
        super()
        this.estado = "l";
    }

    

    long(){
        this.estado = "l";
        document.getElementById('v1').value = "m";
        document.getElementById('v2').value = "km";
        document.getElementById('v3').value = "milla";;
        document.getElementById('v4').value = "pie";
    }

    masa(){
        this.estado = "m";
        document.getElementById('v1').value = "kg";
        document.getElementById('v2').value = "libra";
        document.getElementById('v3').value = "ton";;
        document.getElementById('v4').value = "g";

    }

    tiempo(){
        this.estado = "t";
        document.getElementById('v1').value = "s";
        document.getElementById('v2').value = "min";
        document.getElementById('v3').value = "hora";;
        document.getElementById('v4').value = "dia";

    }

    volumen(){
        this.estado = "v";
        document.getElementById('v1').value = "l";
        document.getElementById('v2').value = "m^3";
        document.getElementById('v3').value = "onza";;
        document.getElementById('v4').value = "galon";

    }

    

    v1(){
        switch(this.estado){
            case 'l':                
                this.push("m")
                break;
            case 'm':
                this.push("kg")
                break
            case 't':
                this.push("s")
                break
            case 'v':
                this.push("lit")
                break
        }
        this.mostrar();
    }

    v2(){
        switch(this.estado){
            case 'l':                
                this.push("km")
                break;
            case 'm':
                this.push("lib")
                break
            case 't':
                this.push("min")
                break
            case 'v':
                this.push("m^3")
                break
        }
        this.mostrar();

    }

    v3(){
        switch(this.estado){
            case 'l':                
                this.push("mill")
                break;
            case 'm':
                this.push("ton")
                break
            case 't':
                this.push("h")
                break
            case 'v':
                this.push("oz")
                break
        }
        this.mostrar();

    }

    v4(){
        switch(this.estado){
            case 'l':                
                this.push("pie")
                break;
            case 'm':
                this.push("g")
                break
            case 't':
                this.push("dia")
                break
            case 'v':
                this.push("gal")
                break
        }
        this.mostrar();

    }

    /**
     * devuelve el valor de la unidad en funcion de la unidad base de esa magnitud
     * las magnitudes base no aparecen porque son siempre 1
     * */
     getUnitValue(unit){
        console.log(unit)
        switch(unit){
            case 'pie':
                return 0.3048
            case 'g':
                return 1000
            case 'dia':
                return 1/86400
            case 'gal':
                return 0.219969
            case 'oz':
                return 35.1951
            case 'ton':
                return 0.001
            case 'h':
                return 1/3600
            case 'min':
                return 1/60
            case 'km':
                return 0.001
            case 'lib':
                return 2.20462
            case 'm^3':
                return 0.001
            case 'mill':
                return 0.001
 
        }
        return 1
    }  

    

    convertir(){
        if(!this.estadValid(3)){
            document.getElementById('pantalla').value = "Stack Error";
            return;
        }
        var objetivo = this.getUnitValue(this.pop());
        var origen = this.getUnitValue(this.pop());
        var numero = Number(this.pop());
        this.push(objetivo*numero/origen);  //hacemos la conversion
        this.mostrar();

    }
}


var cal =  new CalculadoraUnidades();
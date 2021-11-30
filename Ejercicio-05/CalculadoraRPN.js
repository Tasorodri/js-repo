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


var cal =  new CalculadoraRPN();
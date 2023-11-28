$(document).ready(function() {

   let números = $(".valor");
   let operator = $(".operator");
   let resultado = "";

    números.each(function () {
        $(this).on("click", function(){
            resultado = $(".resultado").val()
            resultado = resultado + $(this).text();
            pintar(resultado)
        })
    });
-
    operator.each(function () {
        $(this).on("click", function(){
            resultado = $(".resultado").val()
            resultado = resultado + $(this).text();
            pintar(resultado)
        })
    });


    $(".realizador").on("click", function (){
        calcular();
    })

    $(".limpiar").on("click", function () {
        limpiar();
    })

})

function calcular() {
    let calculo = $(".resultado").val()

    $(".resultado").val(calcularExpresion(calculo))

}

function limpiar(){
    $(".resultado").val('')
}

function pintar(valor) {
    $(".resultado").val(valor)
}

function mostrarMensaje( mensaje) {
   alert(mensaje)
}

// Realización del parser manualmente

function calcularExpresion(expresion) {
    // Tokenizar la expresión
    const tokens = tokenize(expresion);

    // console.log(tokens)
    // Convertir la expresión en una estructura de árbol
    const arbol = construirArbol(tokens);
    console.log(arbol)
    // Evaluar la expresión a través del árbol
    const resultado = evaluarArbol(arbol);
    // console.log(resultado)
    return resultado;
}

function tokenize(expresion) {
    // Implementa la lógica de tokenización usando expresión regular
    // Divide la expresión en números, operadores y devuelve un array de tokens
    //Como observación, no contempla los números negativos
    return expresion.match(/[^\d()]+|[\d.]+/g);

}

function construirArbol(tokens) {
    // Implementar la lógica para convertir la expresión en una estructura de árbol
    // Se usa el algoritmo Shunting Yard para esto, pero lo vamos a aplicar en escala de los 4 operadores que ya tenemos
    // ['5', '+', '10', '*', '2', '-', '4']  => ['5','10','x','+','4','-']
    let operators = [];
    let resultado = [];
    tokens.forEach(element => {
        if(esNumero(element)){
            resultado.push(element)
        }else{
            if(element == "*" || element == "/" && operators.slice(-1) == "+" || operators.slice(-1) == "-"){
                operators.unshift(element);
            }else if(element == "*" || element == "/" && operators.slice(0) == "*" || operators.slice(0) == "/"){
                resultado.push(operators.shift())
                operators.unshift(element);
            }else if(element == "+" || element == "-" && operators.slice(-1) == "+" || operators.slice(-1) == "-"){
                resultado = resultado.concat(operators);
                operators = []
                operators.push(element)
            }else if(element == "+" || element == "-" && operators.slice(-1) == "*" || operators.slice(-1) == "/"){
                resultado = resultado.concat(operators);
                operators = []
                operators.push(element)
            }
        }
    });

    return resultado = resultado.concat(operators);

}

//Comprueba si es un número
function esNumero(token) {
    return !isNaN(parseFloat(token)) && isFinite(token);
}

//Comprueba si es un operador
function esOperador(token) {
    return token === '+' || token === '-' || token === '*' || token === '/';
}

function evaluarArbol(arbol) {
    // Implementar la lógica para evaluar la expresión desde la estructura de árbol
    // Recorrer el árbol y realizar las operaciones matemáticas
    let pila = [];

    for (let i = 0; i < arbol.length; i++) {
        let token = arbol[i];

        if (esNumero(token)) {
            pila.push(parseFloat(token));
        } else if (esOperador(token)) {
            let operand2 = pila.pop();
            let operand1 = pila.pop();

            switch (token) {
                case '+':
                    pila.push(operand1 + operand2);
                    break;
                case '-':
                    pila.push(operand1 - operand2);
                    break;
                case '*':
                    pila.push(operand1 * operand2);
                    break;
                case '/':
                    pila.push(operand1 / operand2);
                    break;
            }
        }
    }

    return pila.pop();
}
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
    try {
        // 1+1 -> (string)(string)(string)
    } catch (error) {
        
    }
}

function limpiar(){
    $(".resultado").val('')
}

function pintar(valor) {
    $(".resultado").val(valor)
}
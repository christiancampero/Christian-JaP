//la siguiente funcion muestra el usuario que ingreso actualmente y que esta almacenado
//en localStorage. Se puede visualizar en la navBar o barra de navegacion, especificamente donde dice "Info Usuario:"
//tambien se muestra la cuenta de google actualmente conectada
function infoUSuarioBarra() {

    var nuevito = JSON.parse(localStorage.getItem('quienIngreso'));
    document.getElementById("usuarioON").innerHTML = nuevito + `<p>actualmente conectado/a</p>`; 

    var nuevitoGoog = JSON.parse(localStorage.getItem('entidadUsuario'));
    
    console.log(nuevitoGoog);
    document.getElementById("usuarioGoog").innerHTML = nuevitoGoog.Name + `<p>conectado/a con cuenta Google</p>`;

}

document.addEventListener("DOMContentLoaded", function(e){

    infoUSuarioBarra();
});
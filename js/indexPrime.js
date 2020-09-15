//la siguiente funcion muestra el usuario que ingreso actualmente y que esta almacenado
//en localStorage. Se puede visualizar en la navBar o barra de navegacion, especificamente donde dice "Info Usuario:"
//tambien se muestra la cuenta de google actualmente conectada
function infoUSuarioBarra() {

    var nuevito = JSON.parse(localStorage.getItem('quienIngreso'));
    document.getElementById("dropdownMenuButton").innerHTML = 'Usuario:  ' + nuevito; 

    var nuevitoGoog = JSON.parse(localStorage.getItem('entidadUsuario'));
    
    document.getElementById("usuarioGoog").innerHTML = nuevitoGoog.Name +" " + "(Gmail)";

}

document.addEventListener("DOMContentLoaded", function(e){

    infoUSuarioBarra();
});
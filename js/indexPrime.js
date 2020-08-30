//la siguiente funcion muestra el usuario que ingreso actualmente y que esta almacenado
//en localStorage. Se puede visualizar en la navBar o barra de navegacion, especificamente donde dice "Info Usuario:"
function infoUSuarioBarra() {

    var nuevito = JSON.parse(localStorage.getItem('quienIngreso'));
    document.getElementById("usuarioON").innerHTML = nuevito + `<p>actualmente conectado</p>`; 

}

document.addEventListener("DOMContentLoaded", function(e){

    infoUSuarioBarra();
});
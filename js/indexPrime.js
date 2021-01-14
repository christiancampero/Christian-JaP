

function infoUSuarioBarra() {

    var loggedUser = JSON.parse(localStorage.getItem('quienIngreso'));
    document.getElementById("dropdownMenuButton").innerHTML = 'Usuario:  ' + loggedUser;

    var loggedUserGoogle = JSON.parse(localStorage.getItem('entidadUsuario'));

    if (loggedUserGoogle != null && loggedUserGoogle != "") {

        document.getElementById("usuarioGoog").innerHTML = loggedUserGoogle.Name + " " + "(Gmail)";
    } else {
        document.getElementById("usuarioGoog").innerHTML = "Gmail no conectado";
    }
}


document.addEventListener("DOMContentLoaded", function (e) {

    infoUSuarioBarra();
    
    if (document.getElementById("saliendo") != null && document.getElementById("saliendo") != "") {

        document.getElementById("saliendo").addEventListener("click", function () {
            localStorage.clear();
            signOut();
        });
    } else {
        ;
    }
});
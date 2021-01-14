
var usuarArray = [];
var googleUser;


function onSignIn(googleUser) {
	var profile = googleUser.getBasicProfile();
	var elemento = document.querySelector('#ent');
	elemento.innerText = googleUser.getBasicProfile().getGivenName();
	console.log('ID: ' + profile.getId());
	console.log('Name: ' + profile.getName());
	console.log('Email: ' + profile.getEmail());

	var entidadUsuario = {};
	entidadUsuario.Id = profile.getId();
	entidadUsuario.Name = profile.getName();

	localStorage.setItem('entidadUsuario', JSON.stringify(entidadUsuario));

	alert(profile.getName() + ' has ingresado con tu cuenta de google. Ahora ingresa un nombre de usuario y contraseña ficticios');

}


function signOut() {
	var auth2 = gapi.auth2.getAuthInstance();
	auth2.signOut().then(function () {
		console.log('El usuario salio.');
		alert("Te has desconectado de tu cuenta de google!");
	});
	localStorage.clear();
}


if(JSON.parse(localStorage.getItem('arrayCompartido')) != null) {
	
	for (i = 0; i < JSON.parse(localStorage.getItem('arrayCompartido')).length; i++) {

		usuarArray.push(JSON.parse(localStorage.getItem('arrayCompartido'))[i]);
	};
};


function agregarUsuario() {

	unCheck = document.getElementById('un').value;
	pwCheck = document.getElementById('pw').value;

	if (unCheck.length != 0 && pwCheck.length != 0) {

		var nuevoUsuario = {
			un: document.getElementById('un').value,
			pw: document.getElementById('pw').value,
		};

		usuarArray.push(nuevoUsuario);
		localStorage.setItem('arrayCompartido', JSON.stringify(usuarArray));
		
		var quienIngreso = document.getElementById('un').value;
		localStorage.setItem('quienIngreso', JSON.stringify(quienIngreso));

		document.getElementById('un').value = "";
		document.getElementById('pw').value = "";
		
		location.replace("./index.html");


	} else {
		alert("Los campos no pueden estar vacíos! Ingresa algo en los campos");
	}
};


document.addEventListener("DOMContentLoaded", function (e) {

	e.preventDefault();

	document.getElementById("entrar").addEventListener("click", function () {

		agregarUsuario();
	});

});

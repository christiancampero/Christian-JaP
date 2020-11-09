
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
  
  	localStorage.setItem('entidadUsuario',JSON.stringify(entidadUsuario));

	alert(profile.getName() + ' has ingresado con tu cuenta de google y la misma se mantendra conectada');
	
	var aceptado = confirm("Si quieres quedarte en la página actual y cambiar de cuenta, presioná Cancelar, de otra forma presioná Aceptar");
	if(aceptado == true) {
		location.replace('./index.html');
	} 

}



function signOut() {
		var auth2 = gapi.auth2.getAuthInstance();
		auth2.signOut().then(function () {
		  console.log('El usuario salio.');
		  alert("Te has desconectado de tu cuenta de google!");
		});
		localStorage.clear();
}



var usuarArray = [];


if(JSON.parse(localStorage.getItem('arrayCompartido')) != null){
	for(i=0;i<JSON.parse(localStorage.getItem('arrayCompartido')).length;i++){
	 	usuarArray.push(JSON.parse(localStorage.getItem('arrayCompartido'))[i]);
	};
};

console.log(usuarArray);


function autenticar(){

	var un = document.getElementById('un').value;
	var pw = document.getElementById('pw').value;

	if(usuarArray.length > 0) {
		for(let i = 0; i < usuarArray.length; i++) {
			if((un == usuarArray[i].un) && (pw == usuarArray[i].pw)) {
				alert("Ingresaste perfectamente!");
				var quienIngreso = document.getElementById('un').value;
				localStorage.setItem('quienIngreso', JSON.stringify(quienIngreso));
				document.getElementById('un').value = "";
				document.getElementById('pw').value = "";
				location.replace("./index.html"); 
				break;
			} 
			if(i == usuarArray.length-1 || usuarArray.length == 0){
				console.log('trabajando...')
				solucionarProblemas(un, pw);
			}
		}
	} else {
		alert("No se encontro al usuario. Por favor clickea en crear una cuenta");
		document.getElementById('un').value = "";
		document.getElementById('pw').value = "";
	}

};


function solucionarProblemas(un, pw) {
		for( j = 0; j < usuarArray.length; j++){
			if(un == usuarArray[j].un) {
				alert("Contraseña incorrecta");
				document.getElementById('pw').value = "";
				break;
			};
			if(j == usuarArray.length-1 || usuarArray.length == 0){
				alert("No se encontro al usuario. Clickea en crear una cuenta");
				document.getElementById('un').value = "";
				document.getElementById('pw').value = "";
			};
		};
};



document.addEventListener("DOMContentLoaded", function(e){

	e.preventDefault();

	document.getElementById("entrar").addEventListener("click", function(){
	
		autenticar()
	});

	document.getElementById("saliendo").addEventListener("click", function(){
		localStorage.clear();
		signOut();
	});

});

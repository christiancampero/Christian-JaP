
var googleUser;

function onSignIn(googleUser) {
	var profile = googleUser.getBasicProfile();
	var elemento = document.querySelector('#ent');
	elemento.innerText = googleUser.getBasicProfile().getGivenName();
    console.log('ID: ' + profile.getId()); // token de ID
    console.log('Name: ' + profile.getName()); //token de nombre
	console.log('Email: ' + profile.getEmail()); //token de email

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



//Nueva versión con localStorage
//Defino un array que guarda los usuarios a medida que se agregan en la pagina de registro
// variables un = nombre de usuario (username), pw = contraseña (password)
var usuarArray = [];

//Cuando retorna a la pagina de acceso despues de agregar el usuario (registro), obtengo todos los usuarios agregados
//desde del array pasado entre las páginas y se agrega al usuarArray
if(JSON.parse(localStorage.getItem('arrayCompartido')) != null){
	for(i=0;i<JSON.parse(localStorage.getItem('arrayCompartido')).length;i++){
	 	usuarArray.push(JSON.parse(localStorage.getItem('arrayCompartido'))[i]);
	};
};
//hago un log con la lista de usuarios por conveniencia y para ver problemas
console.log(usuarArray);

//Cuando el boton de "ingresar" es clickeado, llama a la función para obtener el id y password ingresados
//y checkea la autenticación del usuario


//función para autenticar el usuario 
function autenticar(){

	var un = document.getElementById('un').value;
	var pw = document.getElementById('pw').value;

//una vez que el/los usuario/s han sido agregados al array de users
//comprueba el nombre de usuario y contraseña con los que estan guardados en el array
//la función solucionarProblemas ayuda a determinar cual de los campos vacíar 
//los casos que se pueden dar son...
//nombre de usuario y contraseña validos -> se vacían ambos campos
//nombre de usuario valido pero contraseña invalida -> se vacía solo el campo de contraseña
//nombre de usuario invalida pero contraseña valida -> se vacían ambos campos
//nombre de usuario y contraseña invalidos -> se vacían ambos campos
	if(usuarArray.length>0){
		for(i=0; i<usuarArray.length; i++){
			if((un == usuarArray[i].un) && (pw == usuarArray[i].pw)){
				alert("Ingresaste perfectamente!");
				var quienIngreso = document.getElementById('un').value;
				localStorage.setItem('quienIngreso', JSON.stringify(quienIngreso));
				document.getElementById('un').value = "";
				document.getElementById('pw').value = "";
				location.replace("./index.html"); //redirige a index cuando el usuario ingresa 
				break;
			} 
			if(i==usuarArray.length-1 || usuarArray.length==0){
				console.log('trabajando...')
				solucionarProblemas(un, pw);
			}
		}
	} else {//ingresa en la primera vez que carga para verificar que no hay usuarios en el array
		alert("No se encontro al usuario. Por favor clickea en crear una cuenta");
		document.getElementById('un').value = "";
		document.getElementById('pw').value = "";
	}

};

//Si hay una coincidencia con el nombre de usuario, se vacía solo el campo de contraseña
//así el usuario no tiene que volver a tipear el nombre de usuario
// si no hay coincidencias tanto en nombre de usuario como contraseña, ambos campos se vacían
function solucionarProblemas(un, pw){
		for(j=0; j<usuarArray.length; j++){
			if(un == usuarArray[j].un){
				alert("Contraseña incorrecta");
				document.getElementById('pw').value = "";
				break;
			};
			if(j==usuarArray.length-1 || usuarArray.length==0){
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

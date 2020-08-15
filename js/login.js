//Defino un array que guarda los usuarios a medida que se agregan en la pagina de registro
// variables un = nombre de usuario (username), pw = contraseña (password)
var usuarArray = [];

//Cuando retorna a la pagina de acceso despues de agregar el usuario (registro), obtengo todos los usuarios agregados
//desde del array pasado entre las páginas y se agrega al usuarArray
if(JSON.parse(sessionStorage.getItem('arrayCompartido')) != null){
	for(i=0;i<JSON.parse(sessionStorage.getItem('arrayCompartido')).length;i++){
	 	usuarArray.push(JSON.parse(sessionStorage.getItem('arrayCompartido'))[i]);
	};
};
//hago un log con la lista de usuarios por conveniencia y para ver problemas
console.log(usuarArray);

//Cuando el boton de "ingresar" es clickeado, llama a la función para obtener el id y password ingresados
//y checkea la autenticación del usuario
document.getElementById('entrar').onclick = function (){autenticar()};

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
				document.getElementById('un').value = "";
				document.getElementById('pw').value = "";
				location.replace("./index.html"); //redirige a index cuando el usuario ingresa 
				break;
			} else if(un.length === 0) {
				alert("Debes colocar algo en nombre de usuario");
			} else if(pw.length === 0) {
				alert("Debes colocar algo en contraseña");
			}
			if(i==usuarArray.length-1 || usuarArray.length==0){
				console.log('trabajando...')
				solucionarProblemas(un, pw);
			}
		}
	}else{//ingresa en la primera vez que carga para verificar que no hay usuarios en el array
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


/*function evitarIngreso() {
	if(un.length === 0) {
		window.location="./login.html";
	} else if (pw.length === 0) {
		window.location="./login.html";
	} else if(un.length > 0 && pw.length >= 8) {
		window.location="./index.html";
	}
}*/


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
/*document.addEventListener("DOMContentLoaded", function(e){
});*/


//codigo por defecto de google developers
function onSignIn(googleUser) {
	var profile = googleUser.getBasicProfile();
	var elemento = document.querySelector('#ent');
	elemento.innerText = googleUser.getBasicProfile().getGivenName();
    console.log('ID: ' + profile.getId()); // token de ID
    console.log('Name: ' + profile.getName()); //token de nombre
	console.log('Email: ' + profile.getEmail()); //token de email
}

if(profile != null) {
	location.replace('./index.html');
}


function signOut() {
		var auth2 = gapi.auth2.getAuthInstance();
		auth2.signOut().then(function () {
		  console.log('El usuario salio.');
		});
}



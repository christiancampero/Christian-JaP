
var usuarArray = [];


if(JSON.parse(localStorage.getItem('arrayCompartido')) != null) {

	for(let i = 0 ; i < JSON.parse(localStorage.getItem('arrayCompartido')).length; i++) {
		 
		usuarArray.push(JSON.parse(localStorage.getItem('arrayCompartido'))[i]);
	};
};

console.log(usuarArray);


function verificarNuevo(){

	var un = document.getElementById('unnew').value;

  
	if(usuarArray.length > 0) {
		for(let i = 0; i < usuarArray.length; i++){
			if(un == usuarArray[i].un) {
				alert("El nombre de usuario ya existe, por favor crea un nuevo usuario");
				document.getElementById('unnew').value = "";
				break;
			};
		};
		if(i == usuarArray.length){
			verificar();
		};
	} else {
		verificar();
	};
};

function verificar(){

	
	var nombreU = document.getElementById('unnew').value;
	var pw = document.getElementById('pwnew').value;

	
	if(nombreU.length > 0 && pw.length >= 8){
		agregarUsuario();
	} else if(nombreU.length === 0) {
		alert("Debes colocar algo en el nombre de usuario");
	}
	else if(pw.length < 8) {
		alert("Por favor ingresa una contraseña de 8 caracteres o más");
		document.getElementById('pwnew').value = "";
	};
	
};

function agregarUsuario(){
	
	var nuevoUsuario = {
		un: document.getElementById('unnew').value,
		pw: document.getElementById('pwnew').value,
	};

	usuarArray.push(nuevoUsuario);
	localStorage.setItem('arrayCompartido', JSON.stringify(usuarArray));
	document.getElementById('unnew').value = "";
	document.getElementById('pwnew').value = "";

	alert("Tu nombre de usuario y contraseña han sido añadidos perfectamente! Por favor clickea en el enlace de regresar a ingreso");
};


document.addEventListener("DOMContentLoaded", function(e){

	e.preventDefault();

	document.getElementById("registNuevo").addEventListener("click", function(){
	
		verificarNuevo();
	});

});

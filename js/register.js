//Defino un array que guarda los usuarios a medida que son agregados en la pagina de registro
// variables un = nombre de usuario (username), pw = contraseña (password)
// unnew = nuevo nombre de usuario, pwnew = nueva contraseña
var usuarArray = [];


//Obtengo todos los usuarios agregados...
//desde el array compartido entre paginas (login y register) para agregarlos al usuarArray
if(JSON.parse(sessionStorage.getItem('arrayCompartido')) != null){
	for(i=0 ; i<JSON.parse(sessionStorage.getItem('arrayCompartido')).length; i++){
	 	usuarArray.push(JSON.parse(sessionStorage.getItem('arrayCompartido'))[i]);
	};
};
//hago un log con la lista de usuarios por conveniencia y ver/solucionar problemas
console.log(usuarArray);


document.getElementById('registNuevo').onclick = function(){verificarNuevo()};

//funcion para verificar al nuevo usario
function verificarNuevo(){

	var un = document.getElementById('unnew').value;

    //una vez que el usuario ha sido agregado al usuarArray,
	//verifica el nuevo nombre de usuario por si hay coincidencias
	//si hay coincidencia, aparece una alerta
	if(usuarArray.length>0){
		for(i=0; i<usuarArray.length; i++){
			if(un == usuarArray[i].un){
				alert("El nombre de usuario ya existe, por favor crea un nuevo usuario");
				document.getElementById('unnew').value = "";
				break;
			};
		};
		if(i==usuarArray.length){
			verificar();
		};
	}else{
		verificar();
	};
};

function verificar(){

	
	var nombreU = document.getElementById('unnew').value;
	var pw = document.getElementById('pwnew').value;

	//checkea si la contraseña ingresada tiene 8 caracteres o más
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

	// agrega el nuevo usuario al array, pone el usuario en el array compartido y limpia los campos  
	usuarArray.push(nuevoUsuario);
	sessionStorage.setItem('arrayCompartido', JSON.stringify(usuarArray));
	document.getElementById('unnew').value = "";
	document.getElementById('pwnew').value = "";

	alert("Tu nombre de usuario y contraseña han sido añadidos perfectamente! Por favor clickea en el enlace de regresar a ingreso");
};
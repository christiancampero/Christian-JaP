var faltanDatos = true;
let perfilArray = [];
let storedDataArr = [];
let newDataModified = {};
let newDataModCopy = [];
let anotherDataArray = [];
let datosRetornados = [];
let imagenReader = 0;


function cambiarImgPerfilReader() {
    const preImg = document.getElementById("profile-img");

    const archivos = document.querySelector('input[type=file]').files[0];
    const lector = new FileReader();
  
    lector.addEventListener("load", function () {
      preImg.src = lector.result;
    }, false);
  
    if(archivos) {
      lector.readAsDataURL(archivos);
    }
  }


function previewFiles() {

    var preview = document.querySelector('#preview');
    var files = document.querySelector('input[type=file]').files;
  
    function readAndPreview(file) {
  
      if ( /\.(jpe?g|png|gif)$/i.test(file.name) ) {
        var reader = new FileReader();
  
        reader.addEventListener("load", function () {
          var image = new Image();
          image.height = 100;
          image.title = file.name;
          image.src = this.result;
          preview.appendChild(image);
        }, false);
  
        reader.readAsDataURL(file);
      }
  
    }
  
    if(files) {
      [].forEach.call(files, readAndPreview);
    }
  
  }

function linkParaImagen() {

    let imgP = document.getElementById("profile-link").value;

    if(imgP != null && imgP != "") {

        let perfilImg = getBaseImage(imgP);

        return perfilImg; 

    } else {
        ;
    }
}

function comprobaciones() {

    let nombre = document.getElementById("input-first-name");
    let apellido = document.getElementById("input-last-name");
    let telef = document.getElementById("input-cellphone");
    let e_mail = document.getElementById("input-email");
    let direcc = document.getElementById("input-address");
    let city = document.getElementById("input-city");
    let country = document.getElementById("input-country");
    let age = document.getElementById("input-age");
    let description = document.getElementById("about-me");

    nombre.addEventListener("keyup", event => {

        if (nombre.value.length < 2 || emptyString(nombre.value) === true || hasNumber(nombre.value) === true) {
            nombre.classList.add("is-invalid");
            faltanDatos = true;

        } else if (nombre.value.length > 2 && hasNumber(nombre.value) === false) {
            nombre.classList.remove("is-invalid");
            faltanDatos = false;
        }
    });

    apellido.addEventListener("keyup", event => {

        if (apellido.value.length === 0 || emptyString(apellido.value) === true || hasNumber(apellido.value) === true) {
            apellido.classList.add("is-invalid");
            faltanDatos = true;

        } else if (apellido.value.length > 0 && hasNumber(apellido.value) === false) {
            apellido.classList.remove("is-invalid");
            faltanDatos = false;
        }
    });

    telef.addEventListener("keyup", event => {

        if (telef.value.length === 0 || onlyNumbers(telef.value) === false) {
            telef.classList.add("is-invalid");
            faltanDatos = true;
        } else if (telef.value.length > 1 && onlyNumbers(telef.value) === true) {
            telef.classList.remove("is-invalid");
            faltanDatos = false;
        }
    });

    e_mail.addEventListener("keyup", event => {

        if (e_mail.value.length === 0 || emailFormat(e_mail.value) === false) {
            e_mail.classList.add("is-invalid");
            faltanDatos = true;
        } else if (e_mail.value.length > 0 && emailFormat(e_mail.value) === true) {
            e_mail.classList.remove("is-invalid");
            faltanDatos = false;
        }
    });

    direcc.addEventListener("keyup", event => {

        if (direcc.value.length === 0 || alphaNumeric(direcc.value) === false) {
            direcc.classList.add("is-invalid");
            faltanDatos = true;
        } else if (direcc.value.length > 0 && alphaNumeric(direcc.value) === true) {
            direcc.classList.remove("is-invalid");
            faltanDatos = false;
        }
    });

    city.addEventListener("keyup", event => {
        if (city.value.length === 0 || hasNumber(city.value) === true) {
            city.classList.add("is-invalid");
            faltanDatos = true;
        } else if (city.value.length > 0 && hasNumber(city.value) === false) {
            city.classList.remove("is-invalid");
            faltanDatos = false;
        }
    });

    country.addEventListener("keyup", event => {
        if (country.value.length === 0 || hasNumber(country.value) === true) {
            country.classList.add("is-invalid");
            faltanDatos = true;
        } else if (country.value.length > 0 && hasNumber(country.value) === false) {
            country.classList.remove("is-invalid");
            faltanDatos = false;
        }
    });

    age.addEventListener("keyup", event => {
        if(age.value.length === 0 || onlyNumbers(age.value) === false) {
            age.classList.add("is-invalid");
            faltanDatos = true;
        } else if (age.value.length > 0 && onlyNumbers(age.value) === true) {
            age.classList.remove("is-invalid");
            faltanDatos = false;
        }
    });

    return faltanDatos;
}


function getBaseImage(img) {

    var canvas = document.createElement("canvas");

    canvas.width = img.width;
    canvas.height = img.height;

    var context = canvas.getContext("2d");
    context.drawImage(img, 0, 0);

    var dataURL = canvas.toDataURL("image/png");

    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}

function agregarDatosPerfil() {

    var nuevosDatos = {};

    let imagenPerfil = document.getElementById("profile-img");
    let imgData = getBaseImage(imagenPerfil);

    linkParaImagen();

    if(imgData != null) {

        nuevosDatos = {
            nombres: document.getElementById("input-first-name").value,
            apellidos: document.getElementById("input-last-name").value,
            Edad: document.getElementById("input-age").value, 
            telefono: document.getElementById("input-cellphone").value,
            email: document.getElementById("input-email").value,
            direccion: document.getElementById("input-address").value,
            ciudad: document.getElementById("input-city").value,
            pais: document.getElementById("input-country").value,
            descripcion: document.getElementById("about-me").value,
            imagen: imgData,
        };
    } else if(imgData === null && perfilImg != null && perfilImg != "") {

        nuevosDatos = {
            nombres: document.getElementById("input-first-name").value,
            apellidos: document.getElementById("input-last-name").value,
            Edad: document.getElementById("input-age").value, 
            telefono: document.getElementById("input-cellphone").value,
            email: document.getElementById("input-email").value,
            direccion: document.getElementById("input-address").value,
            ciudad: document.getElementById("input-city").value,
            pais: document.getElementById("input-country").value,
            descripcion: document.getElementById("about-me").value,
            imagen: perfilImg,
        };
    } else {
        ;
    }

    let setDatos = new Set();

    let newData = new Object(nuevosDatos);

    newDataModCopy = Object.assign(newDataModified, newData);
    perfilArray.push(newDataModCopy);

    setDatos.add(newData);

    localStorage.setItem('datosDePerfiles', JSON.stringify(perfilArray));

    document.getElementById("input-first-name").value = "";

    document.getElementById("input-last-name").value = "";

    document.getElementById("input-age").value = "";

    document.getElementById("input-cellphone").value = "";

    document.getElementById("input-email").value = "";

    document.getElementById("input-address").value = "";

    document.getElementById("input-city").value = "";

    document.getElementById("input-country").value = "";

    document.getElementById("about-me").value = "";

    alert("Los datos del perfil se han guardado exitosamente!");

    return setDatos;
};


function mostrarDatosGuardados() {

    storedDataArr = JSON.parse(localStorage.getItem("datosDePerfiles"));
 
    datosRetornados = JSON.parse(localStorage.getItem("otrosDatosAd"));

    let countryShowed = document.getElementById("country-showed");

    let ageShowed = document.getElementById("age-showed");

    if (storedDataArr != null) {

        let storedUser = document.getElementById("stored-username");

        let storedName = document.getElementById("stored-first-name");
        let storedLastName = document.getElementById("stored-last-name");
        let storedCellphone = document.getElementById("stored-cellphone");
        let storedE_mail = document.getElementById("stored-email");
        let storedAddress = document.getElementById("stored-address");
        let storedCity = document.getElementById("stored-city");
        let storedCountry = document.getElementById("stored-country");
        let storedDescription = document.getElementById("stored-description");
        let imageToShow = document.getElementById("profile-img");
        let storedAge = document.getElementById("stored-age");

        storedUser.placeholder = JSON.parse(localStorage.getItem("quienIngreso"));
        storedName.placeholder = storedDataArr[0].nombres;
        storedLastName.placeholder = storedDataArr[0].apellidos;
        storedAge.placeholder = storedDataArr[0].Edad;
        storedCellphone.placeholder = storedDataArr[0].telefono;
        storedE_mail.placeholder = storedDataArr[0].email;
        storedAddress.placeholder = storedDataArr[0].direccion;
        storedCity.placeholder = storedDataArr[0].ciudad;
        storedCountry.placeholder = storedDataArr[0].pais;
        storedDescription.innerHTML = storedDataArr[0].descripcion;
        countryShowed.innerHTML = storedDataArr[0].ciudad + "," + " " + storedDataArr[0].pais;
        ageShowed.innerHTML = storedDataArr[0].nombres;

        var dataImage = storedDataArr[0].imagen;
        imageToShow.src = "image/jpeg;base64," + dataImage;


    } else {
        ;
    }

    let jobShowed = document.getElementById("job-showed");
    let educationShowed = document.getElementById("education-showed");


    if(datosRetornados != null) {
        ageShowed.innerHTML = storedDataArr[0].nombres + "," + "  " + datosRetornados[0].edad + " años";
        jobShowed.innerHTML = datosRetornados[0].profesion;
        educationShowed.innerHTML = datosRetornados[0].educacion;

    }


}

function datosPerfilConImagen() {

    let ageToShow = document.getElementById("age-to-show");
    let educationToShow = document.getElementById("education-to-show");
    let jobToShow = document.getElementById("job-to-show");

    var otroDatos = {
        edad: ageToShow.value,
        profesion: jobToShow.value,
        educacion: educationToShow.value,
    };

    let anotherData = new Object(otroDatos);
    anotherDataArray.push(anotherData);

    localStorage.setItem("otrosDatosAd", JSON.stringify(anotherDataArray));

}

function hasNumber(myString) {

    return /\d/.test(myString);
}

function onlyNumbers(myNumber) {

    var reg = new RegExp('^[0-9]+$');
    return reg.test(myNumber);
}

function dateFormat(dateString) {

    return /^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString);
}

function emptyString(myString) {

    return /^-?\d+\.?\d*$/.test(myString);
}

function streetNameWithSpaces(myString) {

    return /^[a-zA-Z_\s]+$/.test(myString);
}

function emailFormat(myEmail) {
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(myEmail);
}

function alphaNumeric(myString) {
    return /^[0-9a-zA-Z]+$/.test(myString);
}


document.addEventListener("DOMContentLoaded", function (e) {

    comprobaciones();

    document.getElementById("store-user-info").addEventListener("click", event => {

        if (faltanDatos === true) {
            ;
        } else if (faltanDatos === false) {
            agregarDatosPerfil();
        }

        location.assign("./my-profile.html");
    });

    document.getElementById("dashBoard").addEventListener("click", event => {

        datosPerfilConImagen();
        location.assign("./my-profile.html");

    });

    document.getElementById("imagen-file-reader").addEventListener("click", event => {
        cambiarImgPerfilReader();
    }); 

    mostrarDatosGuardados();
});

const urlCarrito = "https://japdevdep.github.io/ecommerce-api/cart/654.json";
const urlMensaje = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";
const currencyRates = "https://api.currencyfreaks.com/latest?apikey=cc9ff3a12c0d485583362e12d645dee2";
const allProducts = "https://japdevdep.github.io/ecommerce-api/product/all.json";


let dolarAPeso = 43;
var contenedor = [];

var arrayMini = [];
var articulos = [];
var productos = [];
let porcentajeEnvio = 0.15;
var contador = 0;
var subTotal = 0;
let monedaProducto = "";
var costoUnitarioProducto = 0;
var Total = 0;
var contadorRemovido = 0;
var subTotalRemovido = 0;
let monedaProductoRemovido = "";
var costoUnitarioProductoRemovido = 0;

let infoFaltante = true;
let metodoPagoSeleccionado = false;
const tarjeta_credito = "Tarjeta de crédito";
const pago_bancario = "Transferencia bancaria";
let mensaje_error = "Se ha producido un error con el proceso de compra";

function actualizarSubTotal(i){

    var cambiar = document.getElementById(`precio${i}`);
    
    cambiar.innerHTML = monedaProducto + " " + subTotal;
    
}

function actualizarIntermedio() {

    var cartItems = document.querySelectorAll('.costos');
    var totalItems = 0;
    contador = document.getElementsByName("canti");

    for (let i = 0; i < cartItems.length; i++) {

        var cartI = cartItems[i];
        let quanti = contador[i]; 
        var price = parseInt(cartI.innerText);
      
        totalItems = totalItems + (price * quanti.value);
        Total = totalItems;
        actualizarCostosTotales();
    }
} 

function actualizarCostosTotales(){

    let costoSubTotalHTML = document.getElementById("subTotal-texto");
    let costoEnvioHTML = document.getElementById("envio-texto");
    let costoTotalHTML = document.getElementById("costoTotal-texto");


    let costoEnvio = Math.round(porcentajeEnvio * Total);

    costoSubTotalHTML.innerHTML = monedaProducto + " " + Total;
    costoEnvioHTML.innerHTML = monedaProducto + " " + costoEnvio;
    costoTotalHTML.innerHTML = monedaProducto + " " + (Total + costoEnvio);
}


function mostrarMetodoDePago(){
    document.getElementById("metodo-pago").style.display = "block";

}

function ocultarMetodoDePagoNoSeleccionado(){
    document.getElementById("metodo-pago").style.display = "none";

}

function mostrarArticulos(array){
   
    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){ 
        
        let element = array[i];
        
        if(element.currency === "USD") {
                
            monedaProducto = "UYU";
            costoUnitarioProducto = (element.unitCost * dolarAPeso);

        } else if(element.currency === "UYU") { 
             
            monedaProducto = element.currency;
            costoUnitarioProducto = element.unitCost;
        }

        htmlContentToAppend += `
        <tr class="varios" id="linea${i}">
            <td><img src='${element.src}' width="85px"></td>
            <td>${element.name}</td>
            <td>${monedaProducto}</td>
            <td class="costos" id="costoU${i}">${costoUnitarioProducto}</td>
            <td><input class="form-control" name="canti" style="width:60px;" id="controlador${i}" type="number" value="${element.count}" min="1"></td>
            <td><span class="cambiador" id="precio${i}" style="font-weight:bold;">${costoUnitarioProducto * element.count}</span></td>
            <td id="tdBorrar${i}"><button type="button" class="btn btn-danger" id="borrar${i}">Quitar</button></td>
        </tr>
        `;
    }
    document.getElementById("mostrarArticulos").innerHTML = htmlContentToAppend;

    actualizarIntermedio();

    for(let i = 0; i < array.length; i++) {
    
        let item = array[i];

        document.getElementById(`controlador${i}`).addEventListener("change", event => {
            
            if(item.currency === "USD") {

                monedaProducto = "UYU";
                costoUnitarioProducto = (item.unitCost * dolarAPeso);
    
            } else if(item.currency === "UYU") { 
                 
                monedaProducto = item.currency;
                costoUnitarioProducto = item.unitCost;
            }
            
            contador = parseInt(document.getElementById(`controlador${i}`).value);
            subTotal = contador * costoUnitarioProducto;
            actualizarSubTotal(i); 
            actualizarIntermedio();
        });
    }    
    removerArticulo(array);
}


document.addEventListener("DOMContentLoaded", function(){


    obtenerJSONData(urlCarrito).then(respuesta => {
        
        articulos = respuesta.all.articles;
        
        obtenerJSONData(allProducts).then(result => {
 
            productos = result.all;
            generarNuevoProducto(productos, articulos);
            mostrarArticulos(articulos);
            actualizarCostosTotales();

            document.getElementById("recargar").addEventListener("click", event =>{

                mostrarArticulos(articulos);
            });
        });
    });

    document.getElementById("limpiar").addEventListener("click", event => {

        document.getElementById("mostrarArticulos-removidos").innerHTML = "";        
    });
    
    document.getElementById("radio-premium").addEventListener("change", function(){
        porcentajeEnvio = 0.15;
       actualizarCostosTotales();
    });

    document.getElementById("radio-express").addEventListener("change", function(){
        porcentajeEnvio = 0.07;
        actualizarCostosTotales();
    });

    document.getElementById("radio-standart").addEventListener("change", function(){
        porcentajeEnvio = 0.05;
        actualizarCostosTotales();
    });

    document.getElementById("creditCardPaymentRadio").addEventListener("change", function(){

        document.getElementById("creditCardNumber").disabled = false;

        document.getElementById("creditCardSecurityCode").disabled = false;
        
        document.getElementById("dueDate").disabled = false;

        document.getElementById("bankAccountNumber").disabled = true;

        document.getElementById("paymentType").innerHTML = tarjeta_credito;

        metodoPagoSeleccionado = true;
        ocultarMetodoDePagoNoSeleccionado();

        document.getElementById("creditCardNumber").addEventListener("keyup", event =>{

            let cNumber = document.getElementById("creditCardNumber").value;

            if(cNumber.length < 14) {
                infoFaltante = true;
                document.getElementById("creditCardNumber").classList.add('is-invalid');
            } else if(cNumber.length >= 14) {
                infoFaltante = false;
                document.getElementById("creditCardNumber").classList.remove('is-invalid');
            }
        });

        document.getElementById("creditCardSecurityCode").addEventListener("keyup", event =>{

            let cSecurity = document.getElementById("creditCardSecurityCode").value;

            if(cSecurity.length < 3) {
                infoFaltante = true;
                document.getElementById("creditCardSecurityCode").classList.add('is-invalid');
            } else if(cSecurity.length >= 3) {
                infoFaltante = false;
                document.getElementById("creditCardSecurityCode").classList.remove('is-invalid');
            }
        });

        document.getElementById("dueDate").addEventListener("keyup", event =>{

            let dDate = document.getElementById("dueDate").value;

            if(dateFormat(dDate)=== false) {
                infoFaltante = true;
                document.getElementById("dueDate").classList.add('is-invalid');
            } else if(dateFormat(dDate) === true) {
                infoFaltante = false;
                document.getElementById("dueDate").classList.remove('is-invalid');
            }
        });

    });

    document.getElementById("bankingRadio").addEventListener("change", function(){
        
        document.getElementById("bankAccountNumber").disabled = false;

        document.getElementById("creditCardNumber").disabled = true;
        document.getElementById("creditCardSecurityCode").disabled = true;
        document.getElementById("dueDate").disabled = true;

        document.getElementById("paymentType").innerHTML = pago_bancario;
        
        metodoPagoSeleccionado = true;
        ocultarMetodoDePagoNoSeleccionado();

        document.getElementById("bankAccountNumber").addEventListener("keyup", event => {
            
            let bANumber = document.getElementById("bankAccountNumber").value;

            if(bANumber.length < 14 || emptyString(bANumber) === false){
                infoFaltante = true;
                document.getElementById("bankAccountNumber").classList.add('is-invalid');

            } else if(bANumber.length >= 14 || emptyString(bANumber) === true){

                document.getElementById("bankAccountNumber").classList.remove('is-invalid');
                infoFaltante = false;
            }
        });
    });

    
    var formCompra = document.getElementById("formulario-compra");

    formCompra.addEventListener("submit", function(e){

        let shippingStreetInput = document.getElementById("shippingStreet");
        let shippingStreetNumberInput = document.getElementById("shippingStreetNumber");
        let shippingCornerStreetInput = document.getElementById("shippingCornerStreet");
        infoFaltante = false;

        ocultarMetodoDePagoNoSeleccionado(); 

        shippingStreetInput.classList.remove('is-invalid');
        shippingStreetNumberInput.classList.remove('is-invalid');
        shippingCornerStreetInput.classList.remove('is-invalid');

        if(shippingStreetInput.value === "" || hasNumber(shippingStreetInput.value)===true || streetNameWithSpaces(shippingStreetInput)=== true)
        {
            shippingStreetInput.classList.add('is-invalid');
            infoFaltante = true;
            alert("El nombre de la calle no puede contener números. Introduce el número en el campo correspondiente");

        } else if(shippingStreetInput.value != "" && hasNumber(shippingStreetInput.value) === false) {
            shippingStreetInput.classList.remove('is-invalid');
            infoFaltante = false;
        }
                
        if (shippingStreetNumberInput.value === "" || shippingStreetNumberInput.value.length < 4 || onlyNumbers(shippingStreetNumberInput.value)===false)
        {
            shippingStreetNumberInput.classList.add('is-invalid');
            infoFaltante = true;
            alert("El número de calle/casa debe contener por lo menos 4 digitos o más");

        } else if(shippingStreetNumberInput.value.length > 4 && shippingStreetNumberInput != "" && onlyNumbers(shippingStreetNumberInput.value)===true){

            shippingStreetNumberInput.classList.remove('is-invalid');
            infoFaltante = false;
        }

        
        if (shippingCornerStreetInput.value === "" || hasNumber(shippingCornerStreetInput.value)===true || streetNameWithSpaces(shippingCornerStreetInput)===true)
        {
            shippingCornerStreetInput.classList.add('is-invalid');
            infoFaltante = true;
            alert("El nombre del cruce no puede contener números ni símbolos");
        } else {
            shippingCornerStreetInput.classList.remove('is-invalid');
            infoFaltante = false;
        }

        if (!metodoPagoSeleccionado)
        {
            mostrarMetodoDePago();
            infoFaltante = true;
        }    

 
        obtenerJSONData(urlMensaje).then(respuesta => {
                
            let mensajeAMostrarHTML = document.getElementById("exampleModalLongTitle");
            let mensajeAMostrar = "";

            if(infoFaltante === true) {

                mensajeAMostrar = mensaje_error;
                mensajeAMostrarHTML.innerHTML = mensajeAMostrar;
                document.getElementById("modalCuerpo").innerHTML = "Por favor ingrese los datos en los campos requeridos...";

            } else if(infoFaltante === false){

                mensajeAMostrar = respuesta.all.msg;

                mensajeAMostrarHTML.innerHTML = mensajeAMostrar;
                document.getElementById("modalCuerpo").innerHTML = "Gracias. Vuelva pronto!"+ "\t" + "\nFecha y hora de la compra:  " + dateTime2;
            }
                
        });   
        
        if(e.preventDefault) e.preventDefault();
            return false;
    });

}); 
            


var obtenerJSONData = async function(url) {

    var respuesta = {};

    showSpinner();
    try {
        const res = await fetch(url);
        const data = await res.json();

        if(!res.ok) {
            hideSpinner();
            throw new Error(`Error Http! status: ${res.status}`);

        } else {

            hideSpinner();
            respuesta.all = data;

            return respuesta;
        }
    } 
    catch(err) {
        console.log(err);
        hideSpinner();
    }
}

var showSpinner = function(){
    document.getElementById("spinner-wrapper").style.display = "block";
  }
  
  var hideSpinner = function(){
    document.getElementById("spinner-wrapper").style.display = "none";
  }


 
  
//hice la siguiente funcion para obtener la tasa de cambio del dolar a peso Uruguayo
//para utilizar la api se necesita una apikey, la misma se encuentra en la url
//podría utilizar el valor que obtengo en tasaUSD haciendo el fetch, pero a efectos de evitar problemas,
//utilizo el valor 43 =~ 42.52 directamente en los calculos 

let tasas = {};
let tasaUSD = 0;

var tasasCambio = async function() {

    const ress = await fetch(currencyRates);
    const datos = ress.json();
    
    datos.then(resp =>{
        if(ress.ok){
        
        tasas = resp.rates;
            
        tasaUSD = tasas.UYU;
        console.log(tasaUSD); 
        
        return tasaUSD;

        } else {
            throw Error(ress.statusText); 
          }
    })
    .catch(function(error) {
      tasas.status = 'error';
      tasas.datos = error;
      
      return tasas;
  });
}

function generarNuevoProducto(productos, array) {

    var prod= {};

    for(let i = 0; i < productos.length; i++) {
        let items = productos[i];

        if(items.name === "Suzuki Celerio") {
            ;
        } else {

            prod = {
                name: items.name,
                count: 1,   
                unitCost: items.cost,
                currency: items.currency,
                src: items.imgSrc,
            }
        array.push(prod);
        }
    }
}

var hoy = new Date();
var date1 = hoy.getFullYear()+'-'+(hoy.getMonth()+1)+'-'+hoy.getDate();
var time1 = hoy.getHours() + ":" + hoy.getMinutes() + ":" + hoy.getSeconds();
let dateTime2 = date1 +' '+ time1;

document.getElementById("time").innerHTML = dateTime2; 


function removerArticulo(array) {

    for(let i = 0; i < array.length; i++) {
    
        document.getElementById(`borrar${i}`).addEventListener("click", event => {
            
            var prec = parseInt(document.getElementById(`costoU${i}`).innerText);
            contador = parseInt(document.getElementById(`controlador${i}`).value);

            Total = Total - (prec * contador);

            document.getElementById(`tdBorrar${i}`).parentElement.remove();

            actualizarCostosTotales();

            arrayMini.push(array[i]); 
            removeDuplicates(arrayMini);           

            mostrarRemovidosConRetorno(arrayMini);

            var nodos = document.querySelectorAll(".varios");
            var nodes = [...nodos];
            console.log(nodes);

        });
    }
} 

function mostrarRemovidosConRetorno(arrayMini) {

    
    let unicos = (arrayMini) => arrayMini.filter((v,i) => arrayMini.indexOf(v) === i);

    arrayMini = unicos(arrayMini); 

    let htmlContentToAppend3 = "";
 
    for(let i = 0; i < arrayMini.length; i++){ 
        
        let elementi = arrayMini[i];
       
        if(elementi != undefined) {

            if(elementi.currency === "USD" && elementi.currency != undefined) {
                    
                monedaProductoRemovido = "UYU";
                costoUnitarioProductoRemovido = (elementi.unitCost * dolarAPeso);

            } else if(elementi.currency === "UYU" && elementi.currency != undefined) {  
                
                monedaProductoRemovido = elementi.currency;
                costoUnitarioProductoRemovido = elementi.unitCost;
            }

            htmlContentToAppend3 += `
            <tr id="lineaOtro${i}">
                <td><img src='${elementi.src}' width="85px"></td>
                <td>${elementi.name}</td>
                <td>${monedaProductoRemovido}</td>
                <td class="costosOtro" id="costoUOtro${i}">${costoUnitarioProductoRemovido}</td>
                <td><input class="form-control" style="width:60px;" id="controladorOtro${i}" type="number" value="${elementi.count}" min="1"></td>
                <td><span class="cambiadorOtro" id="precioOtro${i}" style="font-weight:bold;">${costoUnitarioProductoRemovido * elementi.count}</span></td>
                <td id="lineAnother${i}"><button type="button" class="btn btn-success" id="agregarOtro${i}">Agregar</button></td>    
            </tr>
            `;
        }
    }
    document.getElementById("mostrarArticulos-removidos").innerHTML = htmlContentToAppend3;

    
    for(let i = 0; i < arrayMini.length; i++) {
    
        let items = arrayMini[i];

        if(items != undefined) {

            document.getElementById(`controladorOtro${i}`).addEventListener("change", event => {
                
                if(items.currency === "USD" && items.currency != undefined) {

                    monedaProductoRemovido = "UYU";
                    costoUnitarioProductoRemovido = (items.unitCost * dolarAPeso);
        
                } else if(items.currency === "UYU" && items.currency != undefined) { 
                    
                    monedaProductoRemovido = items.currency;
                    costoUnitarioProductoRemovido = items.unitCost;
                }
                
                contadorRemovido = parseInt(document.getElementById(`controladorOtro${i}`).value);
                subTotalRemovido = contadorRemovido * costoUnitarioProductoRemovido;
                actualizarSubTotalRemovido(i); 
            });

            document.getElementById(`agregarOtro${i}`).addEventListener("click", event => {

                document.getElementById(`lineAnother${i}`).parentElement.remove();

            });
        }
    }
}

function actualizarSubTotalRemovido(i){

    var cambiarRemovido = document.getElementById(`precioOtro${i}`);
    
    cambiarRemovido.innerHTML = monedaProductoRemovido + " " + subTotalRemovido;
    
}

function filtrados(array) {
    
    var filtered = array.filter(ele => ele !== undefined);

    return filtered;
}

function removeDuplicates(array) {
    return array.reduce((acc, curr) => acc.includes(curr) ? acc : [...acc, curr], []);
};


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
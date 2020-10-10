
const urlCarrito = "https://japdevdep.github.io/ecommerce-api/cart/654.json";
const urlMensaje = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";
const currencyRates = "https://api.currencyfreaks.com/latest?apikey=cc9ff3a12c0d485583362e12d645dee2";
const allProducts = "https://japdevdep.github.io/ecommerce-api/product/all.json";


var articulos = {};
var productos = {};
let porcentajeEnvio = 0.15;
var contador = 0;
var subTotal = 0;
let monedaProducto = "";
var costoUnitarioProducto = 0;
var Total = 0;


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
    
    for (let i = 0; i < cartItems.length; i++) {
        var cartI = cartItems[i];
        contador = document.getElementById(`controlador${i}`).value
        var price = parseInt(cartI.innerText);
      
        totalItems = totalItems + (price * contador);
    }
    Total = totalItems;
    actualizarCostosTotales();
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

function ocultarMetodoDePago(){
    document.getElementById("metodo-pago").style.display = "none";

}

function mostrarArticulos(array){
   
    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){ 
        
        let element = array[i];
        
        if(element.currency === "USD") {
                
            monedaProducto = "UYU";
            costoUnitarioProducto = (element.unitCost * 43);

        } else if(element.currency === "UYU") { 
             
            monedaProducto = element.currency;
            costoUnitarioProducto = element.unitCost;
        }

        htmlContentToAppend += `
        <tr>
            <td><img src='${element.src}' width="85px"></td>
            <td>${element.name}</td>
            <td>${monedaProducto}</td>
            <td class="costos" id="costoU${i}">${costoUnitarioProducto}</td>
            <td><input class="form-control" style="width:60px;" id="controlador${i}" type="number" value="${element.count}" min="1"></td>
            <td><span class="cambiador" id="precio${i}" style="font-weight:bold;">${costoUnitarioProducto * element.count}</span></td>
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
                costoUnitarioProducto = (item.unitCost * 43);
    
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
}


document.addEventListener("DOMContentLoaded", function(){


    obtenerJSONData(urlCarrito).then(respuesta => {
        
        articulos = respuesta.all.articles;
        mostrarArticulos(articulos);
        actualizarCostosTotales();
        
        obtenerJSONData(allProducts).then(result => {
 
            productos = result.all;
            generarNuevoProducto(productos, articulos);
            mostrarArticulos(articulos)
            actualizarCostosTotales();
        });
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
        ocultarMetodoDePago();
    });

    document.getElementById("bankingRadio").addEventListener("change", function(){
        document.getElementById("bankAccountNumber").disabled = false;

        document.getElementById("creditCardNumber").disabled = true;
        document.getElementById("creditCardSecurityCode").disabled = true;
        document.getElementById("dueDate").disabled = true;

        document.getElementById("paymentType").innerHTML = pago_bancario;

        metodoPagoSeleccionado = true;
        ocultarMetodoDePago();
    });

    
    var formCompra = document.getElementById("formulario-compra");

    formCompra.addEventListener("submit", function(e){

        let shippingStreetInput = document.getElementById("shippingStreet");
        let shippingStreetNumberInput = document.getElementById("shippingStreetNumber");
        let shippingCornerStreetInput = document.getElementById("shippingCornerStreet");
        let infoFaltante = false;

        ocultarMetodoDePago(); 

        shippingStreetInput.classList.remove('is-invalid');
        shippingStreetNumberInput.classList.remove('is-invalid');
        shippingCornerStreetInput.classList.remove('is-invalid');

        
        if (shippingStreetInput.value === "")
        {
            shippingStreetInput.classList.add('is-invalid');
            infoFaltante = true;
        }

        if (shippingStreetNumberInput.value === "")
        {
            shippingStreetNumberInput.classList.add('is-invalid');
            infoFaltante = true;
        }

        
        if (shippingCornerStreetInput.value === "")
        {
            shippingCornerStreetInput.classList.add('is-invalid');
            infoFaltante = true;
        }


        if (!metodoPagoSeleccionado)
        {
            mostrarMetodoDePago();
            infoFaltante = true;
        }    

 
        obtenerJSONData(urlMensaje).then(respuesta => {
                
            let mensajeAMostrarHTML = document.getElementById("exampleModalLongTitle");
            let mensajeAMostrar = "";

            if(infoFaltante == true) {

                mensajeAMostrar = mensaje_error;
                mensajeAMostrarHTML.innerHTML = mensajeAMostrar;
                document.getElementById("modalCuerpo").innerHTML = "Por favor ingrese los datos en los campos requeridos...";

            } else {

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
        console.log(tasaUSD); //dejo este console.log para verificar que se realizo correctamente el fetch 
                                //y que retorno el valor que estoy buscando 
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

function generarNuevoProducto(array, articulos) {

    var prod= {};

    for(let i = 0; i < array.length; i++) {
        let items = array[i];

        prod = {
            name: items.name,
            count: 1,   
            unitCost: items.cost,
            currency: items.currency,
            src: items.imgSrc,
        }
           
        articulos.push(prod);   
    }
   
}

var hoy = new Date();
var date1 = hoy.getFullYear()+'-'+(hoy.getMonth()+1)+'-'+hoy.getDate();
var time1 = hoy.getHours() + ":" + hoy.getMinutes() + ":" + hoy.getSeconds();
let dateTime2 = date1 +' '+ time1;

document.getElementById("time").innerHTML = dateTime2; 
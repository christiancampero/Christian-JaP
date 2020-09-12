
let product = [];

function mostrarGaleriaImagenes(array){

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

        document.getElementById("productImagesWrapper").innerHTML = htmlContentToAppend;
    }
}

function mostrarDetallesProducto(nombreAt2, product) {

    
    let productNameHTML  = document.getElementById("productName");
    let productDescriptionHTML = document.getElementById("productDescription");
    let productSoldCountHTML = document.getElementById("productSoldCount");
    let productCategoryHTML = document.getElementById("productCategory");
    let productCostHTML = document.getElementById("productCost");
    /* let relatedProductsHTML = document.getElementById("productosRelacionados"); */

    productNameHTML.innerHTML = nombreAt2; //product.name; 
    productDescriptionHTML.innerHTML = product.description; //descripción
    productSoldCountHTML.innerHTML = product.soldCount; // cantidad de vendidos
    productCategoryHTML.innerHTML = '<a href="category-info.html">' + product.category + '</a>'; // categoría
    productCostHTML.innerHTML = product.currency + " " + product.cost;  // costo o precio producto
   /*  relatedProductsHTML.innerHTML = '<a href="product-info.html">' + product.relatedProducts + '</a>'; */
   

}

/* document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            product = resultObj.data;

          
            mostrarDetallesProducto(product);
            
            mostrarGaleriaImagenes(product.images); //se muestran las imagenes del producto
        }
    });
});  */


document.addEventListener('DOMContentLoaded', function() {

    /*const urlGit = new URL("https://christiancampero.github.io/Christian-JaP/product-info.html")
    urlGit.searchParams.append("name", "Chevrolet Onix Joy");*/

    const url = new URL("https://japdevdep.github.io/ecommerce-api/product/5678.json"); //para api
    //url.searchParams.append("name", "Chevrolet Onix Joy");

    //let urlN = new URL("file:///C:/Users/chris/Desktop/Obligatorio%20semana%205/product-info.html"); //para archivo local
    //urlN.searchParams.append("name", "Chevrolet Onix Joy"); 

    console.log(decodeURI(window.location.search.substring(1)));
    //let nombreAuto = decodeURI(window.location.search.substring(1));
    let nombreAt2 = decodeURI((window.location.search).substring(1).replace("name=", ""));

    if(!window.location.search) { //si no retorna el query...
        nombreAuto = "Chevrolet Onix Joy";
    }
    
    //petición tipo AJAX

    //e.preventDefault();
    const Http = new XMLHttpRequest(); //con este metodo creo un nuevo objeto XMLHttpRequest

    Http.open("GET", url, true); //peticion asyncrona
    Http.send();

    Http.onreadystatechange = function(e) { // la propiedad .onreadystatechange define una función a ejecutar cuando cambia el readyState y/o status
    
        e.preventDefault();
        console.log(Http.responseText);

        if (Http.readyState == 4 && Http.status == 200) { //readyState == 4 la petición está completa y status == 200, es decir, "ok", entonces... 
        
         
            product = JSON.parse(Http.responseText); //parseo la respuesta para obtener un objeto de javascript
            console.log(product);
            
            mostrarDetallesProducto(nombreAt2, product);  //muestro información del producto en cuestión
            mostrarGaleriaImagenes(product.images); // muestro de forma ordenada la galería de imagenes referentes al producto

        } else {
            console.log("Error:" + Http.status);
        }
    }

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            commentsArray = resultObj.data; //recibo los comentarios
            
            mostrarComentariosOrdenados(commentsArray); //paso el array de comentarios a una función que los ordena
            
        }
    });

    const urlRel = "https://japdevdep.github.io/ecommerce-api/product/all.json";
    const relacionados = new XMLHttpRequest();

    relacionados.open("GET", urlRel, true);
    relacionados.send();

    relacionados.onreadystatechange = async (e) => {

        e.preventDefault();
        console.log(relacionados.responseText);
        var prodRel = [];

        if (relacionados.readyState == 4 && relacionados.status == 200) {
            
            prodRel = JSON.parse(relacionados.responseText);
            console.log(prodRel);
            mostrarRelacionados(prodRel);


        } else {
             console.log(relacionados.status);
        }
    }
    document.getElementById('botonazo').addEventListener("click", async() => {
        

        agregarNuevoComentario(commentsArray);
        let cc = [];
       
        cc = JSON.parse(sessionStorage.getItem("arrayComentarioPaso"));
        //console.log(cc);
        mostrarComentariosOrdenados(cc);
        
    
    });

    document.getElementById("exampleFormControlInput1").placeholder = JSON.parse(localStorage.getItem('quienIngreso'));

});

    
// está es una alternativa a URL.searchParams 

/*function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};*/ 


function mostrarComentariosOrdenados(array) {
    let htmlContentToAppend = "";
    for(let i = 0; i < array.length; i++){
        let comentarios = array[i];


        htmlContentToAppend += `
        <a href="#" class="list-group-item list-group-item-action" style="max-width: 60%; height: auto;">
            <div class="row">
                <div class="col-2">
                <img src="avatar2.png" alt="avatar2" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h6 class="sm-2"> Puntaje: `+ "<i class='star-"+ comentarios.score +"' style='color: darkblue'></i> "+"<br>" + ` <br> <br>` + comentarios.description + `<br> <br> Usuario:  ` + comentarios.user + `</h6>
                        
                    </div>
                    <p class="mb-1"> Fecha y hora de publicación: ` + comentarios.dateTime + `</p>
                </div>
            </div>
        </a>
        `  
        document.getElementById("products-comments-list").innerHTML = htmlContentToAppend;
    }
}


/* document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            commentsArray = resultObj.data; //recibo los comentarios

            mostrarComentariosOrdenados(commentsArray); //paso el array de comentarios a una función que los ordena
          

        }
    });
});  */

//obtener fecha y hora actuales
var hoy = new Date();
var date1 = hoy.getFullYear()+'-'+(hoy.getMonth()+1)+'-'+hoy.getDate();
var time1 = hoy.getHours() + ":" + hoy.getMinutes() + ":" + hoy.getSeconds();
let dateTime2 = date1 +' '+ time1;

function agregarNuevoComentario(commentsArray){
    
    
    var nuevoComentario = {

        score: document.getElementById('puntajeEstrellas').value, //document.getElementById('exampleFormControlSelect1').value,
        description: document.getElementById('exampleFormControlTextarea1').value,
        user:  evaluarUsuario(),
        dateTime: dateTime2,
    }

    commentsArray.push(nuevoComentario);
   
    sessionStorage.setItem('arrayComentarioPaso', JSON.stringify(commentsArray));

    //return arrayComentariosAlt;
} 


function mostrarRelacionados(prodRel){

    let nombreProductoHTML  = document.getElementById("nombreProducto");
    let descripcionProductoHTML = document.getElementById("descripcionProducto");
    let cantidadVendidosHTML = document.getElementById("cantidadVendidos");
    let costoProductoHTML = document.getElementById("costoProducto");
    

    nombreProductoHTML.innerHTML = prodRel[1].name; //product.name; 
    descripcionProductoHTML.innerHTML = prodRel[1].description; //descripción
    cantidadVendidosHTML.innerHTML = "Cantidad vendidos:  " + prodRel[1].soldCount; // cantidad de vendidos
    costoProductoHTML.innerHTML = "Costo:  " + prodRel[1].currency + " " + prodRel[1].cost;  // costo o precio producto
   

    let nombreProducto2HTML  = document.getElementById("nombreProducto2");
    let descripcionProducto2HTML = document.getElementById("descripcionProducto2");
    let cantidadVendidos2HTML = document.getElementById("cantidadVendidos2");
    let costoProducto2HTML = document.getElementById("costoProducto2");
    


    nombreProducto2HTML.innerHTML = prodRel[3].name; //product.name; 
    descripcionProducto2HTML.innerHTML = prodRel[3].description; //descripción
    cantidadVendidos2HTML.innerHTML = "Cantidad vendidos: " + prodRel[3].soldCount; // cantidad de vendidos
    costoProducto2HTML.innerHTML = "Costo: " + prodRel[3].currency + " " + prodRel[3].cost;  // costo o precio producto
   
} 

//Para mostrar la fecha y hora
document.getElementById("time").innerHTML = dateTime2; //.toUTCString();;


//star rating dinamico
var $star_rating = $('.star-rating .fa');

var SetRatingStar = function() {
  return $star_rating.each(function() {
    if (parseInt($star_rating.siblings('input.rating-value').val()) >= parseInt($(this).data('rating'))) {
      return $(this).removeClass('fa-star-o').addClass('fa-star');
    } else {
      return $(this).removeClass('fa-star').addClass('fa-star-o');
    }
  });
};

$star_rating.on('click', function() {
  $star_rating.siblings('input.rating-value').val($(this).data('rating'));
  return SetRatingStar();
});

SetRatingStar();
$(document).ready(function() {
});

function evaluarUsuario() {
    if(document.getElementById("exampleFormControlSelect1").value === "Si. Mostrar nombre de usuario")
    {
        JSON.parse(localStorage.getItem('quienIngreso'));

    } else {
        return "Anónimo";
    }
}
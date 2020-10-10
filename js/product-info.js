
let product = [];
let commentsArray = [];
let indiceRelacionados = [];

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
    

    productNameHTML.innerHTML = nombreAt2; 
    productDescriptionHTML.innerHTML = product.description; 
    productSoldCountHTML.innerHTML = product.soldCount; 
    productCategoryHTML.innerHTML = '<a href="category-info.html">' + product.category + '</a>';
    productCostHTML.innerHTML = product.currency + " " + product.cost;  

}


document.addEventListener('DOMContentLoaded', function() {

    const url = new URL("https://japdevdep.github.io/ecommerce-api/product/5678.json"); 
    

    console.log(decodeURI(window.location.search.substring(1)));
  
    let nombreAt2 = decodeURI((window.location.search).substring(1).replace("name=", ""));

    if(!window.location.search) { 
        nombreAt2 = "Chevrolet Onix Joy";
    }
    
    const Http = new XMLHttpRequest(); 

    Http.open("GET", url, true); 
    Http.send();

    Http.onreadystatechange = function(e) { 
    
        e.preventDefault();

        if (Http.readyState == 4 && Http.status == 200) { 
        
         
            product = JSON.parse(Http.responseText); 
            
            mostrarDetallesProducto(nombreAt2, product);  
            indiceRelacionados = product.relatedProducts;

        } else {
            console.log("Error:" + Http.status);
        }
    }

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            commentsArray = resultObj.data; 
            
            mostrarComentariosOrdenados(commentsArray); 
            
        }
    });

    const urlRel = "https://japdevdep.github.io/ecommerce-api/product/all.json";
    const relacionados = new XMLHttpRequest();

    relacionados.open("GET", urlRel, true);
    relacionados.send();

    relacionados.onreadystatechange = async (e) => {

        e.preventDefault();
        var prodRel = [];

        if (relacionados.readyState == 4 && relacionados.status == 200) {
            
            prodRel = JSON.parse(relacionados.responseText);
            mostrarRelacionados(prodRel);


        } else {
             console.log(relacionados.status);
        }
    }
    document.getElementById('botonazo').addEventListener("click", async() => {
        

        agregarNuevoComentario(commentsArray);
        let cc = [];
       
        cc = JSON.parse(sessionStorage.getItem("arrayComentarioPaso"));
        mostrarComentariosOrdenados(cc);
        
    
    });

    document.getElementById("exampleFormControlInput1").placeholder = JSON.parse(localStorage.getItem('quienIngreso'));

   
            

});

    
function mostrarComentariosOrdenados(array) {
    let htmlContentToAppend = "";
    for(let i = 0; i < array.length; i++){
        let comentarios = array[i];


        htmlContentToAppend += `
        <a href="#" class="list-group-item list-group-item-action" style="max-width: 60%; height: auto;">
            <div class="row">
                <div class="col-2">
                <img src="img/avatar2.png" alt="avatar2" class="img-thumbnail">
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



var hoy = new Date();
var date1 = hoy.getFullYear()+'-'+(hoy.getMonth()+1)+'-'+hoy.getDate();
var time1 = hoy.getHours() + ":" + hoy.getMinutes() + ":" + hoy.getSeconds();
let dateTime2 = date1 +' '+ time1;

function agregarNuevoComentario(commentsArray){
    
    
    var nuevoComentario = {

        score: resultadoEstrellas(),  
        description: document.getElementById('exampleFormControlTextarea1').value,
        user:  evaluarUsuario(),
        dateTime: dateTime2,
    }

    commentsArray.push(nuevoComentario);
   
    sessionStorage.setItem('arrayComentarioPaso', JSON.stringify(commentsArray));

    
} 


function mostrarRelacionados(prodRel){

    let htmlContentToAppendRel = "";
    let indiceRel = indiceRelacionados;
    let indexR = 0;
    var nuevo = [];

    for(let j = 0; j < indiceRel.length; j++) {
        
        indexR = indiceRel[j];

        nuevo.push(prodRel[indexR]);
        
    } 

    nuevo.forEach(element => {

            htmlContentToAppendRel += `
                <div class="card">
                <img class="card-img-top" src="${element.imgSrc}" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title">${element.name}</h5>
                    <p class="card-text">${element.description}</p>
                    <ul class="list-group list-group-flush">
                    <li class="list-group-item">${"Cantidad vendidos:  " + element.soldCount}</li>
                    <li class="list-group-item">${"Costo:  " + element.currency + " " + element.cost}</li>
                </ul>
                </div>
                <div class="card-footer">
                <a href="#" class="card-link">Ir al producto</a>
                </div>
            </div> `;
        })
    document.getElementById("productos-relacionados").innerHTML = htmlContentToAppendRel;
} 


document.getElementById("time").innerHTML = dateTime2; 


function evaluarUsuario() {
    if(document.getElementById("exampleFormControlSelect1").value === "Si. Mostrar nombre de usuario")
    {
        return JSON.parse(localStorage.getItem('quienIngreso'));

    } else {
        return "Anónimo";
    }
}


var contador;

function starmark(item)
{
    contador = item.id[0];
    sessionStorage.starRating = contador;
    var subid= item.id.substring(1);
    
    for(var i=0;i<5;i++)
    {
        if(i < contador)
        {
            document.getElementById((i+1)+subid).style.color="#1E90FF";
        } else {
            document.getElementById((i+1)+subid).style.color="black";
        }
    }
}

function resultadoEstrellas()
{
    return contador;
}



function shiftLeft() {
    const boxes = document.querySelectorAll(".box");
    const tmpNode = boxes[0];
    boxes[0].className = "box move-out-from-left";

    setTimeout(function() {
        if (boxes.length > 5) {
            tmpNode.classList.add("box--hide");
            boxes[5].className = "box move-to-position5-from-left";
        }
        boxes[1].className = "box move-to-position1-from-left";
        boxes[2].className = "box move-to-position2-from-left";
        boxes[3].className = "box move-to-position3-from-left";
        boxes[4].className = "box move-to-position4-from-left";
        boxes[0].remove();

        document.querySelector(".cards__container").appendChild(tmpNode);

    }, 500);

}

function shiftRight() {
    const boxes = document.querySelectorAll(".box");
    boxes[4].className = "box move-out-from-right";
    setTimeout(function() {
        const noOfCards = boxes.length;
        if (noOfCards > 4) {
            boxes[4].className = "box box--hide";
        }

        const tmpNode = boxes[noOfCards - 1];
        tmpNode.classList.remove("box--hide");
        boxes[noOfCards - 1].remove();
        let parentObj = document.querySelector(".cards__container");
        parentObj.insertBefore(tmpNode, parentObj.firstChild);
        tmpNode.className = "box move-to-position1-from-right";
        boxes[0].className = "box move-to-position2-from-right";
        boxes[1].className = "box move-to-position3-from-right";
        boxes[2].className = "box move-to-position4-from-right";
        boxes[3].className = "box move-to-position5-from-right";
    }, 500);

}
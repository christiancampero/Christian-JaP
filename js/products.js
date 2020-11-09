
var costoMin = undefined;
var costoMax = undefined;
const ordenarAscendentePorCosto = "$$-/-$$$";
const OrdenarDescendentePorCosto = "$$$-/-$$";
const OrdenarDescendentePorVenta = "Más relevante-/-Menos relevante";


var productsArray = [];


function ordenarProductos(filtro, array) { 
    let resulta = [];
    if (filtro === ordenarAscendentePorCosto) 
    {
        resulta = array.sort(function (a, b) {
            if (a.cost < b.cost) { return -1; } 
            if (a.cost > b.cost) { return 1; } 
            return 0;
        });
    } else if (filtro === OrdenarDescendentePorCosto) {
        resulta = array.sort(function (a, b) {
            if (a.cost > b.cost) { return -1; } 
            if (a.cost < b.cost) { return 1; } 
            return 0;
        });
    } else if (filtro === OrdenarDescendentePorVenta) { 
        resulta = array.sort(function (a, b) {
            if (a.soldCount > b.soldCount) { return -1; } 
            if (a.soldCount < b.soldCount) { return 1; }  
            return 0;
        });
    }

    return resulta;
}



function showProductsList(array) {

    let htmlContentToAppend = "";
    for (let i = 0; i < array.length; i++) {
        let product = array[i];

        if (((costoMin == undefined) || (costoMin != undefined && parseInt(product.cost) >= costoMin)) &&
            ((costoMax == undefined) || (costoMax != undefined && parseInt(product.cost) <= costoMax))) {

            htmlContentToAppend += 
            `
            <div class="col-md-4 product-grid" name="productoS">
                <div class="image-container">
                    <a href="product-info.html?name=`+product.name+`">
                        <img src="${product.imgSrc}" class="image d-block mx-auto">
                    </a>
                    <ul class="social">
                    <li><a href="product-info.html?name=`+product.name+`" data-tip="Quick View"><i class="fa fa-eye"></i></a></li>
                    <li><a href="./cart.html" data-tip="Add to Cart"><i class="fa fa-shopping-cart"></i></a></li>
                    </ul>
                </div>
                <hr class="md">
                <h1>${product.name}</h1>
                <hr>
                <h2>Precio: ${product.currency} ${product.cost}</h2>
                <hr>
                <h2>Vendidos: ${product.soldCount}</h2>
                <hr>
                <p class="mb-1">${product.description}</p>
                <a href="product-info.html?name=`+product.name+`" class="btn buy">COMPRAR</a>
            </div>       
            `;
        }
        document.getElementById("product-list-container").innerHTML = htmlContentToAppend;
    }
}

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            productsArray = resultObj.data;

            productsArray = ordenarProductos(ordenarAscendentePorCosto, productsArray);  

            showProductsList(productsArray); 
        }
    });

    document.getElementById("sortCostAsc").addEventListener("click", function () {
        productsArray = ordenarProductos(ordenarAscendentePorCosto, productsArray); 

        showProductsList(productsArray); 
    });

    document.getElementById("sortCostDesc").addEventListener("click", function () {
        productsArray = ordenarProductos(OrdenarDescendentePorCosto, productsArray); 

        showProductsList(productsArray); 
    });

    document.getElementById("sortCountSoldDesc").addEventListener("click", function () {
        productsArray = ordenarProductos(OrdenarDescendentePorVenta, productsArray);  

        showProductsList(productsArray);  
    });

    document.getElementById("rangoFiltroDefinido1").addEventListener("click", function () {
        

        costoMin = 12500;
        costoMax = 14500;

        if ((costoMin != undefined) && (costoMin != "") && (parseInt(costoMin)) >= 0) {
            costoMin = parseInt(costoMin);
        }
        else {
            costoMin = undefined;
        }

        if ((costoMin != undefined) && (costoMax != "") && (parseInt(costoMax)) >= 0) {
            costoMax = parseInt(costoMax); 
        }
        else {
            costoMax = undefined;
        }


        showProductsList(productsArray); 

    });

    document.getElementById("rangoFiltroDefinido2").addEventListener("click", function () {

        costoMin = 13500;
        costoMax = 15200;

        if ((costoMin != undefined) && (costoMin != "") && (parseInt(costoMin)) >= 0) {
            costoMin = parseInt(costoMin); 
        }
        else {
            costoMin = undefined;
        }

        if ((costoMin != undefined) && (costoMax != "") && (parseInt(costoMax)) >= 0) {
            costoMax = parseInt(costoMax); 
        }
        else {
            costoMax = undefined;
        }

        showProductsList(productsArray); 

    });

    document.getElementById("limpiarFiltro").addEventListener("click", function () {
        document.getElementById("rangoFiltroCostoMin").value = "";
        document.getElementById("rangoFiltroCostoMax").value = "";

        costoMin = undefined;
        costoMax = undefined;

        showProductsList(productsArray); 
    });

    document.getElementById("rangoFiltroCosto").addEventListener("click", function () {

        costoMin = document.getElementById("rangoFiltroCostoMin").value; 
        costoMax = document.getElementById("rangoFiltroCostoMax").value;

        if ((costoMin != undefined) && (costoMin != "") && (parseInt(costoMin)) >= 0) {
            costoMin = parseInt(costoMin); 
        }
        else {
            costoMin = undefined;
        }

        if ((costoMin != undefined) && (costoMax != "") && (parseInt(costoMax)) >= 0) {
            costoMax = parseInt(costoMax); 
        }
        else {
            costoMax = undefined;
        }

        showProductsList(productsArray); 
    });

    document.getElementById("barraBusqueda").addEventListener("keyup", event => {

        mostrarListaProductosBusqueda();
    });


});


function mostrarListaProductosBusqueda() {

    var input, filter, txtValue;
    let buscando = document.getElementsByName("productoS");
    var input = document.getElementById("barraBusqueda");
    filter = input.value.toUpperCase();

    for(let j = 0; j < buscando.length; j++){

        let nodos = buscando[j];
        txtValue = nodos.textContent || nodos.innerText;
        
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            
            nodos.style.display = "";

        } else {
            
            nodos.style.display = "none";
        }
        
    } 
}
 
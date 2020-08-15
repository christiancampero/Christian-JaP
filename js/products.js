const ordenarAscendentePorCosto = "Más barato->Más caro";
const OrdenarDescendentePorVenta = "Más vendido->Menos vendido";
var productsArray = [];

function ordenarProductos(filtro, array){ //función para ordenar los productos por costo y más vendido //sortProducts
    let result = [];
    if (filtro === ordenarAscendentePorCosto) //ordeno de forma ascendente los productos segun costo
    {
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (filtro === OrdenarDescendentePorVenta){ //ordeno de forma descendente los productos segun nro vendidos
        result = array.sort(function(a, b) {
            if ( a.soldCount > b.soldCount ){ return -1; }
            if ( a.soldCount < b.soldCount ){ return 1; }
            return 0;
        });
    }

    return result;
}

function showProductsList(array){

    let htmlContentToAppend = "";
    for(let i = 0; i < array.length; i++){
        let product = array[i];

        htmlContentToAppend += `
        <a href="product-info.html" class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ product.name +` - ` + product.currency + ` ` + product.cost + `</h4>
                        <small class="text-muted">` + product.soldCount + ` vendidos</small>
                    </div>
                    <p class="mb-1">` + product.description + `</p>
                </div>
            </div>
        </a>
        `

        document.getElementById("product-list-container").innerHTML = htmlContentToAppend;
    }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            productsArray = resultObj.data;

            productsArray = ordenarProductos(ordenarAscendentePorCosto, productsArray);  // se ordenan ascendentemente los productos por costo 

            showProductsList(productsArray);  //se muestran los productos de forma ordenada
        }
    });

    document.getElementById("sortCostAsc").addEventListener("click", function(){
        productsArray = ordenarProductos(ordenarAscendentePorCosto, productsArray); //se ordenan los product por costo ascendente

        showProductsList(productsArray); //se muestran los productos ordenados
    });

    document.getElementById("sortCountSoldDesc").addEventListener("click", function(){
        productsArray = ordenarProductos(OrdenarDescendentePorVenta, productsArray);  //se ordenan descendentemente los productos por nro vendidos

        showProductsList(productsArray);  //se muestran los productos ordenados
    });
});
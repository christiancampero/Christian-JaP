/*  Ejemplo del metodo array.sort
    var puntos = [40, 100, 1, 5, 25, 10];
    puntos.sort(function(a, b){return b-a}); // ordena los elementos del array en orden descendente; con return a-b, hago lo opuesto
    //El primer elemento en el array (puntos[0]) ahora es el que tiene mayor valor; lo contrario pasa con return a-b
    
    puntos.sort(); // retorna [1, 10, 2, 21]
    // hay que tener en cuenta que el 10 viene antes que el 2,
    // esto porque '10' viene antes que '2' según la posición del valor Unicode.


    var frutas = ["Banana", "Naranja", "Manzana", "Mango", "Pera"];
    frutas.sort(); //ordeno alfabeticamente
    frutas.reverse(); //revierto el orden (alfabetico descendente)

    otro ejemplo mas practico: 
    function compare(a, b) {
        if (a es menor que b según criterio de ordenamiento) {
            return -1;
        }
        if (a es mayor que b según criterio de ordenamiento) {
            return 1;
        }
        // a debe ser igual b
        return 0;
    }
*/

var costoMin = undefined;
var costoMax = undefined;
const ordenarAscendentePorCosto = "$$-/-$$$";
const OrdenarDescendentePorCosto = "$$$-/-$$";
const OrdenarDescendentePorVenta = "Más relevante-/-Menos relevante";


var productsArray = [];


function ordenarProductos(filtro, array){ //función para ordenar los productos por costo y más vendido //sortProducts
    let resulta= [];
    if (filtro === ordenarAscendentePorCosto) //
    {
        resulta = array.sort(function(a, b) {
            if (a.cost < b.cost){return -1; } // si el costo (accedo por .cost) de un producto a (anterior a un producto b), es menor al de un producto b, se situa a en un indice menor que b 
            if (a.cost > b.cost ){return 1; } // si el costo de un producto a es mayor a un producto b, se situa a en un indice mayor a b
            return 0;
        });
    } else if (filtro === OrdenarDescendentePorCosto) { //
        resulta = array.sort(function (a, b) {
            if (a.cost > b.cost) {return -1; } //si costo de producto a es mayor a costo producto b, se situa el elemento a en un indice menor que al elemento b
            if (a.cost < b.cost) {return 1; } //si costo de producto a es menor a costo de producto b, se situa el elemento a en un indice mayor que al elemento b
            return 0;
        });
    } else if (filtro === OrdenarDescendentePorVenta){ //ordeno de forma descendente los productos segun nro vendidos
        resulta = array.sort(function(a, b) {
            if (a.soldCount > b.soldCount){return -1; } //
            if (a.soldCount < b.soldCount){return 1; }  //
            return 0;
        });
    }  

    return resulta;
}



function showProductsList(array){

    let htmlContentToAppend = "";
    for(let i = 0; i < array.length; i++){
        let product = array[i];

        if (((costoMin == undefined) || (costoMin != undefined && parseInt(product.cost) >= costoMin)) &&
            ((costoMax == undefined) || (costoMax != undefined && parseInt(product.cost) <= costoMax))) {

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
        }
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

            showProductsList(productsArray);  //se muestra el array de productos de forma ordenada
        }
    });

    document.getElementById("sortCostAsc").addEventListener("click", function(){
        productsArray = ordenarProductos(ordenarAscendentePorCosto, productsArray); //se ordenan los product por costo ascendente

        showProductsList(productsArray); //se muestra el array de productos ordenados
    });

    document.getElementById("sortCostDesc").addEventListener("click", function(){
        productsArray = ordenarProductos(OrdenarDescendentePorCosto, productsArray); //se ordenan los product por costo descendente

        showProductsList(productsArray); //se muestra el array de productos ordenado
    });

    document.getElementById("sortCountSoldDesc").addEventListener("click", function(){
        productsArray = ordenarProductos(OrdenarDescendentePorVenta, productsArray);  //se ordenan descendentemente los productos por nro vendidos

        showProductsList(productsArray);  //se muestra el array de productos ordenado
    });

    document.getElementById("rangoFiltroDefinido1").addEventListener("click", function(){
        //productsArray = ordenarProductos(ordenarPorRangoDef, productsArray); //
        
        costoMin = 12500;
        costoMax = 14500; 

        if ((costoMin != undefined) && (costoMin != "") && (parseInt(costoMin)) >= 0) {
            costoMin = parseInt(costoMin); //parseInt convierte un string en un tipo de dato integer (entero, numero)
        }
        else {
            costoMin = undefined;
        }

        if ((costoMin != undefined) && (costoMax != "") && (parseInt(costoMax)) >= 0) {
            costoMax = parseInt(costoMax); //parseInt convierte un string en un tipo de dato integer (entero, numero)
        }
        else {
            costoMax = undefined;
        }
    

        showProductsList(productsArray); //se muestra el array de productos ordenado

    });

    document.getElementById("rangoFiltroDefinido2").addEventListener("click", function(){
       // productsArray = ordenarProductos(ordenarPorRangoDef2, productsArray); //se ordenan los product por costo descendente
       costoMin = 13500;
       costoMax = 15200;

       if ((costoMin != undefined) && (costoMin != "") && (parseInt(costoMin)) >= 0) {
        costoMin = parseInt(costoMin); //parseInt convierte un string en un tipo de dato integer (entero, numero)
        }
        else {
            costoMin = undefined;
        }

        if ((costoMin != undefined) && (costoMax != "") && (parseInt(costoMax)) >= 0) {
            costoMax = parseInt(costoMax); //parseInt convierte un string en un tipo de dato integer (entero, numero)
        }
        else {
            costoMax = undefined;
        }

       showProductsList(productsArray); //se muestra el array de productos ordenado

    });

    document.getElementById("limpiarFiltro").addEventListener("click", function () {
        document.getElementById("rangoFiltroCostoMin").value = "";
        document.getElementById("rangoFiltroCostoMax").value = "";
        
        costoMin = undefined;
        costoMax = undefined;

        showProductsList(productsArray); //se muestra el array de productos ordenado
    });
    
    document.getElementById("rangoFiltroCosto").addEventListener("click", function () {
        
        costoMin = document.getElementById("rangoFiltroCostoMin").value; //se obtienen el mínimo y máximo de los intervalos para filtrar por cantidad
        costoMax = document.getElementById("rangoFiltroCostoMax").value; 

        if ((costoMin != undefined) && (costoMin != "") && (parseInt(costoMin)) >= 0) {
            costoMin = parseInt(costoMin); //parseInt convierte un string en un tipo de dato integer (entero, numero)
        }
        else {
            costoMin = undefined;
        }

        if ((costoMin != undefined) && (costoMax != "") && (parseInt(costoMax)) >= 0) {
            costoMax = parseInt(costoMax); //parseInt convierte un string en un tipo de dato integer (entero, numero)
        }
        else {
            costoMax = undefined;
        }
    
        showProductsList(productsArray); //se muestra el array de productos ordenado
    });

});


/* (function(){
    var inputFilter = document.querySelector("[data-filter]");
     inputFilter.addEventListener("keyup", function(){
  	    var inputValue = this.value, i;
        var filterList = document.getElementById(this.dataset.filter);
        var filterItem = filterList.querySelectorAll("li");
        for(i = 0; i < filterItem.length; i++) {
    		var _this = filterItem[i];
        var phrase = _this.innerHTML; 
    	if (phrase.search(new RegExp(inputValue, "i")) < 0) {
      	_this.style.display = "none";
      } else {
      	_this.style.display = "block";
      }
    }
  });
})();

 */
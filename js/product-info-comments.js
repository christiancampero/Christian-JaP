//para mostrar tiempo actual
var today = new Date();
document.getElementById('time').innerHTML = today;
{/* <marquee behavior="scroll" bgcolor="yellow" loop="-1" width="30%">
   <i>
      <font color="blue">
        Today's date is : 
        <strong>
         <span id="time"></span>
        </strong>           
      </font>
   </i>
</marquee> 
 */}


/* function hacerComentario() {
    function commentPreview(){
        document.getElementById('previewbox').innerHTML = document.getElementById('comentariO').value;
        return false;
    }
    document.getElementById('preview').onclick = commentPreview;
}
window.onload = hacerComentario(); */

document.getElementById('').addEventListener("click", function(){


    
    
        let arrayComentariosAlt = [];

        var nuevoComentario = {

            score: document.getElementById('puntaje').value,
            description: document.getElementById('comment').value,
            user: document.getElementById('comment_author').value,
            dateTime: document.getElementById('').value,
        }

        arrayComentariosAlt.push(nuevoComentario);
        //localStorage.setItem('arrayComentarioPaso', JSON.stringify(arrayComentariosAlt));
    
        return arrayComentariosAlt;
    
});

function mostrarComentariosOrdenados(array) {
    let htmlContentToAppend = "";
    for(let i = 0; i < array.length; i++){
        let comentarios = array[i];


        htmlContentToAppend += `
        <a href="#" class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">

                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h6 class="mb-1"> Puntuación: `+ comentarios.score +` <br> <br>` + comentarios.description + `<br> <br> Usuario:  ` + comentarios.user + `</h6>
                        
                    </div>
                    <p class="mb-1"> Fecha y hora de publicación: ` + comentarios.dateTime + `</p>
                </div>
            </div>
        </a>
        `  
        document.getElementById("products-comments-list").innerHTML = htmlContentToAppend;
    }
}

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            commentsArray = resultObj.data; //recibo los comentarios

            mostrarComentariosOrdenados(commentsArray); //paso el array de comentarios a una función que los ordena
          

        }
    });
}); 

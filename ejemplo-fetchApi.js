const url2 = 'https://pokeapi.co/api/v2/pokemon/1/';

fetch(url2)
  .then(response => response.json())
  .then(data => {

    let elemento = document.getElementById('elem');
    elemento.innerHTML = 
        `<p>${data.name}</p>
        <p>${data.order}</p>
       <img src='${data.sprites.front_default}'/>
       `

    console.log(data);
  })
  .catch(err => console.log(err))




const obtenerData = async() => {
  try {
    const response = await fetch('https://covidtracking.com/api/us');
    const usa = await response.json();
    console.log(response.json);
    covid19 = usa[0];
    
  }
  catch (err) {
    console.log(`Error: ${err}`);
  }
  finally {
    markup = `
      Tests:          ${covid19['totalTestResults']}
      Positive:       ${covid19['positive']}
      Negative:       ${covid19['negative']}
      Hospitalized:   ${covid19['hospitalized']}
      Deaths:         ${covid19['death']}`
    document.getElementById('main').innerText = markup;
  }
};
obtenerData();




/*// creo el elemento
const createNode = (elem) => {
  return document.createElement(elem);
};

// anexo (append) el elemento a un element padre
const appendNode = (parent, elem) => {
  parent.appendChild(elem);
}

//elementos lista
const ul = document.querySelector('#users');
//const ul = document.getElementById('users');

// GitHub api
const url = 'https://api.github.com/users';


fetch(url)
  .then(res => res.json())
  .then(data => {
      // itera sobre los usuarios
      data.map((user) => {
          // creo los elementos
          let li = createNode('li'),
              img = createNode('img'),
              span = createNode('span');
          img.src = user.avatar_url;
          span.innerText = user.login;
          // anexo o añado (append) los elementos
          appendNode(li, img);
          appendNode(li, span);
          appendNode(ul, li);
      });
  }).catch(err => {
      console.error('Error: ', err);
  });*/

  
  
 
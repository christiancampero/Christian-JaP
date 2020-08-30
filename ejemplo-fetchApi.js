
const selectElem = document.querySelector('select#select');

function crearNuevaCajaOpciones(data) {
	const title = data.title;
	if (typeof title != "undefined") {
		const optionBox = document.createElement('option');
		optionBox.innerHTML = title;
		selectElem.appendChild(optionBox);
	}
}

function manipularData(data) {
	for (eachItem in data.countryitems[0]) { //itero con cada item del json
		const singleData = data.countryitems[0][eachItem];

		crearNuevaCajaOpciones(singleData);

		selectElem.addEventListener('change', function(e){
			if (e.target.value == singleData.title) {
				console.log(selectElem);
				//guardo datos en la variable singleData
				let totalCases = singleData.total_cases;
				let totalRecovered = singleData.total_recovered;
				let totalUnresolved = singleData.total_unresolved;
				let totalDeaths = singleData.total_deaths;
				let totalNew_cases_today = singleData.total_new_cases_today;
				let totalNew_deaths_today = singleData.total_new_deaths_today;
				let totalActive_cases = singleData.total_active_cases;
				let totalSerious_cases = singleData.total_serious_cases;


				// Este html tiene un div hijo que contiene cartas para cada dato, como casos, muertes, nuevas muertes
				//& tambien tiene estilos con Bootstrap para dichas cartas y otros elementos
				let cartasDatos = `
				<div class="row justify-content-center">
					<div class="card pl-3 pr-5 py-2 mx-2 my-2 col-md-3 bg-brown">
						<h2 class="mb-2">Casos</h2>
						<p>${totalCases}</p>
					</div>
					<div class="card pl-3 pr-5 py-2 mx-2 my-2 col-md-3 bg-green">
						<h2 class="mb-2">Recuperados</h2>
						<p>${totalRecovered}</p>
					</div>
					<div class="card pl-3 pr-5 py-2 mx-2 my-2 col-md-3 bg-gray">
						<h2 class="mb-2">Sin solución</h2>
						<p>${totalUnresolved}</p>
					</div>
					<div class="card pl-3 pr-5 py-2 mx-2 my-2 col-md-3 bg-red">
						<h2 class="mb-2">Muertes</h2>
						<p>${totalDeaths}</p>
					</div>
					<div class="card pl-3 pr-5 py-2 mx-2 my-2 col-md-3 bg-purple">
						<h2 class="mb-2">Nuevos casos</h2>
						<p>${totalNew_cases_today}</p>
					</div>
					<div class="card pl-3 pr-5 py-2 mx-2 my-2 col-md-3 bg-yellow">
						<h2 class="mb-2">Nuevas muertes</h2>
						<p>${totalNew_deaths_today}</p>
					</div>
					<div class="card pl-3 pr-5 py-2 mx-2 my-2 col-md-3 bg-blue">
						<h2 class="mb-2">Casos activos</h2>
						<p>${totalActive_cases}</p>
					</div>
					<div class="card pl-3 pr-5 py-2 mx-2 my-2 col-md-3 bg-pink">
						<h2 class="mb-2">Casos serios</h2>
						<p>${totalSerious_cases}</p>
					</div>
				</div>
				`;

				const wrapper = document.querySelector(".wrapper");
				wrapper.innerHTML = cartasDatos;
			}
		});
	}
}

const fetchAData = fetch('https://api.thevirustracker.com/free-api?countryTotals=ALL')
	.then((response) => {
		return response.json();
	})
	.then((data) => {
		manipularData(data);
		//manipularData2(data);
	});


/* function manipularData2(data){
	
	let filtrazo = data.filter(elemento => elemento.totalCases >= 2000);
	console.log(filtrazo);

	for(eachItem of data.countryitems[0]) {
		
		const datitos = data.countryitems[0].filter(totalCases);

		document.getElementById("Nuevito").innerHTML += `<p>`+ datitos.text + `<p>`; 
	
	}
} */
const input = document.getElementById("input")
const boton = document.getElementById("boton")

const lugar = document.getElementById("lugar")
let lugarChange = document.getElementById("lugarchange")
const clima = document.getElementById("clima")
let TempChange = document.getElementById("tempchange")
const estado = document.getElementById("estado")
let estadoChange = document.getElementById("estadochange")
const hora = document.getElementById("hora")
let horaChange = document.getElementById("horachange")
const fecha = document.getElementById("fecha")
let fechaChange = document.getElementById("fechachange")

let meses = [
	"Enero", "Febrero", "Marzo",
	"Abril", "Mayo", "Junio", "Julio",
	"Agosto", "Septiembre", "Octubre",
	"Noviembre", "Diciembre"
]

//funcion obtener clima info
const getInfo = (city) => {
    fetch(`https://community-open-weather-map.p.rapidapi.com/find?q=${city}&units=metric&lang=sp`, {
	"headers": {
		"x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
		"x-rapidapi-key": "2255e0f702msh65a299ee814f53ep19ef2ejsn0917afff66bd"	
	}
})
.then(res => res.json()) //Para leer los datos
.then(res =>{ //Aca diras que hara con esos datos, pedis hora, clima, etc
	const data = res
	//Aca le digo que la data que recolecto de fetch lo pase como parametro a cada funcion
	getHour(data)
	getLugar(data)
	getTemp(data)
	getStatus(data)
	getFecha(data)
})
}

//funcion obtener hora
const getHour = (obj) =>{
	//obj.list[0].dt lugar donde esta la hora dentro de la info recolectada de fetch
	let dayHour = new Date(obj.list[0].dt*1000).getHours();
	let dayMinute = new Date(obj.list[0].dt*1000).getMinutes();
	let daySeconds = new Date(obj.list[0].dt*1000).getSeconds();
	//En caso de que sea menor a 10 algun tiempo agregue un 0
	if(dayHour < 10){
		dayHour = "0" + dayHour
	};
	if(dayMinute < 10){
		dayMinute = "0" + dayMinute
	};
	if(daySeconds < 10){
		daySeconds = "0" + daySeconds
	};
	//Extraer la hora al HTML
	horaChange.textContent = `Actualmente son las ${dayHour}:${dayMinute}:${daySeconds}`

}

//Funcion obtener lugar
const getLugar = (obj) =>{
	//Lugar donde se encuentra la info que pedire
	let lugar = (obj.list[0].name);
	let country = (obj.list[0].sys.country)
	//Extraer el lugar al HTML
	lugarChange.textContent = `${lugar}, ${country}`
}

//Funcion obtener temperatura
const getTemp = (obj) => {
	//Lugar donde se encuentra la info que pedire
	let Temp = Math.floor(obj.list[0].main.temp);
	//Extraer la temperatura al HTML
	TempChange.textContent = `${Temp}°C`
}

//Funcion obtener status
const getStatus = (obj) => {
	console.log(obj)
	//Lugar donde se encuentra la info que pedire
	let status = (obj.list[0].weather[0].description);
	//Extraer el estado al HTML
	estadoChange.textContent = `${status}`
}

//Funcion obtener fecha
const getFecha = (obj) => {
	//Aca saco la fecha basandome en el obj que seria la info de fetch de la API
	let date = new Date(obj.list[0].dt*1000).getDate()
	let mounth = new Date(obj.list[0].dt*1000).getMonth()
	let year = new Date(obj.list[0].dt*1000).getFullYear()
	fechaChange.textContent = `Hoy es ${date} de ${meses[mounth]} del ${year}`
	
}
//El boton lo pasa a input.value como city en la funcion getWeather
boton.addEventListener("click" , (e) => {
	e.preventDefault()
	if(input.value == ""){
		alert("Ingrese una localizacion")
	}else{
		getInfo(input.value)
	}
})








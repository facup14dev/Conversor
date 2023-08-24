function cotizar() {

    let valore = parseInt(document.getElementById("valor").value);
    let resultado = 0;
    let dolar = 730;
    let euro = 770;
    let real = 71.88
    let chileno = 2.44

    if (valore == 0) {
        alert("No puedes convertir ese valor.")
        return;
    }

    if (document.getElementById("uno").checked ){
        resultado = valore / dolar;
        alert("El cambio de pesos argentinos a dolares es: u$d " + resultado.toFixed(2))
    }
    else if (document.getElementById("dos").checked) {
        resultado = valore / euro;
        alert("El cambio de pesos argentinos a euros es: E$ " + resultado.toFixed(2))
    }
    else if (document.getElementById("tres").checked) {
        resultado = valore / real;
        alert("El cambio de pesos argentinos a reales es R$ " + resultado.toFixed(2))
    }
    else if (document.getElementById("cuatro").checked) {
        resultado = valore * chileno; //multiplico porque la moneda chilena es inferior a la argentina a diferencia de las otras.
        alert("El cambio de pesos argentinos a chilenos es $ " + resultado.toFixed(2))
    }
    else {
        alert("Tienes que completar los campos para poder convertir")
    }
}

//Contador de veces covertido
const boton = document.getElementById("convertor");
const contador = document.getElementById("contador");

let vecesPresionado = 0;

boton.addEventListener('click', () => {

    vecesPresionado++;
    contador.textContent = vecesPresionado;
});


//Array de las monedas
const tasasDeCambio = [
    { moneda: "USD", tasaCompra: 715, tasaVenta: 725 },
    { moneda: "EUR", tasaCompra: 788, tasaVenta: 799 },
    { moneda: "BRL", tasaCompra: 71.88, tasaVenta: 75.85 },
    { moneda: "CLP", tasaCompra: 0.41, tasaVenta: 0.60 },
];

const ul = document.getElementById("tasasDeCambio");
const filtroInput = document.getElementById("filtro");

//Agrego el array al listado
function mostrarTasasDeCambio(filtro) {
    ul.innerHTML = "";

    tasasDeCambio.forEach(tasa => {
        if (tasa.moneda.toLowerCase().includes(filtro.toLowerCase())) {
            const li = document.createElement("li");
            li.innerHTML = `
                <strong>${tasa.moneda}:</strong> Compra: ${tasa.tasaCompra} - Venta: ${tasa.tasaVenta}
            `;
            ul.appendChild(li);
        }
    });
}
//Filtro 
filtroInput.addEventListener("input", () => {
    mostrarTasasDeCambio(filtroInput.value);
});

//Reseteo el filtro cada vez que cargue la pág
mostrarTasasDeCambio("");



// Obtener la fecha actual
const fechaActual = new Date()

const dia = fechaActual.getDate()
const mes = String(fechaActual.getMonth() + 1).padStart(2, "0");
const año = fechaActual.getFullYear()

// Formatear la fecha como "dd/mm/yyyy"
const fechaFormateada = `${dia}/${mes}/${año}`;


const elementoFecha = document.getElementById("fecha");
elementoFecha.textContent = `Valores tomados a la fecha: ${fechaFormateada}`;
async function obtenerDatos() {
    try {
      // Realizar una solicitud GET a una API
      const respuesta = await fetch('https://dolarapi.com/v1/dolares/blue');
  
      // Verificar si la solicitud fue exitosa (código de respuesta 200)
      if (!respuesta.ok) {
        throw new Error('La solicitud no pudo ser completada.');
      }
  
      // Convertir la respuesta a formato JSON
      const datos = await respuesta.json();
  
    } catch (error) {
      // Capturar y manejar cualquier error que ocurra durante la solicitud
      console.error('Error:', error.message);
    } finally {
      // Este bloque finally se ejecutará siempre, independientemente de si hubo éxito o error
      console.log('La solicitud ha finalizado.');
    }
}
  
console.log(obtenerDatos());

function cotizar() {

    const valorConvertir = parseInt(document.getElementById("valor").value);
    let resultado = 0;
    let dolar = 730;
    let euro = 770;
    let real = 71.88
    let chileno = 2.44

    if (isNaN(valorConvertir) ) {//Si no ingresa nada en el input arrojo error con sweetAlert
        Swal.fire({
            title: '<strong>Debes ingresar un valor para la conversion.</strong>',
            icon: 'error',
            showCancelButton: true,
            cancelButtonColor: '#d33',
            cancelButtonText : 'OK',
            showConfirmButton: false
          })
          return;
    }

    if (document.getElementById("uno").checked ){

        resultado = valorConvertir / dolar;
        mostrarResultado("El cambio de pesos argentinos a dolares es u$d " + resultado.toFixed(2))
        guardarConversion(valorConvertir, "ARS", "U$D", resultado);

    } else if (document.getElementById("dos").checked) {

        resultado = valorConvertir / euro;
        mostrarResultado("El cambio de pesos argentinos a euros es € " + resultado.toFixed(2))
        guardarConversion(valorConvertir, "ARS", "€", resultado);

    } else if (document.getElementById("tres").checked) {

        resultado = valorConvertir / real;
        mostrarResultado("El cambio de pesos argentinos a reales es R$ " + resultado.toFixed(2))
        guardarConversion(valorConvertir, "ARS", "R$", resultado);

    } else if (document.getElementById("cuatro").checked) {

        resultado = valorConvertir * chileno; //multiplico porque la moneda chilena es inferior a la argentina a diferencia de las otras.
        mostrarResultado("El cambio de pesos argentinos a chilenos es $ " + resultado.toFixed(2))
        guardarConversion(valorConvertir, "ARS", "CHL", resultado);

    } else {
        mostrarResultado("Tienes que completar los campos para poder convertir")
    }

    function mostrarResultado(mensaje) {
        Swal.fire({
            title: '<strong>CONVERSION EXITOSA</strong>',
            icon: 'success',
            html: `<strong>${mensaje}</strong>` ,
            showCloseButton: true,
            confirmButtonColor: 'rgb(74, 119, 77)'
          })
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


//Array de objetos de las monedas
const tasasDeCambio = [
    { moneda: "USD", tasaCompra: 715, tasaVenta: 725 },
    { moneda: "EUR", tasaCompra: 788, tasaVenta: 799 },
    { moneda: "BRL", tasaCompra: 71.8, tasaVenta: 75.8 },
    { moneda: "CLP", tasaCompra: 0.41, tasaVenta: 0.61 },
];

const enJSON = JSON.stringify(tasasDeCambio);

localStorage.setItem('tasasDeCambio', enJSON);
 
const ul = document.getElementById("tasasDeCambio");
const filtroInput = document.getElementById("filtro");

//Agrego el array al listado del front
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


const fechaActual = new Date()
const dia = fechaActual.getDate()
const mes = String(fechaActual.getMonth() + 1).padStart(2, "0"); //hago ésto para agregarle el 0 adelante del month
const año = fechaActual.getFullYear()

// Formatear la fecha como "dd/mm/yyyy"
const fechaFormateada = `${dia}/${mes}/${año}`;

const elementoFecha = document.getElementById("fecha");
elementoFecha.textContent = `Valores tomados a la fecha: ${fechaFormateada}`;

//GUARDO LA CONVERSION EN EL LOCALSTORAGE CADA VEZ QUE REALICE UNA CONVERSION
function guardarConversion(monto, monedaOrigen, monedaDestino, resultado) {
    const conversion = {
        fecha: new Date().toLocaleString(),
        montoConvertido: monto,
        monedaOrigen: monedaOrigen,
        monedaDestino: monedaDestino,
        resultado: resultado.toFixed(2),
    };

    const historial = JSON.parse(localStorage.getItem('historial')) || [];

    historial.push(conversion);

    localStorage.setItem('historial', JSON.stringify(historial));

    actualizarTablaHistorial(historial);
}

function actualizarTablaHistorial(historial) {
    const historialTabla = document.getElementById('historialTabla');
    historialTabla.innerHTML = '';

    historial.forEach(conversion => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${conversion.fecha}</td>
            <td>${conversion.montoConvertido} ${conversion.monedaOrigen}</td>
            <td>${conversion.resultado} ${conversion.monedaDestino}</td>
        `;
        historialTabla.appendChild(fila);
    });
}


//BORRAR HISTORIAL
function borrarHistorial() {
    localStorage.removeItem('historial');
    actualizarTablaHistorial([]);
}

const botonBorrarHistorial = document.getElementById('borrarHistorial');

botonBorrarHistorial.addEventListener('click', borrarHistorial);
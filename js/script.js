//API
async function datosApi() {
    try {

        const respuesta = await fetch('https://dolarapi.com/v1/dolares/blue');
        
        if (!respuesta.ok) {
          throw new Error('La solicitud no pudo ser completada.');
        }
  
        const datos = await respuesta.json();  
        return datos;

    } catch (error) {

      console.error('Error:', error.message);

    } finally {

      console.log('La solicitud ha finalizado.');
      
    }
}
  
//FUNC PRINCIPAL
async function cotizar() {

    try { 

        const datosAPI = await datosApi();
        
        const valorConvertir = parseInt(document.getElementById("valor").value);
        let resultado = 0;
        
        const dolar = datosAPI.venta;
        let euro = 770;
        let real = 71.88
        let chileno = 2.44
        let uruguayo = 0.10
        let boliviano = 0.01
        
        
        if (isNaN(valorConvertir) ) {//Si no ingresa nada en el input arrojo error con sweetAlert
            Swal.fire({
                title: '<strong>Debes ingresar un valor numerico para la conversion.</strong>',
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
            mostrarResultado("El cambio de $ " + valorConvertir + " pesos argentinos a dolares es u$d " + resultado.toFixed(2))
            guardarConversion(valorConvertir, "ARS", "U$D", resultado);
        
        } else if (document.getElementById("dos").checked) {
        
            resultado = valorConvertir / euro;
            mostrarResultado("El cambio de $ " + valorConvertir + " pesos argentinos a euros es € " + resultado.toFixed(2))
            guardarConversion(valorConvertir, "ARS", "€", resultado);
        
        } else if (document.getElementById("tres").checked) {
        
            resultado = valorConvertir / real;
            mostrarResultado("El cambio de $ " + valorConvertir + " pesos argentinos a reales es R$ " + resultado.toFixed(2))
            guardarConversion(valorConvertir, "ARS", "R$", resultado);
        
        } else if (document.getElementById("cuatro").checked) {
        
            resultado = valorConvertir * chileno; //multiplico porque la moneda chilena es inferior a la argentina a diferencia de las otras.
            mostrarResultado("El cambio de $ " + valorConvertir + " pesos argentinoss a pesos chilenos es $" + resultado.toFixed(2))
            guardarConversion(valorConvertir, "ARS", "CHL", resultado);
        
        } else if (document.getElementById("cinco").checked) {
        
            resultado = valorConvertir / uruguayo; 
            mostrarResultado("El cambio de $ " + valorConvertir + " pesos argentinoss a pesos uruguayos es $U " + resultado.toFixed(2))
            guardarConversion(valorConvertir, "ARS", "UYU", resultado);
        
        } else if (document.getElementById("seis").checked) {
        
            resultado = valorConvertir / boliviano;
            mostrarResultado("El cambio de $ " + valorConvertir + " pesos argentinos a pesos bolivianos es $b " + resultado.toFixed(2))
            guardarConversion(valorConvertir, "ARS", "BOB", resultado);
        
        } else {
            mostrarResultado("Tienes que completar los campos para poder convertir")
        }

    } catch (error) {
        console.error('Error:', error.message);
    } finally {

    console.log('La solicitud ha finalizado.');
    
  }

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
    { moneda: "USD", tasaCompra: 740, tasaVenta: 725 },
    { moneda: "EUR", tasaCompra: 788, tasaVenta: 799 },
    { moneda: "BRL", tasaCompra: 71.8, tasaVenta: 75.8 },
    { moneda: "CLP", tasaCompra: 0.41, tasaVenta: 0.61 },
    { moneda: "UYU", tasaCompra: 0.11, tasaVenta: 0.34 },
    { moneda: "BOB", tasaCompra: 0.01, tasaVenta: 0.07 },
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

//GUARDO LA CONVERSION EN EL LOCALSTORAGE CADA VEZ QUE REALICE UNA CONVERSION ->funcion cotizar()

const historial = JSON.parse(localStorage.getItem('historial')) || [];

function guardarConversion(monto, monedaOrigen, monedaDestino, resultado) {
    const conversion = {
        fecha: new Date().toLocaleString(),
        montoConvertido: monto,
        monedaOrigen: monedaOrigen,
        monedaDestino: monedaDestino,
        resultado: resultado.toFixed(2),
    };

    historial.push(conversion);

    localStorage.setItem('historial', JSON.stringify(historial));

    actualizarTablaHistorial(historial);//actualizo la tabla del historial
}

function actualizarTablaHistorial(historial) {

    const historialTabla = document.getElementById('historialTabla');
    historialTabla.innerHTML = '';

    const inicioI = (paginaActual - 1) * elementosPorPagina;
    const finalI = inicioI + elementosPorPagina;

    historial.slice(inicioI, finalI).forEach(conversion => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${conversion.fecha}</td>
            <td>${conversion.montoConvertido} ${conversion.monedaOrigen}</td>
            <td>${conversion.resultado} ${conversion.monedaDestino}</td>
        `;
        historialTabla.appendChild(fila);
    });
}

const botonBorrarHistorial = document.getElementById('borrarHistorial');

botonBorrarHistorial.addEventListener('click', borrarHistorial);

//Paginación
const elementosPorPagina = 5;
let paginaActual = 1;

const paginaSiguiente = document.getElementById('paginaSiguiente');
const paginaAnterior = document.getElementById('paginaAnterior');

paginaSiguiente.addEventListener('click', () => {

    const totalPages = Math.ceil(historial.length / elementosPorPagina); //con math.floor no me funcionaba porque redondea hacia abajo.

    if (paginaActual < totalPages) {
        paginaActual++;
        actualizarTablaHistorial(historial);
        actualizarIndicadorPagina();
    }
});

paginaAnterior.addEventListener('click', () => {

    if (paginaActual > 1) {
        paginaActual--;

        actualizarTablaHistorial(historial);
        actualizarIndicadorPagina();
    }
});

//cargo los datos segun la página
function mostrarElementosEnPagina(pagina, historial) {

    const historialTabla = document.getElementById('historialTabla');
    historialTabla.innerHTML = '';

    const inicioI = (pagina - 1) * elementosPorPagina;
    const finalI = inicioI + elementosPorPagina;
    
    for (let i = inicioI; i < finalI && i < historial.length; i++) {
        const conversion = historial[i];
        const fila = document.createElement('tr');

        fila.innerHTML = `
            <td>${conversion.fecha}</td>
            <td>${conversion.montoConvertido} ${conversion.monedaOrigen}</td>
            <td>${conversion.resultado} ${conversion.monedaDestino}</td>
        `;

        historialTabla.appendChild(fila);
    }
}

//actualizo el número de página.
function actualizarIndicadorPagina() {
    const paginaActualElement = document.getElementById('paginaActual');

    paginaActualElement.textContent = `${paginaActual}`;
}

mostrarElementosEnPagina(paginaActual, historial);
actualizarIndicadorPagina();


//BORRAR HISTORIAL
function borrarHistorial() {
    localStorage.removeItem('historial');
    actualizarTablaHistorial([]);
}
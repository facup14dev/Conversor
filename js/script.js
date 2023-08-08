function cotizar() {

    var valore = parseInt(document.getElementById("valor").value);
    var resultado = 0;
    var dolar = 600;
    var euro = 640;

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
    else {
        alert("Tienes que completar los campos para poder convertir")
    }
    }

    const boton = document.getElementById("convertor");
    const contador = document.getElementById("contador");

    var vecesPresionado = 0;

    boton.addEventListener('click', () => {

      vecesPresionado++;
      
      contador.textContent = vecesPresionado;
    });
const desplazamiento = document.getElementById("desplazamiento");
const texto = document.getElementById("texto");
const textoCifrado = document.getElementById("cifrado");
const descifrarBoton = document.getElementById("descifrarBoton");

function cifrado() {
    const textoIngresado = texto.value;
    let valorDesplazamiento = parseInt(desplazamiento.value);

   
    if (valorDesplazamiento < 1) {
        valorDesplazamiento = 1;
    } else if (valorDesplazamiento > 1000) {
        valorDesplazamiento = 1000;
    }

    textoCifrado.value = textoIngresado.split('').map(c => {
        let mayus = (c === c.toUpperCase()) ? true : false;
        let valorEntero = c.toLowerCase().charCodeAt(0);

        if (valorEntero >= 97 && valorEntero <= 122) {
            valorEntero = (valorEntero - 97 + valorDesplazamiento) % 26 + 97; 
        }

        let cifrado = String.fromCharCode(valorEntero);
        return mayus ? cifrado.toUpperCase() : cifrado;
    }).join('');
}

function descifrado() {
    const textoIngresado = texto.value;
    let valorDesplazamiento = parseInt(desplazamiento.value);

    // Asegurarse de que el valor de desplazamiento esté en el rango de 1 a 1000
    if (valorDesplazamiento < 1) {
        valorDesplazamiento = 1;
    } else if (valorDesplazamiento > 1000) {
        valorDesplazamiento = 1000;
    }

    textoCifrado.value = textoIngresado.split('').map(c => {
        let mayus = (c === c.toUpperCase()) ? true : false;
        let valorEntero = c.toLowerCase().charCodeAt(0);

        if (valorEntero >= 97 && valorEntero <= 122) {
            valorEntero = (valorEntero - 97 - valorDesplazamiento + 26) % 26 + 97;
        }

        let descifrado = String.fromCharCode(valorEntero);
        return mayus ? descifrado.toUpperCase() : descifrado;
    }).join('');
}

texto.addEventListener("input", cifrado);
desplazamiento.addEventListener("input", cifrado);
descifrarBoton.addEventListener("click", descifrado);

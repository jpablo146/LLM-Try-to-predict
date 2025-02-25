const frases = [
    "Dentro de nosotros hay palabras que nunca diremos.",
    "Nada es real hasta que no lo vivimos.",
    "La peor ceguera es la de aquel que no quiere ver."
];

let fraseActual = frases[0].split(" ");
let fraseJugador = Array(fraseActual.length).fill("_");
fraseJugador[0] = fraseActual[0]; // Mostrar solo la primera palabra
let fraseErrores = Array(fraseActual.length).fill(""); // Guarda errores
let indicePalabra = 1;
let puntos = 0;
let tiempoRestante = 120;
let juegoTerminado = false;

document.getElementById("frase-jugador").innerHTML = mostrarFrase();
document.getElementById("puntos").innerText = `Puntos: ${puntos}`;
document.getElementById("temporizador").innerText = `Tiempo: ${tiempoRestante}s`;

const temporizador = setInterval(() => {
    if (tiempoRestante > 0) {
        tiempoRestante--;
        document.getElementById("temporizador").innerText = `Tiempo: ${tiempoRestante}s`;
    } else {
        finalizarJuego();
    }
}, 1000);

function validarPalabra() {
    if (juegoTerminado) return;
    
    let input = document.getElementById("input-palabra");
    let palabraIngresada = input.value.trim().toLowerCase();
    
    if (indicePalabra < fraseActual.length) {
        if (palabraIngresada === fraseActual[indicePalabra].toLowerCase()) {
            fraseJugador[indicePalabra] = `<span class="correct">${fraseActual[indicePalabra]}</span>`;
            puntos++;
        } else {
            fraseJugador[indicePalabra] = `<span class="incorrect">[${palabraIngresada}]</span>`;
            fraseErrores[indicePalabra] = `<span class="correct">${fraseActual[indicePalabra]}</span>`;
        }
        indicePalabra++;
    }

    input.value = "";
    document.getElementById("frase-jugador").innerHTML = mostrarFrase();
    document.getElementById("frase-errores").innerHTML = mostrarErrores();
    document.getElementById("puntos").innerText = `Puntos: ${puntos}`;

    if (indicePalabra === fraseActual.length) {
        finalizarJuego();
    }
}

function mostrarFrase() {
    return fraseJugador.join(" ");
}

function mostrarErrores() {
    return fraseErrores.join(" ");
}

function finalizarJuego() {
    clearInterval(temporizador);
    juegoTerminado = true;
    document.getElementById("mensaje").innerText = "¡Juego terminado!";
    document.getElementById("frase-final").innerHTML = `Frase completa: <span class="final">${fraseActual.join(" ")}</span>`;
    document.getElementById("frase-final").classList.remove("hidden");
}

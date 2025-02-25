const frases = [
    "Dentro de nosotros hay palabras que nunca diremos.",
    "Nada es real hasta que no lo vivimos.",
    "La peor ceguera es la de aquel que no quiere ver.",
    "Las palabras nos definen, pero el silencio nos revela.",
    "El mundo cambia con el tiempo, pero los hombres no tanto.",
    "Lo difícil no es vivir con otros, sino comprenderlos.",
    "En cada hombre hay un pozo de incertidumbre.",
    "Los recuerdos son la única patria que nos queda.",
    "El caos es un orden por descifrar.",
    "Lo más difícil de aprender en la vida es qué puente hay que cruzar y qué puente hay que quemar.",
    "El destino no está escrito, lo construimos con cada elección.",
    "Vemos solo lo que queremos ver, lo demás es invisible.",
    "El amor no es ciego, pero a veces se niega a ver.",
    "La historia del hombre es la historia de sus equivocaciones.",
    "No hay mayor esclavitud que la que no se reconoce.",
    "Un hombre solo tiene derecho a mirar a otro hacia abajo cuando va a ayudarlo a levantarse.",
    "La lucidez es un estado doloroso del alma.",
    "Nadie se salva solo, o nos salvamos juntos o nos hundimos.",
    "La verdadera sabiduría está en reconocer la propia ignorancia.",
    "La esperanza es la peor de las mentiras, porque prolonga el sufrimiento."
];

let fraseActual;
let fraseJugador;
let fraseErrores;
let indicePalabra;
let puntos = 0;
let tiempoRestante = 120;
let juegoTerminado = false;

// Función para iniciar una nueva frase aleatoria
function nuevaFrase() {
    fraseActual = frases[Math.floor(Math.random() * frases.length)].split(" ");
    fraseJugador = Array(fraseActual.length).fill("_");
    fraseJugador[0] = fraseActual[0]; // Mostrar la primera palabra
    fraseErrores = Array(fraseActual.length).fill(""); // Guarda errores
    indicePalabra = 1;
    tiempoRestante = 120;
    juegoTerminado = false;

    document.getElementById("frase-jugador").innerHTML = mostrarFrase();
    document.getElementById("frase-errores").innerHTML = "";
    document.getElementById("mensaje").innerText = "";
    document.getElementById("frase-final").classList.add("hidden");
    document.getElementById("puntos").innerText = `Puntos: ${puntos}`;
    document.getElementById("temporizador").innerText = `Tiempo: ${tiempoRestante}s`;
}

// Temporizador
const temporizador = setInterval(() => {
    if (tiempoRestante > 0) {
        tiempoRestante--;
        document.getElementById("temporizador").innerText = `Tiempo: ${tiempoRestante}s`;
    } else {
        finalizarJuego();
    }
}, 1000);

// Validar palabra al presionar Enter
document.getElementById("input-palabra").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        validarPalabra();
    }
});

// Validar palabra ingresada
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
    input.focus();

    document.getElementById("frase-jugador").innerHTML = mostrarFrase();
    document.getElementById("frase-errores").innerHTML = mostrarErrores();
    document.getElementById("puntos").innerText = `Puntos: ${puntos}`;

    if (indicePalabra === fraseActual.length) {
        setTimeout(nuevaFrase, 2000); // Espera 2 segundos y carga otra frase
    }
}

// Mostrar la frase progresivamente
function mostrarFrase() {
    return fraseJugador.join(" ");
}

// Mostrar errores debajo
function mostrarErrores() {
    return fraseErrores.join(" ");
}

// Finalizar juego cuando se acabe el tiempo
function finalizarJuego() {
    clearInterval(temporizador);
    juegoTerminado = true;
    document.getElementById("mensaje").innerText = "¡Tiempo agotado!";
    document.getElementById("frase-final").innerHTML = `Frase completa: <span class="final">${fraseActual.join(" ")}</span>`;
    document.getElementById("frase-final").classList.remove("hidden");
}

// Iniciar la primera frase
nuevaFrase();

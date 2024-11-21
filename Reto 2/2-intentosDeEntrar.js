/*
Desafío 2: Detectando acceso no deseado
Creo que ΩMEGA está intentando entrar en el sistema. Por ahora, es un bebé y está siguiendo patrones muy sencillos que podemos detectar pero está intentando crear contraseñas de administrador para acceder a la terminal.

¿Cómo podemos detectar estos intentos de acceso? Está siguiendo estos patrones:

· Sólo usa letras minúsculas y dígitos.
· Nunca usa dígitos después de una letra (Una vez aparecen letras, la contraseña debe continuar solo con letras)
· Si usa dígitos, siempre los usa de forma igual o creciente (si sale un 3, ya no usará después un número menor)
· Si usa letras, siempre las usa en orden alfabético igual o creciente (si sale una "b" ya no podrá usar una "a", por ejemplo)
Algunos ejemplos para que lo entiendas perfectamente:

1234     -> true
abc      -> true
aabbcc   -> true (repite pero siempre ascendente)
112233   -> true (repite pero siempre ascendente)
a123     -> false (un número después de una letra)
123abc   -> true
dbce     -> false (una "d" y después una "b")
Accede a este log.txt con una lista de intentos y con un programa cuenta cuántos han sido inválidos y cuántos válidos. Envía la respuesta usando el comando submit.

Por ejemplo, si hay 10 intentos válidos y 5 inválidos envía el comando submit 10true5false
*/

function detectarAccesoNoDeseadoDeOmega(intentos) {
    // Comprueba si hay mayúsculas
    if (tieneMayusculas(intentos)) {
        return false;
    }
    // Comprueba si hay dígitos después de letras
    if (tieneDigitoDespuesDeLetra(intentos)) {
        return false;
    }
    // Comprueba si los caracteres están en orden ascendente
    if (!estaEnOrdenAscendente(intentos)) {
        return false;
    }

    // Si no se cumple ninguna de las condiciones anteriores, la contraseña es válida
    return true;
}

function tieneMayusculas(str) {
    return /[A-Z]/.test(str);
}

function tieneDigitoDespuesDeLetra(str) {
    return /[a-z][0-9]/.test(str);
}

function estaEnOrdenAscendente(str) {
    let lista = str.split("");
    lista.sort();
    return str === lista.join("");
}

// let lista = "aabbcc".split("");
// lista.sort();
// console.log(lista);


const fs = require('fs'); // Importa el módulo del sistema de archivos (fs) para interactuar con el sistema de archivos.
const readline = require('readline'); // Importa el módulo readline para leer datos de un flujo de entrada línea por línea.

let intentosDeAcceso = []; // Variable global para almacenar las líneas del archivo.

async function leerArchivoLineaPorLinea(rutaArchivo) {
    const fileStream = fs.createReadStream(rutaArchivo); // Crea un flujo de lectura desde el archivo especificado por rutaArchivo.
    const rl = readline.createInterface({
        input: fileStream, // Usa el flujo de lectura como entrada para readline.
        crlfDelay: Infinity // Maneja correctamente los finales de línea en diferentes sistemas operativos.
    });

    const lineas = []; // Array para almacenar las líneas leídas del archivo.

    for await (const linea of rl) { // Itera sobre cada línea del archivo de forma asíncrona.
        lineas.push(linea); // Añade cada línea al array lineas.
    }

    return lineas; // Devuelve el array de líneas leídas.
}

async function main() {
    const listaDeIntentosDeAcceso = await leerArchivoLineaPorLinea('./log.txt'); // Llama a la función para leer el archivo y espera a que termine, luego asigna el resultado a la variable global intentosDeAcceso.
    // console.log(listaDeIntentosDeAcceso); // Imprime el array de líneas leídas en la consola.
    // Itera sobre cada línea de intentos de acceso y verifica si es válido o no, y esa respuesta la guarda en un array
    const resultados = listaDeIntentosDeAcceso.map((intento) => detectarAccesoNoDeseadoDeOmega(intento));
    console.log(resultados); // Imprime el array de resultados en la consola.
    // Cuenta cuántos intentos son válidos y cuántos no
    const validos = resultados.filter((resultado) => resultado).length;
    const invalidos = resultados.filter((resultado) => !resultado).length;
    console.log(`Intentos válidos: ${validos}, intentos inválidos: ${invalidos}`);
    console.log(`${validos}true${invalidos}false`); // 299true198false
}

main(); // Llama a la función main para ejecutar el código.

//Intentos válidos: 299, intentos inválidos: 198
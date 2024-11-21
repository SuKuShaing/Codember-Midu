/* 
Desafío 1: ¡Consigue acceso a la terminal!
Estamos en problemas. La IA ΩMEGA está descontrolada. Por suerte, he conseguido añadir una contraseña para evitar que acceda a esta terminal. El sistema no es difícil, pero nos debería dar el tiempo suficiente.

Te voy a dar una lista de números y, al lado, los movimientos que debes hacer en estos números. Imagina los candados numéricos esos que van con combinaciones.


El número de la izquierda es la combinación inicial y las cadenas de texto de la derecha son los movimientos que debes hacer.

Siempre empezamos del primer número de la izquierda. Los movimientos son:

R (Right)  movernos al siguiente dígito
L (Left)   desplazarnos al dígito anterior
U (Up)     incrementar ese dígito
D (Down)   decrementar el dígito actual
Si llegamos a la derecha del todo y recibimos un R, volvemos al primer dígito. Si recibimos L y estamos en el primero, vamos al último. En el caso de que el dígito actual sea 9 y recibamos una U, pasará a 0. Y si es D y ese dígito es 0, pasará a ser 9.

¿Lo entiendes? ¡Es muy importante que lo entiendas! Mira, te dejo unos ejemplos:

000 URURD -> 119
1111 UUURUUU -> 4411
9999 LULULULD -> 8000
¿Lo captas? Vale, pues para desbloquear la terminal debes enviar el número al ejecutar esta combinación:

528934712834 URDURUDRUDLLLLUUDDUDUDUDLLRRRR

¡Date prisa! ¡No tenemos mucho tiempo!
*/

function desencriptar(numero, movimientos) {
	// Convertir el número que viene como string a un array de números
	let numeroArray = numero.split("").map(Number);
	let movimientosArray = movimientos.split("");
	// copiamos el array de números para no modificar el original
	let resultado = [...numeroArray];
	let indice = 0;
    
	// Recorrer los movimientos
	for (let i = 0; i < movimientosArray.length; i++) {
        let movimiento = movimientosArray[i];

		// Si el movimiento es U
		if (movimiento === "U") {
			// Si el valor es 9, lo cambiamos a 0
			if (resultado[indice] === 9) {
				resultado[indice] = 0;
			} else {
				// Si no, incrementamos el valor
				resultado[indice]++;
			}
		}

		// Si el movimiento es D
		if (movimiento === "D") {
            // Si el valor es 0, lo cambiamos a 9
            if (resultado[indice] === 0) {
                resultado[indice] = 9;
            } else {
                // Si no, decrementamos el valor
                resultado[indice]--;
            }
        }

		// Si el movimiento es R
		if (movimiento === "R") {
			// Si estamos en el último número, volvemos al primero
			if (indice === numeroArray.length - 1) {
				indice = 0;
			} else {
				// Si no, avanzamos al siguiente número
				indice++;
			}
		}

		// Si el movimiento es L
		if (movimiento === "L") {
			// Si estamos en el primer número, vamos al último
			if (indice === 0) {
				indice = numeroArray.length - 1;
			} else {
				// Si no, retrocedemos al número anterior
				indice--;
			}
		}
        // console.log({movimiento, indice, numeroArray, resultado});
	}

    console.log(parseInt(resultado.join(""), 10));
    return parseInt(resultado.join(""), 10);
}

desencriptar('000', "URURD"); // 119
desencriptar('1111', "UUURUUU"); // 4411
desencriptar('9999', "LULULULD"); // 8000
desencriptar('528934712834', "URDURUDRUDLLLLUUDDUDUDUDLLRRRR"); // 628934712834

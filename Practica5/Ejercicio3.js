/*3.- Escribe una función que reciba un número y devuelva su versión invertida.*/
let numero=15
function invertirNumero(numero) {
    return numero.toString().split("").reverse().join("");
    }
console.log(invertirNumero(numero))
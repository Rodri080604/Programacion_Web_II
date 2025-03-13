/*1.-Dado un array de números, devuelve un objeto con la cantidad de números pares e impares..*/
let numerosArray = [7,5,52,3];
let resultado = { pares: 0, impares: 0 };
for (let i = 0; i < numerosArray.length; i++) {
    if (numerosArray[i] % 2 === 0) {
        resultado.pares++;
    } else {
        resultado.impares++;
    }
}
console.log(resultado);


/*2.- Dada una frase, encuentra la palabra más larga.*/
let frase = "Mi mamá me mima en mi penthouse";
let palabra = frase.split(" ");
let longitudPalabra = "";
for (let i=0;i< palabra.length; i++){
    if (palabra[i].length > longitudPalabra.length){
        longitudPalabra = palabra[i];
    }
}
console.log(`La palabra más larga es: ${longitudPalabra}`);

/*3.- Escribe una función que reciba un número y devuelva su versión invertida.*/
function numeroInvertido(num) {
    return parseInt(num.toString().split('').reverse().join('')) * Math.sign(num);
}
console.log(numeroInvertido(12345));


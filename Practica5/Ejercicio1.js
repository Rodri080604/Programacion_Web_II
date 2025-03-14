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
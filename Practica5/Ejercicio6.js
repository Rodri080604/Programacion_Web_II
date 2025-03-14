//6.- Encontrar el número que más se repite en un array
Numeros=[12,6,12,28,5,23,8,14,52]
function encontrarRepetido(array) {
    let repetido = array[0];
    let contador = 0;
    let maximo = 0;
    for (let i = 0; i < array.length; i++) {
        let contadorActual = 0;
        for (let j = 0; j < array.length; j++) {
            if (array[i] == array[j]) {
                contadorActual++;
                }
         }
        if (contadorActual > maximo) {
                maximo = contadorActual;
                repetido = array[i];
            }
    }
return repetido;
}
console.log(encontrarRepetido(Numeros))
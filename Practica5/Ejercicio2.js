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
/*4.-Dado un array de números, devuelve solo los que sean primos.*/
Numeros=[5,11,13,5,57,26,2,9,16,25]
function esPrimo(num){
    if(num<=1) return false
    for(let i=2;i<num;i++){
        if(num%i==0) return false 
    }
    return true;
    }
function verPrimos(arr){
        let primos = []
        for(let i=0;i<arr.length;i++){
            if(esPrimo(arr[i])) primos.push(arr[i])
                }
            return primos;
            }
console.log(verPrimos(Numeros))
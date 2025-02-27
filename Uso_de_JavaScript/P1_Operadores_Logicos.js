let edadPersonal = 17;
let ConAcompañante = true;
const precioPasaje = 1000;
const ciudadDestino = "Sucre";
const ciudadesDisponibles = new Array("Santiago","Bogota","Lima","MonteVideo");

if(precioPasaje===1000){
    console.log('El pasaje cuesta 1000')
}
console.log(`Verificando pasaje para ${ciudadDestino}`)
if((ciudadesDisponibles.indexOf(ciudadDestino) >-1) && 
    (edadPersonal >=18)|| ConAcompañante){
        console.long('pasaje disponible')
    }else{
        console.long('pasaje no disponible')
    }
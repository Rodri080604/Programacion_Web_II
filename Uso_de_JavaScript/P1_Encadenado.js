const ciudadDestino = "Sucre";
const ciudadesDisponibles = new Array("Santiago","Bogota","Lima","MonteVideo");


let edad=17;
let compañia=false;
if (edad>=18 ||compañia){
    if (ciudadDestino.indexOf(ciudadDestino)>-1){
        console.long('ciudad no disponible')
    }
}else{
    if(edad>=16 && ciudadDestino=="Sucre"){
        console.log('pasaje disponible')
    }else{
        console.log('pasajero no cumple las reglas')
    }
}
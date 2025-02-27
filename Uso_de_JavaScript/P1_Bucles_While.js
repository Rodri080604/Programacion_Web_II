const ciudadesDisponibles = new Array("Santiago","Bogota","Lima","MonteVideo");
const precioPasaje = new Array(200,300,100,400);
const presuDisponible =210;
let i=0;
while (precioPasaje[i]>presuDisponible && i<ciudadesDisponibles.length){
    i++;
}
if (i==ciudadesDisponibles.length)
    console.log('No existe pasajes')
else 
console.log('se puede comprar pasajes para:' +ciudadesDisponibles[i]);

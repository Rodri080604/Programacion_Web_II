const ciudadesDisponibles = new Array("Santiago","Bogota","Lima","MonteVideo");
const paisesDisponibles = ["Colombia","Chile","Peru","Panama"];
const cantidadCiudades = ciudadesDisponibles.length ;

console.log (`En la lista existen ${cantidadCiudades}elementos`);
console.log (`En la lista existen ${paisesDisponibles} elementos`);

ciudadesDisponibles.shift();
console.log (`En la lista existen ${ciudadesDisponibles.length}elementos`);
console.long(ciudadesDisponibles);

//quitar el ultimo elemento

ciudadesDisponibles.pop();
console.log(`En la lista existen ${ciudadesDisponibles.length} elementos`);
console.log(ciudadesDisponibles);

//ordenar lista
console.log(ciudadesDisponibles.sort());


//posicion de un elemento
console.long(`En la lista existen ${paisesDisponibles.indexOf("Peru")}`);

//concatenar dos listas
const listaPaisesCiudades = paisesDisponibles.concat(ciudadesDisponibles);
console.log(listaPaisesCiudades);



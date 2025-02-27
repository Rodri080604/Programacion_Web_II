const datos = [
    {
        'materia':'Programacion Web',
        'calificacion':70

    },
    {
        'materia':'Base de Datos II',
        'calificacion':10
        
    },
    {
        'materia':'IoT Robotica',
        'calificacion':35
    },
    {
        'materia':'Programacion Movil',
        'calificacion':49
    },
    {
        'materia':'Ingles Tecnico',
        'calificacion':30
    },
    {
        'materia':'Programacion III',
        'calificacion':50
    },
    {
        'materia':'Animacion Digital',
        'calificacion':35
    },
    {
        'materia':'Electronica Digital',
        'calificacion':91
    },
    {
        'materia':'Fundamentos de Computacion',
        'calificacion':30
    },
    {
        'materia':'Matematica Computacional',
        'calificacion':20
    }
]
let materiaSeleccionada='';
const NotaAprovacion=51;
for(let i=0; i<datos.length && NotaAprovacion == '';i++){
    if(datos[i].calificacion>=NotaAprovacion){
        materiaSeleccionada=datos[i].materia
    }
}
if(materiaSeleccionada=='')
    console.log("No aprovaste las materias")
else
console.log("Las materias que aprovaste son: "+materiaSeleccionada)
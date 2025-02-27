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
const notaAprovacion=51;
let materiaSeleccionada='';
let i=0;
do{
    if(datos[i].calificacion>=notaAprovacion){
        materiaSeleccionada=datos[i].materia
        break;
    }
    i++;
}while(i<datos.length && materiaSeleccionada=='')

if(materiaSeleccionada=='')
    console.log('no aprovaste las materias');
else
    console.log('la materia aprovada es: '+materiaSeleccionada)
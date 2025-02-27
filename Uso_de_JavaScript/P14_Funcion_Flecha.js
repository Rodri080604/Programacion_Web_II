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
];
const procesarDatos = (datos) => {
    return datos
        .filter(datos => datos.calificacion >51)
        .map(datos => {
            const {materia}=datos;
            return materia.length >5 ? materia.toUpperCase() :materia.toLowerCase();
        });
}
const resultado = procesarDatos(datos);
console.log(resultado);

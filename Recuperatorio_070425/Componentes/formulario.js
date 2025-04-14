const Form =(()=>{
    //Recuperando datos del formulario 
    const form = document.querySelector('[data-form]');
    const inputTask=document.querySelector('[data-input-task]');
    const inputDescription=document.querySelector('[data-input-descripcion]');
    const date =document.querySelector('[data-input-fecha]');
    const inputPrioridad=document.querySelector('[data-input-prioridad]');
    const inputNombre=document.querySelector('[data-input-nombre]');
    const inputValorEntero=document.querySelector('[data-input-valorEntero]');
//Guardo los datos como objeto
    const datosForm=()=>{
        return{
            task:inputTask.value.trim(),
            description:inputDescription.value.trim(),
            date:date.value.trim(),
            prioridad:inputPrioridad.value.trim(),
            nombre:inputNombre.value.trim(),
            valorEntero:inputValorEntero.value.trim(),
        };

    };
//Borro los datos del formulario
    const reset=()=>{
        inputTask.value='';
        inputDescription.value='';
        date.value='';
        inputPrioridad.value='';
        inputNombre.value='';
        inputValorEntero.value='';
    };
//Devuelvo los datos para usarlos en la tabla 
    const setDatos=(callback)=>{
        form.addEventListener('submit',(evento)=>{
            evento.preventDefault();
            callback(datosForm());
            reset();
        });

    };
    return{
        setDatos
    };
})();
export default Form;
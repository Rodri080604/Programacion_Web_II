
const btn = document.querySelector('[data-form-btn]');

console.log(btn);


/*Funcion para recuperar el texto del input*/
const createTask=(evento)=>{
    evento.preventDefault();
    const input = document.querySelector('[data-form-input]');
    console.log(input.value);

    const value=input.value;
    const list=document.querySelector('[data-list]');
    const task=document.createElement('li');
    task.classList.add('card');
    input.value='';
    /*const contenido=`<div>
            <i class="far fa-check-square icon"></i>
            <span class="task">${value}</span>
            </div>
            <i class="fas fa-trash-alt trashIcon icon"></i>
            
    `*/
    const contTask=document.createElement('div'); //Creando el elemento div en HTML
    contTask.appendChild(checkComplete)
    const titleTask=document.createElement('span'); //Creando el span en HTML
    titleTask.classList.add('task'); //Agregando a la clase Lista 
    titleTask.innerText=value;//adjuntar valor al titulo
    contTask.appendChild(titleTask);
    //const content=`<i class="fas fa-trash-alt trashIcon icon"></i>`


    task.appendChild(contTask)
    list.appendChild(task);
    console.log(contenido);

}

btn.addEventListener('click',createTask)
const checkComplete=()=>{
    const i=document.createElement('i')//Creacion de icono check
    i.classList.add("far","fa-check-square","icon")//Dando estilos al icono 
    i.addEventListener("click",color)
    return i;
}

const color =(evento)=>{
    const element=evento.target
    element.classList.add('fas');
    element.classList.add('completeIcon');
    element.classList.remove('far');

}
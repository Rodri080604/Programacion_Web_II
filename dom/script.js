import checkComplete from "./componentes/checkComplete.js"
import deleteIcon from "./componentes/deleteIcon.js"
import editIcon from "./componentes/editIcon.js";


(()=>{
    const btn = document.querySelector('[data-form-btn]');
    
    console.log(btn);
    
    //Crea la targeta en html
    const createTask=(evento)=>{
        evento.preventDefault();
        const input =document.querySelector('[data-form-input]');
        //console.log(input.value);
        const value =input.value;
        const list= document.querySelector('[data-list]')
        const task=document.createElement('li')
        task.classList.add('card');
        input.value='';

        const contTask=document.createElement('div');
    ///////////////
        contTask.appendChild(checkComplete());// agrego el check al div
    ///////////////
        const titleTask=document.createElement('span');
        titleTask.classList.add('task');
        titleTask.innerText=value;
        contTask.appendChild(titleTask);
        //const content =<i class="fas fa-trash-alt trashIcon icon"></i>
    

        task.appendChild(contTask);
        task.appendChild(deleteIcon());
        task.appendChild(editIcon(task));
        list.appendChild(task);
        
        //console.log(contenido);
    }
    
    btn.addEventListener('click',createTask);
    
    //Componente Check///////////////////////////////////////////////////
    /*
    const checkComplete=()=>{
        const i =document.createElement('i')// creacion de un icono 
        i.classList.add("far","fa-check-square","icon")//dando estilos al icono
        i.addEventListener("click",color)
        return i;
    }
    
    const color =(evento)=>{
        const element= evento.target
        element.classList.add('fas');
        element.classList.add('completeIcon');
        element.classList.remove('far');
    };
    */


    //Componente Delete/////////////////////////////////////////////////
    /*
    const deleteIcon=()=>{
        const i=document.createElement('i');
        i.classList.add('fas','fa-trash-alt','trashIcon', 'icon');
        i.addEventListener('click',eliminarTarea);
        return i;


    }
    const eliminarTarea=(evento)=>{
    const parent = evento.target.parentElement;
    parent.remove();
    }
    */


    })();
    //agregar alguna funcionalidad
    //
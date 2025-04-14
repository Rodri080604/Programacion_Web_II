import cards from './Cards.js';
const tabla=(()=>{
    const cuerpoTabla=document.getElementById('taskTable').getElementsByTagName('tbody')[0];//

    const addTask = (task) => {
        const nuevaFila=cuerpoTabla.insertRow();//creo nueva fila
//Recuperamos y asigno datos a las celdas 
        nuevaFila.insertCell(0).textContent=task.task;
        nuevaFila.insertCell(1).textContent=task.description;
        nuevaFila.insertCell(2).textContent=task.date;
        nuevaFila.insertCell(3).textContent=task.prioridad;
        nuevaFila.insertCell(4).textContent=task.nombre;
        nuevaFila.insertCell(5).textContent=task.valorEntero;
        
        //Acciones
        const accionCell=nuevaFila.insertCell(4);
        const accions=document.createElement('div')
        accions.className='actions'

        //crear boton completar
        const completeButton=document.createElement('button');
        completeButton.textContent='Completar';
        completeButton.className='view';
        completeButton.addEventListener('click',()=>{
            nuevaFila.classList.toggle('completed');

             ////////////
             cards.update();

        });

        accions.appendChild(completeButton);

         //crear boton eliminar
        const deleteButton=document.createElement('button');
        deleteButton.textContent='Eliminar';
        deleteButton.className='delete';
        deleteButton.addEventListener('click',()=>{
            cuerpoTabla.deleteRow(nuevaFila.rowIndex-1);
            

            ////////////
            cards.update();

            });
            accions.appendChild(deleteButton)
            accionCell.appendChild(accions);

    };
    
    //Recupero elementos (Texto de la tabla)
    const getTask=()=>{
        return Array.from(cuerpoTabla.rows).map(row=>({
            task:row.cells[0].textContent,
            description:row.cells[1].textContent,
            date:row.cells[2].textContent,
            prioridad:row.cells[3].textContent,
            nombre:row.cells[4].textContent,
            valorEntero:row.cells[5].textContent,
            completed:row.classList.contains('completed')
        }));
       

    };
    return{
        addTask,getTask
    }


})();
export default tabla;
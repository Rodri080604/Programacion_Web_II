import Form from './Components/Formulario.js';
import Table from './Components/Tabla.js';
import Cards from './Components/Cards.js';

(()=>{
    Form.setDatos((task)=>{
        Table.addTask(task);
        Cards.update();
    });
})();
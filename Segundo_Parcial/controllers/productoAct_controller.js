import { productoService } from "../services/producto-service.js";
const formulario = document.querySelector("[data-form]")
const obtenerInfo= async()=>{//estructura async
    const url=new URL(window.location.id);// nueva url
    const id= (url.searchParams.get("id"));// url con identificador
    if(id==null){
        window.location.href="../screens/error.html"// si no recupera el id pues error 
    }
    const nombre = document.querySelector("[data-nombre]")//recuperamos datos
    const precio = document.querySelector("[data-precio]")
try{
    const perfil = await  productoService.productos(id)// await que se mantiene en espera mientras almacena el id 
if(perfil.nombre && perfil.precio){
    nombre.value=perfil.nombre;
    precio.value=perfil.precio;
}else{
    throw new Error();
}   
}catch(error){
    console.log("Catch error",error);
    window.location.href="../screens/error.html"
}
};
obtenerInfo();

//-----------------------------------------
formulario.addEventListener("submit",(evento)=>{
    evento.preventDefault();
    const url = new URL(window.location)
    const id =(url.searchParams.get("id"));

    const nombre= document.querySelector('[data-nombre]').value;
    const precio= document.querySelector('[data-precio]').value;
    productoService.actualizarProducto(nombre,precio,id).then(()=>{
        window.location.href="../screens/edicion_concluida.html";
    });
})
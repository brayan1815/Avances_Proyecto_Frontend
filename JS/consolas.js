import { del, get } from "../api.js";
import { cargarCardsConsolas } from "./MODULES/modules.js";

const main=document.querySelector('.cards')

const consolas=await get('consolas');

cargarCardsConsolas(consolas, main);

window.addEventListener('click',async (event) => {
  const clase = event.target.getAttribute('class');
  const id = event.target.getAttribute('id');
  if (clase == 'card__boton editar') {
    window.location.href=`actualizarConsolas.html?id=${encodeURIComponent(id)}`
  }
  else if (clase == 'card__boton eliminar') {
    const respuesta = await del(`consolas/${id}`);
    if (respuesta.ok) alert("La consola se ha eliminado correctamente");
  }
})
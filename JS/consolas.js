import { get } from "../api.js";
import { cargarCardsConsolas } from "./MODULES/modules.js";

const main=document.querySelector('.cards')

const consolas=await get('consolas');

cargarCardsConsolas(consolas,main);
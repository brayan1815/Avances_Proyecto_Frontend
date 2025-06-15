import { get } from "../api.js";

const select=document.querySelector('select');

const roles=await get('roles');

roles.forEach(item => {
    const option=document.createElement('option');
    option.setAttribute('value',item.id)
    option.textContent=item.rol;
    select.append(option);
});


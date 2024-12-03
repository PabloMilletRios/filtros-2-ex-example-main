import "./style.css";
import { crearNoticias,crearFiltro  } from "./helper/domHelper.js";
import { api_sources,url,options } from "./api.js";

const container = document.createElement("div");
const container_noticias = document.createElement("div");
container_noticias.classList.add("container-card");


const fetchSetNoticias = async (url_noti) => {
    const response = await fetch(url_noti);
    const json = await response.json();
    
    const span = document.createElement("span");
    span.textContent = "Filtro salvadoreño: ";

    const div_filtros = document.createElement("div");
    div_filtros.classList.add("container-filter");
    div_filtros.appendChild(span);

    const noticia_filtro = crearFiltro(json);

    noticia_filtro.addEventListener("change", (event) =>{
        let url_noti = 
        event.target.value === "all" 
        ? url 
        : `${url}?source=${event.target.value}`;
        getNoticias(url_noti,options);
    });


    div_filtros.appendChild(noticia_filtro);
    container.appendChild(div_filtros);
    document.body.appendChild(container);
}

const getNoticias = async(url,options) =>{
    const response = await fetch(url,options);
    const noticias = await response.json();
    container_noticias.innerHTML = "";
    container_noticias.append(...crearNoticias(noticias));
    container.appendChild(container_noticias);
}

fetchSetNoticias(api_sources);
getNoticias(url,options, "all");
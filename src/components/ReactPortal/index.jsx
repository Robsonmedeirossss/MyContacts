import { createPortal } from "react-dom";

function ReactPortal({containerId, children}){
    
    let portal = document.getElementById(containerId);

    if(!portal){
        portal = document.createElement("div");
        portal.setAttribute('id', containerId);
        document.body.appendChild(portal);
    }

   return(
     createPortal(children, portal)
   );
}

export default ReactPortal;
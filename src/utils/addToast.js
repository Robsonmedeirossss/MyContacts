import EventManager from "../lib/EventManager";

export const EventToast = new EventManager();

function addToast({type, text, duration}){

    EventToast.emitEvent('addtoast', {type, text, duration});

}

export default addToast;
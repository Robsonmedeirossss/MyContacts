class EventManager{
    constructor(){
        this.listener = new Map();
    }

    addEvent(event, listener){
        if(!this.listener.has(event)){
            this.listener.set(event, []);
        }

        this.listener.get(event).push(listener);
    }

    emitEvent(event, payload){
        if(!this.listener.has(event)){
            return;
        }

        this.listener.get(event).forEach(listener => {
            listener(payload)
        });
    }

    removeListener(event, listener){
        if(!this.listener.has(event)){
            return;
        }

        const filteredListener = this.listener.get(event).filter(listenerFunc => {
            return listenerFunc !== listener;
        })

        this.listener.set(event, filteredListener);
    }
}

export default EventManager;
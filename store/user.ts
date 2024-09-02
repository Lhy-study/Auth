import { makeObservable, action } from "mobx";

export class Store{
    isOpen : boolean = false;
    constructor( isOpen : boolean ){
        this.isOpen = isOpen;
        makeObservable(this,{ 
            isOpen: true ,
            setOpen:action
        })
    }
    setOpen(open:boolean){
        this.isOpen = open;
    }
}  

export const userControlStore = new Store(false); 
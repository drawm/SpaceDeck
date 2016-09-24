import {observable, action} from "mobx";

class ShipStore {
    static instance:ShipStore;
    constructor(){
        if(!ShipStore.instance){
            ShipStore.instance = this;
        } else {
            throw new Error('ShipStore is a singleton');
        }
    }

    @observable
    public x: number = 0;

    @observable
    public y: number = 0;

    @observable
    public rotation: number = 0;

    @action
    static update(ship: IShip) {
        if (ship){
            ShipStore.instance.update(ship);
        }
    }
    private update(ship: IShip) {
        this.x = ship.transform.x;
        this.y = ship.transform.y;
        this.rotation = ship.transform.rotation;
    }

}


export default ShipStore;
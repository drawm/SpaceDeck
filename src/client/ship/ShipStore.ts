import {observable, action} from "mobx";

export default class ShipStore {

    @observable
    public x: number = 0;

    @observable
    public y: number = 0;

    @observable
    public rotation: number = 0;

    @action
    update(ship: IShip) {
        this.x = ship.transform.x;
        this.y = ship.transform.y;
        this.rotation = ship.transform.rotation;
    }
}
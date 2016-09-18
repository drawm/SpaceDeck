export class Messages{
    static CHANGE_ROLE:string = 'CHANGE_ROLE';
    static UPDATE_SHIP:string = 'UPDATE_SHIP';
}

export class ChangeRoleMessage implements IMessage{
    kind: string = Messages.CHANGE_ROLE;
    role:string;
    constructor(role:string){
        this.role = role;
    }
}

export class UpdateShipMessage implements IMessage{
    kind: string = Messages.UPDATE_SHIP;
    ship:IShip;
    constructor(ship:IShip){
        this.ship = ship;
    }
}
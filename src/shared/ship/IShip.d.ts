interface IShip{
    health:number;
    maxPower:number;

    weapon:IShipWeapon;
    shield:IShipShield;
    sensor:IShipSensor;
    engine:IShipEngine;

    transform:{
        x:number,
        y:number,
        rotation:number,
    };
}

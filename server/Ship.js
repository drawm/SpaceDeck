class Ship {
    constructor() {
        this.maxEnergy = 1;
        this.transform = {x: 0, y: 0, rotation: 0};
        this.health = 100;

        setInterval(()=> {
            this.transform.x++;
            this.transform.y++;
            if(this.transform.x > 200){
                this.transform.x = 0;
            }
            if(this.transform.y > 180){
                this.transform.y = 0;
            }
        },200);
    }
}
module.exports = Ship;

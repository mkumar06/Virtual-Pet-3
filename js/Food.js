class Food {
    constructor() {
    this.image = loadImage("images/milkImg.png");
    this.foodStock = 0; 
    this.lastFed;
    }

    display() {
        var x = 80, y=100;

        imageMode(CENTER);
        image(this.image, 720, 220, 70, 70);

        this.foodStock=foodS

        if(this.foodStock != 0) {
            for(var i = 0; i < this.foodStock; i++) {
                if(i % 10 == 0) {
                    x = 80;
                    y = y + 50;
                }
                image(this.image, x, y, 50, 50);
                x = x + 30;
            }
        }
    }
    bedroom() {
        background(bedroom, 550, 500);
    }

    garden() {
        background(garden, 550, 500);
    }

    washroom() {
        background(washroom, 550, 500)
    }
}
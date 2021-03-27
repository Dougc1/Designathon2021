let buttonPro; // profile
let buttonApp; // appearance
let buttonLin; // linked accounts
let buttonSub; // subscriptions
let buttonNot; // notification settings
let buttonTer; // terms and cond
let buttonCon; // contact support


class Button {
  constructor(posX, posY, sizeX, sizeY, msg) {
    this.posX = posX;
    this.posY = posY;
    this.sizeX = sizeX;
    this.sizeY = sizeY;
    this.msg = msg;
    
    this.tempPosX = this.posX;
    this.tempPosY = this.posY;
    this.tempSizeX = this.sizeX;
    this.tempSizeY = this.sizeY;
  }
  
  move(x, y) {
    this.posX += x;
    this.posY += y;
    
    this.tempPosX += x;
    this.tempPosY += y;
  }
  
  isMouseOn() {
    if (mouseX > this.posX && mouseX < this.posX + this.sizeX) {
      if (mouseY > this.posY && mouseY < this.posY + this.sizeY) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
  
  display() {
    rect(this.tempPosX, this.tempPosY, this.tempSizeX, this.tempSizeY, 10);
    textStyle(NORMAL);
    textSize(24);
    textAlign(CENTER);
    text(this.msg, this.posX + (this.sizeX / 2), this.posY + (this.sizeY / 2));
    
    // Animation
    if (mouseIsPressed && this.isMouseOn()) {
      // Shrink
      if (this.tempSizeX > this.sizeX * 0.95) {
        // Increment positions too to keep relative position
        this.tempPosX += 0.5;
        this.tempPosY += 0.5;
        this.tempSizeX--;
        this.tempSizeY--;
      }
    } else {
      // Grow
      if (this.tempSizeX < this.sizeX) {
        this.tempPosX -= 0.5;
        this.tempPosY -= 0.5;
        this.tempSizeX++;
        this.tempSizeY++;
      }
    }
  }
}

function setup() {
  createCanvas(600, 810);
  
  buttonPro = new Button(30, 30, 540, 90, "Profile");
  buttonApp = new Button(30, 130, 540, 90, "Appearance");
  buttonLin = new Button(30, 230, 540, 90, "Linked Accounts");
  buttonSub = new Button(30, 330, 540, 90, "Subscriptions");
  buttonNot = new Button(30, 430, 540, 90, "Notification Settings");
  buttonTer = new Button(30, 530, 540, 90, "Terms and Conditions");
  buttonCon = new Button(30, 630, 540, 90, "Contact Support");
}

function draw() {
  background(255);
  
  buttonPro.display();
  buttonApp.display();
  buttonLin.display();
  buttonSub.display();
  buttonNot.display();
  buttonTer.display();
  buttonCon.display();

  textAlign(CENTER);
  textSize(12);
  text("Bounce Back Buddy v1.0", 300, 790);
}
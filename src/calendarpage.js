let items;
let checkboxes;

let itemsList = ["Exercise for 1 hour", "Walk the bird", "Cook Breakfast", "Develop Science 3", "Submit report", "Learn some Piano"];

let addButton;
let editButton;

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

class TickBox extends Button {
  constructor(posX, posY, sizeX, sizeY) {
    super(posX, posY, sizeX, sizeY, "");
    
    this.checked = false;
  }
  
  check() {
    if (this.checked) {
      if (this.isMouseOn()) {
        this.checked = false;
      }
    } else {
      if (this.isMouseOn()) {
        this.checked = true;
      }
    }
  }
  
  display() {
    // background box
    rect(this.tempPosX, this.tempPosY, this.tempSizeX, this.tempSizeY, 5);
    
    // circles
    if (this.checked) {
      textAlign(CENTER, CENTER);
      textSize(this.tempSizeX * 1.1);
      text("✓", this.tempPosX + (this.tempSizeX / 2), this.tempPosY + (this.tempSizeY / 2));
    }
    
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

class PlusBox extends Button {
  constructor(posX, posY, sizeX, sizeY) {
    super(posX, posY, sizeX, sizeY, "+");
  }
  
  addElem() {
    let isOn = this.isMouseOn();
    
    if (!isOn) {
      return;
    }
    
    let pos_factor = items.length;
    
    if (itemsList.length == 0) {
      return;
    }
    
    let quote = random(itemsList);
    
    itemsList.splice(itemsList.indexOf(quote), 1);
    
    append(items, new Button(30, (120 * pos_factor) + 30, 540, 90, quote));
    append(checkboxes, new TickBox(40, (120 * (pos_factor)) + 50, 50, 50));
  }
  
  display() {
    rect(this.tempPosX, this.tempPosY, this.tempSizeX, this.tempSizeY, 10);
    textStyle(NORMAL);
    textSize(this.tempSizeX * 0.5);
    textAlign(CENTER, CENTER);
    text(this.msg, this.posX + (this.sizeX / 2), this.posY + (this.sizeY / 2.1));
    
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
  
  addButton = new PlusBox(30, 730, 50, 50);
  editButton = new Button(510, 730, 70, 50, "Edit");
  
  items = [];
  checkboxes = [];
}

function draw() {
  background(255);
  
  for (let i = 0; i < items.length; i++) {
    items[i].display();
  }
  
  for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].display();
  }
  
  addButton.display();
  editButton.display();
}

function mouseReleased() {
  for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].check();
  }
  
  addButton.addElem();
}
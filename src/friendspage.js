let activeFriends = [];
let activeFriendsArrows = [];

let inactiveFriends = [];
let inactiveFriendsArrows = [];

let activeFriendsList = ["John Doe", "Jane Doe", "Chicken", "Goose"];
let inactiveFriendsList = ["Sir Snoozy", "Mrs Sleepy", "Cat", "Dog", "Duck"];

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

class ArrowButton extends Button {
  constructor(posX, posY, sizeX, sizeY, leftDir) {
    super(posX, posY, sizeX, sizeY, "");
    
    this.leftDir = leftDir; // bool as to whether it is left or right
  }
  
  moveButtons(buttons, boundLeft, boundRight) {
    if (mouseIsPressed && this.isMouseOn()) {
      // First confirm if a move is valid; check bounds aren't surpassed
      if (!this.leftDir && buttons[buttons.length - 1].posX + buttons[buttons.length - 1].sizeX <= boundRight) {
          //buttons[i].move(-1, 0);
          return;
        }
        
        if (this.leftDir && buttons[0].posX >= boundLeft) {
          //buttons[i].move(1, 0);
          return;
        }
      
      // If all good, proceed to move everything
      for (let i = 0; i < buttons.length; i++) {
        if (this.leftDir) {
          buttons[i].move(4, 0);
        } else {
          buttons[i].move(-4, 0);
        }
      }
    }
  }
  
  display() {
    if (this.leftDir) {
      triangle(this.tempPosX + this.tempSizeX, this.tempPosY, this.tempPosX + this.tempSizeX, this.tempPosY + this.tempSizeY, this.tempPosX, this.tempPosY + (this.tempSizeY / 2));
    } else {
      triangle(this.tempPosX, this.tempPosY, this.tempPosX, this.tempPosY + this.tempSizeY, this.tempPosX + this.tempSizeX, this.tempPosY + (this.tempSizeY / 2));
    }
    
    
    // Animation
    if (mouseIsPressed && this.isMouseOn()) {
      // Shrink
      if (this.tempSizeX > this.sizeX * 0.9) {
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
  
  // Active
  let numActive = random(1, activeFriendsList.length);
  
  for (let i = 0; i < numActive; i++) {
    let quote = random(activeFriendsList);
    append(activeFriends, new Button((i * 260) + 30, 100, 250, 300, quote));
    activeFriendsList.splice(activeFriendsList.indexOf(quote), 1);
  }
  // Arrows
  append(activeFriendsArrows, new ArrowButton(500, 50, 30, 30, true));
  append(activeFriendsArrows, new ArrowButton(560, 50, 30, 30, false));
  
  // Inactive
  let numInactive = random(1, inactiveFriendsList.length);
  
  for (let i = 0; i < numInactive; i++) {
    let quote = random(inactiveFriendsList);
    append(inactiveFriends, new Button((i * 260) + 30, 600, 250, 100, quote));
    inactiveFriendsList.splice(inactiveFriendsList.indexOf(quote), 1);
  }
  // Arrows
  append(inactiveFriendsArrows, new ArrowButton(500, 550, 30, 30, true));
  append(inactiveFriendsArrows, new ArrowButton(560, 550, 30, 30, false));
}

function draw() {
  background(255);
  
  textAlign(LEFT);
  text("Active Friends", 30, 70);
  
  // Active
  for (let i = 0; i < activeFriends.length; i++) {
    activeFriends[i].display();
  }
  
  for (let i = 0; i < activeFriendsArrows.length; i++) {
    activeFriendsArrows[i].display();
    activeFriendsArrows[i].moveButtons(activeFriends, 29, 571);
  }
  
  // Inactive
  textAlign(LEFT);
  text("Inactive Friends", 30, 570);
  
  for (let i = 0; i < inactiveFriends.length; i++) {
    inactiveFriends[i].display();
  }
  
  for (let i = 0; i < inactiveFriendsArrows.length; i++) {
    inactiveFriendsArrows[i].display();
    inactiveFriendsArrows[i].moveButtons(inactiveFriends, 29, 571);
  }
}
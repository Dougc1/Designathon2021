let notifs = [];
let xs = [];

let notifsList = ["Your subscription has been renewed for 1 month.", "Its time for a break! Walk outside for a bit.", "You still have 4 tasks left to do. You can do it!", "New curated article from Bounce Back Buddy: How to Meditate"];

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
    textSize(12);
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

class XButton extends Button {
  constructor(posX, posY, sizeX, sizeY, notif) {
    super(posX, posY, sizeX, sizeY, "X");
    
    this.notif = notif;
    this.deleted = false;
  }
  
  deleteNotif() {
    if (this.isMouseOn()) {
      notifs.splice(notifs.indexOf(this.notif), 1);
      this.deleted = true;
    }
  }
  
  display() {
    if (!this.deleted) {
      rect(this.tempPosX, this.tempPosY, this.tempSizeX, this.tempSizeY, 10);
      textStyle(NORMAL);
      textSize(24);
      textAlign(CENTER);
      text(this.msg, this.posX + (this.sizeX / 2), this.posY + (this.sizeY / 1.5));
    
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
}

function setup() {
  createCanvas(600, 810);
  
  let numNotifs = random(1, notifsList.length);
  
  for (let i = 0; i < numNotifs; i++) {
    let quote = random(notifsList);
    
    let newNotif = new Button(30, (i * 100) + 30, 540, 90, quote);
    notifsList.splice(notifsList.indexOf(quote), 1);
    
    append(notifs, newNotif);
    append(xs, new XButton(500, (i * 100) + 45, 50, 50, newNotif));
  }
}

function draw() {
  background(255);
  
  for (let i = 0; i < notifs.length; i++) {
    notifs[i].display();
  }
  
  for (let i = 0; i < xs.length; i++) {
    xs[i].display();
  }
  
  if (notifs.length == 0) {
    textSize(36);
    textAlign(CENTER);
    text("No notifications!", 300, 100);
  }
}

function mouseReleased() {
  for (let i = 0; i < xs.length; i++) {
    xs[i].deleteNotif();
  }
}
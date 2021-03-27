let quotes = ["“All our dreams can come true, if we have the courage to pursue them.” – Walt Disney", 
             "“The secret of getting ahead is getting started.” – Mark Twain",
             "“The best time to plant a tree was 20 years ago. The second best time is now.” – Chinese Proverb",
             "“It’s hard to beat a person who never gives up.” – Babe Ruth"];
let randQuote;

let upNextButtons = [];
let upNextArrowButtons = [];
let upNextQuotes = ["Do chores", "Finish Report", "Walk dog", "Cook Dinner", "Send letter"];

let newsButtons = [];
let newsArrowButtons = [];
let newsQuotes = ["Scientists discover Science 2", "More countries open borders", "COVID declared over", "New events begin opening up", "New 100% effective vaccine released"];

let bbButtons = [];
let bbArrowButtons = [];
let bbQuotes = ["Benefits of exercise", "What diet is right for you?", "Great starter exercises", "How to be a Mindful Thinker", "The importance of work/life balance"];

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
  
  randQuote = random(quotes);
  
  // Set up buttons
  // Set up Next tasks buttons
  let numTasks = random(1, upNextQuotes.length);
  
  for (let i = 0; i < numTasks; i++) {
    let quote = random(upNextQuotes);
    append(upNextButtons, new Button((i * 260) + 30, 200, 250, 100, quote));
    
    // Remove the quote to avoid duplicates
    upNextQuotes.splice(upNextQuotes.indexOf(quote), 1);
  }
  // Arrows
  append(upNextArrowButtons, new ArrowButton(500, 150, 30, 30, true));
  append(upNextArrowButtons, new ArrowButton(560, 150, 30, 30, false));
  
  // Set up News buttons
  let numNews = random(1, newsQuotes.length);
  
  for (let i = 0; i < numNews; i++) {
    let quote = random(newsQuotes);
    append(newsButtons, new Button((i * 460) + 30, 400, 450, 100, quote));
    
    // Remove the quote to avoid duplicates
    newsQuotes.splice(newsQuotes.indexOf(quote), 1);
  }
  // Arrows
  append(newsArrowButtons, new ArrowButton(500, 350, 30, 30, true));
  append(newsArrowButtons, new ArrowButton(560, 350, 30, 30, false));
  
  // Set up Bounce Back buttons
  let numBB = random(1, bbQuotes.length);
  
  for (let i = 0; i < numBB; i++) {
    let quote = random(bbQuotes);
    append(bbButtons, new Button((i * 460) + 30, 600, 450, 100, quote));
    
    // Remove the quote to avoid duplicates
    bbQuotes.splice(bbQuotes.indexOf(quote), 1);
  }
  // Arrows
  append(bbArrowButtons, new ArrowButton(500, 550, 30, 30, true));
  append(bbArrowButtons, new ArrowButton(560, 550, 30, 30, false));
}

function draw() {
  background(255);
  
  // Welcome message
  textAlign(CENTER);
  textStyle(NORMAL);
  textSize(52);
  text("Welcome back, User!", 300, 100);
  
  // Motivation!
  textAlign(CENTER);
  textSize(12);
  textStyle(ITALIC);
  text(randQuote, 300, 120);
  
  // Up Next Section
  textAlign(LEFT);
  textSize(24);
  textStyle(NORMAL);
  text("Up Next", 30, 170);
  
  for (let i = 0; i < upNextButtons.length; i++) {
    upNextButtons[i].display();
  }
  
  for (let i = 0; i < upNextArrowButtons.length; i++) {
    upNextArrowButtons[i].display();
    upNextArrowButtons[i].moveButtons(upNextButtons, 29, 571);
  }
  
  // News Section
  textAlign(LEFT);
  textSize(24);
  textStyle(NORMAL);
  text("News", 30, 370);
  
  for (let i = 0; i < newsButtons.length; i++) {
    newsButtons[i].display();
  }
  
  for (let i = 0; i < newsArrowButtons.length; i++) {
    newsArrowButtons[i].display();
    newsArrowButtons[i].moveButtons(newsButtons, 29, 571);
  }
  
  // Bounce Back Section
  textAlign(LEFT);
  textSize(24);
  textStyle(NORMAL);
  text("Bounce Back", 30, 570);
  
  for (let i = 0; i < bbButtons.length; i++) {
    bbButtons[i].display();
  }
  
  for (let i = 0; i < bbArrowButtons.length; i++) {
    bbArrowButtons[i].display();
    bbArrowButtons[i].moveButtons(bbButtons, 29, 571);
  }
}
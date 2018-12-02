var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

class Commit {
  constructor(x, y, message, parent){
    this.x = x;
    this.y = y;
    this.radius = 5;
    this.message = message;
    this.parent = parent;
  }
  draw() {
    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = "black";
    ctx.font = "10px Arial";
    ctx.fillText(this.message, this.x + this.radius*2, this.y + this.radius);
  }
}

class Link {
  constructor(c1, c2){
    this.c1=c1;
    this.c2=c2;
  }
  draw(){
    ctx.moveTo(this.c1.x, this.c1.y);
    ctx.lineTo(this.c2.x, this.c2.y);
    ctx.stroke();
  }
}

var c1 = new Commit(40, 99, 'First commit', null);
var c2 = new Commit(40, 79, 'Second commit', c1);
var c3 = new Commit(40, 59, 'Third commit', c2);
var c4 = new Commit(40, 39, 'Fourth commit', c3);

var last = c4;
while (last) {

  if (last.parent){
    new Link(last.parent, last).draw();
  };
  last.draw();
  last = last.parent;
};

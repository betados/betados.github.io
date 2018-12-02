var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

class Commit {
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.radius=5;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.stroke();
  }
}

class Link {
  constructor(c1, c2){
    this.c1=c1;
    this.c2=c2;
  }
  draw(){
    ctx.moveTo(c1.x, c1.y);
    ctx.lineTo(c2.x, c2.y);
    ctx.stroke();
  }
}

var c1 = new Commit(40,99);
var c2 = new Commit(40,79);
var l1 = new Link(c1,c2);
l1.draw();
c1.draw();
c2.draw();

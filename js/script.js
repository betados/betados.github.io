var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

class Commit {
  constructor(message, parent){
    this.parent = parent;
    this.x = 40;
    if (this.parent == null){
      this.y = 99;
    }
    else{
      this.y = this.parent.y - 20;
    }
    this.radius = 5;
    this.message = message;
    if (this.parent){
      this.parent.set_child(this);
    }
    this.child = null;
  }
  set_child(child){
    this.child = child;
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

function draw(last) {
    if (last.child){
      new Link(last.child, last).draw();
      last.draw();
      draw(last.child);
    }
    else{
      last.draw();
    }
}

var first = new Commit('Naces un día', null);
var c2 = new Commit('Creces y creces', first);
var c3 = new Commit('Vas al colegio', c2);
var c4 = new Commit('Aprendes memeces', c3);

draw(first);

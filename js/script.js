var svg_html = "";

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
    svg_html += `<circle cx= ${this.x} cy= ${this.y} r=${this.radius}
    fill='red' />`
    
    // FIXME font-family not working
    svg_html += `<text x=${this.x  + this.radius*2} y=${this.y + this.radius}
    fill="black" font-family="Calibri" font-size="10">
    ${this.message}
    </text>`
  }
}

class Link {
  constructor(c1, c2){
    this.c1=c1;
    this.c2=c2;
  }
  draw(){
    svg_html += `<line x1=${this.c1.x} y1=${this.c1.y}
    x2=${this.c2.x} y2=${this.c2.y}
    style="stroke:rgb(0,0,0);stroke-width:2" />`
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
var commits = new Array();
commits.push(new Commit('Naces un día', null));
commits.push(new Commit('Creces y creces', commits[commits.length - 1]));
commits.push(new Commit('Vas al colegio', commits[commits.length - 1]));
commits.push(new Commit('Aprendes memeces', commits[commits.length - 1]));

//var first = new Commit('Naces un día', null);
//var c2 = new Commit('Creces y creces', first);
//var c3 = new Commit('Vas al colegio', c2);
//var c4 = new Commit('Aprendes memeces', c3);

draw(commits[0]);

document.getElementById('svg').innerHTML = svg_html;

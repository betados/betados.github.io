var svg_html = "";
var commit_count = 0;

class Commit {
    constructor(message, parent){
        this.id = commit_count;
        commit_count++;
        this.parent = parent;

        if (this.parent){
            this.parent.add_child(this);
        }

        this.radius = 5;
        this.message = message;
        this.children = new Array();
    }
    set_pos(){
        if (this.parent){
            this.x = this.parent.x - 20 * this.parent.children.indexOf(this);
            this.y = init_depth - 20 * this.id;
        }else{
            this.x = 40
            this.y = init_depth;
        }

    }
    add_child(child){
        this.children.push(child);
    }
    draw() {
        svg_html += `<circle id=commit${this.id} class=commit onmouseover="showTooltip(evt);"  onmouseout="print(evt);"
        cx= ${this.x} cy= ${this.y} r=${this.radius}
        fill='red'></circle>`

        // FIXME font-family not working
        svg_html += `<text x=${40  + this.radius*2} y=${this.y + this.radius}
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
    for (var i=0; i<last.children.length; i++){
        last.children[i].set_pos();
        new Link(last, last.children[i]).draw();
        draw(last.children[i]);
    }
    last.draw();
}
//var commits = new Array();
//commits.push(new Commit('Naces un día', null));
//commits.push(new Commit('Creces y creces', commits[commits.length - 1]));
//commits.push(new Commit('Vas al colegio', commits[commits.length - 1]));
//commits.push(new Commit('Aprendes memeces', commits[commits.length - 1]));
//commits.push(new Commit('Bifurcado***************************', commits[1]));

var first = new Commit('Naces un día', null);
var c2 = new Commit('Creces y creces', first);
var c3 = new Commit('Vas al colegio', c2);
var c4 = new Commit('Aprendes memeces', c3);
var c5 = new Commit('bifurcado', c2);
var c6 = new Commit('bifurcado 2', c5);
var c4 = new Commit('Luego tropiezas', c4);

var init_depth = 20 * commit_count;

first.set_pos();
draw(first);

document.getElementById('svg').innerHTML = svg_html;

function print(element){
    console.log(element);
}

function showTooltip(element){
    svg_html +=
}
//var commits = document.getElementsByClassName("commit");
//for (var i = 0; i < commits.length; i++) {
//    commits[i].addEventListener("mouseover", print);
//}
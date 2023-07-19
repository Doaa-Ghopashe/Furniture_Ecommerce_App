header {
	padding: 0;
	margin: 0;
	height: 500px;
	position: relative;
	background:linear-gradient(#00c8ff78 10%,transparent,#00c8ff78)
}
#canvas {
	left: 0;
	top: 0;
}
header::after{
	content:"Rent";
	inset: 0;
	width: fit-content;
	margin: auto;
	height: fit-content;
	font-size: 35px;
	font-family:'Times New Roman', Times, serif;
	position: absolute;
	animation: completeWords 8s infinite 2s ;
}
header::before{
	content: "";
	position: absolute;
	backdrop-filter: blur(5px);
	background-color: rgba(255, 255, 255, 0.107);
	inset: 0;
	backdrop-filter: blur(1px);
	
}
@keyframes completeWords{
	0%{
		content: "Rent y|";
	}
	5%{
		content: "Rent yo|";
	}
	10%{
		content: "Rent you|";
	}
	15%{
		content: "Rent your|";
	}
	20%{
		content:"Rent your |";
	}
	25%{
		content:"Rent your f|";
	}
	30%{
		content:"Rent your fu|";
	}
	35%{
		content:"Rent your fur|";
	}
	40%{
		content:"Rent your furn|";
	}
	45%{
		content:"Rent your furni|";
	}
	50%{
		content:"Rent your furnit|";
	}
	55%{
		content:"Rent your furnitu|";
	}
	60%{
		content:"Rent your furnitur|";
	}
	65%{
		content:"Rent your furniture|";
	}
	70%{
		content:"Rent your furniture |";
	}
	75%{
		content:"Rent your furniture n|";
	}
	80%{
		content:"Rent your furniture no|";
	}
	85%{
		content:"Rent your furniture now|";
	}
	90%{
		content:"Rent your furniture now ";
	}
}

import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'], 
})
export class HeaderComponent {
  //define varibales of canvas
  canvas!:HTMLCanvasElement; //here we need to add the right data type
  ctx: CanvasRenderingContext2D|any;
  trees!: Tree[];
  requestId!: number;
  width!:number;
  height!:number;
  treeColor:string = '#e88484';

  //after defining the variables we need to add eventlisteners
  ngOnInit(){
    //assign values to the variables
    this.canvas = document.getElementById("canvas") as HTMLCanvasElement ;
    this.canvas.width = window.innerWidth;
    this.canvas.height = parseInt(getComputedStyle(document.getElementsByTagName('header')[0]).height ) +1
   
    this.ctx = this.canvas.getContext('2d');
    this.trees =  [new Tree(this.canvas.width * Math.round(Math.random() *100), 20 , 50 , this.treeColor)];
    this.resizeReset();
    this.animationLoop();
    this.addTree();
  }

  resizeReset(){
    this.width = this.canvas.width ;
    this.height = this.canvas.height ;
    this.drawGround();
    this.trees.push(new Tree(this.canvas.width * 0.89 , this.height -10,50,'#54311b')) ;
  }

  drawGround(){
    this.ctx.fillStyle = 'rgba(0,100,0,1)';
    this.ctx.fillRect(0,this.height -10 , this.width,this.height)
    // this.ctx.arc(0,this.height ,this.width/5,Math.PI , 0, false)
    // this.ctx.fillStyle = 'green';

    // this.ctx.fill();
    // this.ctx.closePath();
  }

  animationLoop(){
    this.drawScene();
    requestAnimationFrame(() => this.animationLoop());
  }

  drawScene(){
    this.trees.map((t)=>{
      t.update();
      t.draw(this.ctx)
    })
  }

  addTree(){
    this.trees.push(new Tree(180 , this.height -10 , 50 ,'#54311b'))
  }
}

//define a tree class that will draw the tree 
class Tree{
  x:number;
  y:number;
  branchColor:string;
  branchs:Branch[] = [];

  constructor(x:number,y:number,radius:number,color:string){
    this.x = x;
    this.y = y;
    this.branchColor = color;
    //after takining the coordinates of this tree now we need to draw the branchs
    this.addBranch(this.x,this.y,this.getRandomInt(5,7),180,color)
  }

  //to get random number 
  getRandomInt(min: number, max: number) {
    return Math.round(Math.random() * (max - min)) + min;
  }

  //add branchs to branchs array
  addBranch(x: number, y: number, radius: number, angle: number,color:string) {
    this.branchs.push(new Branch( x, y, radius, angle,10,color ));
  }

  //update function
  update(){
    this.branchs.map((b)=>{
      b.update();

      if(b.radius > 0 && b.progress > 0.4 && Math.random() < b.branchChance && b.branchCount < 3){
        const newBranch = {
          x:b.x,
          y:b.y,
          radius:b.radius -1,
          angle:b.angle + branchAngles[Math.floor(Math.random()) * branchAngles.length] * b.branchDirection
        };
        this.addBranch(newBranch.x , newBranch.y,newBranch.radius,newBranch.angle,this.branchColor);
        b.branchCount++;
        b.branchDirection *= -1;
      }
    })
  }

  //draw the tree
  draw(ctx:CanvasRenderingContext2D){
    this.branchs.map((b)=>{
      b.draw(ctx)
    })
  }
}

let branchChance =[0.9, 0.8, 0.12, 0.5, 0.10, 0.11, 0.13];
let branchAngles = [20, 25, 30, 35];

//define a branch class that will draw the branchs
class Branch{
  x:number;
  y:number;
  radius:number;
  angle:number;
  leafSize:number;
  progress!:number;
  branchChance!: number;
  branchCount!:number;
  branchDirection!:number;
  branchColor:string;
  sx!:number;
  sy!:number;
  length!:number;
  leaves:Leaf[] = [];

  constructor(x:number,y:number,radius:number,angle:number,leafSize:number,color:string){
    this.x = x;
    this.y = y
    this.radius = radius;
    this.angle = angle;
    this.leafSize = leafSize;
    this.branchColor = color;
    this.branchReset();
  }

  //to build the first branch
  branchReset(){
    this.progress = 0;
    this.branchChance = branchChance[7 - this.radius];
    this.branchCount = 0;
    this.branchDirection = Math.random() < 0.5 ? -1 : 1;
    this.sx = this.x;
    this.sy = this.y;
    this.length = this.radius * 20;
  }

  //to draw the branch
  draw(ctx:CanvasRenderingContext2D){
    if(this.progress > 1 || this.radius <=0){
      if(this.radius == 0){
        this.addLeaf();
        this.leaves.map((l)=>{
          l.draw(ctx);
        })
      }
      return;
    }
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.radius,0,Math.PI*2);
    ctx.fillStyle = this.branchColor;
    ctx.fill();
    ctx.closePath();
  }

  update(){
    const radian = (Math.PI / 180) * this.angle;
    this.x = this.sx + this.length * this.progress * Math.sin(radian);
    this.y = this.sy + this.length * this.progress * Math.cos(radian);

    if (this.radius === 1) {
      this.progress += 0.05;
    } else {
      this.progress += 0.1 / this.radius;
    }

    if (this.progress > 1) {
      this.radius -= 1;
      this.angle += (Math.floor(Math.random() * 3) - 1) * 10;
      this.branchReset();
    }
  }

  //
  addLeaf(){
    const leaf = new Leaf(this.x, this.y, this.leafSize, '#e9b1b1','#ff7c7c');
    this.leaves.push(leaf);
  }
}

//define leaf class
class Leaf{
  x: number;
  y: number;
  size: number;
  firstColor: string;
  secondColor:string;
  constructor(x: number, y: number, size: number, fcolor: string,scolor:string){
    this.x = x;
    this.y = y;
    this.size = size;
    this.firstColor = fcolor;
    this.secondColor = scolor;

  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    let gradient = ctx.createLinearGradient(0,800,0, 0);
    gradient.addColorStop(0, this.firstColor);
    gradient.addColorStop(1, this.secondColor);
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.shadowBlur=1;
    ctx.shadowColor="#0000003a";
    ctx.fill();
    ctx.closePath();
  }
}
// //look at fixes in the Pen https://codepen.io/ghaste/pen/OJqLbvg
// //for adding mouse trail to a page that scrolls beyond the viewport, as would be the case with most websites - lol
// let x1 = 0,
//   y1 = 0;
// window.client;
// const vh = Math.max(
//     document.documentElement.clientHeight || 0,
//     window.innerHeight || 0
//   ),
//   dist_to_draw = 50,
//   delay = 1000,
//   fsize = ["2.4rem", "1.8rem", ".8rem", "2.1rem"],
//   colors = ["#E23636", "#F9F3EE", "#E1F8DC", "#B8AFE6", "#AEE1CD", "#5EB0E5"],
//   shape = ["&#8533", "&#8594", "&#8738", "-", "+", "&#8798", "&#8528"];
// (rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min),
//   (selRand = (o) => o[rand(0, o.length - 1)]),
//   (distanceTo = (x1, y1, x2, y2) =>
//     Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))),
//   (shouldDraw = (x, y) => distanceTo(x1, y1, x, y) >= dist_to_draw),
//   (addStr = (x, y) => {
//     const str = document.createElement("div");
//     str.innerHTML = selRand(shape);
//     str.className = "star";
//     str.style.top = `${y + rand(-20, 20)}px`;
//     str.style.left = `${x}px`;
//     str.style.color = selRand(colors);
//     str.style.fontSize = selRand(fsize);
//     document.body.appendChild(str);
//     console.log(rand(0, 3));
//     const fs = 10 + 4 * parseFloat(getComputedStyle(str).fontSize);
//     console.log(vh, y, fs);
//     console.log(y + fs > vh ? vh - y : fs);
//     str.animate(
//       {
//         translate: `0 ${y + fs > vh ? vh - y : fs}px`,
//         opacity: 0,
//         transform: `rotateX(${rand(1, 200)}deg) rotateY(${rand(1, 200)}deg)`,
//       },
//       {
//         duration: delay,
//         fill: "forwards",
//       }
//     );
//     //could add a animation terminate listener, but why add the additional load
//     setTimeout(() => {
//       str.remove();
//     }, delay);
//   });

// addEventListener("mousemove", (e) => {
//   const { clientX, clientY } = e;
//   if (shouldDraw(clientX, clientY)) {
//     addStr(clientX, clientY);
//     x1 = clientX;
//     y1 = clientY;
//   }
// });

//  //      animation cursor

// var requestAnimationFrame =
//   window.requestAnimationFrame ||
//   window.mozRequestAnimationFrame ||
//   window.webkitRequestAnimationFrame ||
//   window.msRequestAnimationFrame;

// var cancelAnimationFrame =
//   window.cancelAnimationFrame || window.mozCancelAnimationFrame;

// var rAF;

// var canvas = document.getElementById("canvas"),
//   context = canvas.getContext("2d"),
//   width = (canvas.width = window.innerWidth),
//   height = (canvas.height = window.innerHeight),
//   particles = [],
//   mouseX = 0,
//   mouseY = 0,
//   total = 15,
//   followSpeed = 0.1,
//   size = 25;

// document.body.addEventListener("mousemove", function (event) {
//   mouseX = event.clientX;
//   mouseY = event.clientY;
// });

// window.addEventListener("resize", function () {
//   width = canvas.width = window.innerWidth;
//   height = canvas.height = window.innerHeight;
// });

// // Control bar
// var ControlBar = function () {
//   this.num = total;
//   this.speed = followSpeed;
//   this.removeBar = function () {
//     gui.destroy();
//   };
// };

// var con = new ControlBar();
// var gui = new dat.GUI();

// var conSpeed = gui.add(con, "speed", 0.05, 0.25).step(0.05);
// var conNum = gui.add(con, "num", 10, 30).step(1);
// var conRemove = gui.add(con, "removeBar");
// con.removeBar();

// conNum.onFinishChange(function (value) {
//   total = value;
//   init();
// });

// conRemove.onFinishChange(function () {
//   con.removeBar();
// });

// function init() {
//   cancelAnimationFrame(rAF);

//   particles = [];

//   for (var i = 0; i < total; i += 1) {
//     particles.push(new Particle(i));
//   }

//   draw();
// }

// function draw() {
//   context.clearRect(0, 0, width, height);

//   for (var i = 0; i < total; i += 1) {
//     particles[i].update();
//   }

//   rAF = requestAnimationFrame(draw);
// }

// /**
//  * Particle
//  */
// var Particle, p;

// Particle = function (index) {
//   this.initialize(index);
// };

// p = Particle.prototype;

// p.initialize = function (index) {
//   this.x = -50;
//   this.y = height;
//   this.id = index + 1;
//   this.angleX = Math.PI * 2 * Math.random();
//   this.angleY = Math.PI * 2 * Math.random();
//   this.speedX = 0.03 * Math.random() + 0.03;
//   this.speedY = 0.03 * Math.random() + 0.03;
//   this.radius = 150;

//   return this;
// };

// var colors = ["#E23636", "#F9F3EE", "#9bff84", "#836fe7", "#6febba", "#4fa9e5"];

// p.update = function () {
//   var aim, dx, dy, scale, angle;

//   if (this.id > 1) {
//     aim = particles[this.id - 1 - 1];
//     dx = aim.x - this.x;
//     dy = aim.y - this.y;

//     this.x += dx * con.speed;
//     this.y += dy * con.speed;
//   } else {
//     if (mouseX === 0 && mouseY === 0) {
//       dx = width / 2 + Math.cos(this.angleX) * this.radius - this.x;
//       dy = height / 2 + Math.sin(this.angleY) * this.radius - this.y;

//       this.x = width / 2 + Math.cos(this.angleX) * this.radius;
//       this.y = height / 2 + Math.sin(this.angleY) * this.radius;

//       this.angleX += this.speedX;
//       this.angleY += this.speedY;
//     } else {
//       dx = mouseX - this.x;
//       dy = mouseY - this.y;

//       this.x += dx * con.speed;
//       this.y += dy * con.speed;
//     }
//   }

//   angle = Math.atan2(dy, dx);
//   scale = Math.cos((Math.PI / 2) * (this.id / total));

//   context.save();
//   context.translate(this.x, this.y);
//   context.rotate(angle);
//   context.scale(scale, scale);

//   context.beginPath();
//   context.moveTo((-size / 2) * 1.732, -size / 2);
//   context.lineTo(0, 0);
//   context.lineTo((-size / 2) * 1.732, size / 2);
//   context.lineTo((-size / 2) * 1.2, 0);

//   context.fillStyle = colors[Math.floor(Math.random() * colors.length)];
//   context.fill();

//   context.restore();
// };

// init();

//  //
// Tutorial source: https://www.youtube.com/watch?v=aEptSB3fbqM

//            ///           canvas cursor trail

// const canvas = document.getElementById("canvas");
// const ctx = canvas.getContext("2d");
// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;
// let spots = [];
// let hue = 0;

// const mouse = {
//   x: undefined,
//   y: undefined,
// };

// canvas.addEventListener("mousemove", function (event) {
//   mouse.x = event.x;
//   mouse.y = event.y;

//   for (let i = 0; i < 3; i++) {
//     spots.push(new Particle());
//   }
// });

// class Particle {
//   constructor() {
//     this.x = mouse.x;
//     this.y = mouse.y;
//     this.size = Math.random() * 2 + 0.1;
//     this.speedX = Math.random() * 2 - 1;
//     this.speedY = Math.random() * 2 - 1;
//     this.color = "hsl(" + hue + ", 100%, 50%)";
//   }
//   update() {
//     this.x += this.speedX;
//     this.y += this.speedY;
//     if (this.size > 0.1) this.size -= 0.03;
//   }
//   draw() {
//     ctx.fillStyle = this.color;
//     ctx.beginPath();
//     ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
//     ctx.fill();
//   }
// }
// function handleParticle() {
//   for (let i = 0; i < spots.length; i++) {
//     spots[i].update();
//     spots[i].draw();
//     for (let j = i; j < spots.length; j++) {
//       const dx = spots[i].x - spots[j].x;
//       const dy = spots[i].y - spots[j].y;
//       const distance = Math.sqrt(dx * dx + dy * dy);
//       if (distance < 90) {
//         ctx.beginPath();
//         ctx.strokeStyle = spots[i].color;
//         ctx.lineWidth = spots[i].size / 10;
//         ctx.moveTo(spots[i].x, spots[i].y);
//         ctx.lineTo(spots[j].x, spots[j].y);
//         ctx.stroke();
//       }
//     }
//     if (spots[i].size <= 0.3) {
//       spots.splice(i, 1);
//       i--;
//     }
//   }
// }

// function animate() {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   handleParticle();
//   hue++;
//   requestAnimationFrame(animate);
// }

// window.addEventListener("resize", function () {
//   canvas.width = innerWidth;
//   canvas.height = innerHeight;
//   init();
// });

// window.addEventListener("mouseout", function () {
//   mouse.x = undefined;
//   mouse.y = undefined;
// });

// animate();

// loading animation
window.addEventListener(".loader", () => {
  const loading = document.querySelector(".loader");

  loading.classList.add(".loader-hiding");

  loading.addEventListener("transitionend", () => {
    document.body.removeChild(loading);
  });
});

// cursor trail start
// const dots = [];
// const cursor = {
//   x: 0,
//   y: 0,
// };

// for (let i = 0; i < 40; i++) {
//   const dot = document.createElement("div");
//   dot.className = "dot";
//   document.body.appendChild(dot);
//   dots.push(dot);
// }

// document.addEventListener("mousemove", (e) => {
//   cursor.x = e.clientX;
//   cursor.y = e.clientY;
// });
// function draw() {
//   let x = cursor.x;
//   let y = cursor.y;

//   dots.forEach((dot, index) => {
//     const nextDot = dots[index + 1] || dots[0];

//     dot.style.left = x + "px";
//     dot.style.top = y + "px";

//     x += (nextDot.offsetLeft - dot.offsetLeft) * 0.6;
//     y += (nextDot.offsetTop - dot.offsetTop) * 0.6;
//   });
// }
// setInterval(draw, 8);

// // cursor trail end

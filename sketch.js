const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

let engine, world;
let plane;
let block1, block2;
let rotator1, rotator2, rotator3;
let angle1 = 60, angle2 = 60, angle3 = 60;
let particles = [];

function setup() {
  createCanvas(800, 700);
  
  engine = Engine.create();
  world = engine.world;

  let plane_options = {
    isStatic: true
  };
  plane = Bodies.rectangle(400, 690, 800, 20, plane_options);
  World.add(world, plane);

  let block_options = {
    isStatic: true
  };
  block1 = Bodies.rectangle(200, 500, 150, 20, block_options);
  block2 = Bodies.rectangle(600, 500, 150, 20, block_options);
  World.add(world, [block1, block2]);

  let rotator_options = {
    isStatic: true
  };
  rotator1 = Bodies.rectangle(400, 400, 150, 20, rotator_options);
  rotator2 = Bodies.rectangle(400, 400, 150, 20, rotator_options);
  rotator3 = Bodies.rectangle(400, 400, 150, 20, rotator_options);
  World.add(world, [rotator1, rotator2, rotator3]);

  let particle_options = {
    restitution: 0.4,
    friction: 0.02
  };
  for (let i = 0; i < 5; i++) {
    let particle = Bodies.circle(400, 10, 10, particle_options);
    World.add(world, particle);
    particles.push(particle);
  }

  Engine.run(engine);
}

function draw() {
  rectMode(CENTER);
  background(0);
  
  Engine.update(engine);
  
  fill("brown");
  rect(plane.position.x, plane.position.y, 800, 20);

  fill("blue");
  rect(block1.position.x, block1.position.y, 150, 20);
  rect(block2.position.x, block2.position.y, 150, 20);

  Body.rotate(rotator1, angle1);
  Body.rotate(rotator2, angle2);
  Body.rotate(rotator3, angle3);

  push();
  translate(rotator1.position.x, rotator1.position.y);
  rotate(angle1);
  rect(0, 0, 150, 20);
  pop();

  push();
  translate(rotator2.position.x, rotator2.position.y);
  rotate(angle2);
  rect(0, 0, 150, 20);
  pop();

  push();
  translate(rotator3.position.x, rotator3.position.y);
  rotate(angle3);
  rect(0, 0, 150, 20);
  pop();

  angle1 += 15;
  angle2 += 25;
  angle3 += 35;

  fill("white");
  for (let particle of particles) {
    ellipse(particle.position.x, particle.position.y, 20);
  }
}

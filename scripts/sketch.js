let pos, vel; 
let grid = [];
let cols, rows;
let inc = 1;
function setup() {
    createCanvas(400, 400);
    pos = createVector(width / 2, height / 2);
    vel = createVector(random(-1, 1), random(-1, 1));
    rows = height / 20;
    cols = rows;
    let yoff = 0;
    for (let i = 0; i < rows; i++) {
        grid.push([]);
        let xoff = 0;
        for (let j = 0; j < cols; j++) {
            
            const theta = map(noise(i + xoff, j + yoff), 0, 1, 0, HALF_PI);
            grid[i].push(createVector(cos(theta), sin(theta)));
            xoff += inc;
        }
        yoff += inc;
    }
    background(0);
    //console.table(grid);
}

function draw() {
    background(0);
  /*   if (pos.x > width || pos.x < 0) {
        vel.mult(-1);
    }
    if (pos.y > height || pos.y < 0) {
        vel.mult(-1);
    } */
       for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                const currentV = grid[i][j];
                push();
                translate(i * rows + rows / 2, j * cols + cols / 2);
                rotate(currentV.x  /* + radians(frameCount * 0.5) */);
                stroke(255)
                strokeWeight(1);
                rectMode(CENTER)
                //square(0, 0, rows)
                line(0, 0, rows - rows /2, 0);
                pop();
            }
        }
        
        //console.log(typeof pos.y);
        let xPos = Math.floor(map(pos.x, 0, width, 0, rows));
        let yPos = Math.floor(map(pos.y, 0, height, 0, cols));
        for (let x = 0; x < rows; x++) {
            for (let y = 0; y < cols; y++) {
                //console.log(rows, cols);
                //console.log(xPos, yPos);
                if(xPos === x && yPos === y) {
                    //console.log('match');
                    //console.log(grid[x][y].x);
                    const xSpeed = map(grid[x][y].x, 0, HALF_PI, -1, 1);
                    const ySpeed = map(grid[x][y].y, 0, HALF_PI, -1, 1);
                    vel = (createVector(xSpeed, ySpeed));
                    console.log({
                      x: vel.x,
                      y: vel.y,
                      gridX: grid[x][y].x,
                      gridY: grid[x][y].y,
                      half: HALF_PI
                    });
                }
            }
        }
    fill(255);
    pos.add(vel)
    if (pos.x > width || pos.x < 0) {
      pos.add(width);
    }
    if (pos.y > height || pos.y < 0) {
        pos.add(height);
    } 
    ellipse(pos.x, pos.y, 15, 15);
    //noLoop();
}

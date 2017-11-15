var canvas = document.querySelector('canvas');

// Set the canvas width to have the window width and the canvas height
// to the window height
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

/** Variable c is going to stand for something call a context.
 * In technological terms we're returning a drawing context to a
 * variable called c. So, we're creating a super object, wer're
 * basically passing a ton of methods and functions in which we
 * can use to actually draw in our canvas
 * @type {CanvasRenderingContext2D|WebGLRenderingContext}
 */
var c = canvas.getContext('2d');

/* RECTANGLE */

// Give color to our rectangle
// c.fillStyle = 'rgba(255, 0, 0, 0.5)';

// Function fillRect takes for arguments (x, y, width, height)
// c.fillRect(100, 100, 100, 100);

// c.fillStyle = 'rgba(0, 0, 255, 0.5)';
// c.fillRect(400, 100, 100, 100);

// c.fillStyle = 'rgba(0, 255, 0, 0.5)';
// c.fillRect(300, 300, 100, 100);



/* LINE */

// c.beginPath();
// c.moveTo(50, 300); // Takes x and y as arguments
// Now we create a line to a new point which specifies where we want our line to go to
// c.lineTo(300,100);
// c.lineTo(400,300);
// strokeStyle is going give color to out line. It's equal to any css style (rgba, hex, etc)
// c.strokeStyle = '#fa34a3';
// stroke allow me to see the line on the screen
// c.stroke();



/* ARC / CIRCLE */

// c.beginPath();
// c.arc(300, 300, 30, 0, Math.PI * 2, false);
// c.strokeStyle = 'blue';
// c.stroke();

// for (var i = 0; i < 200; i++) {
//
//     var x = Math.random() * window.innerWidth;
//     var y = Math.random() * window.innerHeight;
//
//     c.beginPath();
//     c.arc(x, y, 30, 0, Math.PI * 2, false);
//     c.strokeStyle = 'blue';
//     c.stroke();
// }

// var x = Math.random() * innerWidth;
// var y = Math.random() * innerHeight;
// var dx = (Math.random() - 0.5) * 8;
// var dy = (Math.random() - 0.5) * 8;
// var radius = 30;

// We define a mouse object
var mouse = {
    x: undefined,
    y: undefined
};

var maxRadius = 40;
//var minRadius = 2;

var colorArray = [
    '#1abc9c',
    '#3498db',
    '#9b59b6',
    '#f1c40f',
    '#e74c3c'
];

// We add the event listener mousemove
window.addEventListener('mousemove', function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
    console.log('mouse');
});

// We add the event listener when the window resizes
window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    init();
});

// Creates an object circle
function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
    };

    this.update = function () {
        // If the x gets to the edge of the screen it bounces, that's why we set our value as negative
        if ((this.x + this.radius) > innerWidth || (this.x - this.radius) < 0) {
            this.dx = -this.dx;
        }

        if ((this.y + this.radius) > innerHeight || (this.y - this.radius) < 0) {
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;

        // Interactivity
        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 &&
            mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            if (this.radius < maxRadius) {
                this.radius += 1;
            }
        }
        // If the radius of the circle is greater than the original radius, it will become smaller
        else if (this.radius > this.minRadius) {
            this.radius -= 1;
        }

        this.draw();
    };
}

var circleArray = [];


// We instantiate an object Circle
//var circle = new Circle(200, 200, 3, 3, 30);

function init() {
    circleArray = [];

    // We create 800 circles
    for (var i = 0; i < 800; i++) {

        var x = Math.random() * (innerWidth - radius * 2) + radius; // Prevent circles from getting caught on the sides
        var y = Math.random() * (innerHeight - radius * 2) + radius; // Prevent circles from getting caught on the top and the buttom
        var dx = (Math.random() - 0.5);
        var dy = (Math.random() - 0.5);
        var radius = Math.random() * 3 + 1;

        // Create the new Circle and push it into the array
        circleArray.push(new Circle(x, y, dx, dy, radius))
    }
}

function animate() {
    // requestAnimationFrame takes a function as argument and it basically creates a loop
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight); // It clears the canvas from 0, 0 to the entire width and height

    for (var i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }

    //circle.update();
}


init();
animate();


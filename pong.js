function main()
{
  console.log("Pong: Main: Start!")

  var canvas = document.getElementById('display')
  canvas.width = 600;
  canvas.height = 400;

  var ctx = canvas.getContext("2d");

  //-- Raquetas
  ctx.fillStyle = 'white';
  ctx.fillRect(50,100, 10, 40)
  ctx.fillRect(550,170, 10, 40)

  //-- Mitad de campo
  ctx.fillRect(300,0, 3, 15)
  ctx.fillRect(300,40, 3, 15)
  ctx.fillRect(300,80, 3, 15)
  ctx.fillRect(300,120, 3, 15)
  ctx.fillRect(300,160, 3, 15)
  ctx.fillRect(300,200, 3, 15)
  ctx.fillRect(300,240, 3, 15)
  ctx.fillRect(300,280, 3, 15)
  ctx.fillRect(300,320, 3, 15)
  ctx.fillRect(300,360, 3, 15)
  ctx.fillRect(300,400, 3, 15)

  //-- Marcador
  ctx.font = "70px Arial";
  ctx.fillStyle = 'white'
  ctx.fillText("0", 220, 70);

  ctx.font = "70px Arial";
  ctx.fillStyle = 'white'
  ctx.fillText("0", 340, 70);

  var bola = {

    x_ini: 50,
    y_ini: 50,

    vx: 4,
    vy: 1,

    x: 0,
    y: 0,

    ctx: null,

    init: function(ctx) {
      this.ctx = ctx;
      this.reset();
    },
    draw: function () {

      ctx.beginPath();
      ctx.arc(this.x, this.y, 3, 0, 2 * Math.PI);
      ctx.strokeStyle = 'white';
      ctx.lineWidth = 3;
      ctx.stroke()
      ctx.fillStyle = 'white';
      ctx.fill()
    },
    update: function () {
      this.x += this.vx;
      this.y += this.vy;
    },
    reset: function() {
      this.x = this.x_ini;
      this.y = this.y_ini;
    }
  }

  bola.init(ctx)
  bola.draw()

  var timer = null;
  var sacar = document.getElementById('sacar')

  sacar.onclick = () => {

    if (!timer) {

      timer = setInterval(()=>{

        bola.update();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        bola.draw();

        if (bola.x > canvas.width) {

          clearInterval(timer)
          timer = null;

          bola.reset();

          bola.draw();
        }
      },20);
    }
  }

}

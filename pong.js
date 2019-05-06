function main()
{
  console.log("Pong: Main: Start!")

  var canvas = document.getElementById('display')
  canvas.width = 600;
  canvas.height = 400;

  var ctx = canvas.getContext("2d");

  //-- Mitad de campo
  ctx.setLineDash([20, 15]);
  ctx.moveTo(300, 0);
  ctx.lineTo(300, 400);
  ctx.strokeStyle = 'white';
  ctx.lineWidth = 4;
  ctx.stroke();

  //-- Marcador
  function marcador() {
      ctx.font = "70px Arial";
      ctx.fillStyle = 'white'
      ctx.fillText(player1.puntos, canvas.width/4, 60)

      ctx.font = "70px Arial";
      ctx.fillStyle = 'white'
      ctx.fillText(player2.puntos, 3*canvas.width/4 -30, 60)
    }

  //-- Bola
  var bola = {

    x_ini: 50,
    y_ini: 50,

    v_x: 4,
    v_y: 1,

    x: 0,
    y: 0,

    ctx: null,

    direction: "right",

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

    /*draw: function(){
      this.ctx.fillStyle = 'white';
      this.ctx.fillRect(this.x,this.y,this.width, this.height);
    }, */
    update: function () {
      this.x += this.v_x;
      this.y += this.v_y;
    },
    reset: function() {
      this.x = this.x_ini;
      this.y = this.y_ini;
    }
  }

  //-- Palas
  function pala(posicion_x, posicion_y){
    this.x_ini = posicion_x;
    this.y_ini = posicion_y;

    this.y = 0;
    this.x = 0;

    this.width = 7;
    this.height = 40;

    this.ctx = null;

    this.puntos = 0;

    this.draw = function(){
      this.ctx.fillStyle = 'white';
      this.ctx.fillRect(this.x,this.y,this.width,this.height);
    };

    this.reset = function(){
      this.x = this.x_ini;
      this.y = this.y_ini;
    };

    this.init = function(ctx) {
      this.ctx = ctx;
      this.reset();

    };
  }

  var player1 = new pala(40,30)
  var player2 = new pala(553,340)
  var puntuacion_max = 3



  bola.init(ctx)
  bola.draw()
  player1.init(ctx)
  player2.init(ctx)
  player1.draw()
  player2.draw()
  marcador()


  var timer = null;
  var sacar = document.getElementById('sacar')
  sacar.onclick = () => {
    if (!timer) {
      timer = setInterval(()=>{
        bola.update();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        bola.draw();
        player1.draw();
        player2.draw();
        marcador();

        //--Dibujamos el campo
        ctx.setLineDash([20, 15]);
        ctx.moveTo(300, 0);
        ctx.lineTo(300, 400);
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 4;
        ctx.stroke();

        //--Colisiones de la Bola
        if (bola.x > canvas.width ||
               (bola.y > player2.y && bola.y < player2.y+player2.height && bola.x > player2.x)){
              bola.direction = "left";
              bola.v_x = -7;
              if(bola.x > canvas.width){
                player1.puntos += 1;
              }
        }else if (bola.y > canvas.height){
           if(bola.direction == "right"){
             bola.v_x = 7;
             bola.v_y = -2;
           }else if(bola.direction == "left"){
             bola.v_x = -7;
             bola.v_y = -2;
           }
         }else if (bola.y < 0){
           if(bola.direction == "right"){
             bola.v_x = 7;
             bola.v_y = 2;
           }else if(bola.direction == "left"){
             bola.v_x = -7;
             bola.v_y = 2;
           }
         }else if(bola.x < 0 ||
          (bola.y > player1.y && bola.y < player1.y+player1.height && bola.x < player1.x+player1.width)){
           bola.direction = "right";
           bola.v_x = 7;
           if(bola.x < 0){
             player2.puntos += 1;
           }
         }

         //--movimiento de las palas
         window.onkeydown = (e) => {
              e.preventDefault();
              if(e.key == 'w'){
                player1.y = player1.y - 10;
              }else if(e.key == 's'){
                player1.y = player1.y + 10;
              }
              if(player1.y < 0){
                player1.y = 0;
              }else if(player1.y + player1.height > canvas.height){
                player1.y = canvas.height - player1.height;
              }
          }

          //--movimiento de la cpu
          player2.y = bola.y -+ 2;
          if(player2.y < 0){
            player2.y = 0;
          }else if(player2.y + player2.height > canvas.height){
            player2.y = canvas.height - player2.height;
          }


          //terminar juego y reset
          if (player1.puntos >= puntuacion_max || player2.puntos >= puntuacion_max) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            clearInterval(timer)
            ctx.fillText("GAME OVER", 90, 100)
            ctx.font = "20px Impact"
            timer = null;
          }
        },25);
      }
    }
}

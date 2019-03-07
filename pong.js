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

  //-- Bola
  ctx.beginPath();
  ctx.arc(150, 200, 3, 0, 2 * Math.PI);
  ctx.strokeStyle = 'white';
  ctx.lineWidth = 3;
  ctx.stroke()
  ctx.fillStyle = 'white';
  ctx.fill()


}

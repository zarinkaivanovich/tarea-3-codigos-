

// Dataset de películas
const data = [
  {"anio":1978,"pelicula":"Halloween","recaudacion":5.0,"rating":9.5},
  {"anio":1984,"pelicula":"A Nightmare on Elm Street","recaudacion":7.2,"rating":9.0},
  {"anio":1996,"pelicula":"Scream","recaudacion":11.0,"rating":8.7},
  {"anio":1999,"pelicula":"The Blair Witch Project","recaudacion":13.5,"rating":8.3},
  {"anio":2004,"pelicula":"Saw","recaudacion":18.2,"rating":8.9},
  {"anio":2007,"pelicula":"Paranormal Activity","recaudacion":19.0,"rating":8.8},
  {"anio":2013,"pelicula":"The Conjuring","recaudacion":20.3,"rating":9.2},
  {"anio":2017,"pelicula":"IT (Eso)","recaudacion":25.4,"rating":9.6},
  {"anio":2018,"pelicula":"Halloween (reboot)","recaudacion":28.5,"rating":9.0},
  {"anio":2023,"pelicula":"Five Nights at Freddy’s","recaudacion":35.0,"rating":8.5}
];

// Canvas
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Configuración círculos
const padding = 50;
const maxRecaudacion = Math.max(...data.map(d => d.recaudacion));
const maxCircleRadius = 80;

// Color según rating
function getColor(rating, flicker) {
  const r = 255;
  const g = Math.floor(50 + (10 - rating) * 20);
  const b = 50;
  const alpha = 0.7 + flicker * 0.3;
  return `rgba(${r},${g},${b},${alpha})`;
}

// Dibujar círculos con rebote y rotación
function drawCircles(time) {
  const spacing = (canvas.width - padding*2) / data.length;
  const centerY = canvas.height / 2;

  data.forEach((movie, i) => {
    const flicker = Math.abs(Math.sin(time/200 + i));
    const radius = (movie.recaudacion / maxRecaudacion) * maxCircleRadius;
//suben y bajan los circulos
    const x = padding + i * spacing;
   
    const y = centerY + Math.sin(time/300 + i) * 20;//rebote vertical

    const rotation = Math.sin(time/500 + i) * 0.2; // rotacion
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);

    // Círculo brillante
    ctx.fillStyle = getColor(movie.rating, flicker);
    ctx.shadowColor = 'orange';
    ctx.shadowBlur = 20 * flicker;
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI*2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Texto de recaudación
    ctx.fillStyle = 'orange';
    ctx.font = '16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(`${movie.recaudacion}M`, 0, -radius - 10);

    // Texto del nombre
    ctx.fillStyle = '#fff';
    ctx.font = '14px Arial';
    ctx.fillText(movie.pelicula, 0, radius + 20);

    ctx.restore();
  });
}

// Animación principal
function animate(time=0) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawCircles(time);
  requestAnimationFrame(animate);
}

animate();

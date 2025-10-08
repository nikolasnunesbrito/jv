 
     let historico = [];

     function Consulta() 

     {   let ultimas = historico.slice(-3); 
         let texto = "Últimas consultas:\n";

        for (let i = 0; i < ultimas.length; i++) {
        texto += ultimas[i] + "\n";
        }
        
       document.getElementById("consulta").value = ultimos.join("\n");
       
     }

    function soma() {
    let valor1 = document.getElementById("valor1").value;
    let valor2 = document.getElementById("valor2").value;

    if (valor1.trim() === "" || valor2.trim() === "") {
        document.getElementById("resultado").value = "Preencha os dois campos!";
        return;
    }

    valor1 = Number(valor1);
    valor2 = Number(valor2);

    if (isNaN(valor1) || isNaN(valor2)) {
        document.getElementById("resultado").value = "Digite dois números válidos!";
        return;
    }

    let resultado = valor1 + valor2;
    historico.push(valor1 + " + " + valor2 + " = " + resultado);
    document.getElementById("resultado").value = resultado;
  }
     
     function subtracao() {
    let valor1 = document.getElementById("valor1").value;
    let valor2 = document.getElementById("valor2").value;

    if (valor1.trim() === "" || valor2.trim() === "") {
        document.getElementById("resultado").value = "Preencha os dois campos!";
        return;
    }

    valor1 = Number(valor1);
    valor2 = Number(valor2);

    if (isNaN(valor1) || isNaN(valor2)) {
        document.getElementById("resultado").value = "Digite dois números válidos!";
        return;
    }

    let resultado = valor1 - valor2;
    historico.push(valor1 + " + " + valor2 + " = " + resultado);
    document.getElementById("resultado").value = resultado;
}
     
     function multiplicacao() {
    let valor1 = document.getElementById("valor1").value;
    let valor2 = document.getElementById("valor2").value;

    if (valor1.trim() === "" || valor2.trim() === "") {
        document.getElementById("resultado").value = "Preencha os dois campos!";
        return;
    }

    valor1 = Number(valor1);
    valor2 = Number(valor2);

    if (isNaN(valor1) || isNaN(valor2)) {
        document.getElementById("resultado").value = "Digite dois números válidos!";
        return;
    }

    let resultado = valor1 * valor2;
    historico.push(valor1 + " + " + valor2 + " = " + resultado);
    document.getElementById("resultado").value = resultado;
}
     function divisao() {
    let valor1 = document.getElementById("valor1").value;
    let valor2 = document.getElementById("valor2").value;

    if (valor1.trim() === "" || valor2.trim() === "") {
        document.getElementById("resultado").value = "Preencha os dois campos!";
        return;
    }

    valor1 = Number(valor1);
    valor2 = Number(valor2);

    if (isNaN(valor1) || isNaN(valor2)) {
        document.getElementById("resultado").value = "Digite dois números válidos!";
        return;
    }

    let resultado = valor1 / valor2;
    historico.push(valor1 + " + " + valor2 + " = " + resultado);
    document.getElementById("resultado").value = resultado;
}

const canvas = document.getElementById("fundo");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const mouse = { x: null, y: null };
const ghost = { x: canvas.width / 2, y: canvas.height / 2 };
const retreatPoint = { x: 50, y: 50 };
let mouseBlocked = false;

const content = document.getElementById("content");
content.addEventListener("mouseenter", () => mouseBlocked = true);
content.addEventListener("mouseleave", () => mouseBlocked = false);

window.addEventListener("mousemove", e => {
  mouse.x = e.x;
  mouse.y = e.y;
});

window.addEventListener("mouseleave", () => {
  mouse.x = null;
  mouse.y = null;
});

const particles = [];
const numParticles = 250;

for (let i = 0; i < numParticles; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: 4,
    vx: (Math.random() - 0.5) * 1.5,
    vy: (Math.random() - 0.5) * 1.5
  });
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Atualiza posição do perseguidor
  const target = (mouseBlocked || mouse.x === null || mouse.y === null)
    ? retreatPoint
    : mouse;

  ghost.x += (target.x - ghost.x) * 0.03;
  ghost.y += (target.y - ghost.y) * 0.03;

  // Desenha bolinhas
  for (let p of particles) {
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();
  }

  // Tentáculos conectando partículas ao perseguidor
  if (!mouseBlocked && mouse.x !== null && mouse.y !== null) {
    for (let p of particles) {
      const dx = ghost.x - p.x;
      const dy = ghost.y - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 180) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
     console.log();
     
        const cpX = (p.x + ghost.x) / 2 + (Math.random() - 0.5) * 50;
        const cpY = (p.y + ghost.y) / 2 + (Math.random() - 0.5) * 50;

        const pulse = 1 + Math.sin(Date.now() / 200) * 0.5;
        ctx.quadraticCurveTo(cpX, cpY, ghost.x, ghost.y);
        ctx.strokeStyle = "white";
        ctx.lineWidth = 2.5 * pulse;
        ctx.stroke();
      }
    }
  }

  // Tentáculos próprios do monstro
  for (let i = 0; i < 5; i++) {
    const angle = Math.random() * Math.PI * 2;
    const length = 30 + Math.random() * 40;
    const endX = ghost.x + Math.cos(angle) * length;
    const endY = ghost.y + Math.sin(angle) * length;

    ctx.beginPath();
    ctx.moveTo(ghost.x, ghost.y);
    ctx.lineTo(endX, endY);
    ctx.strokeStyle = "rgba(255, 0, 0, 0.6)";
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  // Olho simbiótico
  ctx.beginPath();
  ctx.arc(ghost.x, ghost.y, 12, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(255, 0, 0, 0.8)";
  ctx.shadowColor = "red";
  ctx.shadowBlur = 15;
  ctx.fill();

  requestAnimationFrame(draw);
}

draw();
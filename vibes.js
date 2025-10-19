(() => {
  const STAR_COUNT = 160;
  const WISH_FREQUENCY_MS = 1400;
  const WISHES = [
    "Chúc 20/10 rạng rỡ! ✨",
    "Luôn xinh đẹp & hạnh phúc 💐",
    "Bình an – Tự tin – Tỏa sáng",
    "Hôm nay của em là tuyệt nhất!",
    "Mỗi ngày đều đáng yêu 🫶",
    "Cười thật tươi nhé!",
    "Yêu thương nhiều hơn ❤️",
    "Mọi điều tốt lành!"
  ];
  const stars = document.createElement("canvas");
  stars.id = "bg-stars";
  document.body.prepend(stars);
  const wishesLayer = document.createElement("div");
  wishesLayer.id = "bg-wishes";
  wishesLayer.style.position = "fixed";
  wishesLayer.style.inset = "0";
  wishesLayer.style.pointerEvents = "none";
  document.body.prepend(wishesLayer);

  const ctx = stars.getContext("2d");
  function resize(){
    stars.width = window.innerWidth;
    stars.height = window.innerHeight;
    drawStars();
  }
  window.addEventListener("resize", resize);

  function drawStars(){
    const { width:w, height:h } = stars;
    ctx.clearRect(0,0,w,h);
    for(let i=0;i<STAR_COUNT;i++){
      const x = Math.random()*w;
      const y = Math.random()*h;
      const r = Math.random()*1.1 + 0.2;
      const a = 0.4 + Math.random()*0.6;
      ctx.beginPath();
      ctx.arc(x,y,r,0,Math.PI*2);
      ctx.fillStyle = `rgba(255,255,255,${a})`;
      ctx.fill();
      if (Math.random()<0.12){
        ctx.fillStyle = `rgba(${150+Math.random()*105}, ${120+Math.random()*135}, 255, ${a*0.7})`;
        ctx.fill();
      }
    }
  }

  function spawnWish(){
    const node = document.createElement("div");
    node.textContent = WISHES[Math.floor(Math.random()*WISHES.length)];
    node.style.position = "absolute";
    node.style.left = Math.random()*100 + "vw";
    node.style.top = "-40px";
    node.style.fontSize = (14 + Math.random()*10) + "px";
    node.style.padding = "6px 10px";
    node.style.borderRadius = "999px";
    node.style.whiteSpace = "nowrap";
    node.style.transform = `rotate(${Math.random()*10-5}deg)`;
    node.style.background = "rgba(255,255,255,0.08)";
    node.style.border = "1px solid rgba(255,255,255,0.16)";
    node.style.backdropFilter = "blur(6px)";
    node.style.boxShadow = "0 8px 22px rgba(0,0,0,0.35)";
    node.style.color = "var(--fg, #e8ecff)";
    const hue = Math.floor(Math.random()*360);
    node.style.outline = `1px solid hsl(${hue} 100% 70% / 0.25)`;
    node.style.textShadow = "0 2px 10px rgba(0,0,0,0.35)";
    wishesLayer.appendChild(node);
    const duration = 8000 + Math.random()*5000;
    const drift = (Math.random()*2-1)*80;
    node.animate([
      { transform: `translate(0,0) rotate(0deg)` , opacity: 0 },
      { transform: `translate(${drift/2}px, 40vh) rotate(${drift/10}deg)`, opacity: 1, offset: .2 },
      { transform: `translate(${drift}px, 100vh) rotate(${drift/6}deg)`, opacity: .9 },
    ], { duration, easing:"cubic-bezier(.2,.8,.2,1)" }).onfinish = () => node.remove();
  }

  function confetti(x, y){
    for(let i=0;i<18;i++){
      const p = document.createElement("div");
      p.style.position = "fixed";
      p.style.width = p.style.height = (4 + Math.random()*6) + "px";
      p.style.left = x + "px"; p.style.top = y + "px";
      p.style.background = `hsl(${Math.random()*360} 100% 70%)`;
      p.style.borderRadius = Math.random()>.5 ? "2px" : "999px";
      p.style.pointerEvents = "none";
      p.style.boxShadow = "0 6px 16px rgba(0,0,0,.35)";
      document.body.appendChild(p);
      const dx = (Math.random()*2-1)*160;
      const dy = 220 + Math.random()*160;
      const rot = (Math.random()*2-1)*360;
      p.animate([
        { transform:`translate(0,0) rotate(0deg)`, opacity:1 },
        { transform:`translate(${dx/2}px, ${dy/2*-1}px) rotate(${rot/2}deg)`, opacity:1, offset:.35 },
        { transform:`translate(${dx}px, ${dy*-1}px) rotate(${rot}deg)`, opacity:0 },
      ], { duration: 900 + Math.random()*500, easing: "cubic-bezier(.2,.8,.2,1)" }).onfinish = () => p.remove();
    }
  }

  window.addEventListener("click", (e)=> confetti(e.clientX, e.clientY));
  function tick(){ spawnWish(); }
  resize(); drawStars();
  const wishTimer = setInterval(tick, WISH_FREQUENCY_MS);
  document.addEventListener("visibilitychange", () => { if (document.hidden) clearInterval(wishTimer); });
})();
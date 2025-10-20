// ===== Special Upgrades: ring text, bunny hopper, gift modal =====
(() => {
  // 1) Ring Text (SVG textPath)
 // 1) Ring Text (SVG textPath) — always closed
function injectRingText(){
  const MESSAGE = "Happy Vietnamese Women's Day • With love • Always be radiant ✨ •";

  const ring = document.createElement('div');
  ring.className = 'ring-wrap';
  ring.innerHTML = `
    <svg viewBox="-6 -6 112 112" aria-hidden="true" width="100%" height="100%">
      <defs>
        <!-- Bắt đầu ở đỉnh (0,-R). Giảm R xuống 40 để có mép an toàn, tránh bị cắt. -->
        <path id="circlePath"
              d="M50,50 m 0,-40 a 40,40 0 1,1 0,80 a 40,40 0 1,1 0,-80"/>
      </defs>
      <text fill="currentColor" text-anchor="middle">
        <!-- startOffset=50% để căn đỉnh; textLength sẽ được set động = độ dài thật của path -->
        <textPath id="ringText" href="#circlePath" startOffset="50%" lengthAdjust="spacingAndGlyphs"></textPath>
      </text>
    </svg>
    <div class="center-emoji">🌷🌷</div>
  `;

  const target = document.querySelector('.hero') || document.querySelector('main') || document.body;
  if (!target) return;
  target.prepend(ring);

  // 🔒 Đặt text sau khi SVG đã gắn vào DOM để đo chính xác chiều dài path
  const svg = ring.querySelector('svg');
  const path = ring.querySelector('#circlePath');
  const tp   = ring.querySelector('#ringText');

  // Nội dung giữ nguyên, loại bỏ khoảng trắng thừa ở đầu/cuối
  tp.textContent = MESSAGE.trim();

  // Đo độ dài path thực tế, gán cho textLength ⇒ khít kín 100%
  const L = path.getTotalLength();          // ví dụ ~251.327 cho R=40
  tp.setAttribute('textLength', L);

  // Nếu vẫn thấy hở rất nhỏ trên một số máy Android (do làm tròn), nới +0.5%:
  // tp.setAttribute('textLength', L * 1.005);
}


  // 2) Bunny Hopper (inline SVG)
  function injectBunny(){
    const wrap = document.createElement('div');
    wrap.className = 'hopper';
    document.body.appendChild(wrap);
  }

  // 3) Gift Modal with curated wishes
  function injectGiftModal(){
    const wishes = [
      "Chúc ebeee 20/10 thật rực rỡ và hạnh phúc nhé 🌷",
      "Luôn tự tin, xinh đẹp và thật nhiều niềm vui ✨",
      "Chúc ebeee 20/10 luôn hạnh phúc và nhiều may mắn 💗",
      "Pétt yêu Mítt 🫶",
      "Ngày 20/10, chỉ mong em bé của anh lúc nào cũng nở nụ cười tươi 🌟",
    ];

    const backdrop = document.createElement('div');
    backdrop.className = 'modal-backdrop';

    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
      <div class="card">
        <h3>Hộp quà lời chúc 🎁</h3>
        <div class="wishes">
          ${wishes.map(w => `<div class="wish">${w}</div>`).join("")}
        </div>
        <div class="actions">
          <button class="btn btn-close">Đóng</button>
        </div>
      </div>
    `;

    const fab = document.createElement('button');
    fab.className = 'gift-fab';
    fab.title = 'Mở hộp quà';
    fab.innerHTML = '🎁';

    document.body.appendChild(backdrop);
    document.body.appendChild(modal);
    document.body.appendChild(fab);

    fab.addEventListener('click', () => document.body.classList.add('show-modal'));
    backdrop.addEventListener('click', () => document.body.classList.remove('show-modal'));
    modal.querySelector('.btn-close').addEventListener('click', () => document.body.classList.remove('show-modal'));
  }

  // Boot
  injectRingText();
  injectBunny();
  injectGiftModal();
})();

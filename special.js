// ===== Special Upgrades: ring text, bunny hopper, gift modal =====
(() => {
  // 1) Ring Text (SVG textPath)
function injectRingText(){
  const ring = document.createElement('div');
  ring.className = 'ring-wrap';
  ring.innerHTML = `
    <!-- viewBox nới ra 6 đơn vị mỗi phía để khỏi cắt chữ -->
    <svg viewBox="-6 -6 112 112" aria-hidden="true" width="100%" height="100%">
      <defs>
        <!-- Giữ bắt đầu ở đỉnh, giảm R từ 42 xuống 40 để có khoảng hở -->
        <path id="circlePath"
              d="M50,50 m 0,-40 a 40,40 0 1,1 0,80 a 40,40 0 1,1 0,-80"
              pathLength="1000" />
      </defs>

      <text fill="currentColor" text-anchor="middle">
        <textPath href="#circlePath"
                  startOffset="50%"
                  textLength="1000"
                  lengthAdjust="spacing">
          Happy Vietnamese Women's Day • With love • Always be radiant ✨ •
        </textPath>
      </text>
    </svg>
    <div class="center-emoji">💐</div>
  `;
  (document.querySelector('.hero') || document.querySelector('main') || document.body).prepend(ring);
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

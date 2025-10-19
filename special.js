// ===== Special Upgrades: ring text, bunny hopper, gift modal =====
(() => {
  // 1) Ring Text (SVG textPath)
  function injectRingText(){
    const ring = document.createElement('div');
    ring.className = 'ring-wrap';
    ring.innerHTML = `
      <svg viewBox="0 0 100 100" aria-hidden="true">
        <defs>
          <path id="circlePath" d="M 50,50 m -42,0 a 42,42 0 1,1 84,0 a 42,42 0 1,1 -84,0" />
        </defs>
        <text font-size="7" fill="currentColor">
          <textPath href="#circlePath">
             Happy Vietnamese Women's Day • With love • Always be radiant ✨ •
          </textPath>
        </text>
      </svg>
      <div class="center-emoji">💐</div>
    `;
    const target = document.querySelector('.hero') || document.querySelector('main') || document.body;
    target && target.prepend(ring);
  }

  // 2) Bunny Hopper (inline SVG)
  function injectBunny(){
    const wrap = document.createElement('div');
    wrap.className = 'hopper';
    wrap.innerHTML = `
      <svg viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg">
        <g fill="white">
          <ellipse cx="110" cy="80" rx="50" ry="28" opacity="0.95"/>
          <circle cx="60" cy="70" r="18" opacity="0.95"/>
          <ellipse cx="150" cy="72" rx="12" ry="20" transform="rotate(-18 150 72)" opacity="0.95"/>
          <ellipse cx="160" cy="38" rx="10" ry="26" transform="rotate(-35 160 38)" opacity="0.95"/>
          <circle cx="72" cy="64" r="3" fill="#222"/>
          <circle cx="68" cy="60" r="1.5" fill="#222"/>
          <ellipse cx="90" cy="95" rx="16" ry="8" fill="rgba(0,0,0,.25)"/>
        </g>
      </svg>
    `;
    document.body.appendChild(wrap);
  }

  // 3) Gift Modal with curated wishes
  function injectGiftModal(){
    const wishes = [
      "Chúc bạn 20/10 rực rỡ và hạnh phúc 🌸",
      "Luôn tự tin, xinh đẹp và thật nhiều niềm vui ✨",
      "Chúc em 20/10 ngập trong hoa, quà và tình yêu vô hạn của anh 💖",
      "Cười nhiều hơn mỗi ngày nhé 🫶",
      "Ngày 20/10, chỉ mong em bé của anh lúc nào cũng cười tươi như bây giờ. 🌟",
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
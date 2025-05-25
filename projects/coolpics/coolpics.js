document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.getElementById('menuButton');
  const menuItems = document.getElementById('menuItems');
  const gallery = document.querySelector('.gallery');

  menuButton.addEventListener('click', () => {
    menuItems.classList.toggle('hide');
  });

  function handleResize() {
    if (window.innerWidth > 1000) {
      menuItems.classList.remove('hide');
    } else {
      menuItems.classList.add('hide');
    }
  }

  window.addEventListener('resize', handleResize);
  handleResize();

  
  const modal = document.createElement('dialog');
  modal.style.width = '100%';
  modal.style.height = '100%';
  modal.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
  modal.style.border = 'none';
  modal.style.padding = '0';
  modal.style.zIndex = '10';
  modal.style.display = 'flex';
  modal.style.justifyContent = 'center';
  modal.style.alignItems = 'center';
  modal.style.position = 'fixed';

  document.body.appendChild(modal);

  gallery.addEventListener('click', (event) => {
    const img = event.target.closest('img');
    if (!img) return; 

    const src = img.src;
    const srcParts = src.split('/');
    const filename = srcParts[srcParts.length - 1];
    const baseName = filename.split('-')[0];
    const fullSrc = src.replace(filename, baseName + '-full.jpeg');

    modal.innerHTML = `
      <img src="${fullSrc}" alt="${img.alt}" style="
        max-height: 100%;
        width: 90%;
        margin: 20vh auto 0 auto;
        display: block;
        box-shadow: 0 0 10px black;
        position: relative;
      " />
      <button class="close-viewer" aria-label="Close viewer" style="
        position: absolute;
        top: 20vh;
        right: 5vw;
        font-size: 1.5em;
        background: var(--accent-color);
        color: white;
        border: none;
        padding: 0.25em 0.5em;
        cursor: pointer;
        border-radius: 5px;
      ">X</button>
    `;

    modal.showModal();

    const closeBtn = modal.querySelector('.close-viewer');
    closeBtn.addEventListener('click', () => {
      modal.close();
    });
  });

  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.close();
    }
  });
});

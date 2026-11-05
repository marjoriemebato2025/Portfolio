const lightbox = document.createElement('div');
lightbox.className = 'lightbox';
lightbox.innerHTML = '<img alt="">';
document.body.appendChild(lightbox);
const lightboxImg = lightbox.querySelector('img');

document.addEventListener('click', e => {
  const img = e.target.closest('.photo img');
  if (img && !img.closest('.cf-side')) {
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add('open');
    return;
  }
  if (e.target.closest('.lightbox')) lightbox.classList.remove('open');
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') lightbox.classList.remove('open');
});

const currentPage = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('#nav a').forEach(a => {
  a.classList.toggle('active', a.getAttribute('href') === currentPage);
});


document.querySelectorAll('.car-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const track = document.getElementById(btn.dataset.target);
    track.scrollBy({ left: 350 * Number(btn.dataset.dir), behavior: 'smooth' });
  });
});


if (document.getElementById('cfC')) {

  const items = [
    { label: 'My Main', img: 'images/My main.jpg' },
    { label: 'EK time!', img: 'images/EK Time!.jpg' },
    { label: 'For three!', img: 'images/tatluuu.png' },
    { label: 'Four Marias', img: 'images/kwatro.jpg' },
    { label: 'Sponti Tagaytay', img: 'images/tagaytay.jpg' },
    { label: 'My buddies', img: 'images/whoa.jpg' },
    { label: 'W/Royiee', img: 'images/royiee.jpg' },
    { label: 'Me na itu!', img: 'images/siself.jpg' }
  ];
  let idx = 0;

  const EXTS = ['jpg', 'jpeg', 'png', 'webp', 'jfif'];

  function setPhoto(el, item) {
    const photo = el.querySelector('.photo');
    photo.innerHTML = '';
    if (!item.img) return;
    const base = item.img.replace(/\.[^.]+$/, '');
    let i = 0;
    const img = document.createElement('img');
    img.alt = item.label;
    img.onerror = () => {
      i++;
      if (i < EXTS.length) img.src = base + '.' + EXTS[i];
      else console.warn('Photo not found:', base);
    };
    img.src = base + '.' + EXTS[0];
    photo.appendChild(img);
  }

  function renderFlow() {
    const n = items.length;
    setPhoto(document.getElementById('cfL'), items[(idx - 1 + n) % n]);
    setPhoto(document.getElementById('cfC'), items[idx]);
    setPhoto(document.getElementById('cfR'), items[(idx + 1) % n]);
    document.getElementById('cfLabel').textContent = items[idx].label;
  }

  document.getElementById('cfPrev').onclick = () => {
    idx = (idx - 1 + items.length) % items.length;
    renderFlow();
  };
  document.getElementById('cfNext').onclick = () => {
    idx = (idx + 1) % items.length;
    renderFlow();
  };
  renderFlow();
}

/* ----- Contact form  ----- */
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('cName').value.trim();
    document.getElementById('formMsg').textContent =
      `Thanks, ${name}! Your message has been noted.`;
    e.target.reset();
  });
}
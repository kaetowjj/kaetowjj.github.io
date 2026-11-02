import './site.mjs';

const avatar = document.querySelector('.profile-avatar');
const image = avatar?.querySelector('img');
const initials = avatar?.querySelector('.profile-avatar-initials');

if (image && initials) {
  function updateAlt() {
    const label = image.dataset[document.documentElement.lang === 'zh' ? 'altZh' : 'altEn'];
    image.alt = label;
    if (image.hidden) avatar.setAttribute('aria-label', label);
  }

  function showInitials() {
    image.hidden = true;
    image.removeAttribute('src');
    initials.hidden = false;
    avatar.setAttribute('role', 'img');
    updateAlt();
  }

  image.addEventListener('load', () => {
    if (!image.naturalWidth) return;
    image.hidden = false;
    initials.hidden = true;
    avatar.removeAttribute('role');
    avatar.removeAttribute('aria-label');
  });
  image.addEventListener('error', showInitials);
  document.addEventListener('languagechange', updateAlt);
  updateAlt();
  if (image.dataset.avatarSrc) image.src = image.dataset.avatarSrc;
}

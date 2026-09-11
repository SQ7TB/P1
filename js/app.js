const contentPath = (file) => new URL(`../content/${file}`, import.meta.url);

async function loadJson(file) {
  const response = await fetch(contentPath(file));
  if (!response.ok) throw new Error(`Nie udało się wczytać ${file}`);
  return response.json();
}

function createLink(item, className = '') {
  const link = document.createElement('a');
  link.href = item.href;
  link.className = className;
  link.textContent = item.label;
  return link;
}

function renderNotice(data) {
  const target = document.querySelector('#important-message');
  target.replaceChildren();
  const icon = document.createElement('span');
  icon.className = 'notice__icon';
  icon.setAttribute('aria-hidden', 'true');
  icon.textContent = '!';
  const copy = document.createElement('p');
  const label = document.createElement('strong');
  label.textContent = `${data.label}: `;
  copy.append(label, document.createTextNode(data.message));
  target.append(icon, copy);
}

function renderGroups(groups) {
  const target = document.querySelector('#groups');
  target.replaceChildren(...groups.map((group) => {
    const item = document.createElement('div');
    item.className = `group group--${group.icon}`;
    const image = document.createElement('img');
    image.src = `assets/icons/${group.icon}.svg`;
    image.alt = group.alt;
    image.width = 42;
    image.height = 42;
    const name = document.createElement('strong');
    name.textContent = group.name;
    item.append(image, name);
    return item;
  }));
}

function renderNews(posts) {
  const target = document.querySelector('#news-list');
  const visiblePosts = posts.filter((post) => post.showOnHomepage);
  target.replaceChildren(...visiblePosts.map((post) => {
    const article = document.createElement('article');
    article.className = 'post';
    if (post.thumbnail) {
      const image = document.createElement('img');
      image.className = 'post__image';
      image.src = post.thumbnail;
      image.alt = post.thumbnailAlt;
      image.width = 180;
      image.height = 160;
      article.append(image);
    }
    const body = document.createElement('div');
    body.className = 'post__body';
    const meta = document.createElement('div');
    meta.className = 'post__meta';
    const category = document.createElement('span');
    category.className = 'tag';
    category.textContent = post.category;
    const time = document.createElement('time');
    time.dateTime = post.date;
    time.textContent = post.displayDate;
    meta.append(category, time);
    const title = document.createElement('h3');
    title.textContent = post.title;
    const excerpt = document.createElement('p');
    excerpt.textContent = post.excerpt;
    const link = document.createElement('a');
    link.className = 'read-more';
    link.href = post.url;
    link.textContent = 'Czytaj więcej';
    link.setAttribute('aria-label', `Czytaj więcej: ${post.title}`);
    body.append(meta, title, excerpt, link);
    article.append(body);
    return article;
  }));
}

function renderParentInfo(data) {
  const shortcuts = document.querySelector('#shortcuts');
  shortcuts.replaceChildren(...data.shortcuts.map((item) => createLink(item, 'side-link')));
  const parents = document.querySelector('#parent-links');
  parents.replaceChildren(...data.parentLinks.map((item) => {
    const link = createLink(item, 'parent-link');
    const detail = document.createElement('small');
    detail.textContent = item.detail;
    link.append(detail);
    return link;
  }));
  const contact = document.querySelector('#contact-details');
  const address = document.createElement('address');
  address.textContent = data.contact.address;
  const phone = document.createElement('a');
  phone.href = `tel:${data.contact.phone.replace(/\s/g, '')}`;
  phone.textContent = data.contact.phone;
  const email = document.createElement('a');
  email.href = `mailto:${data.contact.email}`;
  email.textContent = data.contact.email;
  const hours = document.createElement('p');
  hours.textContent = data.contact.openingHours;
  contact.replaceChildren(address, phone, email, hours);
}

function renderMenu(data) {
  const target = document.querySelector('#menu-info');
  const period = document.createElement('p');
  period.textContent = data.current.period;
  const link = document.createElement('a');
  link.className = 'read-more';
  link.href = data.current.file;
  link.textContent = 'Zobacz jadłospis';
  target.replaceChildren(period, link);
}

function showLoadError(error) {
  console.error(error);
  document.querySelectorAll('.loading, .skeleton').forEach((element) => {
    element.textContent = 'Nie udało się wczytać treści. Odśwież stronę, aby spróbować ponownie.';
    element.classList.add('load-error');
  });
}

async function init() {
  try {
    const [notice, groups, news, parentInfo, menu] = await Promise.all([
      loadJson('important-message.json'), loadJson('groups.json'), loadJson('news.json'),
      loadJson('parent-info.json'), loadJson('menu.json')
    ]);
    renderNotice(notice);
    renderGroups(groups);
    renderNews(news);
    renderParentInfo(parentInfo);
    renderMenu(menu);
  } catch (error) {
    showLoadError(error);
  }
}

const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('#main-menu');
menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menu.classList.toggle('is-open', !isOpen);
});
menu.addEventListener('click', (event) => {
  if (event.target.matches('a')) {
    menuButton.setAttribute('aria-expanded', 'false');
    menu.classList.remove('is-open');
  }
});
document.querySelector('#current-year').textContent = new Date().getFullYear();
init();

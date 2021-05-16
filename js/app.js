import { fetchData } from './fetchData.js';
import { buildItem } from './buildItem.js';

const accessKey = 't4S6fbs7GFzLxoyImRtiBj7ytnDKMrQ0VQRdiZGoCcY',
  panelItem = document.getElementById('main-panel'),
  dropdown = document.getElementById('collapse'),
  menuItem = document.querySelectorAll('li a'),
  searchBar = document.getElementById('search-bar'),
  showMore = document.getElementById('show-more'),
  gridView = document.querySelectorAll('.dist__view--img');

async function getImages(query) {
  try {
    const data = await fetchData(`https://api.unsplash.com/search/photos?page=${randomNumber()}&query=${query}&client_id=${accessKey}`);

    data.results.map((item) => {
      const contentItem = buildItem(item);
      panelItem.appendChild(contentItem);
    });
  } catch (err) {
    console.error(err);
  }
}

window.addEventListener('load', () => {
  getImages('brand-web-photography-app');
});

/* search menu */
menuItem.forEach((ele) => {
  ele.addEventListener('click', (e) => {
    menuItem.forEach((state) => state.classList.remove('active'));
    e.target.classList.add('active');
    getImages(e.target.attributes[1].value);

    document.querySelectorAll('.container').forEach((itemContent) => {
      itemContent.remove();
    });

    showMore.setAttribute('data-query', e.target.attributes[1].value);
  });
});

/* search bar */
searchBar.addEventListener('keyup', (e) => {

  document.getElementById('icon-search').addEventListener('click', () => {
    document.querySelectorAll('.container').forEach((itemContent) => {
      itemContent.remove();
    });
    getImages(e.target.value);
  })

  if(e.keyCode === 13){
    
    document.querySelectorAll('.container').forEach((itemContent) => {
      itemContent.remove();
    });
    getImages(e.target.value);

  }
  
  showMore.setAttribute('data-query', e.target.value);
});

/* Button show more */
showMore.addEventListener('click', () => {
  getImages(showMore.dataset.query);
});

/* Menu mobile collapse*/
dropdown.addEventListener('click', () => {
  const contentMenu = document.getElementById('menu');

  if (collapse.className !== 'header__collapse-menu collapse') {
    collapse.classList.add('collapse');
    contentMenu.style.transform = 'translate(0px)';
    contentMenu.style.transition = 'transform .7s';
  } else {
    collapse.classList.remove('collapse');
    contentMenu.style.transform = 'translate(460px)';
    contentMenu.style.transition = 'transform .7s';
  }
});

/* grid view images */
gridView.forEach((j) => {
  j.addEventListener('click', () => {
    const elements = {
      btnGrid: document.getElementById('grid'),
      btnRow: document.getElementById('row'),
    };

    if (panelItem.className === 'content-panel__container grid') {
      panelItem.classList.remove('grid');
      panelItem.classList.add('row');
      elements.btnGrid.classList.remove('disable');
      elements.btnRow.classList.add('disable');
    } else {
      panelItem.classList.remove('row');
      panelItem.classList.add('grid');
      elements.btnRow.classList.remove('disable');
      elements.btnGrid.classList.add('disable');
    }
  });
});

function randomNumber() {
  return Math.floor(Math.random() * 50 - 1 + 1) + 1;
}

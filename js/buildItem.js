export const buildItem = (item) => {
  const content = document.createElement('div');
  content.classList.add('container');

  content.innerHTML = `
    <div class="box-img">
        <img src=${item.urls.thumb} alt=${item.user.name} loading="lazy" />
    </div>
    <div class="overlay">
        <div class="overlay__desc">
            <h2 class="panel-item__title">${item.user.name}</h2>
            <hr />
            <p class="panel-item__subTitle">${item.user.location === null ? 'No Location' : item.user.location}</p>
        </div>
    </div>
    `;

  return content;
};

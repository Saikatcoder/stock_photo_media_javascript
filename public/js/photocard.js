// import
import {ripple} from "../js/ripple.js";
import { favorite } from "../js/favotite.js";

export const photoCard = photo =>{
    const root = window.location.origin;

    const {alt, avg_color: backdropColor , width ,height, src :{large},id } = photo;

    const card = document.createElement("div")
    card.classList.add('card', "grid-item");
    card.style.backgroundColor = backdropColor;

    const favoriteObjsave = JSON.parse(window.localStorage.getItem("favorite"))

    card.innerHTML = `
    <figure class="card-banner" style="width: ${width}; height: ${height};">
    <img src="${large}" alt="${alt}" class="img-cover" width="${width}" height="${height}" loading="lazy">
  </figure>
  <div class="card-content">
    <button class="icon-btn small ${favoriteObjsave.photos[id] ? "active" : ""}" aria-label="Add to favorite" data-ripple data-favorite-btn>
      <i class="fa-solid fa-heart"></i>
      <div class="state-layer"></div>
    </button>
  </div>

  <a href="${root}/public/pages/photos/photo_detail.html?id=${id}" class="state-layer"></a>
    `;

    const cardBanner = card.querySelector("img");
    cardBanner.style.opacity = 0;
    cardBanner.addEventListener("load", function(){
        this.animate({
            opacity : 1
        }, {
            duration : 400 , fill : "forwards"
        });
    })
    const rippleElement = [card, card.querySelector("[data-ripple]")];
    rippleElement.forEach(rippleElements => ripple(rippleElements));
    const favoriteBtn = card.querySelector("[data-favorite-btn]")
    favorite(favoriteBtn , "photos", id);

    return card;
}
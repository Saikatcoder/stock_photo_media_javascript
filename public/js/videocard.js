import { ripple } from "./ripple";
import { favorite } from "./favotite";
import { hoverPlay } from "./hoverPlay";

export function videCard(video){
    const root = window.location.origin;
    
    const {alt ,height , width, id, image, video_files} =video;
    const sdVideo = video_files.find(item => item.quality === "sd" && item.width < 1000)
    const {file_type, link} = sdVideo;
    const cards = document.createElement("div");
    cards.classList.add("card" ,"grid-item" , "video");
    const favoriteObjsave = JSON.parse(window.localStorage.getItem("favorite"))
    cards.innerHTML = `
           
    <div class="card-banner" style="width: ${width}; height: ${height};">
    <video src="${link}" class="img-cover" muted loop preload="none" data-video type="${file_type}" poster="${image}"></video>
  </div>
  <div class="card-content">
  <button class="icon-btn small ${favoriteObjsave.videos[id] ? "active" : ""}" aria-label="Add to favorite" data-ripple data-favorite-btn>
  <i class="fa-solid fa-heart"></i>
  <div class="state-layer"></div>
</button>
  </div>
  <span class="card-badge">
    <i class="fa-solid fa-play" aria-label="true"></i>
  </span>
  <a href="${root}./public/pages/videos/video_detail.html?id=${id}" class="statelayer"></a>

    `;
    const rippleElement = [cards, cards.querySelector("[data-ripple]")];
    rippleElement.forEach(rippleElements => ripple(rippleElements));
    const favoriteBtn = cards.querySelector("[data-favorite-btn]")
    favorite(favoriteBtn , "videos", id);

    hoverPlay(cards);
    return cards;

    
}
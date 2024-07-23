import { client } from "../js/apifile";
import { photoCard } from "../js/photocard";
import { gridInit, updateGrid } from "../js/masonry_grid";
import { videCard } from "../js/videocard";
import { collectionCard } from "../js/collectioncard";

const photoGrid = document.querySelector("[data-photo-grid]");
photoGrid.innerHTML = `<div class="skeleton"></div>`.repeat(18)
client.photos.curated({page: 1 , pre_page : 20}, data=>{
   
    photoGrid.innerHTML = "";
    const photoGridElement = gridInit(photoGrid)
    data.photos.forEach(photo =>{
        const photocardelement = photoCard(photo);
        updateGrid(photocardelement, photoGridElement.columnsHeight, photoGridElement.$columns);
    })
});


// render popular video

const videoGrid = document.querySelector(".video-grid");

videoGrid.innerHTML = `<div class="skeleton"></div>`.repeat(18);
client.videos.popular({pre_page : 25}, data=>{
    videoGrid.innerHTML = "";
    const videoGridElement = gridInit(videoGrid);
    data.videos.forEach(video =>{
        const videoCardElement = videCard(video);
        updateGrid(videoCardElement, videoGridElement.columnsHeight , videoGridElement.$columns);
    });

})

// render collection in home page

const collectionGrid = document.querySelector("[data-collection-grid]");

client.collections.featured({pre_page: 20},(data) =>{
    data.collections.forEach(function(collection){
        const collectionElement = collectionCard(collection);
    collectionGrid.appendChild(collectionElement);
    });
});
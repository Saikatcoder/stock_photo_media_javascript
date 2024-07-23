import { client} from "../../js/apifile.js";
import {gridInit, updateGrid} from "../../js/masonry_grid.js";
import {photoCard} from "../../js/photocard.js";
import { updateUrl } from "../../js/updateurl.js";
import { urlDecode } from "../../js/urlDecode.js";
import { filter } from "../../js/filter.js";

const filterBar = document.querySelector("[data-filter-bar]");
let isload = true;

filterBar.style.display = window.location.search ? "flex" : "none";

const filterWrappers = document.querySelectorAll("[data-filter]");
filterWrappers.forEach(filterWrapper =>{
    filter(filterWrapper, window.filterObj , (newObj)=>{
        window.filterObj = newObj;
        updateUrl(newObj, "photos");

    })
})

// Render cuarted photo or search photo
// if search somthing then render search 
// photo otherwish render cuarted photo


const photoGrids =document.querySelector("[data-photo-grid]");
const title = document.querySelector("[data-title]");

const photoGridElement = gridInit(photoGrids);
const perPage = 30;
let currentPage = 1;
let totalPage = 0;
const searchUrl = window.location.search.slice(1);
let searchObj = searchUrl && urlDecode(searchUrl);
const titles = searchObj ? `${searchObj.query} photos` : "Cuarted photos";

title.textContent = titles;
document.titles = titles;

function renderPhotos(currentPage){
    client.photos[searchObj ? "search" : "curated"]({...searchObj, per_page : perPage, page: currentPage}, data =>{
       
        totalPage = Math.ceil(data.total_results / perPage);
        data.photos.forEach(photo =>{
            const photoCards = photoCard(photo);
            updateGrid(photoCards, photoGridElement.columnsHeight, photoGridElement.$columns);
        });

        isload = true;

        if(currentPage >= totalPage) loader.style.display ="none"
    });
}
renderPhotos(currentPage)

// load more photo

const loader = document.querySelector("[data-loder]")


window.addEventListener("scroll",()=>{
    if(loader.getBoundingClientRect().top < (window.innerHeight * 2) && currentPage <= totalPage && isload){
        currentPage++;
        renderPhotos(currentPage);
        isload =false;
    }
})


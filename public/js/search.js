
import { ripple } from "../js/ripple.js";
import { addEventOnElement } from "../js/event.js";
import { segment } from "../js/segmentbutton.js";
import { updateUrl } from "../js/updateurl.js";
import { urlDecode } from "../js/urlDecode.js";

// searchview toggle small device

const searchToggler = document.querySelectorAll("[data-search-toggler]");

const  searchView = document.querySelector("[data-search-view]");

addEventOnElement(searchToggler , "click" , ()=> searchView.classList.toggle("show"))

const searchField = document.querySelector("[ data-search-field]");
const searchclearButton = document.querySelector("[data-search-clear]")

searchclearButton.addEventListener("click" , ()=> searchField.value = "")


// search type 
const  searchElement = document.getElementById("searchelement");
const  activesegmentButton = document.querySelector("[data-segment-btn].selected");
window.searchType = activesegmentButton.dataset.segmentValue;

segment(searchElement , segmentValue =>{
    window.searchType = segmentValue
})

// search submit
const  searchbutton = document.querySelector("[data-search-btn]");

searchbutton.addEventListener("click", ()=>{
    const searchvalue = searchField.value.trim();
    if(searchField){
        updatesearchHistory(searchvalue);
        window.filterObj.query = searchvalue;
        updateUrl(window.filterObj , window.searchType);
    }
})



// submit search when press "enter" key

searchField.addEventListener("keydown" , (e)=>{
    if(e.key === "Enter" && searchField.value.trim()){
        searchbutton.click();
    }
})





let searchitemHistory = {item : []}

if(window.localStorage.getItem("search_value_history")){
    searchitemHistory =JSON.parse(window.localStorage.getItem("search_value_history"))
}else{
    window.localStorage.setItem("search_value_history" , JSON.stringify(searchitemHistory));
}

// update search history
function updatesearchHistory(searchvalue){
// if search value is alredy poresent in the searchlist then remove
// the old value and add the new value in the searchlist ata the begining 
//it ensure that the most recent search is at the top of the histoiry 

    if(searchitemHistory.item.includes(searchvalue)){
        searchitemHistory.item.splice(searchitemHistory.item.indexOf(searchvalue),1)
    }
    searchitemHistory.item.unshift(searchvalue)

    window.localStorage.setItem("search_value_history" , JSON.stringify(searchitemHistory))
}

// render search history item in search list
const searchlist = document.querySelector("[data-search-list]")

const historyList = searchitemHistory.item.length;
for(let i = 0; i < historyList & i<= 5; i++){
    const listitem = document.createElement("button");
    listitem.classList.add("list-item");

    listitem.innerHTML = `<button class="list-item">
    <i class="fa-solid fa-clock-rotate-left"></i>
    <span class="body-large text">${searchitemHistory.item[i]}</span>
    <div class="state-layer"></div>
  </button>
    `;
    ripple(listitem);
    listitem.addEventListener("click", ()=>{
        searchField.value = searchitemHistory.item[i].textContent;
        searchbutton.click();
    })
    searchlist.appendChild(listitem);

}

// show search value in search field after reload

const search = urlDecode(window.location.search.slice(1));
if(search.query){
    searchField.value = search.query;
    
}

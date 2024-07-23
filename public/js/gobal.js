import { ripple } from "../js/ripple.js";
import { addEventOnElement } from "../js/event.js";
import { urlDecode } from "./urlDecode.js";

const header = document.querySelector("[data-header]");

window.addEventListener("scroll" , ()=>{
    header.classList[window.scrollY > 50 ? "add" : "remove"]("active")
})

// add ripple effect

const rippleElems = document.querySelectorAll("[data-ripple]")
rippleElems.forEach(rippleElem => ripple(rippleElem))



// navigaction troggler formobile screen

const navTroggler = document.querySelectorAll(".nav-troggler-btn")

const navBar = document.querySelector(".navigation")
const scrim = document.querySelector(".scrim")

addEventOnElement(navTroggler,"click" , ()=>{
    navBar.classList.toggle("show");
    scrim.classList.toggle("active");
} )




// filter functional

window.filterObj = {};

if(window.location.search.slice(1)){
    const search = urlDecode(window.location.search.slice(1));
    
    Object.entries(search).forEach(item =>{
        const filterkey =item[0];
        const filtervalue = item[1];
        window.filterObj[filterkey ] = filtervalue;

        if(filterkey !== "query"){
            const filterItems =document.querySelector(`[data-filter="${filterkey}"]`);
            filterItems ?.querySelector("[data-filter-chip]").classList.add("selected");
            if(filterItems){
                filterItems.querySelector("[data-filter-value]").innerText = filtervalue;
                
            }
        }
    })
}

// favorite object store in local storage

if (!window.localStorage.getItem("favorite")) {
    const  favoriteObj = {
        photos: {},
        videos: {},
      };
  
    window.localStorage.setItem("favorite", JSON.stringify(favoriteObj));
}

window.addEventListener("loadStart", ()=>{
    document.body.style.opacity= "0";
})

window.addEventListener("DOMContentLoaded", ()=>{
    document.body.style.opacity= "1";
})
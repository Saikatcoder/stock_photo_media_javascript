export const ripple = function(rippleElem){
    rippleElem.addEventListener("pointerdown", function(e){
        e.stopImmediatePropagation();

        const ripple = document.createElement("div")
        ripple.classList.add('ripple')

        this.appendChild(ripple)

        const removeripple = ()=>{
            ripple.animate({
                opacity : 0 
            }, {
                fill : "forwards" ,duration : 200
            })
            setTimeout(()=>{
                ripple.remove()
            },1000)
        }
        this.addEventListener("pointerup" ,removeripple);
        this.addEventListener('pointerleave' , removeripple);

        const isnotIconButton = !this.classList.contains("icon-btn")

        if(isnotIconButton){
            const rippleSize = Math.max(this.clientWidth, this.clientHeight);

            ripple.style.top = `${e.layerY}`;
            ripple.style.left = `${e.layerX}`;
            ripple.style.width = `${rippleSize}px`;
            ripple.style.height = `${rippleSize}px`;
        }
    })
}
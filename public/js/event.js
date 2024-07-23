

export const addEventOnElement = function (elemment, eventType , callback ){
    elemment.forEach(elemment => elemment.addEventListener(eventType, callback))
}
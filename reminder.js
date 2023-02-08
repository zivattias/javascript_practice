function btnClickHandler() {
    console.log("Button clicked")
}

function btn2ClickHandler() {
    console.log("Button 2 clicked")
}

function loadCompleteHandler() {
    document.getElementById('btn2').addEventListener("click", btn2ClickHandler)
}

window.addEventListener("load", loadCompleteHandler)
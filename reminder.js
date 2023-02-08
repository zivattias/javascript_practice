function btnClickHandler() {
    console.log("Button clicked")
}

function btn2ClickHandler() {
    console.log("Button 2 clicked")
}

function btn2ClickHandler2() {
    console.log("Button 2 clicked")
}

function loadCompleteHandler() {
    document.getElementById('btn2').addEventListener("click", btn2ClickHandler)
    document.getElementById('btn2').addEventListener("click", btn2ClickHandler2)
    document.getElementById('btn1').setAttribute('disabled', true)

    document.getElementById('btn2').onclick = () => {
        console.log('Hi')
        date = new Date()
        // document.getElementById("my_p").innerHTML = `${date.getDate()}-${date.getMonth() + 1}-${today.getFullYear()}`
        // 'default' needs 'options' to refactor mm/dd/yyyy > dd/mm/yyyy
        document.getElementById("my_p").innerHTML = date.toLocaleDateString('default')

    }
}

window.addEventListener("load", loadCompleteHandler)
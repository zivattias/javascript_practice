// Functionally program a clearTimeout after a setTimeout has been called:
function start(event) {
    document.getElementById("finished").innerText = 'timer started'
    seconds = document.getElementById("inputSec").value
    console.log("setting timer for", seconds)
    timeoutID = setTimeout(
        () => { document.getElementById("finished").innerText = 'done' },
        seconds * 1000
    )
    document.getElementById("cancelButton").onclick = () => clearTimeout(timeoutID)
}
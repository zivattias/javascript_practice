window.onload = () => {
    localStorageHandler()
}

// Log timer function
function startTimer() {
    seconds = document.getElementById("countdownInput").value
    const alert = document.getElementById("countdownAlert")
    alert.classList.add("d-none")
    // Handle 'seconds <= 0' or 'seconds is null' or seconds include "." (isFloat)
    if (seconds <= 0 || !seconds || seconds.includes(".")) {
        // UI alert
        alert.classList.add("alert-danger")
        alert.classList.remove("d-none")
        alert.innerHTML = "<strong>Oops!</strong> Seems like your seconds input is bad. Seconds must be greater than 0 and an integer."
        // Log exception
        throw new Error('Timer input must be greater than 0')
    }

    // Start countdownInterval (for UI) & countdownTimeout (for logging)
    console.log(`LOG: Timer set for ${seconds} seconds.`)

    // Actual UI countdown function
    updateCountdownText(seconds)

    countdownTimeout = setTimeout(() => {
        console.log(`LOG: Timer ${countdownTimeout} (${seconds}s) completed.`)
        clearTimeout(countdownTimeout)
    }, seconds * 1000)
}

// UI timer function
function updateCountdownText(seconds) {
    let count = seconds
    let countdownText = document.getElementById("countdownText")
    // Set countdownText.innerText to count immediately, otherwise it will delay by 1s (1 interval)
    countdownText.innerText = count
    // Disable countdownContainer 'input, button'
    const countdownContainer = document.getElementById("countdownContainer")
    countdownContainer.querySelectorAll('input, button').forEach((field) => {
        field.setAttribute('disabled', true)
    })
    // Add localStorageItem in this initial stage to catch it as soon as user hits countdownExecute button
    setLocalStorageItem({ timeStamp: Date.now(), initialValue: seconds, secondsLeft: count })

    let countdownInterval = setInterval(() => {
        count--
        countdownText.innerText = count
        // Update secondsLeft value in localStorage every interval to uphold with current countdownText
        setLocalStorageItem({ secondsLeft: count })
        if (count === 0) {
            // If alert is shown, hide
            const alert = document.getElementById("countdownAlert")
            alert.classList.add("d-none")
            // Timer finished, reset dependencies
            clearInterval(countdownInterval)
            countdownText.innerText = "Complete"
            setLocalStorageItem({ secondsLeft: '0' })
            // Re-enable countdownContainer 'input, button'
            countdownContainer.querySelectorAll('input, button').forEach((field) => {
                field.removeAttribute('disabled')
            })
        }

    }, 1000)
}

// localStorage setter function
function setLocalStorageItem({ timeStamp = null, initialValue = null, secondsLeft = null }) {
    if (timeStamp) {
        localStorage.setItem("timer-started", timeStamp)
    }
    if (initialValue) {
        localStorage.setItem("initial-value", initialValue)
    }
    if (secondsLeft) {
        localStorage.setItem("time-left", secondsLeft)
    }
}

// localStorage getter function
function getLocalStorageItem(itemName) {
    return localStorage.getItem(itemName)
}

// localStorage handling logic - check if the localStorageItem is present; if it does, resume countdown
function localStorageHandler() {
    // Validate countdown re-establishment is necessary
    const timeDelta = parseInt((Date.now() - getLocalStorageItem("timer-started")) / 1000)
    const initialValue = getLocalStorageItem("initial-value")
    const newCountdownLength = initialValue - timeDelta

    // Construct a new Date() object for logging purposes
    const date = new Date(parseInt(getLocalStorageItem("timer-started")))

    if (newCountdownLength > 0) {
        console.log(`LOG: Continued timer from ${date.toLocaleString()}.`)
        // Reveal a UI alert
        const alert = document.getElementById("countdownAlert")
        alert.innerHTML = `<strong>Timer resumed!</strong> Your last timer from 
            ${date.toLocaleString()} has not finished yet and was resumed automatically.`
        alert.classList.add("alert-primary")
        alert.classList.remove("d-none")
        // Resume countdown
        updateCountdownText(newCountdownLength)
    } else {
        console.log(`LOG: Paused timer from ${date.toLocaleString()} finished before returning to webpage.`)
    }
}
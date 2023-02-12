// Log timer function
function startTimer(elem) {
    seconds = document.getElementById("countdownInput").value
    // Handle 'seconds <= 0' or 'seconds is null'
    if (seconds <= 0 || !seconds) {
        throw new Error(`Timer input must be greater than 0`)
    }

    // Start countdownInterval (for UI) & countdownTimeout (for logging)
    console.log(`LOG: Timer set for ${seconds} seconds.`)

    // Actual UI countdown function
    updateCountdownText(seconds, elem)

    countdownTimeout = setTimeout(() => {
        console.log(`LOG: Timer ${countdownTimeout} (${seconds}s) completed.`)
        clearTimeout(countdownTimeout)
    }, seconds * 1000)
}

// UI timer function
function updateCountdownText(seconds, elem) {
    let count = seconds
    let countdownText = document.getElementById("countdownText")
    // Set countdownText.innerText to count immediately, otherwise it will delay by 1s (1 interval)
    countdownText.innerText = count
    // Disable countdownContainer 'input, button'
    const countdownContainer = elem.parentNode
    countdownContainer.querySelectorAll('input, button').forEach((field) => {
        field.setAttribute('disabled', true)
    })
    // Add cookie in this initial stage to catch it as soon as user hits countdownExecute button
    setTimeLeftCookie(count)

    let countdownInterval = setInterval(() => {
        count--
        countdownText.innerText = count
        // Update cookie value every 1s to uphold with current countdownText
        setTimeLeftCookie(count)
        if (count === 0) {
            clearInterval(countdownInterval)
            countdownText.innerText = "Complete"
            // Re-enable countdownContainer 'input, button'
            countdownContainer.querySelectorAll('input, button').forEach((field) => {
                field.removeAttribute('disabled')
            })
        }

    }, 1000)
}

// Cookie setter function
function setTimeLeftCookie(seconds) {
    document.cookie = "time-left=" + seconds
}
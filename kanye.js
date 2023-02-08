function getData() {
    fetch('https://ap.kanye.rest')
        .then((response) => response.json())
        .then((data) => {
            document.getElementById('q').innerHTML = data.quote
            console.log("Received response")
        })
        .catch((error) => {
            console.error('Error:', error)
            document.getElementById('q').innerHTML = "Error: " + error
        });
    console.log("Sent request")
}
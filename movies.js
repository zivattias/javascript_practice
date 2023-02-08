function fetchMovies() {
    fetch('localhost:8000')
        .then((response) => response.json())
        .then((data) => {
            console.log(data)

            // get root elem
            const moviesRoot = document.getElementById('movies')

            // create list elem
            const listElem = document.createElement('ul')
            listElem.setAttribute('class', 'list-group')

            moviesRoot.appendChild(listElem)

            for (const movie of data) {
                const listItem = document.createElement('li')
                listItem.setAttribute('class', 'list-group-item')
                listItem.innerText = movie['name']
                listElem.appendChild(listItem)
            }
        })
        .catch((error) => console.log(error))
}
function formSubmitHandler(event) {
    event.preventDefault();
    // form = document.getElementById('my_form')
    fd = new FormData(event.target)
    // console.log(fd)

    const item = document.createElement("li")
    const product_name = document.createElement("div")
    const quantity = document.createElement("span")

    const del_button = document.createElement("button")
    const increase_qty_button = document.createElement("button")
    const decrease_qty_button = document.createElement("button")

    product_name.setAttribute('style', 'width: 100px')

    del_button.setAttribute('class', 'btn btn-outline-danger btn-large')
    del_button.setAttribute('onclick', 'removeItemFromList(this)')
    increase_qty_button.setAttribute('class', 'btn btn-outline-primary btn-large')
    // increase_qty_button.setAttribute('type', 'button')
    increase_qty_button.setAttribute('onclick', 'changeQty(this)')
    decrease_qty_button.setAttribute('class', 'btn btn-outline-primary btn-large')
    // decrease_qty_button.setAttribute('type', 'button')
    decrease_qty_button.setAttribute('onclick', 'changeQty(this)')

    del_button.innerHTML = 'Delete'
    increase_qty_button.innerHTML = '+'
    decrease_qty_button.innerHTML = '-'


    const button_group = document.createElement("div")
    button_group.setAttribute("class", "btn-group")
    button_group.setAttribute("role", "group")
    button_group.appendChild(increase_qty_button)
    button_group.appendChild(decrease_qty_button)
    button_group.appendChild(del_button)


    for (const pair of fd.entries()) {
        console.log(pair)
        if (pair[0] === 'product') {
            product_name.innerHTML = pair[1]
            item.setAttribute('class', 'list-group-item d-flex justify-content-between align-items-center h4')
        } else {
            quantity.innerHTML = pair[1]
            quantity.setAttribute('class', 'badge badge-primary badge-pill')
            item.appendChild(product_name)
            item.appendChild(quantity)
            item.appendChild(button_group)
            const list = document.getElementById("products")
            list.appendChild(item)
        }
    }
    (event.target).reset()
}

function removeItemFromList(btn) {
    parentItem = btn.parentNode.parentNode;
    parentItem.remove()
}

function changeQty(btn) {
    parentItem = btn.parentNode.parentNode;
    quantity = parentItem.querySelector("span")
    if (btn.innerHTML === '+') {
        quantity.innerHTML++
    } else {
        if (quantity.innerHTML == 1) {
            removeItemFromList(btn)
        } else {
            quantity.innerHTML -= "1"
        }
    }
}

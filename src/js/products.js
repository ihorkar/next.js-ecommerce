const server = 'https://storio-api.herokuapp.com';

// Verify the local cart items if it's a valid value
if(!Array.isArray(JSON.parse(window.localStorage.getItem('cartItems'))))
    resetCartItem();

setTimeout(() => {
    const productBtn = document.querySelectorAll('.product-tag-add');

    productBtn.forEach(el => el.addEventListener('click', addToCart));
}, 1000);

function addToCart(event) {
    const cartItems = JSON.parse(window.localStorage.getItem('cartItems'));
    const clickedCartButton = event.target;
    const clickedCartItem = clickedCartButton.parentElement.parentElement;
    const clickedCartUrl = clickedCartItem.querySelector('a').href;
    const id = new URL(clickedCartUrl).searchParams.get('id');

    for (let i = 0; i < cartItems.length; i++) {
        if(cartItems[i]['id'] == id) {
            alert('The item is already added to the cart.');
            return;
        }
    }

    fetch(server + '/products/' + id)
        .then((res) => res.json())
        .then((json) => {
            cartItems.unshift(json);
            window.localStorage.setItem('cartItems', JSON.stringify(cartItems));
        });
}

function clearCartItems () {
    window.localStorage.clear();
    resetCartItem ();
}

function resetCartItem () {
    const items = [];
    window.localStorage.setItem('cartItems', JSON.stringify(items));
    console.log('cart item reset');
}
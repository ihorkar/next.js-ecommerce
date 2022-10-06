import React from 'react';

import Stars from '../../utils/components/stars';

import CartItems from '../../utils/cartItems';
import Settings from '../../utils/settings';

const addToCart = async function () {
    const id = new URL(window.location.href).searchParams.get('id') * 1;

    for (let i = 0; i < CartItems.items.length; i++) {
        if (CartItems.items[i]['id'] === id) {
            alert('The item is already added to the cart.');
            return;
        }
    }

    const res = await fetch(Settings.server + '/products/' + id);
    const json = await res.json();

    const cartItems = CartItems.items;
    cartItems.unshift(json);
    CartItems.items = cartItems;

    alert('The product is added to the cart.');
}

const purchase = async function () {
    await addToCart();
    window.location.href = '/cart';
}

function Product({ id, data }) {
    return (
        <section className='xl:container xl:mx-auto product-details-box'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
                <div>
                    <ProductDetailsImg id={id} data={data} />
                </div>

                <div>
                    <ProductDetails id={id} data={data} />
                    <ProductReviews id={id} data={data} />
                </div>
            </div>
        </section>
    )
}

function ProductDetailsImg({ id, data }) {
    return (
        <div className='product-details-img'>
            <img className='product-details-preview' src={`${Settings.server}/` + data[id].pictures[0]} alt={data[id].name} />
            <div className='product-details-pictures'>
                {data[id].pictures.map((el, i) =>
                    <div key={`${data[id].name} ${i + 1}`} className='product-details-picture'>
                        <img src={`${Settings.server}/` + el} alt={`${data[id].name} ${i + 1}`}></img>
                    </div>)}
            </div>
        </div>
    )
}

function ProductDetails({ id, data }) {
    return (
        <div className='product-details'>
            <h1 className='product-details-name' >{data[id].name}</h1>
            <Stars reviews={data[id].reviews.length} />

            <div className='flex flex-row mb-[30px]'>
                <span className='product-details-price'>{'$' + data[id].price / 100}</span>
                <span className='product-details-price_compare' >{'$' + data[id].priceCompare / 100}</span>
            </div>

            <button className='w-full md:w-[400px] btn-base btn-ghost-grey' onClick={addToCart}>Add to cart</button>
            <button className='w-full md:w-[400px] btn-base btn-full' onClick={purchase}>Buy it now</button>

            <Description text={data[id].description} />
        </div>
    )
}

function ProductReviews({ id, data }) {
    return (
        <div className='product-reviews'>
            <h3>Rating And Reviews</h3>

            {data[id].reviews.map((el, i) => <div key={`review ${i + 1}`} className='product-review'>
                <div className='product-review-fullname'>{el.fullname} - <span>{el.date}</span></div>
                <div className='product-review-stars'>{el.stars}</div>
                <div className='product-review-text'>{el.review}</div>
            </div>)}
        </div>
    )
}

function Description(props) {
    return <>
        <h3>Description</h3>
        <div className='product-details-description'>{props.text}</div>
    </>
}

export default Product;
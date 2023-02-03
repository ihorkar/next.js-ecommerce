import Link from 'next/link';
import Image from 'next/image';

import { ButtonGhostGrey } from '@ui/Button';

import { removeToCart } from '@utils/addToCart';
import CartItems from '@utils/cartItems';

function Item({ id, name, price, quantity, imgs, setItems }) {
    const remove = event => {
        event.preventDefault();
        removeToCart(id);
        setItems(CartItems.items);
    }

    const quantityInput = event => {
        event.preventDefault();

        CartItems.items = CartItems.items.map(item => {
            if (item['_id'] === id)
                return { ...item, quantity: event.target.value };
            return item;
        });

        setItems(CartItems.items);
    }

    return <tr className='item'>
        <th className='item-product'>
            <div className='flex items-center'>
                <Link className='item-product-img' href={`/product/${id}`}><Image src={`${process.env.NEXT_PUBLIC_SERVER}/${imgs[0]}`} alt={name} width={128} height={128} /></Link>
                <Link className='item-product-name' href={`/product/${id}`}>{name}</Link>
            </div>
        </th>
        <th className='item-price'>{'$' + price / 100}</th>
        <th className='item-quantity'>
            <input className='item-quantity-field' type='number' defaultValue={quantity} min='1' max='100' onChange={quantityInput} />
        </th>
        <th className='item-total'>{'$' + price / 100}</th>
        <th className='item-remove'>
            <ButtonGhostGrey className='item-remove-btn' onClick={remove}>Remove</ButtonGhostGrey>
        </th>
    </tr>
}

export default function CartTable({ items, setItems }) {
    return <table className='cart-table'>
        <thead className='thead'>
            <tr>
                <th className='thead-th-product text-left'>Product</th>
                <th className='thead-th-price'>Price</th>
                <th className='thead-th-quantity'>Quantity</th>
                <th className='thead-th-total'>Total</th>
                <th className='thead-th-remove'></th>
            </tr>
        </thead>

        <tbody>
            {items.map(item => <Item {...item} setItems={setItems} key={item.id} />)}
        </tbody>
    </table >
}
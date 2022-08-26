import React from 'react';

import { IonIcon } from '@ionic/react';
import { heartOutline } from 'ionicons/icons'

import Server from '../js/server';

function Product(props) {
    return <div className='product'>
        <div className='save'><IonIcon className='save-icon' src={heartOutline} font-size="48px" /></div>

        <a className='product-img' href={'/product?id=' + props.id}><img src={`${Server}/${props.src}`} alt={props.name}></img></a>

        <span className='product-name'>{props.name}</span>
        <span className='product-stars'>★★★★★ ({props.reviews})</span>

        <div className='product-tag'>
            <p className='product-tag-price' >${props.price / 100}</p>
            <button className='btn-base btn-ghost-grey product-tag-add'>Add to card</button>
        </div>
    </div>
}

export default Product;
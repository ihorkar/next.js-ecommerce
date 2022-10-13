import React from 'react';

import Navigation from '../../components/navigation';
import ProductComponent from '../../components/product';
import YouMayAlsoLike from '../../components/youMayAlsoLike';
import Footer from '../../components/footer';

import Settings from '../../utils/settings';
import { convertIdToName } from '../../utils/convertStr';

class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loaded: false
        };
    }

    async componentDidMount() {
        let id = '';

        if (typeof window !== "undefined")
            id = convertIdToName(window.location.pathname.replace('/product/', ''));

        const res = await fetch(`${Settings.server}/products/${id}`);
        const json = await res.json();

        console.log(json);

        this.setState({
            data: json.data.product,
            loaded: true
        });
    }

    render() {
        const { loaded, data } = this.state;

        if (!loaded)
            return <></>

        return <>
            <ProductComponent product={data} />
            <YouMayAlsoLike />
        </>
    }
}

export default function App() {
    return <div className="App">
        <Navigation />
        <Product />
        <Footer />
    </div>
}

// export async function getServerSideProps({ params }) {
//     const req = await fetch(`${Settings.server}/products/${params.id}`);
//     const json = await req.json();

//     return {
//         props: { product: json.data.product }
//     }
// }

// export async function getStaticProps({ params }) {
//     const req = await fetch(`${Settings.server}/products/${params.id}`);
//     const json = await req.json();

//     return {
//         props: { product: json.data.product }
//     }
// }

// export async function getStaticPaths() {
//     const req = await fetch(`${Settings.server}/products`);
//     const json = await req.json();

//     const paths = json.data.products.map(product => {
//         return { params: { id: product.id.toString() } }
//     });

//     return {
//         paths,
//         fallback: false
//     }
// }
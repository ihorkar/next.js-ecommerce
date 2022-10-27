function Star() {
    return <span className="material-symbols-outlined stars-star">star</span>
}

function StarHalf() {
    return <span className="material-symbols-outlined stars-star_half">star_half</span>
}

function StarBorder() {
    return <span className="material-symbols-outlined stars-star_border">star</span>
}

function Stars({ className, total, value = 5, displayTotal = true }) {
    const stars = [];

    for (let i = 0; i < parseInt(value); i++)
        stars.push(<Star />)

    if (value % 1 !== 0)
        stars.push(<StarHalf />)

    for (let i = 0; i < 5 - Math.ceil(value); i++)
        stars.push(<StarBorder />)

    return <span className={`stars ${className}`}>
        {stars}{displayTotal ? `\u00A0(${total})` : ''}
    </span>
}

export default Stars;
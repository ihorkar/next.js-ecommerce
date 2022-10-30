import Image from 'next/image';

export default function Img({ class_name, src, alt }) {
    return <div className={`${class_name}`}>
        <Image src={src} alt={alt} layout='responsive' width='100' height='100' />
    </div>
}
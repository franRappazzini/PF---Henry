import style from "./CarouselContainer.module.css"
import {Carousel} from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import Card from "../Card/Card.jsx"
import CarouselTitle from "../../molecules/CarouselTitleDetails/CarouselTitle"

export default function CarouselContainer({productDetail, products}){
    console.log(products)
    return(
      
            
        <div className={style.carousel_container}>
            <Carousel showThumbs={false} showIndicators={false} infiniteLoop="true" emulateTouch="true" centerSlidePercentage={30} centerMode={true} autoPlay={true} className={style.carousel}>
                {products.map(product =><div className={style.item_container}> <Card className={style.card} key={product.id} product={product}/></div>)}
                {/* <div className={style.item_container}></div>
                <div className={style.item_container}></div>
                <div className={style.item_container}></div>
                <div className={style.item_container}></div>
                <div className={style.item_container}>{<Card key={products[0].id} product={products[0]}/>}</div> */}
            </Carousel>
        </div>
        
        
    )
}
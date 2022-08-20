import React from 'react'
import { Carousel } from 'react-carousel-minimal';

export default function Slider() {
    const data = [
        {
          image: "https://res.cloudinary.com/dyqkwf3z6/image/upload/v1661014329/carouselimages/puma2_ymf5xp.jpg",
        },
        {
          image: "https://res.cloudinary.com/dyqkwf3z6/image/upload/v1660940584/carouselimages/puma1_zhkt3c.jpg",
        },
        {
          image: "https://res.cloudinary.com/dyqkwf3z6/image/upload/v1660940583/carouselimages/nb5_qpbanf.jpg",
        },
        {
          image: "https://res.cloudinary.com/dyqkwf3z6/image/upload/v1660940584/carouselimages/nb4_ad3sgd.jpg",
        },
        {
            image: "https://res.cloudinary.com/dyqkwf3z6/image/upload/c_crop,g_face,h_450,w_1900/v1660940582/carouselimages/adidas4_ampk0d.jpg",
        },
        {
            image: "https://res.cloudinary.com/dyqkwf3z6/image/upload/c_crop,g_face,h_337,w_1600,x_0,y_0/v1660940582/carouselimages/adidas1_ogc2yz.jpg",
        },
        {
            image: "https://res.cloudinary.com/dyqkwf3z6/image/upload/v1660940582/carouselimages/adidas2_qvfqyr.jpg",
        },
        {
            image: "https://res.cloudinary.com/dyqkwf3z6/image/upload/c_crop,g_face,h_500,w_1824,x_0,y_40/v1660940582/carouselimages/nike1_lhrpr4.webp",
        },
      ];

  return (
    <Carousel
          data={data}
          time={5000}
          width='100vw'
          height='22vw'
          slideNumber={false}
          automatic={true}
          dots={true}                                                             
          slideImageFit="cover"
          thumbnails={false}
          style={{
            width: '100%',
            height: '22vw',
          }}
        />
  )
}

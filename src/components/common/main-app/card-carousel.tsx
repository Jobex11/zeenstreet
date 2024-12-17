import React, { useEffect } from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import ClassNames from 'embla-carousel-class-names'
import { DotButton, useDotButton } from './carousel-dot-btn'
import { LazyLoadImage } from "react-lazy-load-image-component"

type PropType = {
    slides: number[]
    options?: EmblaOptionsType
    defaultActiveIndex?: number 
}

const CardCarousel: React.FC<PropType> = (props) => {
    const { slides, options, defaultActiveIndex = 2 } = props
    const [emblaRef, emblaApi] = useEmblaCarousel(
        { ...options, startIndex: defaultActiveIndex }, 
        [ClassNames()]
    )

    const { selectedIndex, scrollSnaps, onDotButtonClick } =
        useDotButton(emblaApi)


    useEffect(() => {
        if (emblaApi) {
            emblaApi.scrollTo(defaultActiveIndex)
        }
    }, [emblaApi, defaultActiveIndex])

    return (
        <div className="embla">
            <div className="embla__viewport" ref={emblaRef}>
                <div className="embla__container">
                    {slides.map((index) => (
                        <div className="embla__slide" key={index}>
                            <LazyLoadImage
                                effect="blur"
                                className="embla__slide__img"
                                src={`https://picsum.photos/600/350?v=${index}`}
                                alt="Your alt text"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Dots for navigation */}
            <div className="flex items-center justify-center py-3 gap-3">
                <div className="flex items-center gap-3">
                    {scrollSnaps.map((_, index: number) => (
                        <DotButton
                            key={index}
                            onClick={() => onDotButtonClick(index)}
                            className={`embla__dot ${
                                index === selectedIndex ? 'embla__dot--selected' : ''
                            }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CardCarousel

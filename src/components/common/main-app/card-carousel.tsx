import React, { useEffect } from 'react';
import { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import ClassNames from 'embla-carousel-class-names';
import { DotButton, useDotButton } from './carousel-dot-btn';

type PropType = {
    slides: string[]; // Array of image URLs
    options?: EmblaOptionsType;
    defaultActiveIndex?: number;
};

const CardCarousel: React.FC<PropType> = (props) => {
    const { slides, options, defaultActiveIndex = 0 } = props;
    const [emblaRef, emblaApi] = useEmblaCarousel(
        {
            ...options,
            startIndex: defaultActiveIndex,
            align: 'center',
            containScroll: 'trimSnaps',
        },
        [ClassNames()]
    );

    const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);

    useEffect(() => {
        if (emblaApi) {
            emblaApi.scrollTo(defaultActiveIndex);
        }
    }, [emblaApi, defaultActiveIndex]);

    return (
        <div className="embla">
            <div className="embla__viewport" ref={emblaRef}>
                <div className="embla__container">
                    {slides.map((imageUrl, index) => (
                        <div className="embla__slide" key={index}>
                            <img
                                className="embla__slide__img border-2 object-bottom border-[#c781ff]"
                                src={imageUrl}
                                loading='lazy'
                                alt={`Slide ${index + 1}`}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div className="embla__dots">
                {scrollSnaps.map((_, index: number) => (
                    <DotButton
                        key={index}
                        onClick={() => onDotButtonClick(index)}
                        className={`embla__dot ${index === selectedIndex ? 'embla__dot--selected' : ''}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default CardCarousel;



interface Props {
    image?: string;
    alt: string;
    name: string;
}

const ComingSoon = ({ image, alt, name }: Props) => {
    return (
        <div className="flex items-center flex-col justify-around  min-h-full w-full ">
            <div className="flex flex-col text-center px-3">
                <div className="mb-6 text-center mx-auto relative">
                    <img src={image} loading="lazy" alt={alt} className="h-40 w-40" />
                    <div
                        className={
                            "absolute z-20 bg-transparent h-full w-full top-0 bottom-0"
                        }
                    />
                </div>
                <h1 className="text-3xl font-bold text-white pb-4 work-sans">Coming Soon</h1>
                <p className="text-gray-100 text-lg work-sans">
                    We're working hard to bring you something amazing with our {name}.
                </p>
            </div>
            <div />
        </div>
    );
};

export default ComingSoon;

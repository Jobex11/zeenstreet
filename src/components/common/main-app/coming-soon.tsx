import { MdOutlineArticle } from "react-icons/md";

const ComingSoon = () => {
    return (
        <div className="flex items-center flex-col pt-16 min-h-full w-full ">
            <div className="flex flex-col text-center  px-3">
                {/* Icon at the top */}
                <div className="mb-6 text-white text-center mx-auto">
                    <MdOutlineArticle size={64} className="animate-pulse" />
                </div>

                {/* Title */}
                <h1 className="text-3xl font-bold text-white mb-4 work-sans">Coming Soon</h1>

                {/* Description */}
                <p className="text-gray-100 text-lg mb-6 work-sans">
                    We're working hard to bring something amazing! Stay tuned for updates.
                </p>
            </div>
        </div>
    );
};

export default ComingSoon;

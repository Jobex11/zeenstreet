import { FiLoader } from "react-icons/fi"


function Loader() {
    return (
        <div className={`flex flex-col items-center justify-center py-5 min- h-full flex-1 w-full bg-black/10`}>
            <FiLoader size={30} color="white" className="animate-spin" />
        </div>
    )
}

export default Loader

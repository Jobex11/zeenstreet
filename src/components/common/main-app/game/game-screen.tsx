import Stepper from "@/components/shared/stepper";
import CircularTimer from "@/components/ui/timer";
import { setActiveScreen } from "@/hooks/redux/slices/game-screens-slice";
import { SCREENS } from "@/lib/utils";
import { Delete, User } from "lucide-react";
import { useState, useEffect, lazy } from "react";
import { useDispatch } from "react-redux";

const ShareFormatter = lazy(() =>
    import("@/components/shared/shareFormatter").then((mod) => ({ default: mod.ShareFormatter }))
);

interface PuzzleProps {
    word: string;
    images: string[];
    letters: string[];
    total_players: number;
    screen_index: string;
    currentStep: number;
    stepsCount: string[] | number[]
}

const WordPuzzle = (
    {
        images,
        word,
        letters,
        screen_index,
        total_players,
        currentStep,
        stepsCount }: PuzzleProps) => {
    const [selectedLetters, setSelectedLetters] = useState<string[]>([]);
    const dispatch = useDispatch()
    // Handle letter selection
    const handleSelectLetter = (letter: string) => {
        if (selectedLetters.length < word.length) {
            setSelectedLetters([...selectedLetters, letter]);
        }
    };

    // Handle clearing selected letters
    const handleClear = () => {
        setSelectedLetters((prev) => prev.slice(0, -1));
    };

    useEffect(() => {
        setTimeout(() => {
            dispatch(setActiveScreen(SCREENS.TIME_UP));
        }, 12000);
    }, [dispatch]);

    return (
        <div className="flex flex-col items-center bg-[#0f0543] min-h-screen px-4 pt-10 text-white relative">
            {/* Top Section */}
            <div className="w-full py-5 relative">
                <div className="flex relative flex-row items-center justify-between gap-1">
                    {/* Left - Players */}
                    <div className="flex flex-row items-center gap-1">
                        <User size={25} />
                        <span className="atkinson font-semibold text-base">
                            <ShareFormatter shares={total_players} />
                        </span>
                    </div>

                    {/* Center - Timer */}
                    <div className="absolute left-1/2 -top-11 transform -translate-x-1/2">
                        <CircularTimer time={12} />
                    </div>

                    {/* Right - Screen Index */}
                    <span className="atkinson font-semibold">{screen_index}</span>
                </div>
            </div>

            {/* Stepper */}
            <div className="mb-4">
                <Stepper stepsCount={stepsCount} currentStep={currentStep} />
            </div>

            {/* Image Grid */}
            <div className="grid grid-cols-2 w-full gap-2">
                {images.map((img, index) => (
                    <div key={index} className="relative bg-slate-800 w-full h-40 rounded-md flex items-center justify-center">
                        <img src={img} alt="game hint" className="h-full w-full object-cover rounded-md" />
                        <div className="absolute top-0 h-full w-full bottom-0 bg-transparent" />
                    </div>
                ))}
            </div>

            {/* Word Slots with Borders */}
            <div className="flex flex-row items-center gap-1 my-5">
                {Array.from({ length: word.length }).map((_, index) => (
                    <div key={index} className={`w-10 h-10 border rounded flex atkinson items-center justify-center text-lg font-medium`}>
                        {selectedLetters[index] || ""}
                    </div>
                ))}
            </div>

            {/* Letter Buttons */}
            <div style={{ gridTemplateColumns: `repeat(${word?.length || 6}, minmax(0, 1fr))` }} className="grid gap-2 mt-4">
                {letters.map((letter, index) => (
                    <button
                        key={index}
                        className="w-10 h-10 bg-white uppercase hover:bg-gray-100 text-black font-medium rounded atkinson"
                        onClick={() => handleSelectLetter(letter)}
                    >
                        {letter}
                    </button>
                ))}
            </div>

            {/* Delete Button */}
            <button className="absolute bottom-36 right-0 mt-4 p-2 bg-red-600 hover:bg-red-500 atkinson font-medium text-white rounded-l-full" onClick={handleClear}>
                <Delete />
            </button>
        </div>
    );
};

export default WordPuzzle;



// import Stepper from "@/components/shared/stepper";
// import CircularTimer from "@/components/ui/timer";
// import { Delete, User } from "lucide-react";
// import { useState, useEffect, lazy } from "react";
// import axios from "axios"; // Import Axios for API requests

// const ShareFormatter = lazy(() =>
//     import("@/components/shared/shareFormatter").then((mod) => ({ default: mod.ShareFormatter }))
// );

// interface PuzzleProps {
//     word: string;
//     images: string[];
//     letters: string[];
//     total_players: number;
//     screen_index: string;
//     setActiveScreen: (value: React.SetStateAction<string>) => void;
// }

// const WordPuzzle = ({ images, word, letters, screen_index, total_players, setActiveScreen }: PuzzleProps) => {
//     const [selectedLetters, setSelectedLetters] = useState<string[]>([]);
//     const [borderState, setBorderState] = useState<string[]>(Array(word.length).fill("border-gray-400"));

//     // Function to handle letter selection
//     const handleSelectLetter = (letter: string) => {
//         if (selectedLetters.length < word.length) {
//             setSelectedLetters((prev) => [...prev, letter]);
//         }
//     };

//     // Function to clear last letter
//     const handleClear = () => {
//         setSelectedLetters((prev) => prev.slice(0, -1));
//         setBorderState((prev) => prev.map((_, i) => (i >= selectedLetters.length - 1 ? "border-gray-400" : prev[i])));
//     };

//     // Function to check if the entered word is correct
//     const checkWord = async () => {
//         if (selectedLetters.length === word.length) {
//             try {
//                 const response = await axios.post("/api/check-word", { word: selectedLetters.join("") });

//                 if (response.data.correct) {
//                     setBorderState(Array(word.length).fill("border-green-500"));
//                 } else {
//                     setBorderState(Array(word.length).fill("border-red-500"));
//                 }
//             } catch (error) {
//                 console.error("Error checking word:", error);
//             }
//         }
//     };

//     // Debounce effect to check the word after a short delay
//     useEffect(() => {
//         const timer = setTimeout(() => {
//             if (selectedLetters.length === word.length) {
//                 checkWord();
//             }
//         }, 500); // Adjust debounce timing if needed

//         return () => clearTimeout(timer);
//     }, [selectedLetters]);

//     return (
//         <div className="flex flex-col items-center bg-[#0f0543] min-h-screen px-4 pt-10 text-white relative">
//             {/* Top Section */}
//             <div className="w-full py-5 relative">
//                 <div className="flex relative flex-row items-center justify-between gap-1">
//                     {/* Left - Players */}
//                     <div className="flex flex-row items-center gap-1">
//                         <User size={25} />
//                         <span className="atkinson font-semibold text-base">
//                             <ShareFormatter shares={total_players} />
//                         </span>
//                     </div>

//                     {/* Center - Timer */}
//                     <div className="absolute left-1/2 -top-11 transform -translate-x-1/2">
//                         <CircularTimer time={12} />
//                     </div>

//                     {/* Right - Screen Index */}
//                     <span className="atkinson font-semibold">{screen_index}</span>
//                 </div>
//             </div>

//             {/* Stepper */}
//             <div className="mb-4">
//                 <Stepper />
//             </div>

//             {/* Image Grid */}
//             <div className="grid grid-cols-2 w-full gap-2">
//                 {images.map((img, index) => (
//                     <div key={index} className="relative bg-slate-800 w-full h-40 rounded-md flex items-center justify-center">
//                         <img src={img} alt="game hint" className="h-full w-full object-cover rounded-md" />
//                         <div className="absolute top-0 h-full w-full bottom-0 bg-transparent" />
//                     </div>
//                 ))}
//             </div>

//             {/* Word Slots with Borders */}
//             <div className="flex flex-row items-center gap-1 my-5">
//                 {Array.from({ length: word.length }).map((_, index) => (
//                     <div key={index} className={`w-10 h-10 border rounded flex atkinson items-center justify-center text-lg font-medium ${borderState[index]}`}>
//                         {selectedLetters[index] || ""}
//                     </div>
//                 ))}
//             </div>

//             {/* Letter Buttons */}
//             <div style={{ gridTemplateColumns: `repeat(${word?.length || 6}, minmax(0, 1fr))` }} className="grid gap-2 mt-4">
//                 {letters.map((letter, index) => (
//                     <button
//                         key={index}
//                         className="w-10 h-10 bg-white uppercase hover:bg-gray-100 text-black font-medium rounded atkinson"
//                         onClick={() => handleSelectLetter(letter)}
//                     >
//                         {letter}
//                     </button>
//                 ))}
//             </div>

//             {/* Delete Button */}
//             <button className="absolute bottom-36 right-0 mt-4 p-2 bg-red-600 hover:bg-red-500 atkinson font-medium text-white rounded-l-full" onClick={handleClear}>
//                 <Delete />
//             </button>
//         </div>
//     );
// };

// export default WordPuzzle;


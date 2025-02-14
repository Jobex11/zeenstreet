import React, { useState, useEffect } from "react";

type TypewriterProps = {
    text: string;
    speed?: number; // Time in ms between characters
    className?: string; // Optional styling for the text
};

const Typewriter: React.FC<TypewriterProps> = ({ text, speed = 75, className = "" }) => {
    const [displayedText, setDisplayedText] = useState("");

    useEffect(() => {
        setDisplayedText(""); // Reset displayedText on new text
        let index = 0;
        const interval = setInterval(() => { 
            if (index < text.length) {
                setDisplayedText((prev) => prev + (text[index] ?? ""));
                index++;
            } else {
                clearInterval(interval);
            }
        }, speed);
        
    
        return () => clearInterval(interval); // Cleanup interval on unmount
    }, [text, speed]);
    

    return <span className={className}>{displayedText}</span>;
};

export default Typewriter;

import { useState, useRef, useEffect } from "react"
import { FaClapperboard } from "react-icons/fa6"
import { HiSpeakerWave } from "react-icons/hi2"
import { HiSpeakerXMark } from "react-icons/hi2"

function MusicPanel() {
    const [isPlaying, setIsPlaying] = useState(true)
    const audioRef = useRef<HTMLAudioElement | null>(null)

    useEffect(() => {
        // Create audio element
        audioRef.current = new Audio(
            "https://res.cloudinary.com/dfkd7mdhp/video/upload/v1742823008/e9ohsarzn2qzexjprgmv.mp3",
        )

        // Optional: Loop the audio
        if (audioRef.current) {
            audioRef.current.loop = true

            // Add event listener to play automatically when ready
            const audioElement = audioRef.current

            const handleCanPlayThrough = () => {
                audioElement
                    .play()
                    .then(() => {
                        setIsPlaying(true)
                    })
                    .catch((error) => {
                        console.error("Auto-play failed:", error)
                        // Many browsers block autoplay unless there's user interaction
                        // We keep the state as false if autoplay fails
                    })
            }

            audioElement.addEventListener("canplaythrough", handleCanPlayThrough)

            // Clean up event listener
            return () => {
                audioElement.removeEventListener("canplaythrough", handleCanPlayThrough)
                audioElement.pause()
                audioRef.current = null
            }
        }

        return () => {
            if (audioRef.current) {
                audioRef.current.pause()
                audioRef.current = null
            }
        }
    }, [])

    const toggleAudio = () => {
        if (!audioRef.current) return

        if (isPlaying) {
            audioRef.current.pause()
        } else {
            audioRef.current.play()
        }

        setIsPlaying(!isPlaying)
    }

    return (
        <div className="h-fit w-full sticky top-auto z-50 bg-transparent">
            <div className="flex items-center justify-between w-full py-2 px-3">
                <div>
                    <FaClapperboard color="white" />
                </div>
                <div onClick={toggleAudio} className="cursor-pointer hover:opacity-80 transition-opacity">
                    {isPlaying ? <HiSpeakerWave color="white" /> : <HiSpeakerXMark color="white" />}
                </div>
            </div>
        </div>
    )
}

export default MusicPanel


import { useRef, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { togglePlay } from "@/hooks/redux/slices/music-slice"
import { FaClapperboard } from "react-icons/fa6"
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2"
import { Link } from "react-router-dom"
import { BsCoin } from "react-icons/bs"
import { RootState } from "@/lib/store"
import { ShareFormatter } from "./shareFormatter"

interface MusicPanelProps {
    hide_video_tip: boolean;
    shares: number;
}

function MusicPanel({ hide_video_tip, shares = 0.00 }: MusicPanelProps) {
    const isPlaying = useSelector((state: RootState) => state.music.isPlaying)
    const dispatch = useDispatch()
    const audioRef = useRef<HTMLAudioElement | null>(null)

    useEffect(() => {
        audioRef.current = new Audio(
            "https://res.cloudinary.com/dfkd7mdhp/video/upload/v1742823008/e9ohsarzn2qzexjprgmv.mp3"
        )
        if (audioRef.current) {
            audioRef.current.loop = true

            const audioElement = audioRef.current
            const handleCanPlayThrough = () => {
                if (isPlaying) {
                    audioElement.play().catch(() => { })
                } else {
                    audioElement.pause()
                }
            }

            audioElement.addEventListener("canplaythrough", handleCanPlayThrough)

            return () => {
                audioElement.removeEventListener("canplaythrough", handleCanPlayThrough)
                audioElement.pause()
                audioRef.current = null
            }
        }
    }, [isPlaying]) // Reacts to Redux state

    const toggleAudio = () => {
        dispatch(togglePlay()) // Toggle play/pause state globally
    }

    return (
        <div className="h-fit w-full absolute top-0 left-0 z-50 py-5">
            <div className="flex items-center justify-between w-full py-2 px-3">
                <div>
                    {hide_video_tip ? (
                        <Link to={"#"}>
                            <FaClapperboard color="white" />
                        </Link>
                    ) : (
                        <div className="flex flex-row items-center gap-1">
                            <BsCoin color="white" size={23} />
                            <span className="atkinson font-semibold text-white"><ShareFormatter shares={shares} /></span>
                        </div>
                    )}
                </div>
                <div onClick={toggleAudio} className="cursor-pointer hover:opacity-80 transition-opacity">
                    {isPlaying ? <HiSpeakerWave color="white" /> : <HiSpeakerXMark color="white" />}
                </div>
            </div>
        </div>
    )
}

export default MusicPanel

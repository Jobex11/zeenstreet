import { cn } from "@/lib/utils";
import React, { useEffect, useState, useRef, useCallback, useMemo } from "react";

interface ShootingStar {
    id: number;
    x: number;
    y: number;
    angle: number;
    scale: number;
    speed: number;
    distance: number;
}

interface ShootingStarsProps {
    minSpeed?: number;
    maxSpeed?: number;
    minDelay?: number;
    maxDelay?: number;
    starColor?: string;
    trailColor?: string;
    starWidth?: number;
    starHeight?: number;
    className?: string;
    numStars?: number;
}

const getRandomStartPoint = () => {
    const side = Math.floor(Math.random() * 4);
    const offset = Math.random() * window.innerWidth;

    switch (side) {
        case 0: return { x: offset, y: 0, angle: 45 };
        case 1: return { x: window.innerWidth, y: offset, angle: 135 };
        case 2: return { x: offset, y: window.innerHeight, angle: 225 };
        case 3: return { x: 0, y: offset, angle: 315 };
        default: return { x: 0, y: 0, angle: 45 };
    }
};



export const ShootingStars: React.FC<ShootingStarsProps> = ({
    minSpeed = 2,
    maxSpeed = 8,
    minDelay = 1000,
    maxDelay = 2000,
    numStars = 5,
    starColor = "#D25804",
    trailColor = "#D25804",
    starWidth = 10,
    starHeight = 3,
    className,
}) => {
    const starsRef = useRef<ShootingStar[]>([]);
    const [renderStars, setRenderStars] = useState<ShootingStar[]>([]);
    const animationRef = useRef<number | null>(null);

    // Function to create stars
    const createStar = useCallback(() => {
        if (starsRef.current.length < numStars) {
            const { x, y, angle } = getRandomStartPoint();
            const newStar: ShootingStar = {
                id: Date.now() + Math.random(),
                x,
                y,
                angle,
                scale: 1,
                speed: Math.random() * (maxSpeed - minSpeed) + minSpeed,
                distance: 0,
            };
            starsRef.current.push(newStar);
        }
        setRenderStars([...starsRef.current]); // Trigger re-render
        setTimeout(createStar, Math.random() * (maxDelay - minDelay) + minDelay);
    }, [numStars, minSpeed, maxSpeed, minDelay, maxDelay]);

    useEffect(() => {
        createStar();
        return () => {
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
        };
    }, [createStar]);

    // Animation loop
    const animateStars = useCallback(() => {
        starsRef.current = starsRef.current
            .map((star) => {
                const newX = star.x + star.speed * Math.cos((star.angle * Math.PI) / 180);
                const newY = star.y + star.speed * Math.sin((star.angle * Math.PI) / 180);
                const newDistance = star.distance + star.speed;
                const newScale = 1 + newDistance / 100;

                if (
                    newX < -20 || newX > window.innerWidth + 20 ||
                    newY < -20 || newY > window.innerHeight + 20
                ) {
                    return null;
                }

                return { ...star, x: newX, y: newY, distance: newDistance, scale: newScale };
            })
            .filter(Boolean) as ShootingStar[];

        setRenderStars([...starsRef.current]); // Only update state when necessary
        animationRef.current = requestAnimationFrame(animateStars);
    }, []);

    useEffect(() => {
        animationRef.current = requestAnimationFrame(animateStars);
        return () => {
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
        };
    }, [animateStars]);

    // ✅ Wrap `renderStars` in `useMemo` to prevent unnecessary recalculations
    const memoizedStars = useMemo(
        () =>
            renderStars.map((star) => (
                <rect
                    key={star.id}
                    x={star.x}
                    y={star.y}
                    width={starWidth * star.scale}
                    height={starHeight}
                    fill="url(#gradient)"
                    transform={`rotate(${star.angle}, ${star.x + (starWidth * star.scale) / 2}, ${star.y + starHeight / 2})`}
                />
            )),
        [renderStars, starWidth, starHeight]
    );

    return (
        <svg className={cn("w-full h-full absolute inset-0 z-0", className)}>
            {memoizedStars}
            <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: trailColor, stopOpacity: 0 }} />
                    <stop offset="100%" style={{ stopColor: starColor, stopOpacity: 1 }} />
                </linearGradient>
            </defs>
        </svg>
    );
};

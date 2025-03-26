import { Check } from "lucide-react"

interface StepperProps {
    stepsCount?: number[] | string[]
    currentStep?: number
    className?: string
}

export default function Stepper({ stepsCount = [1, 2, 3, 4], currentStep = 2, className = "" }: StepperProps) {
    return (
        <div className={`max-w-lg mx-auto px-4 mt-4 sm:px-0 ${className}`}>
            <ul aria-label="Steps" className="flex items-center">
                {stepsCount.map((_, idx) => (
                    <li
                        key={idx}
                        aria-current={currentStep === idx + 1 ? "step" : false}
                        className="flex-1 last:flex-none flex items-center"
                    >
                        <div
                            className={`w-6 h-6 rounded-full border-2 flex-none flex items-center justify-center ${currentStep > idx + 1
                                ? "bg-orange-600 border-orange-600"
                                : currentStep === idx + 1
                                    ? "border-orange-600"
                                    : "border-orange-600"
                                }`}
                        >
                            <span
                                className={`w-2.5 h-2.5 rounded-full bg-orange-600 ${currentStep !== idx + 1 ? "hidden" : ""}`}
                            ></span>
                            {currentStep > idx + 1 ? (
                                <Check />
                            ) : (
                                ""
                            )}
                        </div>
                        <hr
                            className={`w-14 border ${idx + 1 === stepsCount.length ? "hidden" : currentStep > idx + 1 ? "border-orange-600" : "border-orange-600"
                                }`}
                        />
                    </li>
                ))}
            </ul>
        </div>
    )
}


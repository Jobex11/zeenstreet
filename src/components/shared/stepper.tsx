interface StepperProps {
    stepsCount?: number[] | string[]
    currentStep?: number
    className?: string
}

export default function Stepper({ stepsCount = [1, 2, 3, 4], currentStep = 1, className = "" }: StepperProps) {
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
                            className={`w-7 h-7 rounded-full border-2 flex-none flex items-center justify-center ${currentStep > idx + 1
                                    ? "bg-orange-600 border-orange-600"
                                    : currentStep === idx + 1
                                        ? "border-orange-600"
                                        : ""
                                }`}
                        >
                            <span
                                className={`w-2.5 h-2.5 rounded-full bg-orange-600 ${currentStep !== idx + 1 ? "hidden" : ""}`}
                            ></span>
                            {currentStep > idx + 1 ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-5 h-5 text-white"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                </svg>
                            ) : (
                                ""
                            )}
                        </div>
                        <hr
                            className={`w-10 border ${idx + 1 === stepsCount.length ? "hidden" : currentStep > idx + 1 ? "border-orange-600" : "border-orange-600"
                                }`}
                        />
                    </li>
                ))}
            </ul>
        </div>
    )
}


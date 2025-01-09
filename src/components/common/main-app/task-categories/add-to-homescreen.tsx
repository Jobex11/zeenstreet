import { useState, useEffect } from 'react'
import { Button } from "@components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@components/ui/alert"
import { Download, X, CheckCircle, HelpCircle, AlertTriangle } from 'lucide-react'
import { useTelegramWebApp } from '@hooks/useTelegramWebapp'
import { useUpdateUserSharesMutation } from '@hooks/redux/shares'
import { toast } from 'sonner'
import { triggerErrorVibration } from "@lib/utils"

interface Props {
    telegram_id: string | null;
    disableBtn: boolean;
    refetch:() => void;
}

export function AddToHomeScreen({ telegram_id, disableBtn, refetch }: Props) {

    const [status, setStatus] = useState<'initial' | 'added' | 'unsupported' | 'unknown' | 'missed'>('initial')
    const { addToHomeScreen, checkHomeScreenStatus } = useTelegramWebApp()

    const [updateUserShares, { isLoading }] =
        useUpdateUserSharesMutation();

    useEffect(() => {
        checkHomeScreenStatus((isAdded, unsupported, unknown, missed) => {
            if (isAdded) setStatus('added')
            else if (unsupported) setStatus('unsupported')
            else if (unknown) setStatus('unknown')
            else if (missed) setStatus('missed')
        })
    }, [checkHomeScreenStatus])

    const handleAddToHomeScreen = () => {
        addToHomeScreen()
        setStatus('added')
    }

    const handleClaimShares = async () => {
        const shares = 500
        const shareType = "Add to home screen"
        try {
            await await updateUserShares({
                telegram_id,
                shares,
                shareType,
            }).unwrap();
            toast.success(`Weldone Gamer you just recived ${shares} shares`, { className: "text-xs work-sans py-3" })
            console.log('User shares updated successfully:', shares)
            refetch()
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error('Error updating user shares:', error)
            toast.error(error?.data?.error || error?.data?.message || "Something went wrong please try again!", { className: "text-xs work-sans py-3" })
            triggerErrorVibration()
        }

    }


    if (status === 'added') {
        return (
            <Alert className={"bg-[#1a1823] flex flex-col text-white work-sans"}>
                <CheckCircle className="h-4 w-4" color="white" />
                <AlertTitle>Success!</AlertTitle>
                <AlertDescription>
                    The app has been added to your home screen.
                </AlertDescription>
                <Button
                    disabled={isLoading || disableBtn}
                    onClick={handleClaimShares}
                    className={`bg-orange-500 hover:bg-orange-600 mt-3 w-full text-white text-center ${isLoading || disableBtn ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                >
                    {isLoading
                        ? "Processing...."
                        : disableBtn
                            ? "Reward Claimed"
                            : "Claim 500 Shares"}
                </Button>
            </Alert>
        )
    }

    return (
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle>Add to Home Screen</CardTitle>
                <CardDescription>Enhance your experience by adding our app to your home screen and recieve 500 shares</CardDescription>
            </CardHeader>
            <CardContent>
                {status === 'unsupported' && (
                    <Alert variant="destructive">
                        <X className="h-4 w-4" />
                        <AlertTitle>Unsupported</AlertTitle>
                        <AlertDescription>
                            Sorry, adding to home screen is not supported on your device.
                        </AlertDescription>
                    </Alert>
                )}
                {status === 'unknown' && (
                    <Alert variant="destructive">
                        <HelpCircle className="h-4 w-4" />
                        <AlertTitle>Unknown Status</AlertTitle>
                        <AlertDescription>
                            We couldn't determine if the app is on your home screen. You can try adding it manually.
                        </AlertDescription>
                    </Alert>
                )}
                {status === 'missed' && (
                    <Alert variant="destructive">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertTitle>Action Required</AlertTitle>
                        <AlertDescription>
                            You may have missed adding the app to your home screen. Please try again.
                        </AlertDescription>
                    </Alert>
                )}
                {status === 'initial' && (
                    <p>Add our app to your home screen for quick and easy access!</p>
                )}
            </CardContent>
            <CardFooter>
                <Button className='w-full text-center bg-orange-600 hover:bg-orange-500 text-white' onClick={handleAddToHomeScreen} disabled={status === 'unsupported'}>
                    <Download className="mr-2 h-4 w-4" /> Add to Home Screen
                </Button>
            </CardFooter>
        </Card>
    )
}


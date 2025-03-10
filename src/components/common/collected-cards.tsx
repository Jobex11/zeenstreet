import { useGetTelegramId } from '@/hooks/getTelegramId';
import { useGetUsersByIdQuery } from '@/hooks/redux/users';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import wavybg from "@assets/images/card_bg.svg";
import { Card } from "@components/ui/card";
import { Drawer, DrawerClose, DrawerContent, DrawerTitle, DrawerTrigger } from "@components/ui/drawer";
import { Fragment, Key, lazy } from 'react'
import card_empty from "@assets/images/icons/empty_card.svg"
import { IoIosClose } from 'react-icons/io';
import { motion } from "framer-motion"
const Skeleton = lazy(() => import("@components/ui/skeleton").then((mod) => ({ default: mod.Skeleton })));


function CollectedCards() {

    const { telegramId } = useGetTelegramId();
    const { data: userDataCard, isLoading: loadingCollectedCards } = useGetUsersByIdQuery(telegramId, {
        refetchOnReconnect: true,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
    });
    return (
        <div>
            <div className={"flex items-center justify-between"}>
                <h1 className="text-[#FEFEFF] work-sans text-[15px] font-semibold flex items-center gap-2">
                    Cards Collected
                    <span>
                        {userDataCard?.user?.unlockedCards?.length === 0 ? "" : `(${userDataCard?.user?.unlockedCards?.length || 0})`}
                    </span>
                </h1>
                {/* <button type={"button"} className={`${userDataCard?.user?.unlockedCards?.length >= 3 ? "visible" : "invisible"} text - white work - sans text - sm underline hover: text - gray - 400`}>View all</button> */}
            </div>

            <div className="min-w-full h-full flex-shrink-0 flex items-center pb-4 gap-4 overflow-x-auto">
                <Fragment>
                    {loadingCollectedCards && <div className={"flex items-center gap-4"}>
                        {[0, 1, 2, 3, 4, 5].map((ske) => (
                            <Skeleton key={ske} className={"h-48 min-w-[130px] bg-gray-600 shadow-xl"} />
                        ))}
                    </div>}
                    {userDataCard?.user?.unlockedCards?.length === 0 ? (
                        <div
                            className={
                                "flex items-center justify-center relative flex-col gap-2  min-w-full"
                            }
                        >
                            <img src={card_empty} loading="lazy" alt="No card image" className="h-20 w-20 object-contain object-center" />

                            <p className={"text-sm text-white work-sans text-center"}>
                                You don't have any card yet
                            </p>
                            <div
                                className={
                                    "absolute z-20 bg-transparent h-full w-full top-0 bottom-0"
                                }
                            />
                        </div>
                    ) : (
                        <ScrollArea className="flex items-center whitespace-nowrap max-w-full ">
                            <div className="flex w-max space-x-3 gap-3 pb-5">
                                {
                                    userDataCard?.user?.unlockedCards &&
                                    [...userDataCard.user.unlockedCards]?.reverse()?.map(
                                        (card: {
                                            _id: Key | string | undefined;
                                            image: string | undefined;
                                            title: string | undefined;
                                        }) => (
                                            <Drawer key={card._id}>
                                                <DrawerTrigger asChild className="rounded-md border-none">
                                                    <Card
                                                        style={{
                                                            backgroundImage: `url(${wavybg})`,
                                                            backgroundRepeat: "no-repeat",
                                                            backgroundSize: "cover",
                                                        }}
                                                        className="h-48 min-w-[130px] relative border-none rounded-md flex flex-col items-center justify-center text-white text-center uppercase aqum font-bold"
                                                    >
                                                        <img
                                                            src={card.image}
                                                            loading="lazy"
                                                            fetchPriority="high"
                                                            height={160}
                                                            width={100}
                                                            alt="Card image"
                                                            className="h-full min-w-full object-cover object-center rounded-md"
                                                        />
                                                        <div
                                                            className={
                                                                "absolute z-20 bg-transparent h-full w-full top-0 rounded-md bottom-0"
                                                            }
                                                        />
                                                    </Card>
                                                </DrawerTrigger>
                                                <DrawerContent
                                                    aria-describedby={undefined}
                                                    aria-description="dialog"
                                                    className="flex flex-col max-h-fit max-w-xl mx-auto bg-gradient-to-b from-[#292734] to-[#000000] border-none px-3 rounded-lg gap-3"
                                                >
                                                    <DrawerTitle className="sr-only" />
                                                    <div className="h-full flex flex-col items-center justify-around w-full pb-10 pt-3 gap-5">
                                                        <DrawerClose className=" shadow-none bg-transparent absolute top-2 right-2 z-40 rounded-full text-4xl">
                                                            <IoIosClose size={30} color="#A4A4A7" />
                                                        </DrawerClose>
                                                        <div className={"relative"}>
                                                            <motion.img
                                                                src={card.image}
                                                                loading="lazy"
                                                                alt="Refferal Images"
                                                                className="h-96 min-w-full object-contain object-center rounded-sm"
                                                                initial={{ opacity: 0, y: 20 }}
                                                                animate={{ opacity: 1, y: 0 }}
                                                                transition={{ duration: 0.5 }}
                                                            />
                                                            <div
                                                                className={
                                                                    "absolute z-20 bg-transparent h-full w-full top-0 bottom-0"
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                </DrawerContent>
                                            </Drawer>
                                        )
                                    )}
                            </div>
                            <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                    )}

                </Fragment>
            </div>

        </div>
    )
}

export default CollectedCards

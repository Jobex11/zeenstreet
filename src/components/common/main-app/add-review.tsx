import { MdOutlineReviews } from "react-icons/md";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { triggerErrorVibration } from "@/lib/utils";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { useAddReviewMutation } from "@/hooks/redux/review";
import { useGetUsersByIdQuery } from "@/hooks/redux/users";
import { useGetTelegramId } from "@/hooks/getTelegramId";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { Textarea } from "@/components/ui/textarea"

const schema = z.object({
    reviewComment: z
        .string()
        .min(1, "Review comment must not be empty")
        .max(300, "Review must be at most 300 characters.")
});


type CreateReviewsFormValues = z.infer<typeof schema>;

function AddReview() {
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const { telegramId } = useGetTelegramId();
    const [addReview, { isLoading }] = useAddReviewMutation();
    const { data: user } = useGetUsersByIdQuery(telegramId, {
        refetchOnMountOrArgChange: true,
    });

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateReviewsFormValues>({
        resolver: zodResolver(schema),
        mode: "onSubmit",
    });

    const onSubmit = async (data: CreateReviewsFormValues) => {
        const payload = { userId: user?.user?._id, comment: data.reviewComment, rating };
        try {
            const addedReview = await addReview(payload).unwrap();
            toast.success(addedReview.message || "Your review has been submitted!", { className: "text-xs work-sans py-3" });
            setComment("");
            setRating(0);
            setIsOpen(false); 
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log(error);
            toast.error(error?.data?.error || error?.data?.message || "An error occurred while submitting your review. Try again", { className: "text-xs work-sans py-3" });
            triggerErrorVibration();
        }
    };

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <button><MdOutlineReviews color="white" size={30} /></button>
            </SheetTrigger>
            <SheetContent side={"top"} className={"max-w-xl mx-auto bg-white"}>
                <SheetHeader>
                    <SheetTitle>Share Your Review</SheetTitle>
                    <SheetDescription>
                        Let us know your thoughts on our mini app!
                    </SheetDescription>
                </SheetHeader>
                <form onSubmit={handleSubmit(onSubmit)} className=" space-y-2">
                    <div className="flex items-center justify-center gap-1 mx-auto max-w-xl">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <FaStar
                                key={star}
                                size={24}
                                className={`cursor-pointer ${star <= rating ? "text-yellow-500" : "text-gray-400"}`}
                                onClick={() => setRating(star)}
                            />
                        ))}
                    </div>
                    <Controller
                        name="reviewComment"
                        control={control}
                        render={({ field }) => (
                            <Textarea
                                {...field}
                                value={comment}
                                onChange={(e) => {
                                    field.onChange(e);
                                    setComment(e.target.value);
                                }}
                                placeholder="Write your review here..."
                                className="bg-gray-100 text-black outline-none resize-none text-sm rounded-md h-20 w-full p-3"
                            />
                        )}
                    />
                    {errors.reviewComment && (
                        <p className="text-red-500 text-xs ">
                            {errors.reviewComment.message}
                        </p>
                    )}
                    <SheetFooter>
                        <Button type="submit" disabled={isLoading} className={"h-11 bg-orange-600 hover:bg-orange-700"}>
                            {isLoading ? "Submitting..." : "Submit Review"}
                        </Button>
                    </SheetFooter>
                </form>
            </SheetContent>
        </Sheet>
    );
}

export default AddReview;

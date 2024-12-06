import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Logo from "../../../../assets/images/icons/ravenenie_logo.png";
import { TextButton } from "../../../common/buttons/Textbutton";
import { Input } from "../../../ui/input";
import smily_man from "../../../../assets/images/smily_man.png";
import Typewriter from "../../../common/typewriter";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { toast } from "sonner";

// Define Zod schema
const schema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters.")
    .max(20, "Username must be at most 20 characters.")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores."
    ),
});

type CreateUsernameFormValues = z.infer<typeof schema>;

export function CreateUsername({
  setScreens,
}: {
  setScreens?: (value: React.SetStateAction<string>) => void;
}) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUsernameFormValues>({
    resolver: zodResolver(schema),
    mode: "onSubmit",
  });

  const [username, setUsername] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: CreateUsernameFormValues) => {
    setIsSubmitting(true);
    try {
      if (
        typeof window !== "undefined" &&
        window.Telegram?.WebApp?.initDataUnsafe?.user?.id
      ) {
        const telegramId = window.Telegram.WebApp.initDataUnsafe.user.id;
        const response = await fetch(
          "https://ravegenie-vgm7.onrender.com/api/username/set",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              telegram_id: telegramId,
              preferred_username: data.username,
            }),
          }
        );

        if (!response.ok) {
          const result = await response.json();
          toast.error(result.error || "Failed to update username.");
        } else {
          toast.success("Username successfully updated!");
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          setScreens && setScreens("check-account");
        }
      } else {
        alert("Telegram WebApp is not available.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.info("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col flex-1 justify-stretch gap-10 w-full min-h-full relative p-4"
    >
      {/* Logo */}
      <div className="flex items-center mx-auto">
        <div className="relative max-h-[139px] max-w-[139px]">
          <LazyLoadImage
            effect="blur"
            src={Logo}
            alt="Zenstreet Logo"
            className="h-full w-full object-contain mx-auto"
          />
        </div>
      </div>

      {/* Genie Speech */}
      <div className="relative overflow-hidden">
        <LazyLoadImage
          effect="blur"
          src={smily_man}
          alt="Smily Man"
          className="object-contain max-h-[514px]"
        />
        <div className="absolute right-0 top-2 border border-white bg-[#292734] rounded-r-xl rounded-tl-xl w-[50%] min-h-[210px] py-3 px-2 z-30 h-fit">
          <h1 className="text-sm inter text-gray-300">
            <Typewriter
              text={`Hi! I'm Mr. G, your friendly Genie, and I'm here to grant all your wishes. But first, tell me your name, and I'll help you climb the ranks, accumulate riches, and claim your spot among the Stars...`}
              speed={60}
              className="text-sm inter text-gray-300"
            />
          </h1>
          <strong className="pt-2 text-sm inter text-gray-300 uppercase">
            ...and May <strong className="text-orange-600">The Zen</strong> Be
            With You!
          </strong>
        </div>

        {/* Username Input and Submit */}
        <div className="flex flex-col bg-[#000000]/80 bg-opacity-25 gap-3 py-3 px-2 absolute rounded-lg right-0 min-h-auto left-0 bottom-0 justify-center w-full">
          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                value={username}
                onChange={(e) => {
                  field.onChange(e);
                  setUsername(e.target.value);
                }}
                type="text"
                placeholder="Choose Your Unique Username"
                className="bg-[#22140B] text-[#FFFFFF59] outline-none text-sm poppins border-none ring-0 rounded-[10px] h-[65px] min-w-[306px] mx-auto w-full"
              />
            )}
          />
          {errors.username && (
            <p className="text-red-500 text-xs px-2">
              {errors.username.message}
            </p>
          )}

          <TextButton
            name="Proceed"
            type="submit"
            disabled={!username || isSubmitting}
            className={`uppercase mt-2 ${!username || isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
          />
        </div>
      </div>
    </form>
  );
}

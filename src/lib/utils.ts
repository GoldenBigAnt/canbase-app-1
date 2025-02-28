import Toast from "react-native-root-toast";
import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";
import { MessageType } from "@/types/utils";

const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

const message = ({
  message = "",
  duration = 2500,
  position = 0,
}: MessageType) => {
  Toast.show(message, {
    duration: duration,
    position: position,
    animation: true,
    hideOnPress: true,
  });
};

export { cn, message };

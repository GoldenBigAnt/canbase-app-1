import React from "react";
import { View } from "react-native";
import { cn } from "@/lib/utils";

const Card = React.forwardRef<View, React.ComponentProps<typeof View>>(
  ({ className, ...props }, ref) => (
    <View
      ref={ref}
      className={cn(
        "p-5 border border-[#EAEAEA] rounded-md overflow-hidden",
        className
      )}
      {...props}
    />
  )
);

export default Card;

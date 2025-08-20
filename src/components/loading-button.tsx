import { ReloadIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { JSX } from "react";
import { VariantProps } from "class-variance-authority";

export interface LoadingButtonProps extends React.ComponentProps<"button"> {
  loading: boolean;
  icon: JSX.Element;
}

function LoadingButton({ loading, ...props }: LoadingButtonProps &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  return (
    <Button {...props} disabled={loading || props.disabled}>
      {loading ? (
        <ReloadIcon className={cn("mr-2", "size-4", "animate-spin")} />
      ) : (
        props.icon
      )}
      {props.children}
    </Button>
  );
}

export default LoadingButton;

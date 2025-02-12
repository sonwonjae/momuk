import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { ThreeDots } from "@/ui/loading/icons";
import { cn } from "@/utils/tailwind";

const buttonVariants = cva(
  cn(
    "inline-flex",
    "items-center",
    "justify-center",
    "gap-2",
    "whitespace-nowrap",
    "rounded-md",
    "text-sm",
    "font-medium",
    "ring-offset-background",
    "transition-colors",
    "focus-visible:outline-none",
    "focus-visible:ring-2",
    "focus-visible:ring-ring",
    "focus-visible:ring-offset-2",
    "disabled:pointer-events-none",
    "disabled:opacity-50",
    "[&_svg]:pointer-events-none",
  ),
  {
    variants: {
      color: {
        primary: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: cn(
          "text-slate-600",
          "hover:text-primary",
          "active:text-primary",
          "underline-offset-4",
          "hover:underline",
        ),
      },
      size: {
        sm: "h-9 rounded-md px-4 py-2 text-sm",
        md: "h-10 px-4 py-2 text-md",
        lg: "h-12 rounded-md px-8 text-lg",
        "icon-sm": "h-8 w-8 [&_svg]:size-6",
        "icon-md": "h-10 w-10 [&_svg]:size-7",
        "icon-lg": "h-12 w-12 [&_svg]:size-10",
        "icon-xl": "h-16 w-16 [&_svg]:size-12",
      },
      round: {
        true: "rounded-full",
        false: "",
      },
      loading: {
        true: "[&_svg]:size-10",
        false: "",
      },
      outline: {
        true: "border",
        false: "",
      },
    },
    compoundVariants: [
      {
        color: "primary",
        outline: true,
        className: cn(
          "bg-background",
          "text-primary",
          "border-primary",
          "hover:bg-primary/10",
        ),
      },
      {
        color: "secondary",
        outline: true,
        className: cn(
          "bg-background",
          "text-secondary",
          "border-secondary",
          "hover:bg-secondary/10",
        ),
      },
      {
        color: "destructive",
        outline: true,
        className: cn(
          "bg-background",
          "text-destructive",
          "border-destructive",
          "hover:bg-destructive/10",
        ),
      },
    ],
    defaultVariants: {
      color: "primary",
      size: "md",
      round: false,
      loading: false,
      outline: false,
    },
  },
);

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      type = "button",
      className,
      color,
      outline,
      size,
      round,
      loading = false,
      asChild = false,
      children,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          buttonVariants({ color, outline, size, round, loading, className }),
        )}
        ref={ref}
        type={type}
        {...props}
      >
        {loading && <ThreeDots />}
        {!loading && children}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };

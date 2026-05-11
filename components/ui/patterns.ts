import { cva } from "class-variance-authority";

export const surfacePanel = cva("rounded-2xl border bg-paper/85", {
  variants: {
    padding: {
      md: "p-5",
      lg: "p-6",
      xl: "p-8",
    },
  },
  defaultVariants: {
    padding: "lg",
  },
});

export const interactiveSurfaceCard = cva(
  "group rounded-2xl border border-line bg-paper/85 transition-[transform,box-shadow,border-color,color,background-color] duration-200 ease-out transform-gpu motion-reduce:transform-none motion-reduce:transition-none",
  {
    variants: {
      density: {
        compact: "p-5",
        default: "p-6",
      },
      lift: {
        sm: "hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(18,14,11,0.08)]",
        md: "hover:-translate-y-1 hover:shadow-[0_16px_34px_rgba(18,14,11,0.08)]",
      },
    },
    defaultVariants: {
      density: "default",
      lift: "sm",
    },
  },
);

export const interactiveLinkRow = cva(
  "group flex items-start justify-between gap-4 transition-[transform,background-color,color] duration-200 ease-out transform-gpu motion-reduce:transform-none motion-reduce:transition-none",
  {
    variants: {
      spacing: {
        md: "py-5",
        lg: "py-6",
      },
      affordance: {
        subtle: "hover:translate-x-0.5",
      },
    },
    defaultVariants: {
      spacing: "md",
      affordance: "subtle",
    },
  },
);

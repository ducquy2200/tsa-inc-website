import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md font-ui text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink disabled:pointer-events-none disabled:opacity-40",
  {
    variants: {
      variant: {
        primary: "bg-clay px-6 py-3 text-paper hover:opacity-90",
        ghost: "border border-line px-6 py-3 text-ink hover:border-ink",
        pill: "rounded-full border border-line bg-paper/80 px-5 py-2 text-xs uppercase tracking-[0.12em] text-ink",
      },
      size: {
        sm: "h-9 px-4 py-2 text-xs",
        md: "h-11 px-6 py-3 text-sm",
        lg: "h-12 px-7 py-3 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

interface BaseButtonProps extends VariantProps<typeof buttonVariants> {
  className?: string;
  children: React.ReactNode;
}

interface LinkButtonProps extends BaseButtonProps {
  href: string;
  external?: boolean;
  onClick?: () => void;
}

interface ActionButtonProps extends BaseButtonProps {
  href?: undefined;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
}

export function Button(props: LinkButtonProps | ActionButtonProps) {
  const classes = cn(buttonVariants({ variant: props.variant, size: props.size }), props.className);

  if ("href" in props && props.href) {
    if (props.external) {
      return (
        <a className={classes} href={props.href} onClick={props.onClick} rel="noreferrer" target="_blank">
          {props.children}
        </a>
      );
    }

    return (
      <Link className={classes} href={props.href} onClick={props.onClick}>
        {props.children}
      </Link>
    );
  }

  const actionProps = props as ActionButtonProps;

  return (
    <button
      className={classes}
      type={actionProps.type ?? "button"}
      onClick={actionProps.onClick}
      disabled={actionProps.disabled}
    >
      {actionProps.children}
    </button>
  );
}

export { buttonVariants };

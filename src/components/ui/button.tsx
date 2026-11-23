import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

const buttonVariants = cva(
  "group/button box-border inline-flex shrink-0 items-center justify-center rounded-4xl border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "relative overflow-hidden bg-[var(--button-emphasis-bg)] text-primary-foreground ring-inset ring-1 ring-[var(--button-emphasis-ring)] shadow-[inset_0_1px_2px_rgba(0,0,0,0.16)] focus-visible:ring-[var(--button-emphasis-ring)] active:ring-[var(--button-emphasis-ring)]",
        outline:
          "border-border bg-input/30 hover:bg-input/50 hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost:
          "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
        destructive:
          "relative overflow-hidden bg-[var(--button-emphasis-bg)] text-white ring-inset ring-1 ring-[var(--button-emphasis-ring)] shadow-xs focus-visible:ring-[var(--button-emphasis-ring)] active:ring-[var(--button-emphasis-ring)]",
        "secondary-destructive":
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default:
          "h-9 gap-1.5 px-3 has-data-[icon=inline-end]:pr-2.5 has-data-[icon=inline-start]:pl-2.5",
        xs: "h-6 gap-1 px-2.5 text-xs has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 gap-1 px-3 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        lg: "h-10 gap-1.5 px-4 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
        icon: "size-9",
        "icon-xs": "size-6 [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const emphasisStyles = {
  default:
    "[--button-emphasis-ring:color-mix(in_oklch,var(--primary),black_10%)] [--button-emphasis-bg:color-mix(in_oklch,var(--primary),white_30%)] [--button-emphasis-gradient-start:color-mix(in_oklch,var(--primary),white_15%)] [--button-emphasis-gradient-end:var(--primary)]",
  destructive:
    "[--button-emphasis-ring:color-mix(in_oklch,var(--destructive-strong),black_10%)] [--button-emphasis-bg:color-mix(in_oklch,var(--destructive-strong),white_30%)] [--button-emphasis-gradient-start:color-mix(in_oklch,var(--destructive-strong),white_15%)] [--button-emphasis-gradient-end:var(--destructive-strong)]",
} as const

type ButtonProps = ButtonPrimitive.Props &
  VariantProps<typeof buttonVariants>

function Button({
  className,
  variant = "default",
  size = "default",
  children,
  style,
  ...props
}: ButtonProps) {
  const emphasisClass =
    variant != null && variant in emphasisStyles
      ? emphasisStyles[variant as keyof typeof emphasisStyles]
      : undefined

  const hasEmphasisGradient = Boolean(emphasisClass)

  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(
        buttonVariants({ variant, size, className }),
        emphasisClass
      )}
      style={style}
      {...props}
    >
      {hasEmphasisGradient ? (
        <>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[inherit] bg-linear-to-b from-[var(--button-emphasis-gradient-start)] to-[var(--button-emphasis-gradient-end)] shadow-[inset_0_1px_0_0_var(--button-emphasis-bg)] transition-colors group-hover/button:from-[var(--button-emphasis-bg)]"
          />
          <span className="relative z-10 inline-flex items-center gap-1.5">
            {children}
          </span>
        </>
      ) : (
        children
      )}
    </ButtonPrimitive>
  )
}

export { Button, buttonVariants }

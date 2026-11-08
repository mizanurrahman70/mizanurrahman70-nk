import Link from "next/link";
import type { ButtonProps } from "./Button.types";
import { buttonClasses, isLinkProps } from "./Button.utils";

export function Button(props: ButtonProps) {
  if (isLinkProps(props)) {
    const { variant, size = "md", className, children, href, ...rest } = props;
    return (
      <Link href={href} className={buttonClasses({ variant, size, className })} {...rest}>
        {children}
      </Link>
    );
  }

  const { variant, size = "md", className, children, type = "button", ...rest } = props;
  return (
    <button type={type} className={buttonClasses({ variant, size, className })} {...rest}>
      {children}
    </button>
  );
}

import React from 'react'
import cx from "classnames";


type ButtonProps = {
  size?: "xs" | "md" | "xl";
  variant?: "primary" | "secondary"
} & ReactButtonProps

export const Button: React.FC<ButtonProps> = ({size, variant, children, className, ...props}) => {
  const cn = cx("btn", {
    [`btn-${variant}`]: variant,
    [`btn-${size}`]: size,
  }, className)

  return (
    <button type="button" className={cn} {...props} >{children}</button>
  )
}
export default Button;

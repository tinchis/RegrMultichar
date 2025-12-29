import * as React from "react"
import { cn } from "@/lib/utils"

const Popover = React.forwardRef(({ className, open, onOpenChange, children, ...props }, ref) => {
    const isOpen = open !== undefined ? open : false

    return (
        <div ref={ref} className={cn("relative", className)} {...props}>
            {React.Children.map(children, (child) => {
                if (React.isValidElement(child)) {
                    if (child.type === PopoverTrigger) {
                        return child
                    }
                    if (child.type === PopoverContent) {
                        return isOpen ? child : null
                    }
                }
                return child
            })}
        </div>
    )
})
Popover.displayName = "Popover"

const PopoverTrigger = React.forwardRef(({ className, children, asChild, ...props }, ref) => {
    if (asChild && React.isValidElement(children)) {
        return React.cloneElement(children, { ref, ...props })
    }
    return (
        <div ref={ref} className={cn("cursor-pointer", className)} {...props}>
            {children}
        </div>
    )
})
PopoverTrigger.displayName = "PopoverTrigger"

const PopoverContent = React.forwardRef(({ className, children, ...props }, ref) => {
    return (
        <div
            ref={ref}
            className={cn(
                "z-50 rounded-md border bg-popover text-popover-foreground shadow-md outline-none absolute mt-2",
                className
            )}
            {...props}
        >
            {children}
        </div>
    )
})
PopoverContent.displayName = "PopoverContent"

export { Popover, PopoverTrigger, PopoverContent }

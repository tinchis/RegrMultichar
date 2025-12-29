import * as React from "react"
import { cn } from "@/lib/utils"

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

const Popover = React.forwardRef(({ className, open, onOpenChange, children, ...props }, ref) => {
    const isOpen = open !== undefined ? open : false
    let trigger = null
    let content = null

    React.Children.forEach(children, (child) => {
        if (React.isValidElement(child)) {
            if (child.type === PopoverTrigger || child.type?.displayName === 'PopoverTrigger') {
                trigger = child
            }
            if (child.type === PopoverContent || child.type?.displayName === 'PopoverContent') {
                content = child
            }
        }
    })

    return (
        <div ref={ref} className={cn("relative", className)} {...props}>
            {trigger}
            {isOpen && content}
        </div>
    )
})
Popover.displayName = "Popover"

export { Popover, PopoverTrigger, PopoverContent }

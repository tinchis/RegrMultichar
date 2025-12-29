import * as React from "react"
import { cn } from "@/lib/utils"

const SelectTrigger = React.forwardRef(({ className, children, ...props }, ref) => {
  return (
    <button
      ref={ref}
      type="button"
      className={cn(
        "flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
})
SelectTrigger.displayName = "SelectTrigger"

const SelectContent = React.forwardRef(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md absolute",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
})
SelectContent.displayName = "SelectContent"

const SelectValue = React.forwardRef(({ className, placeholder, children, ...props }, ref) => {
  return (
    <span ref={ref} className={cn("block truncate", className)} {...props}>
      {children || placeholder}
    </span>
  )
})
SelectValue.displayName = "SelectValue"

const SelectItem = React.forwardRef(({ className, children, onClick, value, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 px-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
        className
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  )
})
SelectItem.displayName = "SelectItem"

const Select = React.forwardRef(({ className, children, open, onOpenChange, ...props }, ref) => {
  const isOpen = open !== undefined ? open : false
  let trigger = null
  let content = null

  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child)) {
      if (child.type === SelectTrigger || child.type?.displayName === 'SelectTrigger') {
        trigger = child
      }
      if (child.type === SelectContent || child.type?.displayName === 'SelectContent') {
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
Select.displayName = "Select"

export { Select, SelectTrigger, SelectContent, SelectValue, SelectItem }

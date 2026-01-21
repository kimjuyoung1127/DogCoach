import * as React from "react"
import { cn } from "@/lib/utils"

interface SelectableCardProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    selected?: boolean;
    icon?: React.ReactNode;
    label: string;
}

const SelectableCard = React.forwardRef<HTMLButtonElement, SelectableCardProps>(
    ({ className, selected, icon, label, ...props }, ref) => {
        return (
            <button
                ref={ref}
                type="button"
                className={cn(
                    "w-full p-4 rounded-xl border text-left transition-all flex items-center gap-4 group",
                    selected
                        ? "border-brand-lime bg-green-50 text-brand-dark shadow-sm ring-1 ring-brand-lime"
                        : "border-gray-100 bg-white hover:bg-gray-50 text-gray-600 hover:border-gray-200",
                    className
                )}
                {...props}
            >
                {icon && (
                    <div className={cn(
                        "p-2 rounded-lg transition-colors",
                        selected ? "bg-brand-lime text-white" : "bg-gray-100 text-gray-400 group-hover:bg-gray-200"
                    )}>
                        {icon}
                    </div>
                )}
                <span className={cn(
                    "font-bold flex-1",
                    selected ? "text-brand-dark" : "text-gray-600"
                )}>{label}</span>
            </button>
        )
    }
)
SelectableCard.displayName = "SelectableCard"

export { SelectableCard }

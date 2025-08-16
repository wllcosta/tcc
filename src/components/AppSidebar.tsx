import { BookOpen, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

const menuItems = [
  {
    title: "Orientação de uso",
    icon: HelpCircle,
    onClick: () => console.log("Orientação de uso")
  },
  {
    title: "Manual do usuário", 
    icon: BookOpen,
    onClick: () => console.log("Manual do usuário")
  }
]

export function AppSidebar() {
  return (
    <div className="w-64 bg-card border-r border-border p-4 space-y-2">
      {menuItems.map((item) => (
        <Button
          key={item.title}
          variant="ghost"
          className="w-full justify-start gap-3 h-auto py-3 px-4 text-left hover:bg-accent/50 transition-colors"
          onClick={item.onClick}
        >
          <item.icon className="h-5 w-5 text-muted-foreground" />
          <span className="text-sm font-medium">{item.title}</span>
        </Button>
      ))}
    </div>
  )
}
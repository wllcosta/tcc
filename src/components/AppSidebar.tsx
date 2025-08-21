import { BookOpen, HelpCircle } from "lucide-react"
import { useNavigate } from "react-router-dom"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function AppSidebar() {
  const navigate = useNavigate()

  const helpMenuItems = [
    {
      title: "Orientação de uso",
      icon: HelpCircle,
      onClick: () => navigate("/orientacao-uso")
    },
    {
      title: "Manual do usuário", 
      icon: BookOpen,
      onClick: () => navigate("/manual-usuario")
    }
  ]

  return (
    <Sidebar 
      collapsible="icon" 
      className="border-r border-border/40 bg-card/80 backdrop-blur-sm rounded-r-2xl shadow-sm animate-fade-in"
    >
      <SidebarContent className="p-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-sm font-semibold text-muted-foreground mb-3">
            Ajuda
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {helpMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    onClick={item.onClick}
                    className="rounded-xl hover:bg-accent/70 transition-all duration-300 hover:scale-[1.02] hover:shadow-sm border border-transparent hover:border-border/20"
                  >
                    <item.icon className="h-4 w-4" />
                    <span className="text-sm">{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
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
      collapsible="offcanvas"
      className="border-r border-border/40 bg-card/90 backdrop-blur-sm rounded-r-2xl shadow-lg transition-all duration-500 ease-in-out animate-slide-in-right"
    >
      <SidebarContent className="p-6">
        <SidebarGroup>
          <SidebarGroupLabel className="text-sm font-semibold text-muted-foreground mb-4 flex items-center gap-2">
            <HelpCircle className="h-4 w-4" />
            Ajuda
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-3">
              {helpMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    onClick={item.onClick}
                    className="rounded-xl hover:bg-accent/80 transition-all duration-300 hover:scale-[1.02] hover:shadow-md border border-transparent hover:border-border/30 p-3 animate-fade-in"
                  >
                    <item.icon className="h-5 w-5 text-primary" />
                    <span className="text-sm font-medium">{item.title}</span>
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
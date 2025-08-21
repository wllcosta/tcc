import { MessageSquarePlus, History, BookOpen, HelpCircle, Plus } from "lucide-react"
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
  SidebarSeparator,
} from "@/components/ui/sidebar"

export function AppSidebar() {
  const navigate = useNavigate()

  const chatMenuItems = [
    {
      title: "Novo Chat",
      icon: MessageSquarePlus,
      onClick: () => navigate("/")
    },
    {
      title: "Histórico de Chats", 
      icon: History,
      onClick: () => console.log("Histórico de chats")
    }
  ]

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
      className="border-r border-border/40 bg-card/50 backdrop-blur-sm"
    >
      <SidebarContent className="gap-4 p-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Conversas
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {chatMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    onClick={item.onClick}
                    className="rounded-xl hover:bg-accent/60 transition-all duration-200 hover:scale-[1.02]"
                  >
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="bg-border/50" />

        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Ajuda
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {helpMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    onClick={item.onClick}
                    className="rounded-xl hover:bg-accent/60 transition-all duration-200 hover:scale-[1.02]"
                  >
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="bg-border/50" />

        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Futuras Opções
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  disabled
                  className="rounded-xl opacity-50 cursor-not-allowed"
                >
                  <Plus />
                  <span>Em breve...</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
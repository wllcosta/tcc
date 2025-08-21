import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { AppSidebar } from "@/components/AppSidebar"
import { DocumentationForm } from "@/components/DocumentationForm"
import { AppFooter } from "@/components/AppFooter"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background w-full">
        {/* Header */}
        <header className="flex items-center justify-between p-4 border-b border-border bg-card/50 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="rounded-xl hover:bg-accent/70 transition-all duration-300 hover:scale-105" />
          </div>
          
          <h1 className="text-2xl font-bold text-foreground">
            Trabalho de Conclusão de Curso
          </h1>
          
          <div className="flex items-center justify-end gap-2">
            <ThemeToggle />
            <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex w-full">
          <AppSidebar />
          <DocumentationForm />
        </div>

        <AppFooter />
      </div>
    </SidebarProvider>
  );
};

export default Index;

import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { AppSidebar } from "@/components/AppSidebar"
import { DocumentationForm } from "@/components/DocumentationForm"
import { AppFooter } from "@/components/AppFooter"

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="flex-1" />
        
        <h1 className="text-2xl font-bold text-foreground">
          Do Comenta Aí
        </h1>
        
        <div className="flex-1 flex items-center justify-end gap-2">
          <ThemeToggle />
          <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex">
        <AppSidebar />
        <DocumentationForm />
      </div>

      <AppFooter />
    </div>
  );
};

export default Index;

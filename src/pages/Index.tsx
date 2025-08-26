import { ArrowRight, FileText, Zap, Bot, Star, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ThemeToggle } from "@/components/ui/theme-toggle"

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-accent/5">
      {/* Header */}
      <header className="flex items-center justify-between p-6 border-b border-border/20 bg-card/30 backdrop-blur-lg">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
            <FileText className="h-5 w-5 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Comenta Aí
          </h1>
        </div>
        
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Button variant="outline" size="sm">
            Login
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-6 py-16">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Bot className="h-4 w-4" />
            Powered by IA
          </div>
          
          <h2 className="text-5xl font-bold text-foreground mb-6 leading-tight">
            Gere documentação
            <br />
            <span className="bg-gradient-to-r from-primary via-primary/80 to-accent bg-clip-text text-transparent">
              automática e inteligente
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Transforme seu código em documentação profissional com apenas alguns cliques. 
            Nossa IA analisa seu projeto e cria documentos técnicos completos e organizados.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              Começar agora
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6 rounded-xl">
              Ver demonstração
            </Button>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="border-border/20 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Rápido e Eficiente</CardTitle>
              <CardDescription>
                Gere documentação completa em minutos, não em horas. Nossa IA analisa seu código automaticamente.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-border/20 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Documentação Profissional</CardTitle>
              <CardDescription>
                Crie manuais, guias técnicos e documentação de API com formatação profissional e padronizada.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-border/20 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Bot className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Inteligência Artificial</CardTitle>
              <CardDescription>
                IA avançada que compreende seu código e gera documentação contextual e relevante.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Benefits Section */}
        <div className="bg-card/30 rounded-2xl p-8 border border-border/20 mb-16">
          <h3 className="text-3xl font-bold text-center mb-8">Por que escolher o Comenta Aí?</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              "Economize horas de trabalho manual",
              "Documentação sempre atualizada",
              "Padrões profissionais automaticamente",
              "Suporte para múltiplas linguagens",
              "Interface intuitiva e fácil de usar",
              "Exportação em diversos formatos"
            ].map((benefit, index) => (
              <div key={index} className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-foreground">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-primary/10 via-primary/5 to-accent/10 rounded-2xl p-12 border border-border/20">
          <h3 className="text-3xl font-bold mb-4">Pronto para revolucionar sua documentação?</h3>
          <p className="text-xl text-muted-foreground mb-8">
            Junte-se a milhares de desenvolvedores que já economizam tempo com o Comenta Aí
          </p>
          <Button size="lg" className="text-lg px-12 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
            Começar gratuitamente
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/20 bg-card/20 backdrop-blur-sm py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-muted-foreground">
            © 2024 Comenta Aí. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

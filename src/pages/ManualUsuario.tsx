import { ArrowLeft, Target, Settings, List, Lightbulb } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useNavigate } from "react-router-dom"

export function ManualUsuario() {
  const navigate = useNavigate()

  const sections = [
    {
      icon: Target,
      title: "Objetivo do Sistema",
      content: "O Do Comenta Aí é uma ferramenta para desenvolvedores automatizarem a documentação de seus códigos. Facilita a criação de relatórios técnicos, manuais de uso e documentação para equipes."
    },
    {
      icon: Settings,
      title: "Funcionalidades Principais",
      content: [
        "Entrada de código manual ou por arquivo",
        "Geração automática de documentação em texto estruturado", 
        "Alternância entre tema claro e escuro",
        "Opção de copiar o resultado com um clique"
      ]
    },
    {
      icon: List,
      title: "Fluxo Básico de Uso",
      content: [
        "Inserir informações iniciais (nome e contexto)",
        "Adicionar o código (texto ou arquivo)",
        "Gerar a documentação",
        "Revisar e copiar o resultado"
      ]
    },
    {
      icon: Lightbulb,
      title: "Boas Práticas",
      content: [
        "Forneça descrições claras no campo de contexto para uma documentação mais completa",
        "Prefira códigos bem identados para melhor leitura pelo sistema",
        "Use nomes de projeto consistentes para facilitar buscas futuras"
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")}
            className="gap-2 hover:bg-accent/50 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar ao início
          </Button>
        </div>

        <Card className="border-0 shadow-xl bg-card/80 backdrop-blur-sm">
          <CardContent className="p-8">
            <h1 className="text-3xl font-bold text-center mb-6 text-foreground">
              Manual do Usuário
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8 text-center">
              Este manual descreve em detalhes o funcionamento do sistema Do Comenta Aí.
            </p>

            <div className="grid gap-6">
              {sections.map((section, index) => (
                <Card key={index} className="border border-border/50 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-3 text-xl">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <section.icon className="h-5 w-5 text-primary" />
                      </div>
                      {section.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {Array.isArray(section.content) ? (
                      <ul className="space-y-2">
                        {section.content.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start gap-2 text-muted-foreground">
                            <span className="text-primary font-bold mt-1">•</span>
                            <span className="leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-muted-foreground leading-relaxed text-justify">
                        {section.content}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
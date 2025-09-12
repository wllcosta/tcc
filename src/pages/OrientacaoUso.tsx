import { ArrowLeft, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

export function OrientacaoUso() {
  const navigate = useNavigate();

  const steps = [
    {
      title: "Informe o Nome do Projeto",
      description:
        "Digite um título que identifique seu código (ex: API de autenticação, Jogo da memória, Sistema de estoque).",
    },
    {
      title: "Descreva o Contexto",
      description:
        "Explique brevemente o objetivo do projeto (ex: Sistema de autenticação em Node.js com JWT).",
    },
    {
      title: "Adicione o Código ou Arquivo",
      description:
        "Cole o código diretamente no campo de texto ou faça upload de um arquivo contendo o código.",
    },
    {
      title: "Clique em 'Gerar Documentação'",
      description:
        "Nosso sistema processará seu código e exibirá automaticamente a documentação no campo de saída.",
    },
    {
      title: "Copie a Documentação",
      description:
        "Use o botão 'Copiar texto' para reutilizar em relatórios, GitHub ou Wiki do projeto.",
    },
  ];

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
              Orientação de Uso
            </h1>

            <p className="text-lg text-muted-foreground mb-8 text-center">
              Este guia mostra o passo a passo para gerar a documentação do seu
              código de forma simples.
            </p>

            <div className="space-y-4">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="flex gap-4 p-6 rounded-lg bg-muted/30 border transition-all hover:bg-muted/40"
                >
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                      {index + 1}
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold mb-2 text-foreground">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground text-justify leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <CheckCircle className="h-5 w-5 text-primary" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

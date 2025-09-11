import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import {
  Zap,
  FileText,
  Brain,
  Clock,
  RefreshCw,
  Award,
  Globe,
  Users,
  Download,
  ArrowRight,
} from "lucide-react";

const LandingPage = () => {
  const benefits = [
    {
      icon: Zap,
      title: "Rápido e Eficiente",
      description: "Gere documentação completa automaticamente.",
    },
    {
      icon: FileText,
      title: "Documentação Profissional",
      description: "Com formatação profissional e padronizada.",
    },
    {
      icon: Brain,
      title: "Inteligência Artificial",
      description: "Nosso sistema utiliza IA para documentar seu código.",
    },
  ];

  const features = [
    { icon: Clock, text: "Economize horas de trabalho manual" },
    { icon: RefreshCw, text: "Documentação sempre atualizada" },
    { icon: Award, text: "Padrões profissionais automaticamente" },
    { icon: Globe, text: "Suporte para múltiplas linguagens" },
    { icon: Users, text: "Interface intuitiva e fácil de usar" },
    { icon: Download, text: "Exportação em formato de texto" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Theme Toggle */}
      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>

      {/* Hero Section */}
      <section className="py-20 px-4 text-center bg-gradient-to-br from-background via-background to-muted/20">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Documenta Aí
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-4xl mx-auto leading-relaxed">
            Documente seu projeto de forma profissional e eficiente com apenas
            alguns cliques. Nosso sistema analisa seu projeto e gera a
            documentação técnica de forma organizada.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={() => (window.location.href = "/sistema")}
            >
              Começar agora
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 py-6"
              onClick={() => (window.location.href = "/sistema")}
            >
              Ver demonstração
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow"
              >
                <CardHeader className="pb-4">
                  <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                    <benefit.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-foreground mb-16">
            Por que escolher o Documenta Aí?
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <p className="text-lg text-foreground font-medium">
                  {feature.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 px-4 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Pronto para revolucionar sua documentação?
          </h2>
          <p className="text-xl mb-10 opacity-90">
            Junte-se a modernidade otimizando seu tempo com o Documenta Ai!
          </p>

          <Button
            size="lg"
            variant="secondary"
            className="text-lg px-10 py-6 bg-background text-foreground hover:bg-background/90"
            onClick={() => (window.location.href = "/sistema")}
          >
            Começar gratuitamente
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-muted/20 border-t">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-muted-foreground mb-2">
            Projeto desenvolvido por Willian Desplanches Costa e Isabelle Nunes
            da Silva como parte do Trabalho de Conclusão de Curso – 2025.
          </p>
          <p className="text-sm text-muted-foreground">
            © 2025 Documenta Aí. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

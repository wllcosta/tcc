import { Button } from "@/components/ui/button";

const LandingPage = () => {
  const handleAccessSystem = () => {
    window.location.href = "https://tcc-rho-seven.vercel.app/principal";
  };

  return (
    <div className="min-h-screen bg-muted/30 flex flex-col">
      {/* Header Section */}
      <header className="bg-muted/50 py-16 text-center">
        <h1 className="text-5xl font-bold text-foreground mb-4">
          Bem-vindo ao Comenta Aí
        </h1>
      </header>

      {/* Description Section */}
      <section className="py-12 text-center max-w-4xl mx-auto px-6">
        <p className="text-xl text-muted-foreground leading-relaxed">
          Automatize a documentação do seu código e economize tempo comentando manualmente.
        </p>
      </section>

      {/* Action Button Section */}
      <section className="py-16 text-center">
        <Button 
          onClick={handleAccessSystem}
          size="lg"
          className="bg-primary hover:bg-primary-hover text-primary-foreground px-8 py-4 text-lg font-semibold rounded-lg transition-colors"
        >
          Acessar o Sistema
        </Button>
      </section>

      {/* Footer Section */}
      <footer className="mt-auto py-8 text-center">
        <p className="text-sm text-muted-foreground">
          Projeto desenvolvido por Willian e Isabelly
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;
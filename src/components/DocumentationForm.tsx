import { useState } from "react";
import { Upload, Copy, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

// Agora chamamos o backend (/api/generate) para proteger a chave

export function DocumentationForm() {
  const [projectName, setProjectName] = useState("");
  const [context, setContext] = useState("");
  const [code, setCode] = useState("");
  const [documentation, setDocumentation] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  // Removido o uso direto da API Key no cliente

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCode(e.target?.result as string);
      };
      reader.readAsText(file);
    }
  };

  const generateDocumentation = async () => {
    if (!projectName.trim() || (!context.trim() && !code.trim())) {
      toast({
        title: "Campos obrigatórios",
        description:
          "Preencha o nome do projeto e pelo menos o contexto ou código.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsGenerating(true);

      const resp = await fetch(`/api/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectName, context, code }),
      });
      if (!resp.ok) {
        throw new Error("Erro ao chamar o serviço de geração de documentação");
      }
      const data = await resp.json();
      setDocumentation(data.text || "");
      toast({
        title: "Documentação gerada!",
        description: "A documentação foi criada com sucesso.",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Erro",
        description:
          "Não foi possível gerar a documentação. Verifique a chave da API.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(documentation);
    toast({
      title: "Copiado!",
      description: "Documentação copiada para a área de transferência.",
    });
  };

  return (
    <div className="flex-1 p-6 space-y-6">
      {/* Inputs do formulário teste 123 (apagar isso dps) */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="project-name" className="text-sm font-medium">
            Nome do Projeto
          </Label>
          <Input
            id="project-name"
            placeholder="Ex: Jogo da memória, sistema de gerenciamento..."
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="context" className="text-sm font-medium">
            Contexto
          </Label>
          <Textarea
            id="context"
            placeholder="Explique brevemente o objetivo do projeto..."
            value={context}
            onChange={(e) => setContext(e.target.value)}
            className="min-h-[100px] w-full resize-none"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium">
            Inserção de Código ou Arquivo
          </Label>

          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="file"
                  id="file-upload"
                  accept=".txt,.js,.jsx,.ts,.tsx,.py,.java,.cpp,.c,.html,.css,.md"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <Button
                  variant="outline"
                  onClick={() =>
                    document.getElementById("file-upload")?.click()
                  }
                  className="w-full h-12 border-dashed border-2 hover:border-primary/50 hover:bg-accent/20"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Selecionar arquivo
                </Button>
              </div>
            </div>
          </div>

          <div className="text-center text-sm text-muted-foreground py-2">
            ou
          </div>

          <Textarea
            placeholder="Coloque seu código aqui, e não esqueça de especificar o arquivo (ex: App.js, index.html), e seu criador (ex: William Shakespeare)..."
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="min-h-[200px] w-full resize-none font-mono text-sm"
          />
        </div>
      </div>

      <Button
        onClick={generateDocumentation}
        disabled={isGenerating}
        className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90 text-primary-foreground"
      >
        {isGenerating ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2" />
            Gerando...
          </>
        ) : (
          <>
            <FileText className="h-4 w-4 mr-2" />
            GERAR DOCUMENTAÇÃO
          </>
        )}
      </Button>

      {documentation && (
        <Card className="border-2 border-dashed border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <Label className="text-sm font-medium">Documentação Gerada</Label>
              <Button
                variant="outline"
                size="sm"
                onClick={copyToClipboard}
                className="h-8 px-3"
              >
                <Copy className="h-3 w-3 mr-1" />
                Copiar
              </Button>
            </div>
            <div className="bg-muted/50 rounded-md p-4 max-h-96 overflow-y-auto">
              <pre className="text-sm whitespace-pre-wrap font-mono leading-relaxed">
                {documentation}
              </pre>
            </div>
          </CardContent>
        </Card>
      )}

      {!documentation && (
        <Card className="border-2 border-dashed border-border">
          <CardContent className="p-8 text-center">
            <div className="text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-sm">A documentação será exibida aqui...</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

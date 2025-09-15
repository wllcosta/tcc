import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function AppFooter() {
  return (
    <footer className="fixed bottom-4 left-4">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild></TooltipTrigger>
          <TooltipContent side="right">
            <p className="text-sm">Sobre o sistema</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </footer>
  );
}

import type { OWASPCategory } from "@/types";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface OverviewTabProps {
  category: OWASPCategory;
}

const severityColors = {
  critical: "bg-critical/20 text-critical border-critical/30",
  high: "bg-high/20 text-high border-high/30",
  medium: "bg-medium/20 text-glow border-glow/30",
};

export function OverviewTab({ category }: OverviewTabProps) {
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-3 mb-3">
          <h3 className="font-mono text-lg font-bold text-white">
            {category.id}: {category.name}
          </h3>
          <Badge
            variant="outline"
            className={`text-[10px] uppercase tracking-wider ${severityColors[category.severity]}`}
          >
            {category.severity}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {category.description}
        </p>
      </div>

      <div>
        <h4 className="font-mono text-sm font-semibold text-white-core mb-3">
          Attack Examples
        </h4>
        <Accordion type="multiple" className="space-y-2">
          {category.attackExamples.map((example, index) => (
            <AccordionItem
              key={index}
              value={`example-${index}`}
              className="glass rounded-lg px-4 border-deep-teal/40"
            >
              <AccordionTrigger className="text-sm text-white-core hover:text-glow py-3 hover:no-underline">
                {example.title}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground pb-4">
                <p className="mb-2">{example.description}</p>
                <span className="text-[10px] font-mono text-glow/60">
                  {example.source}
                </span>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { faqItems } from "@/data/manualContent";

export const FAQSection = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Perguntas Frequentes (FAQ)</CardTitle>
        <CardDescription>Respostas para as dúvidas mais comuns sobre o sistema</CardDescription>
      </CardHeader>
      <CardContent>
        {faqItems.map((category, catIndex) => (
          <div key={catIndex} className="mb-6 last:mb-0">
            <h3 className="font-semibold text-lg mb-3 text-primary">{category.category}</h3>
            <Accordion type="single" collapsible className="space-y-2">
              {category.questions.map((item, qIndex) => (
                <AccordionItem key={qIndex} value={`${catIndex}-${qIndex}`} className="border rounded-lg px-4">
                  <AccordionTrigger className="text-sm font-medium hover:no-underline">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

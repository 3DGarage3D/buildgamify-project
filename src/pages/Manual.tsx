import { useState, useEffect } from "react";
import { manualSections } from "@/data/manualContent";
import { ManualSection } from "@/components/manual/ManualSection";
import { ManualNavigation } from "@/components/manual/ManualNavigation";
import { SearchManual } from "@/components/manual/SearchManual";
import { FAQSection } from "@/components/manual/FAQSection";
import { BookOpen, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Manual = () => {
  const [activeSection, setActiveSection] = useState(manualSections[0].id);

  const scrollToSection = (sectionId: string, subsectionId?: string) => {
    setActiveSection(sectionId);
    
    setTimeout(() => {
      const elementId = subsectionId || sectionId;
      const element = document.getElementById(elementId);
      
      if (element) {
        const offset = 100;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    }, 100);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = manualSections.map(s => s.id);
      const scrollPosition = window.scrollY + 150;

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentSection = manualSections.find(s => s.id === activeSection);

  return (
    <div className="min-h-screen pb-12">
      {/* Header */}
      <div className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <BookOpen className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-3xl font-bold">Manual do Sistema</h1>
                <p className="text-sm text-muted-foreground">Guia completo de funcionalidades</p>
              </div>
            </div>
            <Link to="/">
              <Button variant="outline" size="sm">
                <Home className="h-4 w-4 mr-2" />
                Dashboard
              </Button>
            </Link>
          </div>
          <SearchManual onResultClick={scrollToSection} />
        </div>
      </div>

      {/* Layout Principal */}
      <div className="max-w-7xl mx-auto px-4 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Navegação Lateral */}
          <aside className="lg:col-span-1 hidden lg:block">
            <div className="sticky top-32">
              <h2 className="font-semibold mb-4 px-3">Conteúdo</h2>
              <ManualNavigation 
                activeSection={activeSection} 
                onSectionClick={(id) => scrollToSection(id)} 
              />
            </div>
          </aside>

          {/* Conteúdo Principal */}
          <main className="lg:col-span-3 space-y-8">
            {manualSections.map((section) => {
              const Icon = section.icon;
              return (
                <section key={section.id} id={section.id} className="scroll-mt-28">
                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-2">
                      <Icon className="h-6 w-6 text-primary" />
                      <h2 className="text-2xl font-bold">{section.title}</h2>
                    </div>
                    <p className="text-muted-foreground">{section.description}</p>
                  </div>
                  
                  <div className="space-y-4">
                    {section.subsections.map((subsection) => (
                      <ManualSection key={subsection.id} subsection={subsection} />
                    ))}
                  </div>
                </section>
              );
            })}

            {/* FAQ */}
            <section id="faq" className="scroll-mt-28">
              <FAQSection />
            </section>

            {/* Footer do Manual */}
            <div className="border-t pt-8 mt-12 text-center text-sm text-muted-foreground">
              <p>Manual do Sistema - Versão 1.0</p>
              <p className="mt-1">Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Manual;

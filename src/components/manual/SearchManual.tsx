import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { manualSections } from "@/data/manualContent";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface SearchManualProps {
  onResultClick: (sectionId: string, subsectionId: string) => void;
}

export const SearchManual = ({ onResultClick }: SearchManualProps) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    
    if (searchQuery.length < 2) {
      setResults([]);
      return;
    }

    const searchLower = searchQuery.toLowerCase();
    const foundResults: any[] = [];

    manualSections.forEach((section) => {
      section.subsections.forEach((subsection) => {
        const titleMatch = subsection.title.toLowerCase().includes(searchLower);
        const contentMatch = subsection.content.toLowerCase().includes(searchLower);
        
        if (titleMatch || contentMatch) {
          foundResults.push({
            sectionId: section.id,
            sectionTitle: section.title,
            subsectionId: subsection.id,
            subsectionTitle: subsection.title,
            content: subsection.content.substring(0, 150) + "..."
          });
        }
      });
    });

    setResults(foundResults.slice(0, 5)); // Limitar a 5 resultados
  };

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar no manual..."
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-10"
        />
      </div>
      
      {results.length > 0 && (
        <Card className="absolute top-full mt-2 w-full z-50 shadow-lg">
          <CardContent className="p-2">
            <div className="space-y-1">
              {results.map((result, index) => (
                <button
                  key={index}
                  onClick={() => {
                    onResultClick(result.sectionId, result.subsectionId);
                    setQuery("");
                    setResults([]);
                  }}
                  className="w-full text-left p-3 hover:bg-muted rounded-lg transition-colors"
                >
                  <div className="flex items-start gap-2">
                    <Badge variant="outline" className="shrink-0 text-xs">
                      {result.sectionTitle}
                    </Badge>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-sm truncate">{result.subsectionTitle}</p>
                      <p className="text-xs text-muted-foreground line-clamp-2">{result.content}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

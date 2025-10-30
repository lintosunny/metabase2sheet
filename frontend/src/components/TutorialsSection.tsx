import { Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

export const TutorialsSection = () => {
  const handleDownload = (tutorial: string) => {
    // Placeholder for actual download functionality
    window.open("#", "_blank");
  };

  return (
    <section id="tutorials" className="py-20 px-4 bg-secondary/30">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-3xl font-bold mb-4 text-foreground">Tutorials & Guides</h2>
        <p className="text-muted-foreground mb-12 text-lg">
          Download comprehensive guides to get started with Metabase2Sheet
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-card rounded-2xl p-8 shadow-soft hover:shadow-elevated transition-shadow">
            <div className="bg-primary/10 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4">
              <FileText className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-foreground">Generate Query</h3>
            <p className="text-muted-foreground mb-6">
              Learn how to set up and generate queries from your Metabase instance
            </p>
            <Button
              onClick={() => handleDownload("query")}
              variant="outline"
              className="w-full rounded-lg"
            >
              <Download className="h-4 w-4 mr-2" />
              Download Guide
            </Button>
          </div>
          <div className="bg-card rounded-2xl p-8 shadow-soft hover:shadow-elevated transition-shadow">
            <div className="bg-accent/10 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4">
              <FileText className="h-8 w-8 text-accent" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-foreground">Automate Export</h3>
            <p className="text-muted-foreground mb-6">
              Step-by-step instructions for automating your data export to Google Sheets
            </p>
            <Button
              onClick={() => handleDownload("automate")}
              variant="outline"
              className="w-full rounded-lg"
            >
              <Download className="h-4 w-4 mr-2" />
              Download Guide
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

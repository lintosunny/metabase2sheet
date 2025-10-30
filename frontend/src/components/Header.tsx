import { Linkedin, Github, Mail } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export const Header = () => {
  const handleDownload = (type: string) => {
    const urls = {
      script: "https://medium.com/@example/how-to-generate-script",
      automate: "https://medium.com/@example/how-to-automate-sheets",
      demo: "https://www.youtube.com/watch?v=your-demo-video"
    };
    
    window.open(urls[type as keyof typeof urls], '_blank');
  };

  return (
    <header className="border-b border-border bg-background sticky top-0 z-50">
      <div className="container mx-auto px-4 py-5 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <h1 className="text-3xl font-bold text-foreground">
            metabase<span className="text-primary">2</span>sheet
          </h1>
          
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-sm font-semibold border border-border rounded-xl px-4 py-2 hover:border-primary transition-colors">
                  Tutorials
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="w-[240px] p-2 bg-popover rounded-xl border border-border shadow-lg">
                    <li>
                      <NavigationMenuLink asChild>
                        <button
                          onClick={() => handleDownload('script')}
                          className="block w-full text-left select-none rounded-lg p-3 leading-none no-underline outline-none transition-colors hover:bg-muted focus:bg-muted"
                        >
                          <div className="text-sm font-medium text-foreground">How to Generate Script</div>
                        </button>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <button
                          onClick={() => handleDownload('automate')}
                          className="block w-full text-left select-none rounded-lg p-3 leading-none no-underline outline-none transition-colors hover:bg-muted focus:bg-muted"
                        >
                          <div className="text-sm font-medium text-foreground">How to Automate Sheets</div>
                        </button>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <button
                          onClick={() => handleDownload('demo')}
                          className="block w-full text-left select-none rounded-lg p-3 leading-none no-underline outline-none transition-colors hover:bg-muted focus:bg-muted"
                        >
                          <div className="text-sm font-medium text-foreground">Demo</div>
                        </button>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        
        <div className="flex items-center gap-3">
          <a
            href="https://www.linkedin.com/in/lintons/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg hover:bg-secondary/50 transition-all duration-200"
          >
            <Linkedin className="h-5 w-5 text-foreground hover:text-primary transition-colors" />
          </a>
          <a
            href="https://github.com/lintosunny/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg hover:bg-secondary/50 transition-all duration-200"
          >
            <Github className="h-5 w-5 text-foreground hover:text-primary transition-colors" />
          </a>
          <a
            href="mailto:lintosunny111@gmail.com"
            className="p-2 rounded-lg hover:bg-secondary/50 transition-all duration-200"
          >
            <Mail className="h-5 w-5 text-foreground hover:text-primary transition-colors" />
          </a>
        </div>
      </div>
    </header>
  );
};

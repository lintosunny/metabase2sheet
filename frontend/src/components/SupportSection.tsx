import { Mail, Phone, Linkedin, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export const SupportSection = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent",
      description: "Thank you for reaching out. I'll get back to you soon!",
    });
  };

  return (
    <section id="support" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <div className="bg-card rounded-2xl p-8 shadow-elevated">
            <h2 className="text-3xl font-bold mb-3 text-foreground">Let's Talk</h2>
            <p className="text-muted-foreground mb-8">
              Need help or have feedback? Contact me directly.
            </p>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name">Your Name</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  required
                  className="rounded-lg"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Your Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  required
                  className="rounded-lg"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Your Message</Label>
                <Textarea
                  id="message"
                  placeholder="Type something if you want..."
                  required
                  rows={4}
                  className="rounded-lg resize-none"
                />
              </div>
              <Button type="submit" className="w-full rounded-lg bg-gradient-soft">
                Send Message
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-foreground">Get in Touch</h3>
              <div className="space-y-4">
                <a
                  href="mailto:linton.sunny@gmail.com"
                  className="flex items-center gap-3 text-foreground/80 hover:text-primary transition-colors group"
                >
                  <div className="bg-primary/10 p-3 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <span>linton.sunny@gmail.com</span>
                </a>
                <a
                  href="tel:+919876543210"
                  className="flex items-center gap-3 text-foreground/80 hover:text-primary transition-colors group"
                >
                  <div className="bg-primary/10 p-3 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <span>+91 98765 43210</span>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-foreground">Connect with me</h3>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full h-12 w-12 hover:bg-primary hover:text-primary-foreground transition-colors"
                  onClick={() => window.open("https://www.linkedin.com/in/lintonsunny", "_blank")}
                >
                  <Linkedin className="h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full h-12 w-12 hover:bg-primary hover:text-primary-foreground transition-colors"
                  onClick={() => window.open("https://github.com/lintonsunny", "_blank")}
                >
                  <Github className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

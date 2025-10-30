import { Header } from "@/components/Header";
import { FormSection } from "@/components/FormSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <FormSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

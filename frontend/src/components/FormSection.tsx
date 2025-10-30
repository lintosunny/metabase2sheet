import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, Copy, Wand2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group";

interface Parameter {
  id: string;
  type: string;
  name: string;
  value: string;
}

export const FormSection = () => {
  const [parameters, setParameters] = useState<Parameter[]>([]);
  const [generatedScript, setGeneratedScript] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [displayedScript, setDisplayedScript] = useState("");
  const [mode, setMode] = useState<string>("append");
  const { toast } = useToast();

  const addParameter = () => {
    setParameters([
      ...parameters,
      { id: crypto.randomUUID(), type: "text", name: "", value: "" },
    ]);
  };

  const removeParameter = (id: string) => {
    setParameters(parameters.filter((p) => p.id !== id));
  };

const generateScript = async () => {
  setIsLoading(true);
  setDisplayedScript("");

  // Simulate 2–4 sec loading
  const loadingTime = Math.random() * 2000 + 2000;
  await new Promise((resolve) => setTimeout(resolve, loadingTime));

  // Collect all form data
  const payload = {
    METABASE_URL: (document.getElementById("metabase-url") as HTMLInputElement)?.value,
    USER_NAME: (document.getElementById("username") as HTMLInputElement)?.value,
    PASSWORD: (document.getElementById("password") as HTMLInputElement)?.value,
    EMAIL_ID: (document.getElementById("email-id") as HTMLInputElement)?.value,
    _functionName: (document.getElementById("function-name") as HTMLInputElement)?.value,
    card_ID: (document.getElementById("question-id") as HTMLInputElement)?.value,
    num_Columns: Number((document.getElementById("column-count") as HTMLInputElement)?.value),
    SHEET_NAME: (document.getElementById("sheet-name") as HTMLInputElement)?.value,
    TAB_NAME: (document.getElementById("tab-name") as HTMLInputElement)?.value,
    parameters,
    mode, // append or paste
  };

  const response = await fetch("http://127.0.0.1:8000/generate-script", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(payload),
  });

  const result = await response.json();

  if (result.success) {
  setGeneratedScript(result.script);
  
  // Typewriter effect for pretty display
  let currentIndex = 0;
  const scriptText = result.script;
  const typeSpeed = 5;
  const typeInterval = setInterval(() => {
    if (currentIndex <= scriptText.length) {
      setDisplayedScript(scriptText.substring(0, currentIndex));
      currentIndex++;
    } else {
      clearInterval(typeInterval);
    }
  }, typeSpeed);

  toast({
    title: "Success!",
    description: "Script generated successfully.",
  });
} else {
  setGeneratedScript(`Error: ${result.error}`);
  setDisplayedScript(`Error: ${result.error}`);
  toast({
    title: "Error",
    description: result.error,
    variant: "destructive",
  });
}

setIsLoading(false);
};

  const copyScript = () => {
    navigator.clipboard.writeText(generatedScript);
    toast({
      title: "Copied to Clipboard",
      description: "Script copied successfully.",
    });
  };

  return (
    <section id="home" className="py-16 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Form Card */}
          <div className="bg-card rounded-2xl p-8 border border-border shadow-elevated">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[22px] font-semibold text-foreground">Configure Export</h2>
              <ToggleGroup type="single" value={mode} onValueChange={(value) => value && setMode(value)} className="gap-2">
                <ToggleGroupItem value="append" className="rounded-lg px-4 py-2 border border-border data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=on]:border-primary">
                  Append
                </ToggleGroupItem>
                <ToggleGroupItem value="paste" className="rounded-lg px-4 py-2 border border-border data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=on]:border-primary">
                  Paste
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
            <div className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="metabase-url" className="text-sm font-medium">Metabase URL</Label>
                <Input
                  id="metabase-url"
                  defaultValue="https://metabase.curefit.co"
                  placeholder="https://your-metabase.com"
                  className="rounded-xl h-11"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-sm font-medium">Username</Label>
                  <Input
                    id="username"
                    placeholder="your@email.com"
                    className="rounded-xl h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="rounded-xl h-11"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email-id" className="text-sm font-medium">Email ID</Label>
                  <Input
                    id="email-id"
                    type="email"
                    placeholder="your@email.com"
                    className="rounded-xl h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="function-name" className="text-sm font-medium">Function Name</Label>
                  <Input
                    id="function-name"
                    placeholder="_function_name"
                    className="rounded-xl h-11"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="question-id" className="text-sm font-medium">Metabase Question</Label>
                  <Input
                    id="question-id"
                    placeholder="12345"
                    className="rounded-xl h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="column-count" className="text-sm font-medium">Column Count</Label>
                  <Input
                    id="column-count"
                    type="number"
                    placeholder="5"
                    className="rounded-xl h-11"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sheet-name" className="text-sm font-medium">Sheet Name</Label>
                  <Input
                    id="sheet-name"
                    placeholder="My Sheet"
                    className="rounded-xl h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tab-name" className="text-sm font-medium">Tab Name</Label>
                  <Input
                    id="tab-name"
                    placeholder="Sheet1"
                    className="rounded-xl h-11"
                  />
                </div>
              </div>

              {/* Dynamic Parameters */}
              {parameters.length > 0 && (
                <div className="space-y-3 pt-4 border-t border-border">
                  <Label className="text-sm font-medium">Parameters</Label>
                  {parameters.map((param) => (
                    <div key={param.id} className="grid grid-cols-12 gap-2">
                      <div className="col-span-3">
                        <Select
                          value={param.type}
                          onValueChange={(value) => {
                            setParameters(
                              parameters.map((p) =>
                                p.id === param.id ? { ...p, type: value, value: "" } : p
                              )
                            );
                          }}
                        >
                          <SelectTrigger className="rounded-xl h-11">
                            <SelectValue placeholder="Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="text">Text</SelectItem>
                            <SelectItem value="number">Number</SelectItem>
                            <SelectItem value="date">Date</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="col-span-4">
                        <Input
                          placeholder="Parameter name"
                          className="rounded-xl h-11"
                          value={param.name}
                          onChange={(e) => {
                            setParameters(
                              parameters.map((p) =>
                                p.id === param.id ? { ...p, name: e.target.value } : p
                              )
                            );
                          }}
                        />
                      </div>
                      <div className="col-span-4">
                        {param.type === "date" ? (
                          <Select
                            value={param.value}
                            onValueChange={(value) => {
                              setParameters(
                                parameters.map((p) =>
                                  p.id === param.id ? { ...p, value } : p
                                )
                              );
                            }}
                          >
                            <SelectTrigger className="rounded-xl h-11">
                              <SelectValue placeholder="Select date" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="D-1">D-1</SelectItem>
                              <SelectItem value="TODAY">TODAY</SelectItem>
                              <SelectItem value="D-1">D-1</SelectItem>
                              <SelectItem value="D-7">D-7</SelectItem>
                              <SelectItem value="D-14">D-14</SelectItem>
                              <SelectItem value="D-31">D-31</SelectItem>
                              <SelectItem value="D-365">D-365</SelectItem>
                              <SelectItem value="D+7">D+7</SelectItem>
                              <SelectItem value="D+14">D+14</SelectItem>
                              <SelectItem value="D+31">D+31</SelectItem>
                              <SelectItem value="D+365">D+365</SelectItem>
                              <SelectItem value="CURRENT_MONTH_START">CURRENT_MONTH_START</SelectItem>
                              <SelectItem value="CURRENT_MONTH_END">CURRENT_MONTH_END</SelectItem>
                              <SelectItem value="LAST_MONTH_START">LAST_MONTH_START</SelectItem>
                              <SelectItem value="LAST_MONTH_END">LAST_MONTH_END</SelectItem>
                              <SelectItem value="SECOND_LAST_MONTH_START">SECOND_LAST_MONTH_START</SelectItem>
                              <SelectItem value="SECOND_LAST_MONTH_END">SECOND_LAST_MONTH_END</SelectItem>
                              <SelectItem value="FIRST_DAY_OF_CURRENT_WEEK">FIRST_DAY_OF_CURRENT_WEEK</SelectItem>
                            </SelectContent>
                          </Select>
                        ) : (
                          <Input
                            placeholder="Value"
                            type={param.type === "number" ? "number" : "text"}
                            className="rounded-xl h-11"
                            value={param.value}
                            onChange={(e) => {
                              setParameters(
                                parameters.map((p) =>
                                  p.id === param.id ? { ...p, value: e.target.value } : p
                                )
                              );
                            }}
                          />
                        )}
                      </div>
                      <div className="col-span-1">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => removeParameter(param.id)}
                          className="rounded-xl h-11 w-11 border-border hover:border-primary hover:bg-muted"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <Button
                variant="outline"
                onClick={addParameter}
                className="w-full rounded-xl h-11 border-border hover:border-primary hover:bg-muted font-medium"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Parameter
              </Button>

              <div className="pt-4">
                <Button
                  onClick={generateScript}
                  disabled={isLoading}
                  className="w-full rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-[hsl(16,100%,45%)] transition-all duration-200 h-12"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground mr-2" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Wand2 className="h-4 w-4 mr-2" />
                      Generate Script
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* Script Output Card */}
          <div className="bg-card rounded-2xl p-8 border border-border shadow-elevated lg:sticky lg:top-24">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[22px] font-semibold text-foreground">Generated Script</h2>
              {generatedScript && (
                <Button
                  onClick={copyScript}
                  variant="outline"
                  size="sm"
                  className="rounded-xl border-border hover:border-primary hover:bg-muted"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
              )}
            </div>
            <div className="bg-muted rounded-xl p-6 min-h-[400px] text-sm relative">
              {isLoading ? (
                <div className="flex items-center justify-center h-[350px]">
                  <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary/30 border-t-primary" />
                    <p className="text-muted-foreground font-medium">Generating your script...</p>
                  </div>
                </div>
              ) : displayedScript ? (
                <pre className="text-foreground whitespace-pre-wrap">{displayedScript}</pre>
              ) : (
                <p className="text-muted-foreground text-center mt-32 font-medium">
                  Your generated script will appear here
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

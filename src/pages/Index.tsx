import { useState, useEffect } from "react";
import { FileText, Download, Copy, RotateCcw, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useToast } from "@/hooks/use-toast";
import { jsPDF } from "jspdf";
import { Link } from "react-router-dom";

const Index = () => {
  const [text, setText] = useState("");
  const [header, setHeader] = useState("");
  const [footer, setFooter] = useState("");
  const [fontFamily, setFontFamily] = useState("helvetica");
  const [fontSize, setFontSize] = useState(12);
  const [alignment, setAlignment] = useState<"left" | "center" | "justify">("left");
  const [lineSpacing, setLineSpacing] = useState([1.5]);
  const [margin, setMargin] = useState([20]);
  const [pageSize, setPageSize] = useState("a4");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { toast } = useToast();

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const charCount = text.length;

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleReset = () => {
    setText("");
    setHeader("");
    setFooter("");
    setFontFamily("helvetica");
    setFontSize(12);
    setAlignment("left");
    setLineSpacing([1.5]);
    setMargin([20]);
    toast({
      title: "Reset Complete",
      description: "All fields have been cleared.",
    });
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Text copied to clipboard.",
    });
  };

  const generatePDF = () => {
    if (!text.trim()) {
      toast({
        title: "No Text",
        description: "Please enter some text to convert.",
        variant: "destructive",
      });
      return;
    }

    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: pageSize,
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const marginValue = margin[0];
    const contentWidth = pageWidth - (2 * marginValue);

    doc.setFont(fontFamily);
    doc.setFontSize(fontSize);

    let yPosition = marginValue;

    // Add header if exists
    if (header.trim()) {
      doc.setFontSize(10);
      doc.text(header, pageWidth / 2, yPosition, { align: "center" });
      yPosition += 10;
    }

    // Add main text
    doc.setFontSize(fontSize);
    const lines = doc.splitTextToSize(text, contentWidth);
    const lineHeight = fontSize * lineSpacing[0] * 0.352778; // Convert pt to mm

    lines.forEach((line: string) => {
      if (yPosition + lineHeight > pageHeight - marginValue - 10) {
        doc.addPage();
        yPosition = marginValue;
        
        // Add header on new page
        if (header.trim()) {
          doc.setFontSize(10);
          doc.text(header, pageWidth / 2, yPosition, { align: "center" });
          yPosition += 10;
          doc.setFontSize(fontSize);
        }
      }

      const alignValue = alignment === "center" ? "center" : alignment === "justify" ? "justify" : "left";
      const xPosition = alignment === "center" ? pageWidth / 2 : marginValue;
      
      doc.text(line, xPosition, yPosition, { 
        align: alignValue as any,
        maxWidth: contentWidth 
      });
      yPosition += lineHeight;
    });

    // Add footer if exists
    if (footer.trim()) {
      const totalPages = doc.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        doc.setFontSize(10);
        doc.text(footer, pageWidth / 2, pageHeight - 10, { align: "center" });
      }
    }

    const fileName = text.split('\n')[0].slice(0, 30).replace(/[^a-z0-9]/gi, '_') || 'document';
    doc.save(`${fileName}.pdf`);

    toast({
      title: "PDF Generated!",
      description: "Your PDF has been downloaded successfully.",
    });
  };

  return (
    <div className="min-h-screen gradient-subtle">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b shadow-soft">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-secondary">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Text2PDF.app
            </h1>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Free Text to PDF Converter
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Transform your text into professional PDFs instantly. Customize fonts, add headers, and download — completely free, no signup required.
        </p>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 pb-16">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Text Editor */}
          <Card className="lg:col-span-2 p-6 shadow-card hover:shadow-hover transition-all duration-300">
            <div className="space-y-4">
              <div>
                <Label htmlFor="text-input" className="text-lg font-semibold mb-2 block">
                  Enter Your Text
                </Label>
                <Textarea
                  id="text-input"
                  placeholder="Start typing or paste your text here..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="min-h-[400px] text-base resize-none focus:ring-2 focus:ring-primary"
                />
                <div className="flex justify-between items-center mt-2 text-sm text-muted-foreground">
                  <span>Words: {wordCount} | Characters: {charCount}</span>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={handleCopy} disabled={!text}>
                      <Copy className="h-4 w-4 mr-1" />
                      Copy
                    </Button>
                    <Button variant="ghost" size="sm" onClick={handleReset}>
                      <RotateCcw className="h-4 w-4 mr-1" />
                      Reset
                    </Button>
                  </div>
                </div>
              </div>

              {/* Header & Footer */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="header">Header Text (Optional)</Label>
                  <Input
                    id="header"
                    placeholder="e.g., Company Name"
                    value={header}
                    onChange={(e) => setHeader(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="footer">Footer Text (Optional)</Label>
                  <Input
                    id="footer"
                    placeholder="e.g., Page Footer"
                    value={footer}
                    onChange={(e) => setFooter(e.target.value)}
                  />
                </div>
              </div>

              {/* Convert Button */}
              <Button
                onClick={generatePDF}
                className="w-full btn-gradient text-lg py-6 rounded-xl"
                size="lg"
              >
                <Download className="h-5 w-5 mr-2" />
                Convert to PDF
              </Button>
            </div>
          </Card>

          {/* Right Column - Customization */}
          <div className="space-y-4">
            <Card className="p-6 shadow-card">
              <h3 className="text-lg font-semibold mb-4">Customization Options</h3>
              
              <div className="space-y-6">
                <div>
                  <Label htmlFor="font-family">Font Family</Label>
                  <Select value={fontFamily} onValueChange={setFontFamily}>
                    <SelectTrigger id="font-family">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="helvetica">Arial / Helvetica</SelectItem>
                      <SelectItem value="times">Times New Roman</SelectItem>
                      <SelectItem value="courier">Courier</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="font-size">Font Size: {fontSize}pt</Label>
                  <Slider
                    id="font-size"
                    min={8}
                    max={24}
                    step={1}
                    value={[fontSize]}
                    onValueChange={(val) => setFontSize(val[0])}
                  />
                </div>

                <div>
                  <Label htmlFor="alignment">Text Alignment</Label>
                  <Select value={alignment} onValueChange={(val: any) => setAlignment(val)}>
                    <SelectTrigger id="alignment">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="left">Left</SelectItem>
                      <SelectItem value="center">Center</SelectItem>
                      <SelectItem value="justify">Justify</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="line-spacing">Line Spacing: {lineSpacing[0].toFixed(1)}</Label>
                  <Slider
                    id="line-spacing"
                    min={1}
                    max={3}
                    step={0.1}
                    value={lineSpacing}
                    onValueChange={setLineSpacing}
                  />
                </div>

                <div>
                  <Label htmlFor="margin">Page Margin: {margin[0]}mm</Label>
                  <Slider
                    id="margin"
                    min={10}
                    max={40}
                    step={5}
                    value={margin}
                    onValueChange={setMargin}
                  />
                </div>

                <div>
                  <Label htmlFor="page-size">Page Size</Label>
                  <Select value={pageSize} onValueChange={setPageSize}>
                    <SelectTrigger id="page-size">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="a4">A4</SelectItem>
                      <SelectItem value="letter">Letter</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>

            {/* Preview Card */}
            <Card className="p-6 shadow-card bg-muted/50">
              <h3 className="text-lg font-semibold mb-4">Live Preview</h3>
              <div className="bg-card p-4 rounded-lg border-2 border-dashed min-h-[200px]">
                <div className="space-y-2">
                  {header && (
                    <p className="text-xs text-center text-muted-foreground border-b pb-2">
                      {header}
                    </p>
                  )}
                  <p
                    style={{
                      fontFamily: fontFamily === "helvetica" ? "Arial, sans-serif" : fontFamily === "times" ? "Times New Roman, serif" : "Courier New, monospace",
                      fontSize: `${fontSize}px`,
                      textAlign: alignment,
                      lineHeight: lineSpacing[0],
                    }}
                    className="text-foreground"
                  >
                    {text || "Your text will appear here..."}
                  </p>
                  {footer && (
                    <p className="text-xs text-center text-muted-foreground border-t pt-2 mt-4">
                      {footer}
                    </p>
                  )}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-card/50 backdrop-blur-sm mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center space-y-4">
            <p className="text-sm text-muted-foreground">
              © 2025 Text2PDF.app – 100% Free Online PDF Converter
            </p>
            <div className="flex justify-center gap-6 text-sm">
              <Link to="/privacy-policy" className="text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </Link>
              <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                Contact
              </Link>
            </div>
            <p className="text-xs text-muted-foreground">
              Made with ❤️ using Lovable.dev
            </p>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 rounded-full w-12 h-12 shadow-hover btn-gradient"
          size="icon"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-5 w-5" />
        </Button>
      )}
    </div>
  );
};

export default Index;

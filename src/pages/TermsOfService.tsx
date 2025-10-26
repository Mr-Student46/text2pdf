import { FileText, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Link } from "react-router-dom";

const TermsOfService = () => {
  return (
    <div className="min-h-screen gradient-subtle">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b shadow-soft">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-secondary">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Text2PDF.app
            </h1>
          </Link>
          <ThemeToggle />
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <Link to="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </Link>

        <Card className="p-8 shadow-card">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Terms of Service
          </h1>
          <p className="text-sm text-muted-foreground mb-8">Last updated: January 2025</p>

          <div className="space-y-6 text-foreground">
            <section>
              <h2 className="text-2xl font-semibold mb-3">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing and using Text2PDF.app, you accept and agree to be bound by the terms and provisions 
                of this agreement. If you do not agree to these terms, please do not use our service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">2. Description of Service</h2>
              <p className="text-muted-foreground leading-relaxed">
                Text2PDF.app provides a free, browser-based tool that allows users to convert text into PDF documents. 
                The service operates entirely within your web browser using client-side processing.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">3. User Responsibilities</h2>
              <p className="text-muted-foreground leading-relaxed mb-2">
                When using Text2PDF.app, you agree to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>Use the service only for lawful purposes</li>
                <li>Not attempt to disrupt or interfere with the service</li>
                <li>Not use the service to create harmful, offensive, or illegal content</li>
                <li>Respect intellectual property rights in any content you convert</li>
                <li>Not attempt to reverse engineer or compromise the service</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">4. Free Service</h2>
              <p className="text-muted-foreground leading-relaxed">
                Text2PDF.app is provided completely free of charge. We do not require registration, payment, 
                or any personal information to use the service. We reserve the right to modify or discontinue 
                the service at any time without notice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">5. No Warranties</h2>
              <p className="text-muted-foreground leading-relaxed">
                The service is provided "as is" without any warranties, express or implied. We do not guarantee 
                that the service will be uninterrupted, error-free, or meet your specific requirements. We are 
                not responsible for any errors in converted PDFs.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">6. Content Ownership</h2>
              <p className="text-muted-foreground leading-relaxed">
                You retain full ownership of any text or content you convert using our service. Since all processing 
                happens locally in your browser, we never access, store, or claim any rights to your content.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">7. Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed">
                Text2PDF.app and its operators shall not be liable for any direct, indirect, incidental, special, 
                or consequential damages resulting from your use or inability to use the service, including but not 
                limited to data loss or service interruptions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">8. Privacy</h2>
              <p className="text-muted-foreground leading-relaxed">
                Your use of Text2PDF.app is also governed by our{" "}
                <Link to="/privacy-policy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>. Please review it to understand our practices.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">9. Modifications to Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to modify these terms at any time. Changes will be effective immediately upon 
                posting to this page. Your continued use of the service after changes constitutes acceptance of 
                the modified terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">10. Governing Law</h2>
              <p className="text-muted-foreground leading-relaxed">
                These terms shall be governed by and construed in accordance with applicable laws, without regard 
                to conflict of law provisions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">11. Contact Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have questions about these terms, please visit our{" "}
                <Link to="/contact" className="text-primary hover:underline">
                  contact page
                </Link>.
              </p>
            </section>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default TermsOfService;

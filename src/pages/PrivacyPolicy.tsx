import { FileText, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
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
            Privacy Policy
          </h1>
          <p className="text-sm text-muted-foreground mb-8">Last updated: January 2025</p>

          <div className="space-y-6 text-foreground">
            <section>
              <h2 className="text-2xl font-semibold mb-3">1. Introduction</h2>
              <p className="text-muted-foreground leading-relaxed">
                Welcome to Text2PDF.app. We respect your privacy and are committed to protecting your personal data. 
                This privacy policy explains how we handle your information when you use our text-to-PDF conversion service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">2. Data Collection</h2>
              <p className="text-muted-foreground leading-relaxed mb-2">
                Text2PDF.app is designed with privacy in mind:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>We do NOT store any text you enter or convert</li>
                <li>All PDF generation happens locally in your browser</li>
                <li>No user accounts or registration required</li>
                <li>No tracking cookies or analytics scripts</li>
                <li>Your data never leaves your device</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">3. Local Processing</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our service operates entirely in your web browser using client-side JavaScript. When you convert text to PDF, 
                the conversion happens on your device. We never see, store, or transmit your content to our servers.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">4. Cookies and Local Storage</h2>
              <p className="text-muted-foreground leading-relaxed">
                We use local storage only to remember your theme preference (light/dark mode). This data stays on your device 
                and is not shared with anyone.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">5. Third-Party Services</h2>
              <p className="text-muted-foreground leading-relaxed">
                Text2PDF.app does not integrate with any third-party analytics, advertising, or tracking services. 
                Your privacy is our priority.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">6. Data Security</h2>
              <p className="text-muted-foreground leading-relaxed">
                Since all processing happens locally in your browser and we don't collect any data, there is no data 
                to secure on our end. Your documents and text remain completely private to you.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">7. Children's Privacy</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our service is available to users of all ages. Since we don't collect any personal information, 
                we don't knowingly collect data from children under 13.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">8. Changes to This Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update this privacy policy from time to time. Any changes will be posted on this page with 
                an updated revision date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">9. Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about this privacy policy, please visit our{" "}
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

export default PrivacyPolicy;

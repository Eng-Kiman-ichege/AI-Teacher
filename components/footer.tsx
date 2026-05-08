import Link from "next/link";
import { GraduationCap, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-primary p-1.5 rounded-lg">
                <GraduationCap className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold tracking-tight">AI Teacher</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Empowering everyone to learn anything with the power of artificial intelligence. 
              Personalized education for the modern world.
            </p>
            <div className="flex gap-4 text-sm">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Twitter
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                GitHub
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                LinkedIn
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-6">Product</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="#features" className="text-muted-foreground hover:text-foreground">Features</Link></li>
              <li><Link href="#how-it-works" className="text-muted-foreground hover:text-foreground">How it Works</Link></li>
              <li><Link href="#pricing" className="text-muted-foreground hover:text-foreground">Pricing</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Changelog</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6">Resources</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Blog</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Documentation</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Help Center</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">API</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6">Legal</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Privacy Policy</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Terms of Service</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} AI Teacher Platform. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            <span>hello@aiteacher.io</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

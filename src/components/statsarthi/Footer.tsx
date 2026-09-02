import { Link } from "react-router-dom";
import { BarChart3, Mail, Shield, Building2 } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-200 border-t border-slate-800 pt-12 pb-8 mt-auto print:hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <BarChart3 className="h-7 w-7 text-blue-400" />
              <span className="text-2xl font-bold text-white tracking-tight">StatSarthi</span>
            </Link>
            <p className="text-sm text-slate-400 max-w-md">
              An AI-Enabled Skill Intelligence and Learning Platform for India's Official Statistical System. 
              Designed for SIH 2026 (Problem Statement SIH26101) to empower MoSPI and NSSTA officials.
            </p>
            <div className="flex items-center gap-2 pt-2 text-sm text-slate-500">
              <Building2 className="h-4 w-4" />
              <span>Ministry of Statistics and Programme Implementation</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Platform Features</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/onboarding" className="text-slate-400 hover:text-blue-400 transition-colors">
                  Official Onboarding
                </Link>
              </li>
              <li>
                <Link to="/assessment" className="text-slate-400 hover:text-blue-400 transition-colors">
                  Diagnostic Assessment
                </Link>
              </li>
              <li>
                <Link to="/pathway" className="text-slate-400 hover:text-blue-400 transition-colors">
                  iGOT Learning Pathway
                </Link>
              </li>
              <li>
                <Link to="/quiz" className="text-slate-400 hover:text-blue-400 transition-colors">
                  AI Quiz Generator
                </Link>
              </li>
              <li>
                <Link to="/datasets" className="text-slate-400 hover:text-blue-400 transition-colors">
                  MoSPI Datasets
                </Link>
              </li>
            </ul>
          </div>

          {/* Ecosystem */}
          <div>
            <h3 className="font-semibold text-white mb-4">Ecosystem</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://igotkarmayogi.gov.in/" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-blue-400 transition-colors">
                  iGOT Karmayogi Bharat
                </a>
              </li>
              <li>
                <a href="https://mospi.gov.in/nssta" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-blue-400 transition-colors">
                  NSSTA Training
                </a>
              </li>
              <li>
                <a href="https://bhashini.gov.in/" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-blue-400 transition-colors">
                  Bhashini
                </a>
              </li>
              <li>
                <a href="https://janparichay.meripehchaan.gov.in/" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-blue-400 transition-colors">
                  Jan Parichay SSO
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} StatSarthi. Created for SIH 2026.
          </p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1">
              <Shield className="h-3 w-3" /> Data Encrypted
            </span>
            <Link to="/admin" className="hover:text-blue-400 transition-colors">
              Admin Portal
            </Link>
            <a href="mailto:support@statsarthi.gov.in" className="hover:text-blue-400 transition-colors">
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

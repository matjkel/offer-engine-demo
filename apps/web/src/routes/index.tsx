import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-20 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Smart Financing for Your <br />
            <span className="text-indigo-600">Dental Care</span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Get instant, personalized financing offers from top lenders. No
            impact to your credit score to check rates.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/quote"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-indigo-600 rounded-full hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
            >
              Check Your Rates
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
          <div className="pt-12 flex flex-wrap justify-center gap-8 text-sm font-medium text-slate-500">
            <div className="flex items-center">
              <CheckCircle2 className="h-5 w-5 text-indigo-500 mr-2" />
              <span>Instant Decisions</span>
            </div>
            <div className="flex items-center">
              <CheckCircle2 className="h-5 w-5 text-indigo-500 mr-2" />
              <span>Multiple Lenders</span>
            </div>
            <div className="flex items-center">
              <CheckCircle2 className="h-5 w-5 text-indigo-500 mr-2" />
              <span>Secure Process</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

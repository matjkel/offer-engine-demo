import { Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export function LandingHero() {
  return (
    <section className="relative overflow-hidden bg-white pt-16 pb-32 md:pt-48 md:pb-32">
      <div className="container mx-auto px-4 relative z-10 text-center">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6 flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500"></span>
              </span>
              Now live in beta
            </span>
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl mb-6">
            Find Your Best{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Dental Financing
            </span>
          </h1>

          <p className="mt-6 text-lg leading-8 text-slate-600 mb-10 max-w-2xl mx-auto">
            Our intelligent Offer Engine analyzes dozens of dental lenders to
            find you the personalized payment plans you deserve. No hidden fees,
            no impact on your credit score to check.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/quote"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-8 py-3.5 text-base font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all duration-200"
            >
              See Payment Plans <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="#features"
              className="inline-flex items-center justify-center gap-2 rounded-xl px-8 py-3.5 text-base font-semibold text-slate-900 hover:bg-slate-50 transition-all duration-200 ring-1 ring-slate-200"
            >
              How it works
            </a>
          </div>

          <div className="mt-10 flex items-center justify-center gap-x-8 text-sm leading-6 text-slate-500">
            <div className="flex items-center gap-x-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              <span>Free to use</span>
            </div>
            <div className="flex items-center gap-x-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              <span>Secure & Private</span>
            </div>
          </div>
        </div>
      </div>

      <div
        className="absolute top-0 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl"
        aria-hidden="true"
      >
        <div
          className="aspect-[1155/678] w-[68.5625rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        ></div>
      </div>
    </section>
  );
}

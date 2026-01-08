import { useEffect, useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";

const STEPS = [
  { id: 1, text: "Analyzing your profile..." },
  { id: 2, text: "Checking lender network..." },
  { id: 3, text: "Calculating personalized rates..." },
  { id: 4, text: "Finalizing offers..." },
];

export function LoadingResults() {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < STEPS.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg border border-slate-100">
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-indigo-50 mb-2">
            <Loader2 className="w-6 h-6 text-indigo-600 animate-spin" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900">
            Finding the best rates
          </h3>
          <p className="text-sm text-slate-500">
            Please wait while we connect with our partners
          </p>
        </div>

        <div className="space-y-4">
          {STEPS.map((step, index) => {
            const isCompleted = index < currentStep;
            const isCurrent = index === currentStep;
            const isPending = index > currentStep;

            return (
              <div
                key={step.id}
                className={`flex items-center gap-3 transition-all duration-300 ${
                  isPending ? "opacity-30 blur-[0.5px]" : "opacity-100"
                }`}
              >
                <div className="flex-shrink-0">
                  {isCompleted ? (
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  ) : isCurrent ? (
                    <div className="w-5 h-5 rounded-full border-2 border-indigo-600 border-t-transparent animate-spin" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-slate-200" />
                  )}
                </div>
                <span
                  className={`text-sm font-medium ${
                    isCurrent ? "text-indigo-700" : "text-slate-600"
                  }`}
                >
                  {step.text}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

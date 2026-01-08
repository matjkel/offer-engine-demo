import { Zap, ShieldCheck, Banknote, Clock } from "lucide-react";

const features = [
  {
    name: "Instant Decisions",
    description:
      "Get real-time financing offers for your dental procedure in under 30 seconds. No waiting days for an email response.",
    icon: Zap,
  },
  {
    name: "Secure & Private",
    description:
      "Bank-level encryption ensures your personal data stays safe and is never sold to spammers.",
    icon: ShieldCheck,
  },
  {
    name: "Competitive Rates",
    description:
      "We partner with top dental lenders to bring you exclusive rates you won't find anywhere else.",
    icon: Banknote,
  },
  {
    name: "24/7 Availability",
    description:
      "Apply whenever you want, from wherever you want. Our engine never sleeps.",
    icon: Clock,
  },
];

export function LandingFeatures() {
  return (
    <div id="features" className="bg-slate-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-blue-600">
            Why Choose Us
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Smarter dental financing for every patient
          </p>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            We've streamlined the entire patient financing process to put you
            back in control of your dental care.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-slate-900">
                  <div className="absolute top-0 left-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-slate-600">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}

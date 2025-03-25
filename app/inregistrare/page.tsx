import { SignupForm } from "@/components/signup-sections/signup-form";
import Link from "next/link";
import { ShirtIcon } from "lucide-react";

export const metadata = {
  title: "Înregistrare | FreshPress Laundry",
  description: "Creează un cont nou FreshPress",
};

export default function SignupPage() {
  return (
    <div className="container flex h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-primary" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <ShirtIcon className="mr-2 h-6 w-6" />
          FreshPress
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &quot;Cu trei copii, spălatul rufelor îmi ocupa tot weekendul.
              Acum las totul vineri și ridic hainele curate și proaspete luni.
              Calitatea este uimitoare, iar comoditatea este și mai bună.&quot;
            </p>
            <footer className="text-sm">Maria Popescu</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Creează un cont
            </h1>
            <p className="text-sm text-muted-foreground">
              Introdu datele tale pentru a crea un cont FreshPress
            </p>
          </div>
          <SignupForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            Ai deja un cont?{" "}
            <Link
              href="/autentificare"
              className="underline underline-offset-4 hover:text-primary"
            >
              Autentifică-te
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

import { LoginForm } from "@/components/login-sections/login-form";
import Link from "next/link";
import { ShirtIcon } from "lucide-react";

export const metadata = {
  title: "Autentificare | FreshPress Laundry",
  description: "Autentifică-te în contul tău FreshPress",
};

export default function LoginPage() {
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
              &quot;FreshPress mi-a schimbat complet rutina. Las hainele în drum
              spre serviciu și le ridic la întoarcere. Totul este perfect curat
              și frumos împăturit!&quot;
            </p>
            <footer className="text-sm">Sara</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Bine ai revenit
            </h1>
            <p className="text-sm text-muted-foreground">
              Introdu datele tale pentru a accesa contul
            </p>
          </div>
          <LoginForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            Nu ai cont?{" "}
            <Link
              href="/inregistrare"
              className="underline underline-offset-4 hover:text-primary"
            >
              Înregistrează-te
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

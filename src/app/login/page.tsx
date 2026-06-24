"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, AlertCircle, ShieldCheck } from "lucide-react";
import Link from "next/link";

// ── Componente interno que usa useSearchParams ────────────────────────────────
// Debe estar envuelto en <Suspense> para satisfacer el requisito de Next.js 15+
function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);

  const error = searchParams.get("error");
  const email = searchParams.get("email");

  useEffect(() => {
    fetch("/api/me")
      .then((r) => r.json())
      .then(({ status, profileId }: { status: string; profileId?: string }) => {
        if (status === "has_profile" && profileId)
          router.replace(`/perfil/${profileId}`);
        else if (status === "no_profile") router.replace("/registro");
        else setChecking(false); // no_session → mostrar login
      })
      .catch(() => setChecking(false));
  }, [router]);

  async function handleGoogleLogin() {
    setLoading(true);
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: { hd: "zongolica.tecnm.mx", prompt: "select_account" },
      },
    });
  }

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-5 h-5 text-teal-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Blobs decorativos */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-80 h-80 bg-teal-200/50 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-sky-200/45 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-0 w-56 h-56 bg-emerald-200/30 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-sm">
        {/* Logo + nombre */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-3">
            <Image
              src="/logo-itsz.svg"
              alt="ITSZ"
              width={72}
              height={72}
              className="object-contain"
            />
          </div>
          <h1 className="text-lg font-bold text-foreground">
            TICs para Teachers
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Diagnóstico Digital Docente · ITSZ
          </p>
        </div>

        {/* Card glass */}
        <div className="glass-card rounded-3xl p-7 space-y-5">
          <div className="text-center">
            <h2 className="text-base font-semibold text-foreground">
              Acceso institucional
            </h2>
            <p className="text-xs text-muted-foreground mt-1">
              Inicia sesión con tu cuenta del ITSZ para continuar
            </p>
          </div>

          {/* Error */}
          {error === "dominio_no_permitido" && (
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-red-50 border border-red-200">
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-medium text-red-700">
                  Correo no permitido
                </p>
                {email && (
                  <p className="text-xs text-red-600 mt-0.5 font-mono">
                    {email}
                  </p>
                )}
                <p className="text-xs text-red-600 mt-0.5">
                  Usa tu correo institucional ITSZ.
                </p>
              </div>
            </div>
          )}
          {error === "auth_failed" && (
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-red-50 border border-red-200">
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <p className="text-xs text-red-700">
                Error al autenticar. Intenta de nuevo.
              </p>
            </div>
          )}

          {/* Dominios */}
          <div className="space-y-1.5">
            <p className="text-xs text-muted-foreground font-medium flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              Correos institucionales aceptados:
            </p>
            <div className="flex flex-wrap gap-1.5">
              <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 font-mono text-xs">
                @zongolica.tecnm.mx
              </Badge>
              <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 font-mono text-xs">
                @itszongolica.edu.mx
              </Badge>
              <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 font-mono text-xs">
                @cle.zongolica.tecnm.mx
              </Badge>
            </div>
          </div>

          {/* Botón Google */}
          <Button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 font-medium h-11 shadow-sm"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin text-gray-500" />
            ) : (
              <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
            )}
            Continuar con Google
          </Button>

          <p className="text-center text-xs text-muted-foreground">
            Se abrirá el selector de cuentas Google.
            <br />
            Elige tu correo institucional del ITSZ.
          </p>
        </div>

        <div className="text-center mt-5">
          <Link
            href="/"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}

// ── Page export con Suspense boundary ─────────────────────────────────────────
// Requerido por Next.js 15+ cuando se usa useSearchParams() en un Client Component
export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-5 h-5 text-teal-500 animate-spin" />
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  );
}

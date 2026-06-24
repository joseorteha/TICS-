"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  ArrowRight,
  ChevronRight,
  Clock,
  MapPin,
  Calendar,
  Menu,
  X,
} from "lucide-react";

const modulos = [
  {
    num: "I",
    titulo: "Google Workspace Educativo",
    desc: "Plataformas y servicios de Google orientados a la organización y gestión del entorno educativo digital.",
    herramientas: [
      "Google Classroom",
      "Google Forms",
      "Google Drive",
      "Google Meet",
      "Google Calendar",
    ],
  },
  {
    num: "II",
    titulo: "Herramientas Interactivas",
    desc: "Recursos digitales para el diseño de materiales didácticos y la dinamización de actividades de aprendizaje.",
    herramientas: [
      "Canva",
      "Kahoot",
      "Quizizz",
      "Padlet",
      "Mentimeter",
      "Genially",
    ],
  },
  {
    num: "III",
    titulo: "Inteligencia Artificial Aplicada a la Docencia",
    desc: "Herramientas basadas en inteligencia artificial para apoyar la planeación, evaluación y comunicación docente.",
    herramientas: ["ChatGPT", "Gemini", "Gamma", "MagicSchool"],
  },
  {
    num: "IV",
    titulo: "Organización y Productividad Digital",
    desc: "Estrategias y herramientas para la gestión eficiente de recursos, evidencias y tareas en el entorno educativo.",
    herramientas: [
      "Planeación docente",
      "Gestión de evidencias",
      "Retroalimentación digital",
      "Automatización de tareas",
    ],
  },
];

const infoRecopilada = [
  "Herramientas digitales que actualmente utiliza el docente",
  "Nivel de experiencia con plataformas educativas",
  "Familiaridad con herramientas de Inteligencia Artificial",
  "Necesidades de formación identificadas",
  "Retos y oportunidades dentro de la práctica docente",
  "Intereses y expectativas sobre la capacitación",
];

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <div
      className="min-h-screen bg-white text-slate-800"
      style={{ fontFamily: "var(--font-nunito), sans-serif" }}
    >
      {/* ── Barra institucional ── */}
      <div className="bg-teal-700 text-white text-xs py-1.5 px-4 text-center tracking-wide font-medium">
        Instituto Tecnológico Superior de Zongolica &nbsp;·&nbsp; Tecnológico
        Nacional de México
      </div>

      {/* ── Navbar ── */}
      <header className="sticky top-0 z-50 bg-white/95 border-b border-slate-100 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-3">
              <Image
                src="/logo-itsz.svg"
                alt="ITSZ"
                width={30}
                height={30}
                className="object-contain"
              />
              <div className="leading-tight">
                <p className="text-sm font-bold text-slate-800">
                  TICs para Teachers
                </p>
                <p className="text-[11px] text-slate-400 hidden sm:block">
                  Capacitación Docente · ITSZ
                </p>
              </div>
            </div>
            <nav className="hidden lg:flex items-center gap-7 text-[13px] text-slate-500">
              <a
                href="#contexto"
                className="hover:text-teal-700 transition-colors"
              >
                Contexto
              </a>
              <a
                href="#diagnostico"
                className="hover:text-teal-700 transition-colors"
              >
                Diagnóstico
              </a>
              <a
                href="#temario"
                className="hover:text-teal-700 transition-colors"
              >
                Temario
              </a>
              <a
                href="#facilitador"
                className="hover:text-teal-700 transition-colors"
              >
                Facilitador
              </a>
              <Link
                href="/recursos"
                className="hover:text-teal-700 transition-colors"
              >
                Recursos
              </Link>
            </nav>
            <div className="flex items-center gap-2">
              <Link href="/login" className="hidden sm:block">
                <Button
                  size="sm"
                  className="bg-teal-700 hover:bg-teal-600 text-white text-xs px-4 h-8 rounded-md"
                >
                  Acceder al diagnóstico
                </Button>
              </Link>
              <button
                type="button"
                className="lg:hidden p-2 rounded-md text-slate-600 hover:text-teal-700 hover:bg-slate-50 transition-colors"
                onClick={() => setMobileMenuOpen((o) => !o)}
                aria-label="Abrir menú"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-100 bg-white">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex flex-col">
              <a
                href="#contexto"
                onClick={() => setMobileMenuOpen(false)}
                className="py-3 text-sm text-slate-600 hover:text-teal-700 border-b border-slate-50 transition-colors"
              >
                Contexto
              </a>
              <a
                href="#diagnostico"
                onClick={() => setMobileMenuOpen(false)}
                className="py-3 text-sm text-slate-600 hover:text-teal-700 border-b border-slate-50 transition-colors"
              >
                Diagnóstico
              </a>
              <a
                href="#temario"
                onClick={() => setMobileMenuOpen(false)}
                className="py-3 text-sm text-slate-600 hover:text-teal-700 border-b border-slate-50 transition-colors"
              >
                Temario
              </a>
              <a
                href="#facilitador"
                onClick={() => setMobileMenuOpen(false)}
                className="py-3 text-sm text-slate-600 hover:text-teal-700 border-b border-slate-50 transition-colors"
              >
                Facilitador
              </a>
              <Link
                href="/recursos"
                onClick={() => setMobileMenuOpen(false)}
                className="py-3 text-sm text-slate-600 hover:text-teal-700 transition-colors"
              >
                Recursos
              </Link>
              <div className="pt-3 pb-1 sm:hidden">
                <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full bg-teal-700 hover:bg-teal-600 text-white text-sm h-10">
                    Acceder al diagnóstico
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* ── HERO ── */}
      <section className="border-b border-slate-100 pt-14 pb-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          {/* Logos + organización */}
          <div className="flex items-center gap-4 mb-10">
            <Image
              src="/logo-itsz.svg"
              alt="ITSZ"
              width={48}
              height={48}
              className="object-contain"
            />
            <div className="h-9 w-px bg-slate-200" />
            <Image
              src="/CLEyM.jpg"
              alt="CLEyM"
              width={48}
              height={48}
              className="object-contain rounded"
            />
            <div className="pl-2 hidden sm:block">
              <p className="text-xs font-semibold text-slate-500 leading-snug">
                Centro de Lenguas y Multiculturalidad
              </p>
              <p className="text-[11px] text-slate-400">
                Academia de Lenguas Extranjeras · ITSZ
              </p>
            </div>
          </div>

          <p className="text-xs font-bold text-teal-700 uppercase tracking-[0.18em] mb-4">
            Capacitación Docente · 2025
          </p>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight mb-4 max-w-2xl">
            TICs para Teachers
          </h1>
          <p className="text-base sm:text-lg text-slate-500 font-medium mb-5 max-w-xl leading-relaxed">
            Herramientas digitales para una enseñanza dinámica e inteligente
          </p>
          <p className="text-[15px] text-slate-500 max-w-2xl leading-relaxed mb-9">
            Capacitación dirigida al personal docente del Instituto Tecnológico
            Superior de Zongolica, orientada al uso de herramientas digitales,
            recursos interactivos e inteligencia artificial aplicados a la
            práctica educativa.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mb-10">
            <Link href="/login" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto bg-teal-700 hover:bg-teal-600 text-white h-11 px-7 text-sm gap-2">
                Responder diagnóstico previo
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <a href="#temario" className="w-full sm:w-auto">
              <Button
                variant="outline"
                className="w-full sm:w-auto h-11 px-7 text-sm border-slate-200 text-slate-600 hover:bg-slate-50 gap-2"
              >
                Ver temario
                <ChevronRight className="w-4 h-4" />
              </Button>
            </a>
          </div>

          {/* Stats rápidos */}
          <div className="flex flex-wrap gap-6 pt-6 border-t border-slate-100">
            <div className="flex items-center gap-2 text-slate-500">
              <Clock className="w-4 h-4 text-teal-600 shrink-0" />
              <span className="text-sm">
                <strong className="text-slate-700">5 minutos</strong> ·
                Diagnóstico previo
              </span>
            </div>
            <div className="flex items-center gap-2 text-slate-500">
              <MapPin className="w-4 h-4 text-teal-600 shrink-0" />
              <span className="text-sm">
                <strong className="text-slate-700">Virtual</strong> · Modalidad
              </span>
            </div>
            <div className="flex items-center gap-2 text-slate-500">
              <Calendar className="w-4 h-4 text-teal-600 shrink-0" />
              <span className="text-sm">
                <strong className="text-slate-700">3 horas</strong> · Duración
                de la sesión
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTEXTO: ¿Por qué TICs hoy? ── */}
      <section
        id="contexto"
        className="py-14 px-4 sm:px-6 border-b border-slate-100 bg-slate-50/60"
      >
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-10 items-start">
            <div className="lg:col-span-1">
              <p className="text-[11px] font-bold text-teal-700 uppercase tracking-widest mb-2">
                Contexto
              </p>
              <h2 className="text-xl font-bold text-slate-900">
                ¿Por qué hablar de TICs hoy?
              </h2>
            </div>
            <div className="lg:col-span-2 space-y-4 text-[15px] text-slate-600 leading-relaxed">
              <p>
                Las tecnologías digitales forman parte de la vida cotidiana de
                estudiantes y docentes. Herramientas colaborativas, plataformas
                educativas e inteligencia artificial están transformando la
                forma en que se planean actividades, se generan recursos y se
                desarrollan experiencias de aprendizaje.
              </p>
              <p>
                Esta capacitación busca ofrecer una aproximación práctica a
                algunas de estas herramientas y reflexionar sobre su integración
                en el contexto educativo del ITSZ.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── DIAGNÓSTICO PREVIO ── */}
      <section
        id="diagnostico"
        className="py-14 px-4 sm:px-6 border-b border-slate-100"
      >
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-[11px] font-bold text-teal-700 uppercase tracking-widest mb-2">
                Instrumento previo
              </p>
              <h2 className="text-xl font-bold text-slate-900 mb-4">
                ¿Por qué este diagnóstico?
              </h2>
              <p className="text-[15px] text-slate-600 leading-relaxed mb-4">
                Antes de iniciar la capacitación queremos conocer las
                experiencias, intereses y necesidades de los participantes
                respecto al uso de tecnologías digitales en el ámbito educativo.
              </p>
              <p className="text-[15px] text-slate-600 leading-relaxed mb-7">
                La información recopilada permitirá adaptar los ejemplos,
                actividades y herramientas que se trabajarán durante la sesión
                para responder mejor a las necesidades reales del grupo.
              </p>
              <Link href="/login">
                <Button className="bg-teal-700 hover:bg-teal-600 text-white h-10 px-6 text-sm gap-2">
                  Responder diagnóstico
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <p className="mt-3 text-xs text-slate-400">
                Sin fines de evaluación · Información confidencial · Uso
                académico
              </p>
            </div>

            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4">
                El instrumento permite conocer
              </p>
              <ul className="space-y-3">
                {infoRecopilada.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0 mt-[9px]" />
                    <p className="text-[15px] text-slate-600">{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── TEMARIO ── */}
      <section
        id="temario"
        className="py-14 px-4 sm:px-6 border-b border-slate-100 bg-slate-50/60"
      >
        <div className="max-w-5xl mx-auto">
          <div className="mb-10">
            <p className="text-[11px] font-bold text-teal-700 uppercase tracking-widest mb-2">
              Programa de la sesión
            </p>
            <h2 className="text-xl font-bold text-slate-900 mb-3">
              ¿Qué exploraremos durante la capacitación?
            </h2>
            <p className="text-[15px] text-slate-500 max-w-xl leading-relaxed">
              Durante la sesión conoceremos herramientas que pueden apoyar
              procesos de planeación, evaluación, creación de materiales y
              organización académica, incluyendo el uso de Inteligencia
              Artificial como apoyo para la práctica docente.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            <div className="absolute left-[27px] top-10 bottom-10 w-px bg-slate-200 hidden sm:block" />
            <div className="space-y-0">
              {modulos.map((mod, idx) => (
                <div
                  key={mod.num}
                  className="relative flex gap-6 sm:gap-10 pb-10 last:pb-0"
                >
                  <div className="shrink-0">
                    <div className="w-14 h-14 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center z-10 relative shadow-sm">
                      <span className="text-sm font-black text-teal-700">
                        {mod.num}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 pt-3">
                    <h3 className="text-base font-bold text-slate-900 mb-1">
                      {mod.titulo}
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed mb-3 max-w-xl">
                      {mod.desc}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {mod.herramientas.map((h) => (
                        <span
                          key={h}
                          className="text-xs text-slate-600 bg-white border border-slate-200 px-2.5 py-1 rounded-md"
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                    {idx < modulos.length - 1 && (
                      <div className="mt-8 border-b border-dashed border-slate-100 sm:hidden" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FACILITADOR ── */}
      <section
        id="facilitador"
        className="py-12 px-4 sm:px-6 border-b border-slate-100"
      >
        <div className="max-w-5xl mx-auto">
          <p className="text-[11px] font-bold text-teal-700 uppercase tracking-widest mb-6">
            Ponente
          </p>
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 max-w-2xl">
            <div className="relative w-20 h-20 shrink-0 rounded-full overflow-hidden border-2 border-slate-200">
              <Image
                src="/jose.webp"
                alt="Jose Bernardino Tlehuactle Ortega"
                fill
                className="object-cover object-top"
              />
            </div>
            <div>
              <p className="text-base font-bold text-slate-900 mb-1">
                Jose Bernardino Tlehuactle Ortega
              </p>
              <p className="text-sm text-teal-700 font-medium mb-3">
                Webmaster · Instituto Tecnológico Superior de Zongolica
              </p>
              <p className="text-[15px] text-slate-600 leading-relaxed">
                Desarrollador Full Stack y estudiante de Ingeniería en Sistemas,
                interesado en la aplicación de tecnologías digitales e
                Inteligencia Artificial en contextos educativos. Participa en el
                desarrollo de soluciones tecnológicas orientadas a la
                automatización de procesos, la gestión de plataformas digitales
                y el fortalecimiento de competencias tecnológicas dentro de la
                comunidad educativa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <Image
                src="/logo-itsz.svg"
                alt="ITSZ"
                width={36}
                height={36}
                className="object-contain opacity-75"
              />
              <div>
                <p className="text-sm font-bold text-slate-700 leading-snug">
                  Instituto Tecnológico Superior de Zongolica
                </p>
                <p className="text-xs text-slate-400 mt-0.5">
                  Tecnológico Nacional de México · TecNM
                </p>
              </div>
            </div>
            <div className="text-xs text-slate-400 sm:text-right space-y-0.5">
              <p>Centro de Lenguas y Multiculturalidad</p>
              <p>Academia de Lenguas Extranjeras</p>
              <p className="pt-1 text-slate-300">Capacitación Docente · 2026</p>
            </div>
          </div>
          <p className="text-[11px] text-slate-300 text-center mt-6 pt-5 border-t border-slate-100">
            Plataforma de diagnóstico docente desarrollada por José Bernardino
            Tlehuactle Ortega · ITSZ
          </p>
        </div>
      </footer>
    </div>
  );
}

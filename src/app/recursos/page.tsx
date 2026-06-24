import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Monitor,
  Gamepad2,
  Bot,
  TrendingUp,
  ExternalLink,
  ChevronLeft,
  BookOpen,
  Video,
  FileText,
  Lightbulb,
  Code2,
} from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────────────────

type TipoRecurso = "Video" | "Guía" | "GitHub" | "Artículo" | "Plantilla";

interface Herramienta {
  nombre: string;
  desc: string;
  url: string;
  nivel: string;
}

interface Recurso {
  tipo: TipoRecurso;
  titulo: string;
  url: string;
  fuente: string;
}

// ── Data ──────────────────────────────────────────────────────────────────────

const modulos = [
  {
    id: 1,
    icon: Monitor,
    title: "Google Workspace para Docentes",
    color: "text-sky-600",
    badge: "bg-sky-100 text-sky-700 border-sky-200",
    bg: "bg-sky-50 border-sky-100",
    tip: "Empieza por Google Classroom: crea tu primera clase, sube una tarea y comparte el código con tus alumnos esta semana.",
    herramientas: [
      {
        nombre: "Google Classroom",
        desc: "Organiza tus clases, tareas y calificaciones en un solo lugar",
        url: "https://classroom.google.com",
        nivel: "Esencial",
      },
      {
        nombre: "Google Forms",
        desc: "Crea exámenes, encuestas y formularios que se autocorrigen",
        url: "https://forms.google.com",
        nivel: "Esencial",
      },
      {
        nombre: "Google Drive",
        desc: "Almacena y comparte materiales con tus alumnos sin límite",
        url: "https://drive.google.com",
        nivel: "Esencial",
      },
      {
        nombre: "Google Meet",
        desc: "Videoconferencias educativas con funciones de clase en línea",
        url: "https://meet.google.com",
        nivel: "Importante",
      },
      {
        nombre: "Google Calendar",
        desc: "Programa actividades, entregas y eventos académicos",
        url: "https://calendar.google.com",
        nivel: "Útil",
      },
    ] satisfies Herramienta[],
    recursos: [
      {
        tipo: "Video",
        titulo: "Tutorial Google Classroom para docentes",
        url: "https://www.youtube.com/watch?v=KNAZfN2E2ms",
        fuente: "Google for Education",
      },
      {
        tipo: "Guía",
        titulo: "Centro de formación de Google Workspace for Education",
        url: "https://edu.google.com/intl/es/for-educators/training/",
        fuente: "Google",
      },
      {
        tipo: "Video",
        titulo: "Crear exámenes autocorregibles en Google Forms",
        url: "https://www.youtube.com/watch?v=HuRpPOH9BLg",
        fuente: "Google Workspace",
      },
      {
        tipo: "Guía",
        titulo: "Organiza tu Drive como un pro — tutorial paso a paso",
        url: "https://support.google.com/drive/answer/2375091",
        fuente: "Google Support",
      },
    ] satisfies Recurso[],
  },
  {
    id: 2,
    icon: Gamepad2,
    title: "Herramientas Interactivas",
    color: "text-indigo-600",
    badge: "bg-indigo-100 text-indigo-700 border-indigo-200",
    bg: "bg-indigo-50 border-indigo-100",
    tip: "Prueba Kahoot o Quizizz en tu próxima clase de repaso — los estudiantes lo amarán y tú tendrás reportes automáticos.",
    herramientas: [
      {
        nombre: "Canva para Educación",
        desc: "Diseña presentaciones, infografías y materiales visuales gratis",
        url: "https://canva.com/education",
        nivel: "Esencial",
      },
      {
        nombre: "Kahoot",
        desc: "Cuestionarios gamificados en tiempo real para repasar contenido",
        url: "https://kahoot.com",
        nivel: "Esencial",
      },
      {
        nombre: "Quizizz",
        desc: "Evaluaciones interactivas con memes, música y reportes automáticos",
        url: "https://quizizz.com",
        nivel: "Esencial",
      },
      {
        nombre: "Padlet",
        desc: "Pizarras colaborativas virtuales para trabajo en equipo",
        url: "https://padlet.com",
        nivel: "Importante",
      },
      {
        nombre: "Mentimeter",
        desc: "Presentaciones interactivas con encuestas y nubes de palabras en vivo",
        url: "https://mentimeter.com",
        nivel: "Importante",
      },
      {
        nombre: "Edpuzzle",
        desc: "Transforma videos de YouTube en actividades con preguntas automáticas",
        url: "https://edpuzzle.com",
        nivel: "Importante",
      },
      {
        nombre: "Genially",
        desc: "Crea contenidos interactivos animados: presentaciones, infografías, juegos",
        url: "https://genially.com",
        nivel: "Avanzado",
      },
    ] satisfies Herramienta[],
    recursos: [
      {
        tipo: "Guía",
        titulo: "Kahoot! para docentes — primeros pasos",
        url: "https://kahoot.com/schools-u/",
        fuente: "Kahoot oficial",
      },
      {
        tipo: "Video",
        titulo: "Quizizz para profesores — tutorial completo",
        url: "https://www.youtube.com/watch?v=b00Yc_OmTtE",
        fuente: "Quizizz",
      },
      {
        tipo: "Guía",
        titulo: "Canva para Educación — curso gratuito",
        url: "https://www.canva.com/designschool/courses/canva-for-education/",
        fuente: "Canva Design School",
      },
      {
        tipo: "Guía",
        titulo: "Galería de ejemplos educativos en Padlet",
        url: "https://padlet.com/gallery/education",
        fuente: "Padlet",
      },
    ] satisfies Recurso[],
  },
  {
    id: 3,
    icon: Bot,
    title: "Inteligencia Artificial Educativa",
    color: "text-emerald-600",
    badge: "bg-emerald-100 text-emerald-700 border-emerald-200",
    bg: "bg-emerald-50 border-emerald-100",
    tip: 'Prueba este prompt en ChatGPT: "Actúa como docente de inglés y dame 5 actividades para enseñar vocabulario de viajes a nivel B1."',
    herramientas: [
      {
        nombre: "ChatGPT",
        desc: "Genera planeaciones, rúbricas, actividades y retroalimentación en segundos",
        url: "https://chat.openai.com",
        nivel: "Esencial",
      },
      {
        nombre: "Gemini",
        desc: "IA de Google integrada con tus herramientas de Workspace",
        url: "https://gemini.google.com",
        nivel: "Esencial",
      },
      {
        nombre: "Gamma",
        desc: "Crea presentaciones y documentos completos con IA en minutos",
        url: "https://gamma.app",
        nivel: "Importante",
      },
      {
        nombre: "MagicSchool AI",
        desc: "IA diseñada específicamente para docentes: planes, reportes, comunicados",
        url: "https://magicschool.ai",
        nivel: "Importante",
      },
    ] satisfies Herramienta[],
    recursos: [
      {
        tipo: "GitHub",
        titulo: "Colección de prompts para docentes (awesome-chatgpt-prompts)",
        url: "https://github.com/f/awesome-chatgpt-prompts",
        fuente: "GitHub · f/awesome-chatgpt-prompts",
      },
      {
        tipo: "Guía",
        titulo: "Todas las herramientas de MagicSchool AI explicadas",
        url: "https://www.magicschool.ai/tools",
        fuente: "MagicSchool",
      },
      {
        tipo: "Artículo",
        titulo: "Cómo usar ChatGPT para planeación de clases",
        url: "https://www.edutopia.org/article/how-to-use-chatgpt-for-lesson-planning",
        fuente: "Edutopia",
      },
      {
        tipo: "Video",
        titulo: "Gamma.app — crea presentaciones con IA en minutos",
        url: "https://www.youtube.com/watch?v=Y3J0RM9aSaE",
        fuente: "YouTube",
      },
    ] satisfies Recurso[],
  },
  {
    id: 4,
    icon: TrendingUp,
    title: "Productividad Docente",
    color: "text-amber-600",
    badge: "bg-amber-100 text-amber-700 border-amber-200",
    bg: "bg-amber-50 border-amber-100",
    tip: "Usar Google Forms + Sheets juntos te permite tener un registro automático de asistencias, calificaciones y evidencias sin papel.",
    herramientas: [
      {
        nombre: "Google Sheets",
        desc: "Listas de asistencia, calificaciones y evidencias que se actualizan solas",
        url: "https://sheets.google.com",
        nivel: "Esencial",
      },
      {
        nombre: "Google Sites",
        desc: "Crea un portafolio o página de recursos para tus alumnos sin código",
        url: "https://sites.google.com",
        nivel: "Importante",
      },
      {
        nombre: "Notion",
        desc: "Organiza tu planeación docente, recursos y notas en un solo espacio",
        url: "https://notion.so",
        nivel: "Avanzado",
      },
      {
        nombre: "Loom",
        desc: "Graba videos explicativos de tu pantalla para retroalimentación asincrónica",
        url: "https://loom.com",
        nivel: "Avanzado",
      },
      {
        nombre: "Google Keep",
        desc: "Notas rápidas sincronizadas, ideal para ideas de clase al instante",
        url: "https://keep.google.com",
        nivel: "Útil",
      },
    ] satisfies Herramienta[],
    recursos: [
      {
        tipo: "Video",
        titulo: "Google Sheets para registro de calificaciones automático",
        url: "https://www.youtube.com/watch?v=fRhf2W-JKSY",
        fuente: "YouTube",
      },
      {
        tipo: "Guía",
        titulo: "Loom para retroalimentación asincrónica en clase",
        url: "https://www.loom.com/education",
        fuente: "Loom oficial",
      },
      {
        tipo: "Plantilla",
        titulo: "Planeación docente en Notion — plantilla gratuita",
        url: "https://www.notion.so/templates/teacher-lesson-planner",
        fuente: "Notion Templates",
      },
      {
        tipo: "Guía",
        titulo: "Crear tu portafolio con Google Sites en 10 minutos",
        url: "https://support.google.com/sites/answer/6372880",
        fuente: "Google Support",
      },
    ] satisfies Recurso[],
  },
];

// ── Style maps ────────────────────────────────────────────────────────────────

const nivelColors: Record<string, string> = {
  Esencial:   "bg-emerald-100 text-emerald-700 border-emerald-200",
  Importante: "bg-sky-100 text-sky-700 border-sky-200",
  Avanzado:   "bg-teal-100 text-teal-700 border-teal-200",
  Útil:       "bg-amber-100 text-amber-700 border-amber-200",
};

const tipoConfig: Record<TipoRecurso, { icon: React.ElementType; className: string }> = {
  Video:     { icon: Video,    className: "bg-red-50 text-red-600 border-red-200" },
  Guía:      { icon: BookOpen, className: "bg-sky-50 text-sky-700 border-sky-200" },
  GitHub:    { icon: Code2,    className: "bg-slate-100 text-slate-700 border-slate-300" },
  Artículo:  { icon: FileText, className: "bg-emerald-50 text-emerald-600 border-emerald-200" },
  Plantilla: { icon: FileText, className: "bg-amber-50 text-amber-600 border-amber-200" },
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function RecursosPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="glass-nav sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/logo-itsz.svg" alt="ITSZ" width={32} height={32} className="object-contain" />
            <span className="text-sm font-semibold text-foreground hidden sm:block">TICs para Teachers</span>
          </Link>
          <div className="flex items-center gap-2 sm:gap-3">
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground">
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Inicio</span>
              </Button>
            </Link>
            <Link href="/login">
              <Button size="sm" className="bg-teal-600 hover:bg-teal-500 text-white text-xs sm:text-sm px-3 sm:px-4">
                <span className="hidden sm:inline">Hacer mi diagnóstico</span>
                <span className="sm:hidden">Diagnóstico</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero */}
        <div className="mb-12">
          <Badge className="mb-4 bg-teal-100 text-teal-700 border-teal-200">
            Material de la capacitación
          </Badge>
          <h1 className="text-2xl sm:text-4xl font-bold text-foreground mb-3">
            Recursos digitales para docentes
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl">
            Herramientas, tutoriales y material curado para cada módulo de la capacitación.
            Todo lo que necesitas, organizado por tema.
          </p>
        </div>

        {/* Módulos */}
        <div className="space-y-14">
          {modulos.map((mod) => {
            const bgClass = mod.bg.split(" ")[0];
            const borderClass = mod.bg.split(" ")[1];
            return (
              <section key={mod.id}>
                {/* Cabecera del módulo */}
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-10 h-10 rounded-xl ${bgClass} border ${borderClass} flex items-center justify-center`}>
                    <mod.icon className={`w-5 h-5 ${mod.color}`} />
                  </div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-semibold text-foreground">{mod.title}</h2>
                    <Badge className={`${mod.badge} text-xs`}>Módulo {mod.id}</Badge>
                  </div>
                </div>

                {/* Herramientas */}
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2.5">
                  Herramientas
                </p>
                <div className="grid sm:grid-cols-2 gap-3 mb-6">
                  {mod.herramientas.map((h) => (
                    <a
                      key={h.nombre}
                      href={h.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glass-card rounded-xl p-4 flex items-start gap-3 group hover:shadow-md transition-all hover:-translate-y-0.5"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-sm text-foreground group-hover:text-teal-600 transition-colors">
                            {h.nombre}
                          </span>
                          <ExternalLink className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                          <Badge className={`${nivelColors[h.nivel]} text-[10px] ml-auto shrink-0`}>
                            {h.nivel}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">{h.desc}</p>
                      </div>
                    </a>
                  ))}
                </div>

                {/* Para aprender más */}
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" />
                  Para aprender más
                </p>
                <div className="grid sm:grid-cols-2 gap-2.5 mb-5">
                  {mod.recursos.map((r) => {
                    const cfg = tipoConfig[r.tipo];
                    const TipoIcon = cfg.icon;
                    return (
                      <a
                        key={r.titulo}
                        href={r.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-start gap-3 p-3.5 rounded-xl border border-gray-100 bg-white hover:border-teal-200 hover:shadow-sm transition-all"
                      >
                        <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[10px] font-bold whitespace-nowrap shrink-0 mt-0.5 ${cfg.className}`}>
                          <TipoIcon className="w-2.5 h-2.5" />
                          {r.tipo}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground group-hover:text-teal-700 transition-colors leading-snug">
                            {r.titulo}
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5">{r.fuente}</p>
                        </div>
                        <ExternalLink className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-1" />
                      </a>
                    );
                  })}
                </div>

                {/* Tip */}
                <div className={`${mod.bg} rounded-xl p-4 flex items-start gap-3 border`}>
                  <Lightbulb className={`w-4 h-4 ${mod.color} shrink-0 mt-0.5`} />
                  <p className="text-sm text-foreground/80">
                    <span className="font-semibold">Tip para empezar: </span>
                    {mod.tip}
                  </p>
                </div>
              </section>
            );
          })}
        </div>

        {/* Bloque de más recursos (reemplaza lecturasAdicionales) */}
        <section className="mt-14">
          <div className="glass-card rounded-2xl p-6 border border-teal-100/60">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center shrink-0">
                <BookOpen className="w-5 h-5 text-teal-600" />
              </div>
              <div>
                <h2 className="font-bold text-foreground mb-1">¿Quieres profundizar más?</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Estos dos canales tienen material actualizado constantemente sobre tecnología educativa:
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="https://www.youtube.com/@GoogleforEducation"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-50 border border-red-200 text-sm font-semibold text-red-700 hover:bg-red-100 transition-colors"
                  >
                    <Video className="w-4 h-4" />
                    Google for Education — YouTube
                  </a>
                  <a
                    href="https://www.edutopia.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-sm font-semibold text-emerald-700 hover:bg-emerald-100 transition-colors"
                  >
                    <FileText className="w-4 h-4" />
                    Edutopia — Artículos educativos
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="mt-10 glass-card rounded-2xl p-5 sm:p-8 text-center border-teal-100 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-teal-50/80 to-sky-50/60 pointer-events-none rounded-2xl" />
          <div className="relative">
            <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">¿Listo para saber cuál es tu nivel?</h3>
            <p className="text-muted-foreground text-sm mb-5 max-w-md mx-auto">
              Completa tu diagnóstico digital y obtén recomendaciones personalizadas basadas en tu perfil docente.
            </p>
            <Link href="/login">
              <Button className="bg-teal-600 hover:bg-teal-500 text-white px-6 sm:px-8 text-sm shadow-md shadow-teal-200">
                <span className="hidden sm:inline">Hacer mi diagnóstico — 5 minutos</span>
                <span className="sm:hidden">Hacer mi diagnóstico</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border/60 bg-white/60 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Image src="/logo-itsz.svg" alt="ITSZ" width={28} height={28} className="object-contain" />
            <span className="text-xs text-muted-foreground">TICs para Teachers · ITSZ · TecNM</span>
          </div>
          <Link href="/" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
            ← Volver al inicio
          </Link>
        </div>
      </footer>
    </div>
  );
}

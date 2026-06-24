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
} from "lucide-react";

const modulos = [
  {
    id: 1,
    icon: Monitor,
    title: "Google Workspace para Docentes",
    color: "text-sky-600",
    badge: "bg-sky-100 text-sky-700 border-sky-200",
    bg: "bg-sky-50 border-sky-100",
    tip: "Empieza por Google Classroom: crea tu primera clase y sube una tarea esta semana.",
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
    ],
  },
  {
    id: 2,
    icon: Gamepad2,
    title: "Herramientas Interactivas",
    color: "text-indigo-600",
    badge: "bg-indigo-100 text-indigo-700 border-indigo-200",
    bg: "bg-indigo-50 border-indigo-100",
    tip: "Prueba Kahoot o Quizizz en tu próxima clase de repaso — los estudiantes lo amarán.",
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
        nombre: "Genially",
        desc: "Crea contenidos interactivos animados: presentaciones, infografías, juegos",
        url: "https://genially.com",
        nivel: "Avanzado",
      },
    ],
  },
  {
    id: 3,
    icon: Bot,
    title: "Inteligencia Artificial Educativa",
    color: "text-emerald-600",
    badge: "bg-emerald-100 text-emerald-700 border-emerald-200",
    bg: "bg-emerald-50 border-emerald-100",
    tip: 'Pídele a ChatGPT: "Dame 5 actividades para enseñar vocabulario en inglés B1 con gamificación."',
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
    ],
  },
  {
    id: 4,
    icon: TrendingUp,
    title: "Productividad Docente",
    color: "text-amber-600",
    badge: "bg-amber-100 text-amber-700 border-amber-200",
    bg: "bg-amber-50 border-amber-100",
    tip: "Usar Google Forms + Sheets juntos te permite tener un registro automático de asistencias y evidencias.",
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
        nombre: "Google Keep",
        desc: "Notas rápidas sincronizadas, ideal para ideas de clase al instante",
        url: "https://keep.google.com",
        nivel: "Útil",
      },
      {
        nombre: "Loom",
        desc: "Graba videos explicativos de tu pantalla para retroalimentación asincrónica",
        url: "https://loom.com",
        nivel: "Avanzado",
      },
    ],
  },
];

const lecturasAdicionales = [
  {
    icon: Video,
    label: "Video",
    title: "Cómo integrar IA en el salón de clases",
    source: "Google para Educación",
    color: "text-red-500 bg-red-50 border-red-100",
  },
  {
    icon: FileText,
    label: "Guía",
    title: "Manual de Canva para Educación",
    source: "Canva Oficial",
    color: "text-indigo-500 bg-indigo-50 border-indigo-100",
  },
  {
    icon: BookOpen,
    label: "Artículo",
    title: "ChatGPT en el aula: posibilidades y límites éticos",
    source: "Edutopia",
    color: "text-emerald-500 bg-emerald-50 border-emerald-100",
  },
  {
    icon: Video,
    label: "Video",
    title: "Google Workspace para Educación — Tutorial completo",
    source: "YouTube Google",
    color: "text-sky-500 bg-sky-50 border-sky-100",
  },
  {
    icon: Lightbulb,
    label: "Idea",
    title: "Gamificación en el aprendizaje de idiomas",
    source: "ResearchGate",
    color: "text-amber-500 bg-amber-50 border-amber-100",
  },
  {
    icon: BookOpen,
    label: "Artículo",
    title: "Herramientas digitales para evaluación formativa",
    source: "Tecnológico de Monterrey",
    color: "text-indigo-500 bg-indigo-50 border-indigo-100",
  },
];

const nivelColors: Record<string, string> = {
  Esencial: "bg-emerald-100 text-emerald-700 border-emerald-200",
  Importante: "bg-sky-100 text-sky-700 border-sky-200",
  Avanzado: "bg-teal-100 text-teal-700 border-teal-200",
  Útil: "bg-amber-100 text-amber-700 border-amber-200",
};

export default function RecursosPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="glass-nav sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <Image
              src="/logo-itsz.svg"
              alt="ITSZ"
              width={32}
              height={32}
              className="object-contain"
            />
            <span className="text-sm font-semibold text-foreground hidden sm:block">
              TICs para Teachers
            </span>
          </Link>
          <div className="flex items-center gap-2 sm:gap-3">
            <Link href="/">
              <Button
                variant="ghost"
                size="sm"
                className="gap-1.5 text-muted-foreground"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Inicio</span>
              </Button>
            </Link>
            <Link href="/login">
              <Button
                size="sm"
                className="bg-teal-600 hover:bg-teal-500 text-white text-xs sm:text-sm px-3 sm:px-4"
              >
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
            Aquí encontrarás todas las herramientas que exploraremos en la
            capacitación, con links directos y tips de uso para tu clase de
            idiomas.
          </p>
        </div>

        {/* Módulos */}
        <div className="space-y-10">
          {modulos.map((mod) => (
            <section key={mod.id}>
              {/* Cabecera del módulo */}
              <div className="flex items-center gap-3 mb-5">
                <div
                  className={`w-10 h-10 rounded-xl ${mod.bg.split(" ")[0]} border ${mod.bg.split(" ")[1]} flex items-center justify-center`}
                >
                  <mod.icon className={`w-5 h-5 ${mod.color}`} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-semibold text-foreground">
                      {mod.title}
                    </h2>
                    <Badge className={`${mod.badge} text-xs`}>
                      Módulo {mod.id}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Grid de herramientas */}
              <div className="grid sm:grid-cols-2 gap-3 mb-4">
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
                        <Badge
                          className={`${nivelColors[h.nivel]} text-[10px] ml-auto shrink-0`}
                        >
                          {h.nivel}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {h.desc}
                      </p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Tip */}
              <div
                className={`${mod.bg} rounded-xl p-4 flex items-start gap-3 border`}
              >
                <Lightbulb className={`w-4 h-4 ${mod.color} shrink-0 mt-0.5`} />
                <p className="text-sm text-foreground/80">
                  <span className="font-semibold">Tip para empezar: </span>
                  {mod.tip}
                </p>
              </div>
            </section>
          ))}
        </div>

        {/* Lecturas adicionales */}
        <section className="mt-14">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Lecturas y videos adicionales
            </h2>
            <p className="text-muted-foreground text-sm">
              Material complementario para profundizar en cada tema.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {lecturasAdicionales.map((item) => (
              <div
                key={item.title}
                className={`glass-card rounded-xl p-4 border ${item.color.split(" ")[1]} ${item.color.split(" ")[2]}`}
              >
                <div
                  className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold border mb-3 ${item.color}`}
                >
                  <item.icon className="w-3 h-3" />
                  {item.label}
                </div>
                <p className="text-sm font-medium text-foreground leading-snug mb-1">
                  {item.title}
                </p>
                <p className="text-xs text-muted-foreground">{item.source}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="mt-14 glass-card rounded-2xl p-5 sm:p-8 text-center border-teal-100 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-teal-50/80 to-sky-50/60 pointer-events-none rounded-2xl" />
          <div className="relative">
            <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">
              ¿Listo para saber cuál es tu nivel?
            </h3>
            <p className="text-muted-foreground text-sm mb-5 max-w-md mx-auto">
              Completa tu diagnóstico digital y obtén recomendaciones
              personalizadas basadas en tu perfil.
            </p>
            <Link href="/login">
              <Button className="bg-teal-600 hover:bg-teal-500 text-white px-6 sm:px-8 text-sm shadow-md shadow-teal-200">
                <span className="hidden sm:inline">
                  Hacer mi diagnóstico — 5 minutos
                </span>
                <span className="sm:hidden">Hacer mi diagnóstico</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border/60 bg-white/60 mt-16">
        <div className="w-full overflow-hidden h-12">
          <Image
            src="/pleca_tecnm.jpg"
            alt="TecNM"
            width={1440}
            height={48}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Image
              src="/logo-itsz.svg"
              alt="ITSZ"
              width={28}
              height={28}
              className="object-contain"
            />
            <span className="text-xs text-muted-foreground">
              TICs para Teachers · ITSZ · TecNM
            </span>
          </div>
          <Link
            href="/"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Volver al inicio
          </Link>
        </div>
      </footer>
    </div>
  );
}

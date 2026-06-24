import type { ElementType } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@supabase/supabase-js";
import { PerfilCharts } from "./perfil-charts";
import {
  CheckCircle2,
  User,
  Monitor,
  Gamepad2,
  Bot,
  TrendingUp,
  Star,
  Home,
  Zap,
  Clock,
  MessageSquare,
} from "lucide-react";

// ── Label maps (match /registro questions) ──────────────────────────────────

const NIVEL_LABELS = ["Sin uso aún", "Básico", "Frecuente", "Avanzado"];
const NIVEL_COLORS = [
  "bg-slate-100 text-slate-600 border-slate-200",
  "bg-sky-100 text-sky-700 border-sky-200",
  "bg-teal-100 text-teal-700 border-teal-200",
  "bg-emerald-100 text-emerald-700 border-emerald-200",
];

const GOOGLE_ACTIVIDADES_LABELS: Record<string, string> = {
  classroom: "Google Classroom",
  forms: "Google Forms",
  drive: "Google Drive",
  meet: "Google Meet",
  calendar: "Google Calendar",
  ninguna: "Ninguna por ahora",
};

const IA_ACTIVIDADES_LABELS: Record<string, string> = {
  planeacion: "Planeación de clase",
  actividades: "Diseño de actividades",
  examenes: "Elaboración de exámenes",
  presentaciones: "Materiales visuales",
  rubricas: "Rúbricas de evaluación",
  retroalimentacion: "Retroalimentación",
  ninguna: "Aún no la uso",
};

const ACTIVIDAD_CONSUME_LABELS: Record<string, string> = {
  planeacion: "Planeación de clases",
  calificacion: "Calificación y evaluación",
  evidencias: "Organización de evidencias",
  materiales: "Elaboración de materiales",
  comunicacion: "Comunicación con estudiantes",
  reportes: "Elaboración de reportes",
};

// ── Sub-components ────────────────────────────────────────────────────────────

function NivelBadge({ value }: { value: number }) {
  const v = Math.min(3, Math.max(0, value));
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full border text-xs font-semibold ${NIVEL_COLORS[v]}`}
    >
      {NIVEL_LABELS[v]}
    </span>
  );
}

function Chip({ label, color = "teal" }: { label: string; color?: string }) {
  const styles: Record<string, string> = {
    teal: "bg-teal-50 border-teal-200 text-teal-700",
    blue: "bg-blue-50 border-blue-200 text-blue-700",
    purple: "bg-purple-50 border-purple-200 text-purple-700",
    emerald: "bg-emerald-50 border-emerald-200 text-emerald-700",
    amber: "bg-amber-50 border-amber-200 text-amber-700",
    slate: "bg-slate-100 border-slate-200 text-slate-500 italic",
  };
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full border text-xs font-medium ${styles[color] ?? styles.teal}`}
    >
      {label}
    </span>
  );
}

function ModuleCard({
  icon: Icon,
  title,
  iconColor,
  headerBg,
  level,
  chipColor,
  chips,
  chipLabel,
}: {
  icon: ElementType;
  title: string;
  iconColor: string;
  headerBg: string;
  level: number;
  chipColor: string;
  chips: string[];
  chipLabel: string;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div
        className={`${headerBg} px-4 py-3 flex items-center justify-between`}
      >
        <div className="flex items-center gap-2">
          <Icon className={`w-4 h-4 ${iconColor}`} />
          <span className="text-sm font-bold text-gray-800">{title}</span>
        </div>
        <NivelBadge value={level} />
      </div>
      <div className="px-4 py-3">
        <p className="text-xs text-gray-400 mb-2">{chipLabel}</p>
        <div className="flex flex-wrap gap-1.5">
          {chips.length > 0 ? (
            chips
              .filter((c) => c !== "ninguna")
              .map((c) => <Chip key={c} label={c} color={chipColor} />)
          ) : (
            <Chip label="Ninguna por ahora" color="slate" />
          )}
          {chips.includes("ninguna") && (
            <Chip label="Ninguna por ahora" color="slate" />
          )}
        </div>
      </div>
    </div>
  );
}

// ── Recommendations ────────────────────────────────────────────────────────────

function getRecomendaciones(data: {
  google_nivel: number;
  herramientas_frecuencia: number;
  herramientas_conocidas: string[];
  ia_comodidad: number;
  ia_actividades: string[];
  productividad_nivel: number;
}): string[] {
  const recs: string[] = [];
  const ningunaIA =
    data.ia_actividades?.length === 1 && data.ia_actividades[0] === "ninguna";

  if (data.google_nivel < 2)
    recs.push(
      "Comienza con Google Classroom y Forms — son el núcleo del aula digital y se aprenden en una tarde.",
    );
  if (ningunaIA || data.ia_comodidad === 0)
    recs.push(
      "Prueba ChatGPT una vez para preparar tu próxima planeación — en 10 minutos verás el potencial.",
    );
  if ((data.herramientas_conocidas?.length ?? 0) < 3)
    recs.push(
      "Incorpora Kahoot o Canva a tu próxima clase — el impacto en participación es inmediato.",
    );
  if (data.productividad_nivel < 2)
    recs.push(
      "Organiza tus materiales en Google Drive con carpetas por unidad — recuperarás horas cada semana.",
    );
  if (data.ia_comodidad >= 2 && data.google_nivel >= 2)
    recs.push(
      "Tienes una base digital sólida. Explora Gamma o MagicSchool para crear materiales con IA avanzada.",
    );
  if (recs.length === 0)
    recs.push(
      "¡Perfil digital muy avanzado! Considera ser mentor de colegas y explorar integraciones avanzadas de IA en evaluación formativa.",
    );

  return recs.slice(0, 3);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default async function PerfilPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } },
  );

  const { data, error } = await supabase
    .from("diagnosticos")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) notFound();

  // Use new columns with fallback to 0 / []
  const googleNivel = Number(data.google_nivel ?? 0);
  const googleActividades = (data.google_actividades as string[]) ?? [];
  const herramientasConocidas = (data.herramientas_conocidas as string[]) ?? [];
  const herramientasFrecuencia = Number(data.herramientas_frecuencia ?? 0);
  const iaActividades = (data.ia_actividades as string[]) ?? [];
  const iaComodidad = Number(data.ia_comodidad ?? 0);
  const productividadNivel = Number(data.productividad_nivel ?? 0);
  const actividadConsume = data.actividad_consume as string | null;
  const problemaResolver = data.problema_resolver as string | null;
  const expectativas = data.expectativas as string | null;

  // Overall digital index (average of 4 module levels, max 3 each)
  const overallAvg =
    (googleNivel + herramientasFrecuencia + iaComodidad + productividadNivel) /
    4;
  const overallPct = Math.round((overallAvg / 3) * 100);
  const overallLabel =
    overallAvg < 0.75
      ? "Principiante Digital"
      : overallAvg < 1.5
        ? "En Desarrollo"
        : overallAvg < 2.25
          ? "Competente Digital"
          : "Docente Digital Avanzado";

  const recomendaciones = getRecomendaciones({
    google_nivel: googleNivel,
    herramientas_frecuencia: herramientasFrecuencia,
    herramientas_conocidas: herramientasConocidas,
    ia_comodidad: iaComodidad,
    ia_actividades: iaActividades,
    productividad_nivel: productividadNivel,
  });

  // Google activities → readable labels (filter 'ninguna')
  const googleChips = googleActividades
    .filter((v) => v !== "ninguna")
    .map((v) => GOOGLE_ACTIVIDADES_LABELS[v] ?? v);

  // IA activities → readable labels
  const iaChips = iaActividades
    .filter((v) => v !== "ninguna")
    .map((v) => IA_ACTIVIDADES_LABELS[v] ?? v);

  return (
    <div
      className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6"
      style={{ fontFamily: "var(--font-nunito), sans-serif" }}
    >
      <div className="max-w-3xl mx-auto">
        {/* ── Header ── */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2.5">
            <Image
              src="/logo-itsz.svg"
              alt="ITSZ"
              width={28}
              height={28}
              className="object-contain"
            />
            <span className="text-sm text-gray-400 font-medium hidden sm:block">
              TICs para Teachers · Perfil Docente
            </span>
            <span className="text-sm text-gray-400 font-medium sm:hidden">
              Perfil Docente
            </span>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-600 hover:border-teal-300 hover:text-teal-700 transition-colors"
          >
            <Home className="w-4 h-4" />
            <span className="hidden sm:inline">Inicio</span>
          </Link>
        </div>

        {/* ── Hero card ── */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-md overflow-hidden mb-6">
          <div className="h-2 bg-gradient-to-r from-teal-500 to-sky-400" />
          <div className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              {/* Avatar */}
              <div className="shrink-0">
                {data.avatar_url ? (
                  <Image
                    src={data.avatar_url}
                    alt={data.nombre}
                    width={64}
                    height={64}
                    className="w-16 h-16 rounded-2xl object-cover ring-2 ring-teal-100"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center">
                    <User className="w-8 h-8 text-teal-400" />
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-teal-50 border border-teal-200 text-teal-700 text-xs font-semibold">
                    <Star className="w-3 h-3 fill-teal-500 text-teal-500" />
                    {overallLabel}
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-xs font-semibold">
                    {data.academia}
                  </span>
                </div>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-gray-900 break-words">
                  {data.nombre}
                </h1>
                <p className="text-gray-400 text-sm mt-1">
                  {data.campus} · {data.materias}
                  {data.anos_experiencia > 0 &&
                    ` · ${data.anos_experiencia} años de experiencia`}
                </p>
              </div>

              {/* Digital index */}
              <div className="text-center shrink-0 sm:self-center">
                <div className="text-3xl sm:text-4xl font-black text-teal-600">
                  {overallPct}%
                </div>
                <div className="text-xs text-gray-400 mt-0.5">
                  Índice Digital
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Charts ── */}
        <PerfilCharts
          googleNivel={googleNivel}
          herramientasFrecuencia={herramientasFrecuencia}
          iaComodidad={iaComodidad}
          productividadNivel={productividadNivel}
        />

        {/* ── Module cards ── */}
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <ModuleCard
            icon={Monitor}
            title="Google Workspace"
            iconColor="text-blue-600"
            headerBg="bg-blue-50"
            level={googleNivel}
            chipColor="blue"
            chipLabel="Herramientas que ya usas en clase"
            chips={googleChips.length > 0 ? googleChips : []}
          />

          <ModuleCard
            icon={Gamepad2}
            title="Herramientas Interactivas"
            iconColor="text-purple-600"
            headerBg="bg-purple-50"
            level={herramientasFrecuencia}
            chipColor="purple"
            chipLabel="Herramientas que conoces"
            chips={herramientasConocidas}
          />

          <ModuleCard
            icon={Bot}
            title="Inteligencia Artificial"
            iconColor="text-emerald-600"
            headerBg="bg-emerald-50"
            level={iaComodidad}
            chipColor="emerald"
            chipLabel="La uso para..."
            chips={iaChips}
          />

          {/* Productividad card (manual — different structure) */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="bg-amber-50 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-amber-600" />
                <span className="text-sm font-bold text-gray-800">
                  Productividad Digital
                </span>
              </div>
              <NivelBadge value={productividadNivel} />
            </div>
            <div className="px-4 py-3">
              <p className="text-xs text-gray-400 mb-2">
                Actividad que más tiempo le consume
              </p>
              {actividadConsume ? (
                <Chip
                  label={
                    ACTIVIDAD_CONSUME_LABELS[actividadConsume] ??
                    actividadConsume
                  }
                  color="amber"
                />
              ) : (
                <Chip label="No especificada" color="slate" />
              )}
            </div>
          </div>
        </div>

        {/* ── Recomendaciones ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 className="w-5 h-5 text-teal-600" />
            <h2 className="font-bold text-gray-900">
              Recomendaciones personalizadas
            </h2>
          </div>
          <div className="space-y-3">
            {recomendaciones.map((rec, i) => (
              <div
                key={i}
                className="flex gap-3 items-start p-3 rounded-xl bg-teal-50 border border-teal-100"
              >
                <div className="w-5 h-5 rounded-full bg-teal-200 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-teal-700">
                    {i + 1}
                  </span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">{rec}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Respuestas libres ── */}
        {(expectativas || problemaResolver || actividadConsume) && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare className="w-5 h-5 text-sky-500" />
              <h2 className="font-bold text-gray-900">Lo que comentaste</h2>
            </div>
            <div className="space-y-4">
              {actividadConsume && (
                <div>
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-500" />
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      Lo que más tiempo te consume
                    </p>
                  </div>
                  <Chip
                    label={
                      ACTIVIDAD_CONSUME_LABELS[actividadConsume] ??
                      actividadConsume
                    }
                    color="amber"
                  />
                </div>
              )}
              {expectativas && (
                <div>
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <Zap className="w-3.5 h-3.5 text-teal-500" />
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      Expectativas de la capacitación
                    </p>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed italic">
                    &ldquo;{expectativas}&rdquo;
                  </p>
                </div>
              )}
              {problemaResolver && (
                <div>
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-500" />
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      Problema que quiere resolver con tecnología
                    </p>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed italic">
                    &ldquo;{problemaResolver}&rdquo;
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── CTA ── */}
        <div className="text-center py-6 border-t border-gray-100">
          <p className="text-gray-400 text-sm mb-4 max-w-sm mx-auto">
            ¡Nos vemos en la capacitación! Hemos preparado contenido
            especialmente para tu perfil.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-600 hover:border-teal-300 hover:text-teal-700 transition-colors"
          >
            <Home className="w-4 h-4" />
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}

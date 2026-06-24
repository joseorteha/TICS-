"use client";

interface StatsData {
  total: number;
  rows: Record<string, unknown>[];
  por_campus: Record<string, number>;
  por_academia: Record<string, number>;
  promedio_google: number;
  promedio_interactivas: number;
  promedio_ia: number;
  promedio_productividad: number;
  herramientas: Record<string, number>;
  herramienta_mas_usada: string;
  herramienta_menos_usada: string;
  principal_reto_frecuente: string;
}

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
} from "recharts";
import {
  Users,
  TrendingUp,
  Brain,
  Monitor,
  Gamepad2,
  Bot,
  GraduationCap,
  Home,
  Lock,
  Unlock,
  RefreshCw,
  BarChart3,
  ArrowUpRight,
} from "lucide-react";

const NIVEL_LABELS = ["Nunca", "Básico", "Intermedio", "Experto"];
const MODULE_COLORS = ["#60a5fa", "#a78bfa", "#34d399", "#fbbf24"];
const PIE_COLORS = [
  "#7c3aed",
  "#2563eb",
  "#059669",
  "#d97706",
  "#dc2626",
  "#7c3aed",
];

function StatCard({
  title,
  value,
  sub,
  icon: Icon,
  color,
}: {
  title: string;
  value: string | number;
  sub?: string;
  icon: React.ElementType;
  color: string;
}) {
  return (
    <Card className="border-border/50 bg-card">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs text-muted-foreground mb-1">{title}</p>
            <p className="text-2xl font-bold text-foreground">{value}</p>
            {sub && <p className="text-xs text-muted-foreground mt-1">{sub}</p>}
          </div>
          <div
            className={`w-9 h-9 rounded-lg flex items-center justify-center ${color}`}
          >
            <Icon className="w-4.5 h-4.5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

const PASSWORD = process.env.NEXT_PUBLIC_DASHBOARD_PASSWORD || "admin2025";

export default function DashboardPage() {
  const [authed, setAuthed] = useState(false);
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState("");
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(false);

  function login() {
    if (pwd === PASSWORD) {
      setAuthed(true);
      setError("");
    } else setError("Contraseña incorrecta");
  }

  async function loadStats() {
    setLoading(true);
    try {
      const res = await fetch("/api/stats");
      const data = await res.json();
      setStats(data);
    } catch {
      setStats(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (authed) loadStats();
  }, [authed]);

  if (!authed) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <Card className="w-full max-w-sm border-border/50 bg-card">
          <CardHeader className="text-center">
            <div className="w-12 h-12 rounded-xl bg-teal-500/20 border border-violet-500/30 flex items-center justify-center mx-auto mb-3">
              <Lock className="w-6 h-6 text-violet-400" />
            </div>
            <CardTitle>Dashboard del Facilitador</CardTitle>
            <CardDescription>
              Ingresa la contraseña para acceder al panel de análisis
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              type="password"
              placeholder="Contraseña"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && login()}
              className="bg-secondary/30 border-border/60"
            />
            {error && <p className="text-xs text-destructive">{error}</p>}
            <Button
              onClick={login}
              className="w-full bg-teal-600 hover:bg-teal-500 text-white"
            >
              <Unlock className="w-4 h-4 mr-2" />
              Ingresar
            </Button>
            <Link href="/" className="block text-center">
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground w-full"
              >
                <Home className="w-3.5 h-3.5 mr-1.5" />
                Volver al inicio
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const total = stats?.total || 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shrink-0">
                <GraduationCap className="w-4 h-4 text-white" />
              </div>
              <div className="min-w-0">
                <span className="font-semibold text-foreground text-sm truncate">
                  Dashboard
                </span>
                <span className="hidden sm:inline ml-1 text-xs text-muted-foreground">
                  · TICs para Teachers
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={loadStats}
                disabled={loading}
                className="border-border/60"
              >
                <RefreshCw
                  className={`w-3.5 h-3.5 sm:mr-1.5 ${loading ? "animate-spin" : ""}`}
                />
                <span className="hidden sm:inline">Actualizar</span>
              </Button>
              <Link href="/">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground"
                >
                  <Home className="w-4 h-4 sm:mr-1.5" />
                  <span className="hidden sm:inline">Inicio</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {loading && !stats && (
          <div className="flex items-center justify-center py-20">
            <RefreshCw className="w-6 h-6 text-muted-foreground animate-spin mr-3" />
            <span className="text-muted-foreground">Cargando datos...</span>
          </div>
        )}

        {stats && total === 0 && (
          <Card className="border-border/50 bg-card">
            <CardContent className="text-center py-20">
              <Users className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
              <p className="text-muted-foreground">
                Aún no hay participantes registrados.
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Comparte el enlace para comenzar a recibir diagnósticos.
              </p>
            </CardContent>
          </Card>
        )}

        {stats && total > 0 && (
          <>
            {/* KPI Cards */}
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-4">
                Resumen general
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                  title="Total participantes"
                  value={total}
                  sub="Diagnósticos completados"
                  icon={Users}
                  color="bg-teal-500/10 text-violet-400"
                />
                <StatCard
                  title="Nivel Google Workspace"
                  value={NIVEL_LABELS[Math.round(stats.promedio_google)] || "—"}
                  sub={`Promedio: ${stats.promedio_google.toFixed(2)}/3`}
                  icon={Monitor}
                  color="bg-blue-500/10 text-blue-400"
                />
                <StatCard
                  title="Nivel IA"
                  value={NIVEL_LABELS[Math.round(stats.promedio_ia)] || "—"}
                  sub={`Promedio: ${stats.promedio_ia.toFixed(2)}/3`}
                  icon={Brain}
                  color="bg-emerald-500/10 text-emerald-400"
                />
                <StatCard
                  title="Reto más común"
                  value={
                    stats.principal_reto_frecuente?.replace("_", " ") || "—"
                  }
                  sub="Necesidad principal"
                  icon={TrendingUp}
                  color="bg-amber-500/10 text-amber-400"
                />
              </div>
            </div>

            {/* Nivel promedio por módulo */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="border-border/50 bg-card">
                <CardHeader>
                  <CardTitle className="text-sm flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-violet-400" />
                    Nivel promedio por módulo
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={220}>
                    <BarChart
                      data={[
                        {
                          name: "Google",
                          value: +(stats.promedio_google * 33.33).toFixed(1),
                        },
                        {
                          name: "Interactivas",
                          value: +(stats.promedio_interactivas * 33.33).toFixed(
                            1,
                          ),
                        },
                        {
                          name: "IA",
                          value: +(stats.promedio_ia * 33.33).toFixed(1),
                        },
                        {
                          name: "Productividad",
                          value: +(
                            stats.promedio_productividad * 33.33
                          ).toFixed(1),
                        },
                      ]}
                      margin={{ top: 5, right: 10, bottom: 5, left: -10 }}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="rgba(255,255,255,0.05)"
                      />
                      <XAxis
                        dataKey="name"
                        tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }}
                      />
                      <YAxis
                        tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }}
                        domain={[0, 100]}
                        unit="%"
                      />
                      <Tooltip
                        contentStyle={{
                          background: "#18181b",
                          border: "1px solid rgba(255,255,255,0.1)",
                          borderRadius: 8,
                        }}
                        labelStyle={{ color: "white", fontSize: 12 }}
                        formatter={(v) => [`${v}%`, "Índice"]}
                      />
                      <Bar dataKey="value" fill="#7c3aed" radius={[4, 4, 0, 0]}>
                        {[0, 1, 2, 3].map((i) => (
                          <Cell key={i} fill={MODULE_COLORS[i]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Radar de competencias colectivas */}
              <Card className="border-border/50 bg-card">
                <CardHeader>
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Bot className="w-4 h-4 text-violet-400" />
                    Competencias colectivas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={220}>
                    <RadarChart
                      data={[
                        {
                          subject: "Google",
                          A: +(stats.promedio_google * 33.33).toFixed(1),
                        },
                        {
                          subject: "Interactivas",
                          A: +(stats.promedio_interactivas * 33.33).toFixed(1),
                        },
                        {
                          subject: "IA",
                          A: +(stats.promedio_ia * 33.33).toFixed(1),
                        },
                        {
                          subject: "Productividad",
                          A: +(stats.promedio_productividad * 33.33).toFixed(1),
                        },
                      ]}
                    >
                      <PolarGrid stroke="rgba(255,255,255,0.08)" />
                      <PolarAngleAxis
                        dataKey="subject"
                        tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }}
                      />
                      <Radar
                        dataKey="A"
                        stroke="#7c3aed"
                        fill="#7c3aed"
                        fillOpacity={0.25}
                      />
                      <Tooltip
                        contentStyle={{
                          background: "#18181b",
                          border: "1px solid rgba(255,255,255,0.1)",
                          borderRadius: 8,
                        }}
                        formatter={(v) => [`${v}%`, "Índice"]}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Distribución por campus y academia */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Por campus */}
              {Object.keys(stats.por_campus || {}).length > 0 && (
                <Card className="border-border/50 bg-card">
                  <CardHeader>
                    <CardTitle className="text-sm">
                      Distribución por campus
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={220}>
                      <PieChart>
                        <Pie
                          data={Object.entries(stats.por_campus).map(
                            ([name, value]) => ({ name, value }),
                          )}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          dataKey="value"
                          label={({
                            name,
                            percent,
                          }: {
                            name?: string;
                            percent?: number;
                          }) =>
                            `${name ?? ""} ${((percent ?? 0) * 100).toFixed(0)}%`
                          }
                          labelLine={false}
                        >
                          {Object.keys(stats.por_campus).map((_, i) => (
                            <Cell
                              key={i}
                              fill={PIE_COLORS[i % PIE_COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            background: "#18181b",
                            border: "1px solid rgba(255,255,255,0.1)",
                            borderRadius: 8,
                          }}
                          labelStyle={{ color: "white", fontSize: 12 }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              )}

              {/* Nivel por herramienta */}
              {stats.herramientas && (
                <Card className="border-border/50 bg-card">
                  <CardHeader>
                    <CardTitle className="text-sm">
                      Top herramientas — nivel promedio
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2.5">
                    {Object.entries(
                      stats.herramientas as Record<string, number>,
                    )
                      .sort(([, a], [, b]) => b - a)
                      .slice(0, 8)
                      .map(([name, value]) => (
                        <div key={name} className="flex items-center gap-3">
                          <span className="text-xs text-muted-foreground w-28 shrink-0 truncate">
                            {name}
                          </span>
                          <div className="flex-1 h-1.5 rounded-full bg-secondary overflow-hidden">
                            <div
                              className="h-full rounded-full bg-teal-500"
                              style={{ width: `${(value / 3) * 100}%` }}
                            />
                          </div>
                          <span className="text-xs text-foreground/60 w-14 text-right shrink-0">
                            {NIVEL_LABELS[Math.round(value)]}
                          </span>
                        </div>
                      ))}
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Tabla de participantes */}
            <Card className="border-border/50 bg-card">
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <Users className="w-4 h-4 text-violet-400" />
                  Participantes ({total})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground mb-3 sm:hidden">
                  ← Desliza para ver más →
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border/50">
                        <th className="text-left py-2 px-3 text-xs text-muted-foreground font-medium whitespace-nowrap">
                          Nombre
                        </th>
                        <th className="text-left py-2 px-3 text-xs text-muted-foreground font-medium whitespace-nowrap">
                          Campus
                        </th>
                        <th className="text-left py-2 px-3 text-xs text-muted-foreground font-medium whitespace-nowrap">
                          Academia
                        </th>
                        <th className="text-center py-2 px-3 text-xs text-muted-foreground font-medium whitespace-nowrap">
                          Google
                        </th>
                        <th className="text-center py-2 px-3 text-xs text-muted-foreground font-medium whitespace-nowrap">
                          Interactivas
                        </th>
                        <th className="text-center py-2 px-3 text-xs text-muted-foreground font-medium whitespace-nowrap">
                          IA
                        </th>
                        <th className="text-center py-2 px-3 text-xs text-muted-foreground font-medium whitespace-nowrap">
                          Productividad
                        </th>
                        <th className="text-center py-2 px-3 text-xs text-muted-foreground font-medium whitespace-nowrap">
                          Perfil
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {(stats.rows as Record<string, unknown>[])?.map((row) => {
                        const g =
                          +(
                            [
                              row.google_classroom,
                              row.google_forms,
                              row.google_drive,
                              row.google_meet,
                              row.google_calendar,
                            ] as number[]
                          ).reduce((a, b) => a + b, 0) / 5;
                        const h =
                          +(
                            [
                              row.canva,
                              row.kahoot,
                              row.quizizz,
                              row.padlet,
                              row.mentimeter,
                              row.genially,
                            ] as number[]
                          ).reduce((a, b) => a + b, 0) / 6;
                        const ia =
                          +(
                            [
                              row.chatgpt,
                              row.gemini,
                              row.gamma,
                              row.magicschool,
                            ] as number[]
                          ).reduce((a, b) => a + b, 0) / 4;
                        const p =
                          +(
                            [
                              row.planeacion,
                              row.gestion_evidencias,
                              row.automatizacion,
                              row.retroalimentacion,
                              row.organizacion_digital,
                            ] as number[]
                          ).reduce((a, b) => a + b, 0) / 5;
                        return (
                          <tr
                            key={row.id as string}
                            className="border-b border-border/30 hover:bg-secondary/20 transition-colors"
                          >
                            <td className="py-2.5 px-3 font-medium text-foreground whitespace-nowrap">
                              {row.nombre as string}
                            </td>
                            <td className="py-2.5 px-3 text-muted-foreground text-xs whitespace-nowrap">
                              {row.campus as string}
                            </td>
                            <td className="py-2.5 px-3 text-muted-foreground text-xs whitespace-nowrap">
                              {row.academia as string}
                            </td>
                            <td className="py-2.5 px-3 text-center">
                              <span className="text-xs text-blue-300">
                                {NIVEL_LABELS[Math.round(g)]}
                              </span>
                            </td>
                            <td className="py-2.5 px-3 text-center">
                              <span className="text-xs text-violet-300">
                                {NIVEL_LABELS[Math.round(h)]}
                              </span>
                            </td>
                            <td className="py-2.5 px-3 text-center">
                              <span className="text-xs text-emerald-300">
                                {NIVEL_LABELS[Math.round(ia)]}
                              </span>
                            </td>
                            <td className="py-2.5 px-3 text-center">
                              <span className="text-xs text-amber-300">
                                {NIVEL_LABELS[Math.round(p)]}
                              </span>
                            </td>
                            <td className="py-2.5 px-3 text-center">
                              <Link href={`/perfil/${row.id as string}`}>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 px-2 text-xs text-muted-foreground hover:text-foreground"
                                >
                                  Ver
                                  <ArrowUpRight className="w-3 h-3 ml-1" />
                                </Button>
                              </Link>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </main>
    </div>
  );
}

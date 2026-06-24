-- TICs para Teachers — Schema
-- Ejecutar en el SQL Editor de Supabase

CREATE TABLE IF NOT EXISTS diagnosticos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  -- Datos personales
  nombre TEXT NOT NULL,
  email TEXT NOT NULL,
  avatar_url TEXT,
  campus TEXT NOT NULL,
  academia TEXT NOT NULL,
  materias TEXT NOT NULL,
  anos_experiencia INTEGER NOT NULL DEFAULT 0,
  -- Módulo 1: Google Workspace (0=Nunca, 1=Básico, 2=Intermedio, 3=Experto)
  google_classroom INTEGER NOT NULL DEFAULT 0,
  google_forms INTEGER NOT NULL DEFAULT 0,
  google_drive INTEGER NOT NULL DEFAULT 0,
  google_meet INTEGER NOT NULL DEFAULT 0,
  google_calendar INTEGER NOT NULL DEFAULT 0,
  -- Módulo 2: Herramientas Interactivas
  canva INTEGER NOT NULL DEFAULT 0,
  kahoot INTEGER NOT NULL DEFAULT 0,
  quizizz INTEGER NOT NULL DEFAULT 0,
  padlet INTEGER NOT NULL DEFAULT 0,
  mentimeter INTEGER NOT NULL DEFAULT 0,
  genially INTEGER NOT NULL DEFAULT 0,
  -- Módulo 3: Inteligencia Artificial
  chatgpt INTEGER NOT NULL DEFAULT 0,
  gemini INTEGER NOT NULL DEFAULT 0,
  gamma INTEGER NOT NULL DEFAULT 0,
  magicschool INTEGER NOT NULL DEFAULT 0,
  -- Módulo 4: Productividad Docente
  planeacion INTEGER NOT NULL DEFAULT 0,
  gestion_evidencias INTEGER NOT NULL DEFAULT 0,
  automatizacion INTEGER NOT NULL DEFAULT 0,
  retroalimentacion INTEGER NOT NULL DEFAULT 0,
  organizacion_digital INTEGER NOT NULL DEFAULT 0,
  -- Preguntas estratégicas
  principal_reto TEXT,
  herramientas_aprender TEXT[],
  expectativas TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Deshabilitar RLS para acceso público (ajustar en producción)
ALTER TABLE diagnosticos DISABLE ROW LEVEL SECURITY;

-- Migración: columnas legacy
ALTER TABLE diagnosticos ADD COLUMN IF NOT EXISTS avatar_url TEXT;

-- Migración: nuevas columnas (formato de diagnóstico v2)
ALTER TABLE diagnosticos ADD COLUMN IF NOT EXISTS google_nivel            INTEGER  DEFAULT 0;
ALTER TABLE diagnosticos ADD COLUMN IF NOT EXISTS google_actividades      TEXT[]   DEFAULT '{}';
ALTER TABLE diagnosticos ADD COLUMN IF NOT EXISTS herramientas_conocidas  TEXT[]   DEFAULT '{}';
ALTER TABLE diagnosticos ADD COLUMN IF NOT EXISTS herramientas_frecuencia INTEGER  DEFAULT 0;
ALTER TABLE diagnosticos ADD COLUMN IF NOT EXISTS ia_actividades          TEXT[]   DEFAULT '{}';
ALTER TABLE diagnosticos ADD COLUMN IF NOT EXISTS ia_comodidad            INTEGER  DEFAULT 0;
ALTER TABLE diagnosticos ADD COLUMN IF NOT EXISTS productividad_nivel     INTEGER  DEFAULT 0;
ALTER TABLE diagnosticos ADD COLUMN IF NOT EXISTS actividad_consume       TEXT;
ALTER TABLE diagnosticos ADD COLUMN IF NOT EXISTS problema_resolver       TEXT;

-- Índices
CREATE INDEX IF NOT EXISTS idx_diagnosticos_email ON diagnosticos(email);
CREATE INDEX IF NOT EXISTS idx_diagnosticos_campus ON diagnosticos(campus);
CREATE INDEX IF NOT EXISTS idx_diagnosticos_created_at ON diagnosticos(created_at DESC);

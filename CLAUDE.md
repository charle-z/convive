# CONVIVE — Proyecto Hackathon CubePath 2026

## Qué es esto
Plataforma de compatibilidad para convivencia compartida. Motor de matching de roomies, NO un portal de anuncios.
Pitch: "Elige con quién vivir antes de descubrir que fue un error."
Hackathon deadline: 31 marzo 2026, 23:59:59 CET.

## Stack
- Next.js 14 (App Router) + TypeScript
- Tailwind CSS + shadcn/ui
- Framer Motion (animaciones)
- Lucide React (iconos)
- Fonts: Outfit (headings) + Space Mono (scores/datos)
- Sin DB: seed data en JSON
- Sin auth real: flujo simulado
- Deploy: CubePath VPS + Coolify

## Criterios de evaluación (en orden de peso)
1. UX (MÁS IMPORTANTE)
2. Creatividad
3. Utilidad
4. Implementación técnica

## Dirección estética: "Confianza urbana nocturna"
Dark premium, urbano, confiable, directo. NO genérico.

### Paleta
- `--bg: #0A0A0F` | `--surface: #14141F` | `--surface-hover: #1C1C2E`
- `--primary: #6C5CE7` | `--primary-light: #A29BFE`
- `--success: #00B894` | `--warning: #FDCB6E` | `--danger: #E17055`
- `--text: #F5F5F5` | `--text-secondary: #8B8BA3` | `--border: #2D2D44`

## Estructura
```
app/
  layout.tsx, page.tsx (landing)
  onboarding/ → page.tsx (paso 1), profile/page.tsx (paso 2), results/page.tsx (paso 3)
  match/[id]/page.tsx (detalle match + semáforo)
  publish/page.tsx
  api/match/route.ts, api/profiles/route.ts
components/ → ui/, landing/, onboarding/, match/, shared/
lib/ → matching.ts, types.ts, constants.ts, seed-data.ts, cities/cali.ts
```

## Matching engine
15 variables de convivencia. Pesos: Presupuesto 20%, Zona 15%, Limpieza 15%, Ruido 12%, Horarios 10%, Visitas 8%, Mascotas 5%, Fumar 5%, Fecha 5%, Otros 5%.
Dealbreaker override: si hay choque en dealbreaker → ⚠️ independiente del score.
Visualización: score % + semáforo 🟢🟡🔴 por categoría + alertas de conflicto.

## Seed data
20-30 perfiles. Nombres colombianos, barrios reales de Cali (Granada, San Fernando, Ciudad Jardín, El Peñón, San Antonio, Menga, Flora, Chipichape, Normandía, Tequendama). Presupuestos $400k-$900k COP. Mix estudiantes + trabajadores remotos.

## Reglas de desarrollo
- Mobile-first responsive
- Componentes reutilizables y tipados
- Onboarding tipo quiz/swipe con Framer Motion, NO formulario largo
- Score reveal animado (cuenta de 0 a N con blur)
- Semáforo con pulse animation, rojo con shake sutil
- Ciudad escalable: Cali activa, otras "próximamente" en selector
- Barrios y precios en lib/cities/ como config separada
- NO construir: chat real, pagos, auth real, feed social, IA/LLM, notificaciones push

## Comandos útiles
```bash
npm run dev          # Dev server
npm run build        # Build producción
npm run lint         # Linting
```

## Doc completo
Ver `convive-tdd.md` para design doc detallado, sprint plan, y README template.

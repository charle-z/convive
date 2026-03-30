# 🏠 Convive — Elige con quién vivir

> Plataforma de compatibilidad para convivencia compartida en Cali, Colombia.
> No es otro portal de anuncios. Es el motor que te dice con quién **sí** y con quién **no** deberías vivir, antes de mudarte.

## 🎯 El problema

En Colombia, buscar roomie es un acto de fe. Facebook mezcla anuncios sin verificar y cero filtro de convivencia. Descubres que eras incompatible **después** de mudarte.

**Convive** te muestra compatibilidad real antes del primer contacto: score explicado, semáforo de conflicto por categoría y dealbreakers visibles.

## 🚀 Demo

👉 **[convive en CubePath](https://aqjvkejtr1h6oqnlwrd366sl.144.225.147.58.sslip.io)**

## 📸 Flujo de la app

### 1. Landing
Propuesta de valor clara, animaciones premium, sin registro requerido.

### 2. Onboarding — ¿Qué buscas?
Elige si buscas cuarto, quieres encontrar roomie para tu espacio o armar grupo.

### 3. Tu perfil de convivencia
Quiz de 15 preguntas con slide animation. Cubre presupuesto, zona,
limpieza, horario, ruido, mascotas, fumar y dealbreakers.

### 4. Tus matches
Top 10 roomies ordenados por compatibilidad real.
Score con count-up animation, barra de compatibilidad color-coded,
alertas de dealbreaker visibles antes de contactar.

### 5. Detalle del match
Semáforo completo por categoría (12 dimensiones), card de conflictos,
tags de preferencias y CTA directo a WhatsApp.

### 6. Tu espacio
Formulario para definir tu espacio y encontrar personas compatibles para vivir ahí.

## ⚙️ Stack técnico

| Capa | Tecnología |
|------|------------|
| Framework | Next.js 14 (App Router) |
| Estilos | Tailwind CSS |
| Animaciones | Framer Motion |
| Componentes | shadcn/ui |
| Lenguaje | TypeScript |
| Data | Seed data JSON (22 perfiles de Cali) |
| Deploy | CubePath VPS + Coolify |

## 🧠 Motor de matching

El score se calcula cruzando 12 categorías con pesos distintos:

| Categoría | Peso |
|-----------|------|
| Presupuesto | 20% |
| Limpieza | 15% |
| Zona | 15% |
| Ruido | 12% |
| Horario | 10% |
| Visitas | 8% |
| Mascotas | 5% |
| Fumar | 5% |
| Cocina + Fiestas + Pareja + Gastos | 10% |

Los **dealbreakers** no bajan el score — se muestran como alertas independientes para que el usuario decida con información completa.

## 🏗️ Despliegue en CubePath

1. VPS nano de CubePath con Coolify desde marketplace
2. Auto-deploy desde GitHub (push to main)
3. Build con Nixpacks
4. SSL automático

## 📂 Estructura del proyecto

```
convive/
├── app/
│   ├── page.tsx                    # Landing
│   ├── onboarding/page.tsx         # Paso 1: intención
│   ├── onboarding/profile/         # Paso 2: quiz 15 preguntas
│   ├── onboarding/results/         # Paso 3: matches
│   ├── match/[id]/                 # Detalle del match
│   ├── publish/                    # Definir espacio + roomie ideal
│   └── api/match/ + api/profiles/  # API routes
├── components/
│   ├── landing/                    # Hero, Features, HowItWorks, CTA
│   ├── match/                      # MatchCard, TrafficLight, CompatibilityBar
│   ├── onboarding/                 # PathSelector, ConvivenceForm, StepIndicator
│   └── shared/                     # Navbar, Footer
└── lib/
    ├── matching.ts                  # Motor de scoring
    ├── seed-data.ts                 # 22 perfiles de Cali
    └── types.ts                     # Interfaces TypeScript
```

## 👤 Autor

Desarrollado por **Carlos Acosta**
Cali, Colombia 🇨🇴
[LinkedIn](https://www.linkedin.com/in/carlosacosta12)

---

*"No vendemos cuarto barato. Vendemos paz mental."*

# 🏠 CONVIVE — Technical Design Document

## Hackathon: CubePath 2026 (midudev)
**Fecha límite:** 31 de marzo de 2026, 23:59:59 CET  
**Votación en vivo:** 1 de abril de 2026, 18:00 CET  
**Autor:** Charles  
**Fecha del documento:** 24 de marzo de 2026  
**Tiempo disponible:** ~7 días  

---

## 1. RESUMEN EJECUTIVO

### Pitch (1 línea)
> **"Elige con quién vivir antes de descubrir que fue un error."**

### Qué es Convive
Una plataforma de compatibilidad para convivencia compartida. No es un portal de anuncios. No es una red social. Es un **motor de matching** que te dice con quién sí y con quién NO deberías vivir, antes de mudarte.

### Por qué gana en CubePath
Los criterios de evaluación son, en orden: **UX > Creatividad > Utilidad > Implementación técnica**. Convive ataca los 4:

| Criterio | Cómo lo atacamos |
|----------|-----------------|
| 🎨 UX | UI dark premium, micro-animaciones, flujo de onboarding tipo Tinder, score visual de compatibilidad |
| 💡 Creatividad | No hay nada igual en el repo. "Roomie compatibility engine" con dealbreaker alerts y semáforo de conflicto |
| 🔧 Utilidad | Problema universal: todo el mundo que ha tenido roomies sabe el dolor |
| ⚙️ Técnica | Next.js 14, App Router, Server Components, scoring algorithm, seed data realista |

---

## 2. ANÁLISIS DE COMPETENCIA (dentro de CubePath)

**Issues abiertas actuales:** ~81  
**Patrones dominantes:** devtools, productividad, dashboards, simuladores, gestión  
**Apps de matching/compatibilidad humana:** CERO detectadas  

Proyectos más fuertes vistos:
- DevOps Disaster Simulator (interactivo, buena demo)
- Smart Job Matcher (matching + IA, concepto cercano pero laboral)
- Abuelitos Contentos (ángulo emocional fuerte)

**Nuestra ventaja:** nadie está tocando convivencia, compatibilidad humana ni matching de roomies. Es un hueco real.

---

## 3. PROPUESTA DE VALOR

### El problema
- En Colombia no hay app dominante para buscar roomie con confianza
- Facebook es el canal más usado y el más riesgoso
- Las plataformas existentes (CompartoApto, Finca Raíz) son portales de anuncios, no motores de compatibilidad
- La gente descubre incompatibilidades DESPUÉS de mudarse

### La solución
Convive te muestra:
1. **Con quién SÍ eres compatible** — score explicado, no solo un número
2. **Dónde hay conflicto ANTES de hablar** — dealbreakers visibles, alertas de choque
3. **Por qué el match es bueno o malo** — razones claras, no cajas negras

### Diferencial brutal
No vendemos "encuentra cuarto barato".  
Vendemos **"evita vivir con alguien que te arruine la vida"**.

---

## 4. FEATURES DEL MVP (scope cerrado)

### ✅ SÍ construir (v1 hackathon)

| # | Feature | Prioridad | Complejidad |
|---|---------|-----------|-------------|
| 1 | **Landing / Hero** | CRÍTICA | Baja |
| 2 | **Onboarding** (3 caminos: busco cuarto / ofrezco cuarto / busco grupo) | CRÍTICA | Media |
| 3 | **Perfil de convivencia** (15 preguntas clave) | CRÍTICA | Media |
| 4 | **Feed de matches** con score de compatibilidad | CRÍTICA | Media |
| 5 | **Detalle del match** con semáforo de conflicto | CRÍTICA | Alta |
| 6 | **Publicación de espacio** (fotos, precio, reglas, zona) | ALTA | Media |
| 7 | **Alertas de dealbreaker** antes de contactar | ALTA | Baja |
| 8 | **Seed data realista** (perfiles Cali, barrios reales, precios reales) | ALTA | Baja |

### ❌ NO construir (v1)

- Chat real entre usuarios
- Pagos / custodia de dinero
- Verificación de identidad real (cédula, selfie)
- Feed social / likes / follows
- IA compleja / LLM para análisis
- Múltiples ciudades
- Notificaciones push
- Auth real (en hackathon: flujo simulado con localStorage)

---

## 5. PERFIL DE CONVIVENCIA — Las 15 preguntas

Estas son las variables del matching engine. Cada una tiene peso en el score.

| # | Variable | Tipo | Opciones |
|---|----------|------|----------|
| 1 | Presupuesto mensual | Range slider | $300k - $1.5M COP |
| 2 | Zona preferida | Multi-select | Barrios de Cali |
| 3 | Fecha de entrada | Date | Calendar picker |
| 4 | Nivel de limpieza | Scale 1-5 | Relajado → Obsesivo |
| 5 | Tolerancia al ruido | Scale 1-5 | Silencio total → Party mode |
| 6 | Horario de sueño | Select | Madrugador / Normal / Nocturno |
| 7 | Visitas frecuentes | Select | Nunca / A veces / Seguido / Siempre |
| 8 | Mascotas | Select | No tengo ni quiero / No tengo pero acepto / Tengo gato / Tengo perro / Otro |
| 9 | Fumar | Select | No fumo ni acepto / No fumo pero acepto / Fumo |
| 10 | Trabajo remoto | Boolean | Sí / No |
| 11 | Compartir comida/cocina | Select | Cada quien / Flexible / Compartimos todo |
| 12 | Fiestas en casa | Select | Nunca / Ocasional / Frecuente |
| 13 | Género de roomie | Select | Me da igual / Solo hombres / Solo mujeres / No binario |
| 14 | Convivencia con pareja | Select | No parejas / Acepto / Yo tengo pareja |
| 15 | **Dealbreakers** | Multi-select | No fumadores / No mascotas / No fiestas / No desorden extremo / No visitas sin aviso / Sin ruido después de 10pm |

---

## 6. ALGORITMO DE MATCHING

### Pesos del score

```
PRESUPUESTO:     20%  (diferencia absoluta normalizada)
ZONA:            15%  (match exacto o zona adyacente)
LIMPIEZA:        15%  (diferencia en escala)
RUIDO:           12%  (diferencia en escala)
HORARIOS:        10%  (match de categoría)
VISITAS:          8%  (diferencia en frecuencia)
MASCOTAS:         5%  (compatibilidad directa)
FUMAR:            5%  (compatibilidad directa)
FECHA:            5%  (proximidad de fechas)
OTROS:            5%  (cocina, fiestas, género, pareja)
```

### Dealbreaker override
Si hay choque en un dealbreaker, el match se marca con ⚠️ independientemente del score numérico.

Ejemplo:
```
Score: 87% compatible
⚠️ CONFLICTO: Tú no aceptas mascotas, esta persona tiene un gato.
```

El score NO baja artificialmente. Se muestra honestamente el número + la alerta. Esto es más útil que inflar o desinflar números.

### Visualización del match

```
┌─────────────────────────────────────┐
│  María G.  ·  87% compatible        │
│  ─────────────────────────────────  │
│  🟢 Presupuesto: match perfecto     │
│  🟢 Zona: ambos en el Sur           │
│  🟡 Limpieza: tú 4/5, ella 2/5     │
│  🔴 Mascotas: tú NO, ella tiene gato│
│  🟢 Horarios: ambos nocturnos       │
│  ─────────────────────────────────  │
│  ⚠️ 1 dealbreaker detectado         │
│  [Ver detalle]  [Siguiente match]   │
└─────────────────────────────────────┘
```

---

## 7. STACK TÉCNICO

### Core
| Capa | Tecnología | Razón |
|------|------------|-------|
| Framework | **Next.js 14** (App Router) | SSR, API routes, file-based routing |
| UI | **Tailwind CSS** + **shadcn/ui** | Speed + componentes pro |
| Animaciones | **Framer Motion** | Micro-interacciones, page transitions |
| Estado | **React state** (useState/useReducer) | No necesitamos más para MVP |
| Data | **Seed data en JSON** | Sin DB real para hackathon |
| Fonts | **Google Fonts** (Outfit + Space Mono) | Moderna + técnica |
| Icons | **Lucide React** | Limpio, consistente |

### Deploy
| Componente | Servicio |
|------------|---------|
| VPS | **CubePath** (nano, 15$ gratis) |
| PaaS | **Coolify** (1-click desde marketplace CubePath) |
| Repo | **GitHub** (público) |
| Deploy | Coolify auto-deploy desde GitHub main branch |

### Flujo de deploy
```
GitHub push → Coolify detecta → Nixpacks build → Container → Live
```

---

## 8. ARQUITECTURA DE ARCHIVOS

```
convive/
├── app/
│   ├── layout.tsx              # Root layout, fonts, metadata
│   ├── page.tsx                # Landing / Hero
│   ├── onboarding/
│   │   ├── page.tsx            # Paso 1: ¿Qué buscas?
│   │   ├── profile/
│   │   │   └── page.tsx        # Paso 2: Perfil de convivencia
│   │   └── results/
│   │       └── page.tsx        # Paso 3: Tus matches
│   ├── match/
│   │   └── [id]/
│   │       └── page.tsx        # Detalle del match + semáforo
│   ├── publish/
│   │   └── page.tsx            # Publicar espacio
│   └── api/
│       ├── match/
│       │   └── route.ts        # POST: calcular matches
│       └── profiles/
│           └── route.ts        # GET: perfiles seed
├── components/
│   ├── ui/                     # shadcn components
│   ├── landing/
│   │   ├── Hero.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── Features.tsx
│   │   └── CTA.tsx
│   ├── onboarding/
│   │   ├── StepIndicator.tsx
│   │   ├── PathSelector.tsx    # Busco cuarto / Ofrezco / Grupo
│   │   └── ConvivenceForm.tsx  # Las 15 preguntas
│   ├── match/
│   │   ├── MatchCard.tsx       # Card con score + semáforo
│   │   ├── CompatibilityBar.tsx
│   │   ├── DealbreakAlert.tsx
│   │   └── TrafficLight.tsx    # 🟢🟡🔴 por categoría
│   └── shared/
│       ├── Navbar.tsx
│       ├── Footer.tsx
│       └── AnimatedSection.tsx
├── lib/
│   ├── matching.ts             # Algoritmo de scoring
│   ├── types.ts                # TypeScript interfaces
│   ├── constants.ts            # Barrios, opciones, pesos
│   └── seed-data.ts            # 20-30 perfiles realistas de Cali
├── public/
│   ├── og-image.png            # Open Graph
│   └── favicon.svg
├── next.config.mjs
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md                   # Hackathon submission
```

---

## 9. DISEÑO VISUAL / DIRECCIÓN ESTÉTICA

### Concepto: "Confianza urbana nocturna"
No queremos que se vea como app de hospital ni como juguete.  
Queremos que se sienta como: **dark premium, urbano, confiable, directo.**

### Paleta

| Nombre | Hex | Uso |
|--------|-----|-----|
| Background | `#0A0A0F` | Fondo principal |
| Surface | `#14141F` | Cards, modals |
| Surface-hover | `#1C1C2E` | Hover states |
| Primary | `#6C5CE7` | CTAs, acciones principales |
| Primary-light | `#A29BFE` | Hover, estados activos |
| Success | `#00B894` | Match bueno, semáforo verde |
| Warning | `#FDCB6E` | Match regular, semáforo amarillo |
| Danger | `#E17055` | Conflicto, dealbreaker, semáforo rojo |
| Text primary | `#F5F5F5` | Texto principal |
| Text secondary | `#8B8BA3` | Texto secundario |
| Border | `#2D2D44` | Bordes sutiles |

### Tipografía
- **Display / Headings:** Outfit (bold, modern, geométrica)
- **Body:** Inter o similar sans-serif (legibilidad)
- **Monospace accents:** Space Mono (para scores, porcentajes, datos)

### Elementos WOW para hackathon

1. **Hero animado** — partículas/gradiente mesh que se mueve suavemente. Headline que aparece con stagger animation.

2. **Onboarding tipo swipe** — cada pregunta es una card que transiciona con Framer Motion. Se siente como un quiz, no como un formulario aburrido.

3. **Score reveal** — cuando se calcula el match, el porcentaje se anima contando de 0 a N con un efecto de blur que se resuelve. Muy satisfactorio visualmente.

4. **Semáforo de conflicto** — 🟢🟡🔴 animados con pulse. El rojo tiene un shake sutil. Inmediatamente comunica dónde hay problema.

5. **Dealbreaker alert** — aparece como un banner tipo warning con animación de slide-in. Imposible ignorarlo.

6. **Matching cards** — grid responsive con hover que expande la card mostrando preview del semáforo. Parallax sutil en scroll.

---

## 10. SEED DATA — PERFILES REALISTAS DE CALI

20-30 perfiles con:
- Nombres colombianos realistas
- Barrios reales de Cali (Granada, San Fernando, Ciudad Jardín, El Peñón, San Antonio, Menga, Flora, Chipichape, Normandía, Tequendama)
- Presupuestos en COP realistas ($400k - $900k)
- Fotos placeholder con iniciales o avatares genéricos
- Mix de perfiles: estudiantes, trabajadores remotos, jóvenes profesionales
- Algunos perfiles intencionalmente incompatibles para demostrar los dealbreakers
- Al menos 2-3 perfiles con alta compatibilidad para una demo satisfactoria

---

## 11. FLUJO DE USUARIO (User Journey)

```
Landing
  │
  ▼
[Comenzar] ──► Onboarding
                 │
                 ├─ Paso 1: ¿Qué buscas?
                 │    ├─ 🏠 Busco cuarto
                 │    ├─ 🛏️ Ofrezco cuarto / busco roomie
                 │    └─ 👥 Busco grupo para alquilar juntos
                 │
                 ├─ Paso 2: Perfil de convivencia (15 preguntas)
                 │    └─ UI tipo quiz/swipe, no formulario largo
                 │
                 └─ Paso 3: Tus matches
                      │
                      ├─ Lista de cards con score + mini-semáforo
                      │
                      └─ Click en card ──► Detalle del match
                                              │
                                              ├─ Score grande animado
                                              ├─ Semáforo por categoría
                                              ├─ Dealbreaker alerts
                                              ├─ Perfil del espacio (si aplica)
                                              └─ [Contactar] (simulado)
```

---

## 12. SPRINT PLAN — 7 DÍAS

### Día 1 (Mar 24) — Setup + Landing
- [ ] Init Next.js 14 + Tailwind + shadcn/ui
- [ ] Configurar estructura de archivos
- [ ] Hero section con animación
- [ ] Secciones: Cómo funciona, Features, CTA
- [ ] Setup repo GitHub público

### Día 2 (Mar 25) — Onboarding
- [ ] Selector de camino (3 opciones)
- [ ] Form de convivencia (15 preguntas como cards animadas)
- [ ] Guardar respuestas en state
- [ ] Transiciones entre pasos

### Día 3 (Mar 26) — Matching Engine + Seed Data
- [ ] Implementar algoritmo de scoring en lib/matching.ts
- [ ] Crear seed data (20+ perfiles realistas)
- [ ] API route para calcular matches
- [ ] Tests básicos del algoritmo

### Día 4 (Mar 27) — Feed de Matches + Match Detail
- [ ] Grid de match cards con score
- [ ] Página de detalle con semáforo completo
- [ ] Dealbreaker alerts
- [ ] Animaciones de score reveal

### Día 5 (Mar 28) — Publicación de Espacio + Polish
- [ ] Form de publicación (fotos placeholder, precio, reglas)
- [ ] Vista de espacio publicado
- [ ] Polish general de UI
- [ ] Responsive check (mobile-first)

### Día 6 (Mar 29) — Deploy + README
- [ ] Setup CubePath VPS + Coolify
- [ ] Deploy desde GitHub
- [ ] Dominio/URL funcional
- [ ] README completo con capturas, GIFs, descripción

### Día 7 (Mar 30) — QA + Submission
- [ ] Revisar flujo completo
- [ ] Fix bugs
- [ ] Capturas/GIFs para la issue
- [ ] Crear issue en el repo de midudev
- [ ] Buffer de emergencia (1 día antes del deadline)

---

## 13. README TEMPLATE (para la submission)

```markdown
# 🏠 Convive — Elige con quién vivir

> Plataforma de compatibilidad para convivencia compartida.
> Encuentra roomies compatibles, no solo disponibles.

## 🎯 ¿Qué problema resuelve?

En Colombia, buscar roomie es un acto de fe. Facebook mezcla
anuncios sin verificar, identidades flojas y cero filtro de
convivencia. Descubres que eras incompatible DESPUÉS de mudarte.

**Convive** te muestra compatibilidad real antes del primer
contacto: score explicado, semáforo de conflicto y dealbreakers
visibles.

## 🚀 Demo

👉 [convive.cubepath.app](URL_AQUI)

## 📸 Capturas

[Screenshots / GIFs aquí]

## ⚙️ Stack

- Next.js 14 (App Router)
- Tailwind CSS + shadcn/ui
- Framer Motion
- TypeScript

## 🏗️ Despliegue en CubePath

1. VPS nano de CubePath con Coolify
2. Auto-deploy desde GitHub (push to main)
3. Build con Nixpacks
4. SSL automático

## 🧠 Cómo funciona

1. Eliges qué buscas (cuarto / roomie / grupo)
2. Completas tu perfil de convivencia (15 variables)
3. Ves tus matches con score de compatibilidad
4. Cada match tiene semáforo: verde/amarillo/rojo por categoría
5. Dealbreakers visibles antes de contactar

## 📂 Repositorio

👉 [github.com/tu-user/convive](URL_AQUI)
```

---

## 14. RIESGOS Y MITIGACIÓN

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|-------------|---------|------------|
| No terminar a tiempo | Media | ALTO | Scope cerrado, features priorizadas, día 7 es buffer |
| Deploy en CubePath falla | Baja | ALTO | Testear deploy día 5, no día 7. Coolify bien documentado |
| UI se ve genérica | Media | ALTO | Invertir en hero + animaciones + paleta dark premium |
| Matching se siente fake | Media | Medio | Seed data realista, perfiles con personalidad, barrios reales de Cali |
| Onboarding aburre | Media | ALTO | Quiz-style con animaciones, no formulario largo tradicional |

---

## 15. POST-HACKATHON (si el proyecto sigue)

Cosas que NO van en MVP pero sí tendrían sentido después:

- Auth real (NextAuth, Clerk)
- Base de datos (Supabase, PlanetScale)
- Verificación de identidad
- Chat interno
- Notificaciones
- Más ciudades (Medellín, Bogotá)
- Módulo de gastos compartidos (la idea de tu hermana)
- Modo "busquemos apto juntos"
- Reputación post-convivencia
- App móvil (React Native o PWA)

---

## DECISIÓN FINAL

**Construimos Convive.**  
**Stack:** Next.js 14 + Tailwind + shadcn/ui + Framer Motion  
**Deploy:** CubePath VPS + Coolify  
**Scope:** Landing + Onboarding + Matching + Match Detail + Publish  
**Diferencial:** Motor de compatibilidad con semáforo de conflicto  
**Deadline:** 30 de marzo (1 día buffer)  

---

*"No es otro portal de anuncios. Es la diferencia entre vivir bien y vivir un infierno."*

// ─── Intención del usuario (PathSelector) ────────────────────────────────────
export type SearchIntent = "busco-cuarto" | "ofrezco-cuarto" | "busco-grupo";

// ─── Respuestas del formulario (ConvivenceForm) ──────────────────────────────
// Los IDs coinciden exactamente con los option.id del quiz.

export interface ProfileAnswers {
  presupuesto: "menos-600" | "600-900" | "900-1200" | "mas-1200";
  zona: "norte" | "sur" | "centro" | "me-adapto";
  limpieza: "obsesivo" | "ordenado" | "relajado" | "caos";
  horario: "madrugador" | "maananero" | "noctambulo" | "variable";
  ruido: "silencio" | "normal" | "ocasional" | "mucho";
  visitas: "casi-nunca" | "1-2-semana" | "casi-siempre" | "casa-abierta";
  mascotas: "no-quiero" | "tengo" | "acepto" | "alergico";
  fumar: "no-fumo" | "afuera" | "en-casa" | "indiferente";
  fecha: "ya" | "2-4-semanas" | "1-2-meses" | "explorando";
  cocina: "todos-dias" | "ocasional" | "casi-no" | "minimo";
  fiestas: "nunca" | "ocasional" | "frecuente" | "estilo-vida";
  genero: "solo-mujeres" | "solo-hombres" | "sin-preferencia" | "mixto";
  pareja: "ok" | "respeto" | "prefiero-no" | "depende";
  gastos: "50-50" | "flexible" | "coordinador" | "acordamos";
  dealbreakers: string[];
}

// ─── Perfil del seed (ProfileAnswers + metadata visual) ──────────────────────
export interface SeedProfile extends ProfileAnswers {
  id: string;
  nombre: string;
  edad: number;
  ocupacion: string;
  barrio: string;
  foto: string;
  descripcion: string;
}

// ─── Matching engine ─────────────────────────────────────────────────────────

export interface CategoryScore {
  name: string;
  score: number;  // 0-100
  weight: number; // fracción del total (suma 1.0)
  icon: string;   // nombre del ícono Lucide
}

export interface MatchResult {
  profileId: string;
  score: number;             // 0-100 redondeado
  categories: CategoryScore[];
  hasDealbreaker: boolean;
  dealbreakersFound: string[]; // descripciones legibles del conflicto
}

// ─── Par de respuesta de la API ───────────────────────────────────────────────
export interface MatchPair {
  profile: SeedProfile;
  result: MatchResult;
}

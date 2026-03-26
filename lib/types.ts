// TypeScript interfaces for Convive

export type SearchIntent = "busco-cuarto" | "ofrezco-cuarto" | "busco-grupo";

export type CleanlinessLevel = 1 | 2 | 3 | 4 | 5;
export type NoiseLevel = 1 | 2 | 3 | 4 | 5;
export type SleepSchedule = "madrugador" | "normal" | "nocturno";
export type VisitFrequency = "nunca" | "a-veces" | "seguido" | "siempre";
export type PetPreference =
  | "no-tengo-ni-quiero"
  | "no-tengo-pero-acepto"
  | "tengo-gato"
  | "tengo-perro"
  | "otro";
export type SmokingPreference = "no-fumo-ni-acepto" | "no-fumo-pero-acepto" | "fumo";
export type KitchenSharing = "cada-quien" | "flexible" | "compartimos-todo";
export type PartyFrequency = "nunca" | "ocasional" | "frecuente";
export type GenderPreference = "me-da-igual" | "solo-hombres" | "solo-mujeres" | "no-binario";
export type CouplePreference = "no-parejas" | "acepto" | "yo-tengo-pareja";

export type Dealbreaker =
  | "no-fumadores"
  | "no-mascotas"
  | "no-fiestas"
  | "no-desorden-extremo"
  | "no-visitas-sin-aviso"
  | "sin-ruido-despues-10pm";

export interface ConvivenceProfile {
  id: string;
  name: string;
  age: number;
  avatar?: string;
  occupation: string;
  intent: SearchIntent;

  // Matching variables
  budget: number; // COP mensual
  zones: string[]; // Barrios preferidos
  moveInDate: string; // ISO date
  cleanliness: CleanlinessLevel;
  noiseLevel: NoiseLevel;
  sleepSchedule: SleepSchedule;
  visitFrequency: VisitFrequency;
  petPreference: PetPreference;
  smokingPreference: SmokingPreference;
  remoteWork: boolean;
  kitchenSharing: KitchenSharing;
  partyFrequency: PartyFrequency;
  genderPreference: GenderPreference;
  couplePreference: CouplePreference;
  dealbreakers: Dealbreaker[];

  // Space info (si ofrece cuarto)
  space?: {
    title: string;
    description: string;
    price: number;
    zone: string;
    address?: string;
    photos: string[];
    rules: string[];
    available: string; // ISO date
  };
}

export interface MatchResult {
  profile: ConvivenceProfile;
  score: number; // 0-100
  categoryScores: CategoryScore[];
  dealbreakersTriggered: DealbreakConflict[];
}

export interface CategoryScore {
  category: string;
  label: string;
  score: number; // 0-100
  status: "green" | "yellow" | "red";
  detail: string;
}

export interface DealbreakConflict {
  dealbreaker: Dealbreaker;
  message: string;
}

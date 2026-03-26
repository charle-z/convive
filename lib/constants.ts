// Barrios y configuración de Cali

export const CALI_ZONES = [
  "Granada",
  "San Fernando",
  "Ciudad Jardín",
  "El Peñón",
  "San Antonio",
  "Menga",
  "La Flora",
  "Chipichape",
  "Normandía",
  "Tequendama",
  "Centenario",
  "Versalles",
  "Alameda",
  "Santa Mónica",
  "El Ingenio",
];

export const CITIES = [
  { id: "cali", name: "Cali", active: true },
  { id: "medellin", name: "Medellín", active: false },
  { id: "bogota", name: "Bogotá", active: false },
  { id: "barranquilla", name: "Barranquilla", active: false },
];

// Pesos del algoritmo de matching (deben sumar 1.0)
export const MATCHING_WEIGHTS = {
  budget: 0.20,
  zone: 0.15,
  cleanliness: 0.15,
  noise: 0.12,
  schedule: 0.10,
  visits: 0.08,
  pets: 0.05,
  smoking: 0.05,
  date: 0.05,
  others: 0.05, // cocina, fiestas, género, pareja
} as const;

export const SLEEP_SCHEDULE_LABELS = {
  madrugador: "Madrugador",
  normal: "Horario normal",
  nocturno: "Nocturno",
};

export const VISIT_FREQUENCY_LABELS = {
  nunca: "Nunca",
  "a-veces": "A veces",
  seguido: "Seguido",
  siempre: "Siempre",
};

export const PET_LABELS = {
  "no-tengo-ni-quiero": "No tengo ni quiero",
  "no-tengo-pero-acepto": "No tengo pero acepto",
  "tengo-gato": "Tengo gato",
  "tengo-perro": "Tengo perro",
  otro: "Otro",
};

export const SMOKING_LABELS = {
  "no-fumo-ni-acepto": "No fumo ni acepto",
  "no-fumo-pero-acepto": "No fumo pero acepto",
  fumo: "Fumo",
};

export const DEALBREAKER_LABELS = {
  "no-fumadores": "No fumadores",
  "no-mascotas": "No mascotas",
  "no-fiestas": "No fiestas",
  "no-desorden-extremo": "No desorden extremo",
  "no-visitas-sin-aviso": "No visitas sin aviso",
  "sin-ruido-despues-10pm": "Sin ruido después de 10pm",
};

export const BUDGET_MIN = 300_000;
export const BUDGET_MAX = 1_500_000;

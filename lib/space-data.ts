import type { ProfileAnswers } from "./types";

export interface SpaceData {
  spaceType?: string;
  precio?: string;
  barrio?: string;
  descripcion?: string;
  genero?: ProfileAnswers["genero"];
  presupuesto?: ProfileAnswers["presupuesto"];
  reglas?: string[];
}

export const SPACE_DATA_STORAGE_KEY = "convive_space_data";

const BARRIO_TO_ZONA: Record<string, ProfileAnswers["zona"]> = {
  Granada: "sur",
  "El Peñón": "sur",
  "San Fernando": "sur",
  "Ciudad Jardín": "sur",
  Tequendama: "sur",
  Chipichape: "norte",
  Centenario: "norte",
  Menga: "norte",
  Normandía: "norte",
  "San Antonio": "centro",
  Versalles: "centro",
  "Santa Mónica": "centro",
  Flora: "centro",
};

function getString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function getStringArray(value: unknown): string[] | undefined {
  if (!Array.isArray(value)) return undefined;

  const items = Array.from(
    new Set(
      value.filter(
        (item): item is string =>
          typeof item === "string" && item.trim().length > 0
      )
    )
  );

  return items.length > 0 ? items : undefined;
}

export function normalizeSpaceData(raw: unknown): SpaceData | null {
  if (!raw || typeof raw !== "object") return null;

  const source = raw as Record<string, unknown>;
  const data: SpaceData = {
    spaceType: getString(source.spaceType),
    precio: getString(source.precio),
    barrio: getString(source.barrio),
    descripcion: getString(source.descripcion),
    genero: getString(source.genero) as ProfileAnswers["genero"] | undefined,
    presupuesto: getString(source.presupuesto) as
      | ProfileAnswers["presupuesto"]
      | undefined,
    reglas: getStringArray(source.reglas),
  };

  return Object.values(data).some(Boolean) ? data : null;
}

export function readSpaceData(): SpaceData | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(SPACE_DATA_STORAGE_KEY);
    if (!raw) return null;

    return normalizeSpaceData(JSON.parse(raw));
  } catch {
    return null;
  }
}

export function getSpaceProfileOverrides(space: SpaceData): Partial<ProfileAnswers> {
  const overrides: Partial<ProfileAnswers> = {};

  if (space.presupuesto) {
    overrides.presupuesto = space.presupuesto;
  }

  if (space.genero) {
    overrides.genero = space.genero;
  }

  if (space.barrio) {
    overrides.zona = BARRIO_TO_ZONA[space.barrio] ?? "me-adapto";
  }

  const reglas = new Set(space.reglas ?? []);

  if (reglas.has("no-mascotas")) {
    overrides.mascotas = "no-quiero";
  }

  if (reglas.has("no-fumar")) {
    overrides.fumar = "no-fumo";
  }

  if (reglas.has("silencio-10")) {
    overrides.ruido = "silencio";
    overrides.fiestas = "nunca";
  }

  if (reglas.has("aviso-visitas")) {
    overrides.visitas = "casi-nunca";
  }

  return overrides;
}

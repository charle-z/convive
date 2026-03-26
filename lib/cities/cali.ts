// Configuración específica de Cali
export const CALI_CONFIG = {
  id: "cali",
  name: "Cali",
  active: true,
  zones: [
    { id: "granada", name: "Granada", tier: "premium" },
    { id: "san-fernando", name: "San Fernando", tier: "premium" },
    { id: "ciudad-jardin", name: "Ciudad Jardín", tier: "premium" },
    { id: "el-penon", name: "El Peñón", tier: "premium" },
    { id: "san-antonio", name: "San Antonio", tier: "mid" },
    { id: "menga", name: "Menga", tier: "mid" },
    { id: "la-flora", name: "La Flora", tier: "mid" },
    { id: "chipichape", name: "Chipichape", tier: "mid" },
    { id: "normandia", name: "Normandía", tier: "mid" },
    { id: "tequendama", name: "Tequendama", tier: "mid" },
    { id: "centenario", name: "Centenario", tier: "budget" },
    { id: "versalles", name: "Versalles", tier: "budget" },
    { id: "alameda", name: "Alameda", tier: "budget" },
    { id: "santa-monica", name: "Santa Mónica", tier: "budget" },
    { id: "el-ingenio", name: "El Ingenio", tier: "budget" },
  ],
  budgetRange: {
    min: 400_000,
    max: 900_000,
    currency: "COP",
  },
};

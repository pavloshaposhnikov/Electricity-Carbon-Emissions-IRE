// API Configuration for real-time data sources

export const API_CONFIG = {
  // EirGrid API settings
  EIRGRID: {
    BASE_URL: 'https://www.eirgridgroup.com/site-files/library/EirGrid',
    ENDPOINTS: {
      GENERATION: '/All-Island%20Generation%20Output%20Report%20-%20',
      DEMAND: '/All-Island%20Demand%20Report%20-%20',
      CARBON_INTENSITY: '/All-Island%20Carbon%20Intensity%20Report%20-%20'
    },
    UPDATE_INTERVAL: 5 * 60 * 1000, // 5 minutes
    TIMEOUT: 10000 // 10 seconds
  },
  
  // ENTSO-E API settings
  ENTSOE: {
    BASE_URL: 'https://transparency.entsoe.eu/api',
    DOMAIN_CODES: {
      IRELAND: '10Y1001A1001A59A',
      UK: '10YGB----------A',
      FRANCE: '10YFR-RTE------C',
      GERMANY: '10Y1001A1001A83F'
    },
    DOCUMENT_TYPES: {
      GENERATION: 'A75',
      DEMAND: 'A65',
      CARBON_INTENSITY: 'A79'
    },
    UPDATE_INTERVAL: 15 * 60 * 1000, // 15 minutes
    TIMEOUT: 15000 // 15 seconds
  }
}

// Environment variables for API keys
export const API_KEYS = {
  ENTSOE: process.env.VITE_ENTSOE_API_KEY || '',
  EIRGRID: process.env.VITE_EIRGRID_API_KEY || ''
}

// Feature flags
export const FEATURES = {
  ENABLE_REAL_DATA: process.env.VITE_ENABLE_REAL_DATA === 'true' || false,
  ENABLE_ENTSOE: process.env.VITE_ENABLE_ENTSOE === 'true' && !!API_KEYS.ENTSOE,
  ENABLE_EIRGRID: process.env.VITE_ENABLE_EIRGRID === 'true' || true
}

// Data source priorities
export const DATA_SOURCE_PRIORITY = [
  'EirGrid (real-time)',
  'ENTSO-E (real-time)',
  'Mock (offline)'
] as const

export type DataSource = typeof DATA_SOURCE_PRIORITY[number]

import { addMinutes, subHours, formatISO9075 } from 'date-fns'
import type { CarbonIntensityPoint, DateRange, GenerationMixBreakdown, GenerationMixPoint } from '../types'

// Emission factors for Ireland (gCO2/kWh) - based on typical Irish grid factors
const EMISSION_FACTORS: Record<keyof GenerationMixBreakdown, number> = {
  wind: 12,
  solar: 50,
  hydro: 24,
  gas: 400,
  coal: 900,
  biomass: 230,
  imports: 300, // Average of UK and continental Europe
}

interface EirGridDataPoint {
  timestamp: string
  wind: number
  solar: number
  hydro: number
  gas: number
  coal: number
  biomass: number
  imports: number
  total: number
}

function getRangeHours(range: DateRange): number {
  if (range === '24h') return 24
  if (range === '48h') return 48
  return 24 * 7
}

function normalizeMix(raw: Partial<GenerationMixBreakdown>): GenerationMixBreakdown {
  const base: GenerationMixBreakdown = {
    wind: raw.wind ?? 0,
    solar: raw.solar ?? 0,
    hydro: raw.hydro ?? 0,
    gas: raw.gas ?? 0,
    coal: raw.coal ?? 0,
    biomass: raw.biomass ?? 0,
    imports: raw.imports ?? 0,
  }
  const total = Object.values(base).reduce((a, b) => a + b, 0)
  if (total <= 0) {
    return {
      wind: 0.3,
      solar: 0.05,
      hydro: 0.05,
      gas: 0.45,
      coal: 0.05,
      biomass: 0.05,
      imports: 0.05,
    }
  }
  const normalized = Object.fromEntries(
    Object.entries(base).map(([k, v]) => [k, v / total])
  ) as GenerationMixBreakdown
  return normalized
}

function computeIntensity(mix: GenerationMixBreakdown): number {
  let total = 0
  for (const key of Object.keys(mix) as (keyof GenerationMixBreakdown)[]) {
    total += mix[key] * EMISSION_FACTORS[key]
  }
  return Math.round(total)
}

async function fetchEirGridData(range: DateRange): Promise<EirGridDataPoint[]> {
  const hours = getRangeHours(range)
  const endDate = new Date()
  const startDate = subHours(endDate, hours)
  
  // For demo purposes, we'll simulate real data fetching
  // In production, you would make actual API calls to EirGrid
  const dataPoints: EirGridDataPoint[] = []
  const stepMinutes = range === '7d' ? 30 : 15
  const points = (hours * 60) / stepMinutes

  for (let i = 0; i <= points; i++) {
    const timestamp = addMinutes(startDate, i * stepMinutes)
    const hourOfDay = timestamp.getHours() + timestamp.getMinutes() / 60

    // Simulate realistic Irish electricity generation patterns
    const dayFactor = Math.sin((2 * Math.PI * (hourOfDay - 3)) / 24)
    const wind = Math.max(0.1, Math.min(0.75, 0.35 + 0.2 * dayFactor))

    const solarBase = Math.max(0, Math.sin((Math.PI * (hourOfDay - 6)) / 12))
    const solar = Math.max(0, Math.min(0.25, 0.18 * solarBase))

    const hydro = 0.05 + 0.02 * Math.sin((2 * Math.PI * i) / (points / 7))
    const coal = 0.04 + 0.01 * Math.sin((2 * Math.PI * i) / (points / 3))
    const biomass = 0.05

    let gas = 0.4 + 0.1 * Math.cos((2 * Math.PI * hourOfDay) / 24) - (wind + solar - 0.3)
    gas = Math.max(0.05, Math.min(0.7, gas))

    const imports = Math.max(0.02, Math.min(0.2, 1 - (wind + solar + hydro + gas + coal + biomass)))

    const total = wind + solar + hydro + gas + coal + biomass + imports

    dataPoints.push({
      timestamp: timestamp.toISOString(),
      wind,
      solar,
      hydro,
      gas,
      coal,
      biomass,
      imports,
      total
    })
  }

  return dataPoints
}

export async function fetchRealEirGridData(range: DateRange): Promise<{
  intensity: CarbonIntensityPoint[]
  generation: GenerationMixPoint[]
}> {
  try {
    const rawData = await fetchEirGridData(range)
    
    const intensity: CarbonIntensityPoint[] = []
    const generation: GenerationMixPoint[] = []

    for (const point of rawData) {
      const timestamp = new Date(point.timestamp)
      const mix = normalizeMix({
        wind: point.wind,
        solar: point.solar,
        hydro: point.hydro,
        gas: point.gas,
        coal: point.coal,
        biomass: point.biomass,
        imports: point.imports,
      })
      
      const ci = computeIntensity(mix)

      intensity.push({ timestamp, gramsCO2PerKWh: ci })
      generation.push({ timestamp, mix })
    }

    return { intensity, generation }
  } catch (error) {
    console.error('Error fetching EirGrid data:', error)
    throw new Error('Failed to fetch real-time electricity data')
  }
}

// Alternative: ENTSO-E API integration
export async function fetchENTSOEData(): Promise<{
  intensity: CarbonIntensityPoint[]
  generation: GenerationMixPoint[]
}> {
  // ENTSO-E API requires authentication and specific endpoints
  // This is a placeholder for ENTSO-E integration
  throw new Error('ENTSO-E integration not yet implemented')
}

export function formatTickTime(date: Date): string {
  return formatISO9075(date, { representation: 'time' }).slice(0, 5)
}

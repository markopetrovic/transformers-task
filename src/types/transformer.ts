export interface VoltageReading {
  timestamp: string
  voltage: string
}

export interface Transformer {
  assetId: number
  name: string
  region: string
  health: string
  lastTenVoltgageReadings: VoltageReading[]
}

export interface TransformerFilters {
  name: string
  region: string
  health: string
}

export const VESSEL_COUNT: number = 2;

export const metricNames: string[] = ['pH', 'temperature', 'dissolvedOxygen']

export type Telemetry = {
  vesselId: string,
  timestamp: string,
  pH: number,
  temperature: number,
  dissolvedOxygen: number
}

export type SensorMetric = {
  metricName: string,
  timestamp: number,
  value: number
}

export type VesselTelemetryProps = {
  thresholds: Thresholds | undefined
  sensorMetrics: SensorMetric[];
  setIsModalOpen: (val: boolean) => void,
  isModalOpen: boolean,
  setThresholdsToEdit: (thresholds: Thresholds) => void
}

export type Threshold = {
  metricName: string,
  minimumAllowedValue: number,
  maximumAllowedValue: number
}

export type Thresholds = {
  vesselId: string,
  pHThreshold: Threshold,
  temperatureThreshold: Threshold,
  dissolvedOxygenThreshold: Threshold,
}

export type AuditLogs = {
  timestamp: string,
  oldThreshHoldValues: Thresholds,
  newThreshHoldValues: Thresholds
}
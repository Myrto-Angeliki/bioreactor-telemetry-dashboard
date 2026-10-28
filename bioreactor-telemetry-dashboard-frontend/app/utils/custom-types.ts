import { Dispatch, SetStateAction } from "react";
import { TooltipContentProps } from "recharts";
import { defaultDefaultTooltipContentProps } from "recharts/types/component/DefaultTooltipContent";

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
  sensorMetrics: SensorMetric[],
  thresholdsToEdit: Thresholds | undefined,
  setThresholdsToEdit: Dispatch<SetStateAction<Thresholds | undefined>>
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

export type CustomTooltipProps = TooltipContentProps<any, any> & {
  isInsideThreshold: boolean;
};

export type UpdateThresholdsFormBodyProps = {
  vesselId: string,
  onClose: () => void,
  newPHThresholds: Threshold,
  setNewPHThresholds: Dispatch<SetStateAction<Threshold>>,
  newTemperatureThresholds: Threshold,
  setNewTemperatureThresholds: Dispatch<SetStateAction<Threshold>>,
  newDissolvedOxygenThresholds: Threshold,
  setNewDissolvedOxygenThresholds: Dispatch<SetStateAction<Threshold>>,
  thresholdsToEdit: Thresholds,
  setThresholdsToEdit: Dispatch<SetStateAction<Thresholds | undefined>>,
  updatedThresholds: boolean,
  setUpdatedThresholds: Dispatch<SetStateAction<boolean>>
}
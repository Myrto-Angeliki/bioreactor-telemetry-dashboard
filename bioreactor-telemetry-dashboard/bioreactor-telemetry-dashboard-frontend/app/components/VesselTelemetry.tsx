"use client";

import { useEffect } from "react";
import { Thresholds, VesselTelemetryProps } from "../utils/custom-types";
import SensorMetricComponent from "./SensorMetricComponent";

const getThreshHoldByName = (thresholds: Thresholds | undefined, metricName: string) => {

    if (thresholds != undefined) {
        if (thresholds.pHThreshold != undefined) //console.log(thresholds.pHThreshold.maximumAllowedValue);
            if (metricName == 'pH') return thresholds.pHThreshold;
            else if (metricName == 'temperature') return thresholds.temperatureThreshold;
            else if (metricName == 'dissolvedOxygen') return thresholds.dissolvedOxygenThreshold;
    }
    else return undefined;
}

export default function VesselTelemetry({ sensorMetrics, thresholds, setThresholdsToEdit, setIsModalOpen, isModalOpen }: VesselTelemetryProps) {
    // useEffect(() => {
    //     const updateThresholdsToEdit = () => {
    //         if (thresholds != undefined) {
    //             setThresholdsToEdit(thresholds);
    //             console.log(thresholds.pHThreshold.maximumAllowedValue);
    //         }
    //     }
    //     updateThresholdsToEdit();
    // }, [thresholds])
    return (
        <div className="p-16">
            {sensorMetrics.map((metric) => {
                return (
                    <SensorMetricComponent
                        key={metric.metricName}
                        metricName={metric.metricName}
                        timestamp={metric.timestamp}
                        value={metric.value}
                        threshold={getThreshHoldByName(thresholds, metric.metricName)}
                    />
                );
            })}
        </div>
    );
}
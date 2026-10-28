"use client";

import { useState } from "react";
import { Thresholds, VesselTelemetryProps } from "../utils/custom-types";
import SensorMetricComponent from "./SensorMetricComponent";
import { UpdateThresholdsModal } from "./update-thresholds/UpdateThresholdsModal";

function handleThresholdsEditClick(isModalOpen: boolean, setIsModalOpen: (val: boolean) => void,
    setThresholdsToEdit: (thresholds: Thresholds | undefined) => void,
    thresholdsTemp: Thresholds | undefined) {
    if (!isModalOpen && thresholdsTemp != undefined) setThresholdsToEdit(thresholdsTemp);
    if (thresholdsTemp == undefined) throw new Error(`Threshols are ${thresholdsTemp}`)
    setIsModalOpen(!isModalOpen)
}

const getThreshHoldByName = (thresholds: Thresholds | undefined, metricName: string) => {

    if (thresholds != undefined) {
        if (thresholds.pHThreshold != undefined)
            if (metricName == 'pH') return thresholds.pHThreshold;
            else if (metricName == 'temperature') return thresholds.temperatureThreshold;
            else if (metricName == 'dissolvedOxygen') return thresholds.dissolvedOxygenThreshold;
    }
    else return undefined;
}

export default function VesselTelemetry(props: VesselTelemetryProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    if (props.thresholds == undefined)
        return <p>404: Thresholds not found</p>

    
    return (
        <>
            <div className="text-right">
                <button
                    className="cursor-pointer rounded-full bg-olive-800 text-olive-300 p-4 "
                    onClick={() => handleThresholdsEditClick(isModalOpen,
                        setIsModalOpen,
                        props.setThresholdsToEdit, props.thresholds
                    )}
                >
                    <span>Edit Thresholds</span>
                </button>

                <UpdateThresholdsModal
                    vesselId={props.thresholds.vesselId}
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    thresholdsToEdit={props.thresholdsToEdit}
                    setThresholdsToEdit={props.setThresholdsToEdit} />
            </div>
            <div className="p-16">
                {props.sensorMetrics.map((metric) => {
                    return (
                        <SensorMetricComponent
                            key={metric.metricName}
                            metricName={metric.metricName}
                            timestamp={metric.timestamp}
                            value={metric.value}
                            threshold={getThreshHoldByName(props.thresholds, metric.metricName)}
                        />
                    );
                })}
            </div>
        </>
    );
}
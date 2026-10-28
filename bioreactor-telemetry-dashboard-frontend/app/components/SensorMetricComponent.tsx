"use client";

import { useEffect, useState } from "react";
import LineChartComponent from "./charts/LineChartComponent";
import { SensorMetric, Threshold } from "../utils/custom-types";


export type SensorMetricProps = {
    metricName: string,
    timestamp: number,
    value: number,
    threshold: Threshold | undefined
}


export default function SensorMetricComponent({ metricName, timestamp, value, threshold }: SensorMetricProps) {
    const [recentMetricValues, setRecentMetricValues] = useState<SensorMetric[]>([]);
    const [showWarning, setShowWarning] = useState(false);

    useEffect(() => {
        const addNewMetricValues = () => {
            const metricValuesToAdd: SensorMetric[] = [...recentMetricValues];

            metricValuesToAdd.push(
                { metricName: metricName, timestamp: timestamp, value: value });
            if (recentMetricValues.length === 10)
                metricValuesToAdd.shift();
            setRecentMetricValues(metricValuesToAdd);
        }

        const checkForThresholdVilation = () => {
            if (threshold != undefined) {
                if (value >= threshold.minimumAllowedValue &&
                    value <= threshold.maximumAllowedValue) {
                    setShowWarning(false);
                    return true;
                }
                else {
                    setShowWarning(true);
                    return false;
                }
            }
            else {
                setShowWarning(false);
                return true;
            }
        }

        addNewMetricValues();
        checkForThresholdVilation();

    }, [metricName, timestamp, value, threshold])

    return (
        <div className="grid  gap-1 p-8 border-2 border-olive-800 rounded-md mb-4">
            <h3>Sensor Metrics for {metricName}</h3>
            <div className=
                {`${ showWarning ? 'visible' : 'invisible' } 
                 p-8`}>

                <img className="inline" src="warning.png" width={'50px'} height={'50px'} />
                <span className="text-red-600">
                    Warning: Latest sensor metric is out of the allowed threshold range! 
                </span>
            </div>
            <LineChartComponent metricData={{
                metricName: metricName,
                recentValues: recentMetricValues,
                isInsideThreshold: !showWarning
            }} />
        </div>
    )
}
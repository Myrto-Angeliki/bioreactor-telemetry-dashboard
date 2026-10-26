"use client";

import { useEffect, useState } from "react";
import LineChartComponent from "./LineChartComponent";
import { SensorMetric, Threshold } from "../utils/custom-types";

export type SensorMetricProps = {
    metricName: string,
    timestamp: number,
    value: number,
    threshold: Threshold | undefined
}

function checkIfInsideThreshold(
    recentValues: SensorMetric[],
    threshold: Threshold | undefined
): boolean{
            const mostRecentValue: number | undefined = 
                recentValues[recentValues.length-1]?.value
            if(mostRecentValue != undefined && threshold != undefined) {
                if(mostRecentValue >= threshold.minimumAllowedValue && 
                    mostRecentValue <= threshold.maximumAllowedValue )
                    return true;
                else return false;
            }
            else return true;
        }

export default function SensorMetricComponent({ metricName, timestamp, value, threshold }: SensorMetricProps) {
    const [recentMetricValues, setRecentMetricValues] = useState<SensorMetric[]>([]);
    useEffect(() => {
        const addNewMetricValues = () => {
            //if(threshold != undefined) console.log(threshold.maximumAllowedValue)
            const metricValuesToAdd: SensorMetric[] = [...recentMetricValues];
            metricValuesToAdd.push(
                { metricName: metricName, timestamp: timestamp, value: value });
            if (recentMetricValues.length === 10)
                metricValuesToAdd.shift();
            setRecentMetricValues(metricValuesToAdd);
        }
        addNewMetricValues();
    }, [metricName, timestamp, value])
    return (
        <div className="grid  gap-1 pb-8">
            <h3>Sensor Metrics for {metricName}</h3>
            <LineChartComponent metricData={{ metricName: metricName, 
                recentValues: recentMetricValues, 
                isInsideThreshold: checkIfInsideThreshold(recentMetricValues, threshold) }} />
        </div>
    )
}
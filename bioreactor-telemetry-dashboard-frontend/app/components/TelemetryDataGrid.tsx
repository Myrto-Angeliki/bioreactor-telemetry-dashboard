"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { metricNames, SensorMetric, Telemetry, Thresholds, VESSEL_COUNT } from "../utils/custom-types";
import { fetchData } from "../utils/helper-funcs";
import VesselTelemetry from "./VesselTelemetry";

function getVesselThresholds(allThresholds: Thresholds[],
    vesselId: string) {
    const vesselThresholds = allThresholds.find((vesselThresholds) => {
        return vesselThresholds.vesselId === vesselId
    });
    if (vesselThresholds != undefined) {
        return vesselThresholds;
    }
    else return undefined;
}




type TelemetryDataGridProps = {
    startTime: number,
    thresholdsToEdit: Thresholds | undefined,
    setThresholdsToEdit: Dispatch<SetStateAction<Thresholds | undefined>>
}

export default function TelemetryDataGrid(props: TelemetryDataGridProps) {
    const [telemetryData, setTelemetryData] = useState<Telemetry[]>([]);
    const [allThresholds, setAllThresholds] = useState<Thresholds[]>([]);
    const [sensorMetrics, setSensorMetrics] = useState<SensorMetric[]>([]);
    

    useEffect(() => {
        const fetchTelemetryData = async () => {
            const telemetryDataResponse: Telemetry[] = [];

            for (let i = 0; i < VESSEL_COUNT; i++) {
                const sensorMetricsReceived: SensorMetric[] = [];

                const telemetry = await fetchData<Telemetry>(
                    `http://localhost:3001/api/vessels/BIO-00${i + 1}/telemetry`);

                const isoDate: Date = new Date(telemetry.timestamp);
                const timestampSec: number = Math.round(
                    (isoDate.getTime() - props.startTime)) / 1000; //Time in secs
                const metricValues: number[] = [
                    telemetry.pH, telemetry.temperature, telemetry.dissolvedOxygen];

                telemetryDataResponse.push(telemetry);

                for (let i = 0; i < metricValues.length; i++) {
                    sensorMetricsReceived.push({
                        metricName: metricNames[i],
                        timestamp: timestampSec,
                        value: metricValues[i]
                    })
                }
                setSensorMetrics(sensorMetricsReceived);
                //await delay(1000);
            }
            setTelemetryData(telemetryDataResponse);
        };

        setInterval(async () => {
            try {
                await fetchTelemetryData()
            }
            catch (err) {
                if (err instanceof Error) console.log(err.message);
                else console.log("error");
            }
        }, 3000);
    }, []);

    useEffect(() => {
            const fetchThresholdData = async () => {
                const thresholdsByVessel: Thresholds[] = [];
                for (let i = 0; i < VESSEL_COUNT; i++) {
                    const thresholds = await fetchData<Thresholds>(
                        `http://localhost:3001/api/vessels/BIO-00${i + 1}/thresholds`);
    
                    thresholdsByVessel.push(thresholds);
                }
                setAllThresholds(thresholdsByVessel);
            }
            fetchThresholdData()
        }, [props.thresholdsToEdit])

    return (
        <div>
            {telemetryData.map((telemetry) => {
                const thresholdsTemp: Thresholds | undefined =
                    getVesselThresholds(allThresholds, telemetry.vesselId);
                return (
                    <div key={telemetry.vesselId} >
                        <h2 className="text-center pt-12 text-2xl">
                            Sensor metrics for vessel: {telemetry.vesselId}
                        </h2>

                        <VesselTelemetry
                            thresholds={thresholdsTemp}
                            sensorMetrics={sensorMetrics}
                            thresholdsToEdit={props.thresholdsToEdit}
                            setThresholdsToEdit={props.setThresholdsToEdit}
                        />
                    </div>
                );
            })}
        </div>
    );

}

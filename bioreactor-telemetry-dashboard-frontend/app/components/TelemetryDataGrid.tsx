"use client";

import { useEffect, useState } from "react";
import { metricNames, SensorMetric, Telemetry, Thresholds, VESSEL_COUNT } from "../utils/custom-types";
import { fetchData } from "../utils/helper-funcs";
import VesselTelemetry from "./VesselTelemetry";

function getVesselThresholds(allThresholds: Thresholds[],
    vesselId: string) {
    const vesselThresholds = allThresholds.find((vesselThresholds) => {
        return vesselThresholds.vesselId === vesselId
    });
    if (vesselThresholds != undefined)
        {
            return vesselThresholds;
        } 
    else return undefined;
}

function handleThresholdsEditClick(isModalOpen: boolean, setIsModalOpen: (val: boolean) => void,
    setThresholdsToEdit: (thresholds: Thresholds | undefined) => void, 
    thresholdsTemp: Thresholds | undefined) 
    {
        if(!isModalOpen && thresholdsTemp != undefined) setThresholdsToEdit(thresholdsTemp);
        setIsModalOpen(!isModalOpen)
    }
                                

type TelemetryDataGridProps = {
    startTime: number
    setIsModalOpen: (val: boolean) => void,
    isModalOpen: boolean,
    setThresholdsToEdit: (thresholds: Thresholds | undefined) => void
}

export default function TelemetryDataGrid({ startTime, setThresholdsToEdit, setIsModalOpen, isModalOpen }: TelemetryDataGridProps) {
    const [telemetryData, setTelemetryData] = useState<Telemetry[]>([]);
    const [sensorMetrics, setSensorMetrics] = useState<SensorMetric[]>([]);
    const [allThresholds, setAllThresholds] = useState<Thresholds[]>([]);

    useEffect(() => {
        const fetchTelemetryData = async () => {
            const telemetryDataResponse: Telemetry[] = [];

            for (let i = 0; i < VESSEL_COUNT; i++) {
                const sensorMetricsReceived: SensorMetric[] = [];

                const telemetry = await fetchData<Telemetry>(
                    `http://localhost:3001/api/vessels/BIO-00${i + 1}/telemetry`);

                const isoDate: Date = new Date(telemetry.timestamp);
                const timestampSec: number = Math.round((isoDate.getTime() - startTime)) / 1000; //Time in secs
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

        const fetchThresholdData = async () => {
            const thresholdsByVessel: Thresholds[] = [];
            for (let i = 0; i < VESSEL_COUNT; i++) {
                const thresholds = await fetchData<Thresholds>(
                    `http://localhost:3001/api/vessels/BIO-00${i + 1}/thresholds`);

                thresholdsByVessel.push(thresholds);
                //console.log(`TelemetryDataGrid: ${thresholds}`);
            }
            setAllThresholds(thresholdsByVessel);
        }
        fetchThresholdData()
    }, []);

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
                        <button
                            className="cursor-pointer rounded-full bg-olive-800 text-olive-300 p-4 mx-2 right-0"
                            onClick={() => handleThresholdsEditClick(isModalOpen, setIsModalOpen,
                                setThresholdsToEdit, thresholdsTemp
                            )}
                            >
                        <span>Edit Thresholds</span>
                        </button>
                        <VesselTelemetry
                            thresholds={thresholdsTemp}
                            sensorMetrics={sensorMetrics}
                            setIsModalOpen={setIsModalOpen}
                            isModalOpen={isModalOpen}
                            setThresholdsToEdit={() => setThresholdsToEdit}
                        />
                    </div>
                );
            })}
        </div>
    );

}

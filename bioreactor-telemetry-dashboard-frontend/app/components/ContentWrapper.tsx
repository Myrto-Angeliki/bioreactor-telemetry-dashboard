"use client";

import { useEffect, useState } from "react";
import Sidebar from "./sidebar/SideBar";
import TelemetryDataGrid from "./TelemetryDataGrid";
import { Thresholds } from "../utils/custom-types";
import { UpdateThresholdsModal } from "./update-thresholds/UpdateThresholdsModal";

function returnCurrentTime(): number {
    const num: number = new Date().getTime()
    return num;
}

export function ContentWrapper() {
    const [startTime, setStartTime] = useState(0);

    useEffect(() => {
        const initStartTime = async () => {
            setStartTime(Date.now())
            await setTimeout('', 5000);
        }
        initStartTime();
    }, [])

    return (
        <>
            <h1 className="text-3xl font-bold text-center text-olive-800">
                Welcome to the Bioreactor Telemetry Dashboard
            </h1>
            <div>
                <Sidebar />
                <TelemetryDataGrid 
                    startTime={returnCurrentTime()} 
                />
            </div>
        </>
    )
} 
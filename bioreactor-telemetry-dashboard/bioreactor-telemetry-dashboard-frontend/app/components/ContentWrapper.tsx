"use client";

import { useEffect, useState } from "react";
import Sidebar from "./sidebar/SideBar";
import TelemetryDataGrid from "./TelemetryDataGrid";
import { Thresholds } from "../utils/custom-types";
import { UpdateThresholdsModal } from "./UpdateThresholdsModal";

function returnCurrentTime(): number {
    const num: number = new Date().getTime()
    return num;
}

export function ContentWrapper() {
    const [startTime, setStartTime] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [thresholdsToEdit, setThresholdsToEdit] = useState<Thresholds>();

    useEffect(() => {
        const initStartTime = async () => {
            setStartTime(Date.now())
            await setTimeout('', 15000);
        }
        initStartTime();
    }, [])

    return (
        <>
            <h1 className="text-3xl font-bold text-center text-olive-800">
                Welcome to the Bioreactor Telemetry Dashboard
            </h1>
            <div>
                <UpdateThresholdsModal 
                  isOpen={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                  thresholds={thresholdsToEdit} 
                  setThresholdsToEdit={setThresholdsToEdit} />
                <Sidebar />
                <TelemetryDataGrid startTime={returnCurrentTime()} 
                setIsModalOpen={setIsModalOpen} 
                isModalOpen={isModalOpen}
                setThresholdsToEdit={() => setThresholdsToEdit} />
            </div>
        </>
    )
} 
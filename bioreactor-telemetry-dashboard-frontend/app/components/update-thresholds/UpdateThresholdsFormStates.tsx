"use client";

import { Threshold, Thresholds } from "@/app/utils/custom-types"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { UpdateThresholdsFormBody } from "./UpdateThresholdsFormBody";

type UpdateThresholdsFormProps = {
    vesselId: string,
    onClose: () => void,
    thresholdsToEdit: Thresholds | undefined,
    setThresholdsToEdit: Dispatch<SetStateAction<Thresholds | undefined>>
}

export const UpdateThresholdsFormStates = (props: UpdateThresholdsFormProps) => {
    if(props.thresholdsToEdit == undefined) 
        return <p>404: Thresholds not found</p>

    const [updatedThresholds, setUpdatedThresholds] = useState(false);
    const [failedToUpdate, setFailedToUpdate] = useState(false);

    const [newPHThresholds, setNewPHThresholds] 
    = useState<Threshold>({
        metricName: 'pH',
        minimumAllowedValue: props.thresholdsToEdit.pHThreshold.minimumAllowedValue,
        maximumAllowedValue: props.thresholdsToEdit.pHThreshold.maximumAllowedValue});
    const [newTemperatureThresholds, setNewTemperatureThresholds] 
    = useState<Threshold>({
        metricName: 'temperature',
        minimumAllowedValue: props.thresholdsToEdit.temperatureThreshold.minimumAllowedValue,
        maximumAllowedValue: props.thresholdsToEdit.temperatureThreshold.maximumAllowedValue});
    const [newDissolvedOxygenThresholds, setNewDissolvedOxygenThresholds] 
    = useState<Threshold>({
        metricName: 'dissolvedOxygen',
        minimumAllowedValue: props.thresholdsToEdit.dissolvedOxygenThreshold.minimumAllowedValue,
        maximumAllowedValue: props.thresholdsToEdit.dissolvedOxygenThreshold.maximumAllowedValue});

    useEffect(() => {
        const updatePHThresholds = () => {
            if(props.thresholdsToEdit == undefined) return;
            setNewPHThresholds({
                metricName: 'pH',
                minimumAllowedValue: props.thresholdsToEdit.pHThreshold.minimumAllowedValue,
                maximumAllowedValue: props.thresholdsToEdit.pHThreshold.maximumAllowedValue});
        }
        const updateTemperatureThresholds = () => {
            if(props.thresholdsToEdit == undefined) return;
            setNewTemperatureThresholds({
                metricName: 'temperature',
                minimumAllowedValue: props.thresholdsToEdit.temperatureThreshold.minimumAllowedValue,
                maximumAllowedValue: props.thresholdsToEdit.temperatureThreshold.maximumAllowedValue});
        }
        const updateDissolvedOxygenThresholds = () => {
            if(props.thresholdsToEdit == undefined) return;
            setNewDissolvedOxygenThresholds({
                metricName: 'dissolvedOxygen',
                minimumAllowedValue: props.thresholdsToEdit.dissolvedOxygenThreshold.minimumAllowedValue,
                maximumAllowedValue: props.thresholdsToEdit.dissolvedOxygenThreshold.maximumAllowedValue});
        }

        updatePHThresholds();
        updateTemperatureThresholds();
        updateDissolvedOxygenThresholds();

    },[props.thresholdsToEdit])

    return (
        <UpdateThresholdsFormBody  
            vesselId={props.vesselId}
            onClose={props.onClose}
            newPHThresholds={newPHThresholds}
            setNewPHThresholds={setNewPHThresholds}
            newTemperatureThresholds={newTemperatureThresholds}
            setNewTemperatureThresholds={setNewTemperatureThresholds}
            newDissolvedOxygenThresholds={newDissolvedOxygenThresholds}
            setNewDissolvedOxygenThresholds={setNewDissolvedOxygenThresholds}
            thresholdsToEdit={props.thresholdsToEdit}
            setThresholdsToEdit={props.setThresholdsToEdit}
            updatedThresholds={updatedThresholds}
            setUpdatedThresholds={setUpdatedThresholds}
            failedToUpdate={failedToUpdate}
            setFailedToUpdate={setFailedToUpdate}
        />
    )
}
"use client";

import { Threshold, Thresholds, UpdateThresholdsFormBodyProps } from "@/app/utils/custom-types"

import './UpdateThresholdsForm.css'
import { Dispatch, SetStateAction } from "react";

const putThresholds = async (
    vesselId: string,
    newPHThresholds: Threshold,
    newTemperatureThresholds: Threshold,
    newDissolvedOxygenThresholds: Threshold,
    setThresholdsToEdit: Dispatch<SetStateAction<Thresholds | undefined>>,
    setUpdatedThresholds: Dispatch<SetStateAction<boolean>>,
    setFailedToUpdate: Dispatch<SetStateAction<boolean>>
) => {
        
    try {
        if(newPHThresholds.minimumAllowedValue < 0 || newPHThresholds.minimumAllowedValue > 14 
            || newPHThresholds.maximumAllowedValue < 0
            || newPHThresholds.maximumAllowedValue > 14) {
                setFailedToUpdate(true);
                setTimeout(() => {setFailedToUpdate(false)}, 3000);
                throw new Error("pH Threshold must be between 0 and 14")
            }
        if(newTemperatureThresholds.minimumAllowedValue < 9
            || newTemperatureThresholds.minimumAllowedValue > 50
            || newTemperatureThresholds.maximumAllowedValue < 9  
            || newTemperatureThresholds.maximumAllowedValue > 50) {
                setFailedToUpdate(true);
                setTimeout(() => {setFailedToUpdate(false)}, 3000);
                throw new Error("Temperature Threshold must be between 9 and 50")
            }
        if( newDissolvedOxygenThresholds.minimumAllowedValue < 0 
            || newDissolvedOxygenThresholds.minimumAllowedValue > 1 
            || newDissolvedOxygenThresholds.maximumAllowedValue < 0
            || newDissolvedOxygenThresholds.maximumAllowedValue > 1) {
                setFailedToUpdate(true);
                setTimeout(() => {setFailedToUpdate(false)}, 3000);
                throw new Error("Dissolved Oxygen Threshold must be between 0% and 100%")
            }
        
            const response = await fetch(`http://localhost:3001/api/vessels/${vesselId}/thresholds`, {
            method: "PUT",
            body: JSON.stringify({
                newThresholds: [
                    newPHThresholds,
                    newTemperatureThresholds,
                    newDissolvedOxygenThresholds
                ]
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            console.log("OKAY");
            setUpdatedThresholds(true);
            const data = await response.json();
            console.log("putThresholds - thresholds updated", data);
            setThresholdsToEdit({
                vesselId: vesselId,
                pHThreshold: newPHThresholds,
                temperatureThreshold: newTemperatureThresholds,
                dissolvedOxygenThreshold: newDissolvedOxygenThresholds
            });
            setTimeout(() => {setUpdatedThresholds(false)}, 3000);
        } else {
            console.log("NOT OKAY");
            const data = await response.json();
            console.log("putData - data NOT updated", data);
        }
    } catch (error) {
        console.error("Error", error);
    }
};


export function UpdateThresholdsFormBody(props: UpdateThresholdsFormBodyProps) {
    return (
        <div className="update-thresholds-modal-styles">
            <div>
                <button className='close-btn'
                    onClick={props.onClose}
                >&times;</button>
                <h2>Enter the new values and click on Update to change the thresholds for {props.vesselId}.</h2>
                <br />
            </div>

            <div className="my-10 border-2 border-olive-300 rounded-md bg-olive-600">
                <div className="my-4">
                    <p className="my-2">Update pH thresholds</p>
                    <input className="bg-olive-100 text-black mt-2 pl-4"
                        placeholder={
                            `Current minimum: ${props.newPHThresholds.minimumAllowedValue}`}
                        type='number'
                        onChange={(event) => {
                            const stringTyped: string = (event.target.value);
                            const newPHThresholds: Threshold = {
                                metricName: 'pH',
                                minimumAllowedValue: (stringTyped=='' ? props.thresholdsToEdit.pHThreshold.minimumAllowedValue : Number(stringTyped)),
                                maximumAllowedValue: props.newPHThresholds.maximumAllowedValue
                            }
                            props.setNewPHThresholds(newPHThresholds);
                        }}
                        // onKeyDown={(e) => {
                        //     e.key === 'Enter' && 
                        // }}
                    />
                    <input className="bg-olive-100 text-black mt-2 pl-4"
                        placeholder={
                            `Current maximum: ${props.newPHThresholds.maximumAllowedValue}`}
                        type='number'
                        onChange={(event) => {
                            const stringTyped: string = (event.target.value);
                            const newPHThresholds: Threshold = {
                                metricName: 'pH',
                                minimumAllowedValue: props.newPHThresholds.minimumAllowedValue,
                                maximumAllowedValue: (stringTyped=='' ? props.thresholdsToEdit.pHThreshold.maximumAllowedValue : Number(stringTyped))
                            }
                            props.setNewPHThresholds(newPHThresholds);
                        }}
                    />
                </div>
                <div className="my-4">
                    <p className="my-2">Update temperature thresholds</p>
                    <input className="bg-olive-100 text-black mt-2 pl-4"
                        placeholder={
                            `Current minimum: ${props.newTemperatureThresholds.minimumAllowedValue}`}
                        type='number'
                        onChange={(event) => {
                            const stringTyped: string = (event.target.value);
                            const newTemperatureThresholds: Threshold = {
                                metricName: 'temperature',
                                minimumAllowedValue: (stringTyped=='' ? props.thresholdsToEdit.temperatureThreshold.minimumAllowedValue : Number(stringTyped)),
                                maximumAllowedValue: props.newTemperatureThresholds.maximumAllowedValue
                            }
                            props.setNewTemperatureThresholds(newTemperatureThresholds);
                        }}
                    />
                    <input className="bg-olive-100 text-black mt-2 pl-4"
                        placeholder={
                            `Current maximum: ${props.newTemperatureThresholds.maximumAllowedValue}`}
                        type='number'
                        onChange={(event) => {
                            const stringTyped: string = (event.target.value);
                            const newTemperatureThresholds: Threshold = {
                                metricName: 'temperature',
                                minimumAllowedValue: props.newTemperatureThresholds.minimumAllowedValue,
                                maximumAllowedValue: (stringTyped=='' ? props.thresholdsToEdit.temperatureThreshold.maximumAllowedValue : Number(stringTyped))
                            }
                            props.setNewTemperatureThresholds(newTemperatureThresholds);
                        }}
                    />
                </div>
                <div className="my-4">
                    <p className="my-2">Update dissolved Oxygen thresholds</p>
                    <input className="bg-olive-100 text-black mt-2 pl-4"
                        placeholder={
                            `Current minimum: ${props.newDissolvedOxygenThresholds.minimumAllowedValue*100}%`}
                        type='number'
                        onChange={(event) => {
                            const stringTyped: string = (event.target.value);
                            const newDissolvedOxygenThresholds: Threshold = {
                                metricName: 'dissolvedOxygen',
                                minimumAllowedValue: (stringTyped=='' ? props.thresholdsToEdit.dissolvedOxygenThreshold.minimumAllowedValue : Number(stringTyped)/100),
                                maximumAllowedValue: props.newDissolvedOxygenThresholds.maximumAllowedValue
                            }
                            props.setNewDissolvedOxygenThresholds(newDissolvedOxygenThresholds);
                        }}
                    />
                    <input className="bg-olive-100 text-black mt-2 pl-4"
                        placeholder={
                            `Current maximum: ${props.newDissolvedOxygenThresholds.maximumAllowedValue*100}%`}
                        type='number'
                        onChange={(event) => {
                            const stringTyped: string = (event.target.value);
                            const newDissolvedOxygenThresholds: Threshold = {
                                metricName: 'dissolvedOxygen',
                                minimumAllowedValue: props.newDissolvedOxygenThresholds.minimumAllowedValue,
                                maximumAllowedValue: (stringTyped=='' ? props.thresholdsToEdit.dissolvedOxygenThreshold.maximumAllowedValue : Number(stringTyped)/100)
                            }
                            props.setNewDissolvedOxygenThresholds(newDissolvedOxygenThresholds);
                        }}
                    />
                </div>
            </div>
            <div>
                <span>{props.updatedThresholds && 'Updated thresholds!'}</span>
                <span>{props.failedToUpdate && 'Failed to update thresholds!'}</span>
                <button className='update-thresholds-input-button mx-2'
                    onClick={() => {
                        putThresholds(
                            props.vesselId,
                            props.newPHThresholds,
                            props.newTemperatureThresholds,
                            props.newDissolvedOxygenThresholds,
                            props.setThresholdsToEdit,
                            props.setUpdatedThresholds,
                            props.setFailedToUpdate
                        );
                    }}> Update </button>
                <button className='update-thresholds-input-button'
                    onClick={props.onClose}> Back</button>
            </div>
        </div>
    )
}
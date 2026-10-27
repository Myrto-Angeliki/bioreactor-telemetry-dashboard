"use client";

import { AuditLogs} from "../../utils/custom-types";

export const AuditLog = ({timestamp, oldThreshHoldValues, newThreshHoldValues}: AuditLogs) => {

    return (
        <div className="p-4">
            <h4>Vessel Id: {newThreshHoldValues.vesselId}</h4>
            <span> Time of update: {timestamp} </span>

            <h5>Old Threshold Values</h5>
            <span> pH min: {oldThreshHoldValues.pHThreshold.minimumAllowedValue} </span>
            <span> pH max: {oldThreshHoldValues.pHThreshold.maximumAllowedValue} </span> 

            <span> temperature min: {oldThreshHoldValues.temperatureThreshold.minimumAllowedValue} </span>
            <span> temperature max: {oldThreshHoldValues.temperatureThreshold.maximumAllowedValue} </span>
            
            <span> dissolved Oxygen min: {oldThreshHoldValues.dissolvedOxygenThreshold.minimumAllowedValue} </span>
            <span> dissolved Oxygen max: {oldThreshHoldValues.dissolvedOxygenThreshold.maximumAllowedValue} </span>
            
            
            <h5>New Threshold Values</h5>
            <span> pH min: {newThreshHoldValues.pHThreshold.minimumAllowedValue} </span>
            <span> pH max: {newThreshHoldValues.pHThreshold.maximumAllowedValue} </span> 
            
            <span> temperature min: {newThreshHoldValues.temperatureThreshold.minimumAllowedValue} </span>
            <span> temperature max: {newThreshHoldValues.temperatureThreshold.maximumAllowedValue} </span>
            
            <span> dissolved Oxygen min: {newThreshHoldValues.dissolvedOxygenThreshold.minimumAllowedValue} </span>
            <span> dissolved Oxygen max: {newThreshHoldValues.dissolvedOxygenThreshold.maximumAllowedValue} </span>
            <hr className="my-2"/>
        </div>
    );
}
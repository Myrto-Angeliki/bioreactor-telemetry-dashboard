"use client";

import { AuditLogs } from "../../utils/custom-types";
import { LogTable } from "./LogTable";

export const AuditLog = (props: AuditLogs) => {
    return (
        <div className="p-4">
            <h3 className="text-xl font-bold ">Vessel Id: {props.newThreshHoldValues.vesselId}</h3>
            <span> Time of update: {props.timestamp} </span>

            <h4 className="text-lg font-bold mt-2"> Old Threshold Values</h4>
            <LogTable threshHoldValues={props.oldThreshHoldValues}></LogTable>

            <h4 className="text-lg font-bold">New Threshold Values</h4>
            <LogTable threshHoldValues={props.newThreshHoldValues}></LogTable>

            <hr className="my-2" />
        </div>
    );
}
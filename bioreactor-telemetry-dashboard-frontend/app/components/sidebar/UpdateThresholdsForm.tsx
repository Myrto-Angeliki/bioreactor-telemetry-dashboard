"use client";

import { Thresholds } from "@/app/utils/custom-types"
import { useState } from "react"

type UpdateThresholdsFormProps = {
    onClose: () => void,
    thresholds: Thresholds | undefined,
    setThresholdsToEdit: (thresholds: Thresholds) => void
}

export const UpdateThresholdsForm = ({ onClose, thresholds, setThresholdsToEdit }: UpdateThresholdsFormProps) => {
    console.log(thresholds)
    
    
    return <>
        <div >
            <button className='cursor-pointer'
                onClick={onClose}
            >&times;</button>
            <h2>Enter the new values and click on Update to change the thresholds for this vessel.</h2>
            <input
                placeholder={`${thresholds && thresholds.pHThreshold.minimumAllowedValue}`}
                type='text'
                //onChange={(event) => setKeyText(event.target.value)}

            />
            <input
                placeholder={`${thresholds && thresholds!.pHThreshold.minimumAllowedValue}`}
                type='number'
                //onChange={(event) => setResponseText(event.target.value)}

            />
             <button className='input-button mx-2 cursor-pointer'
                onClick={() => {
                    onClose()
                }}> Update </button> 
            <button className='input-button mx-2 cursor-pointer'
                onClick={onClose}> Back</button>
        </div>
    </>
}
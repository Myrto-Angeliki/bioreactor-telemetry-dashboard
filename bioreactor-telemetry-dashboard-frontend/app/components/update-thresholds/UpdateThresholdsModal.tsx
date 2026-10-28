import { Dispatch, SetStateAction } from "react";
import { Thresholds } from "../../utils/custom-types";
import { UpdateThresholdsFormStates } from "./UpdateThresholdsFormStates";

type UpdateThresholdsModalProps = {
    vesselId: string,
    isOpen: boolean,
    onClose: () => void,
    thresholdsToEdit: Thresholds | undefined,
    setThresholdsToEdit: Dispatch<SetStateAction<Thresholds | undefined>>
}

export function UpdateThresholdsModal(props :UpdateThresholdsModalProps){
    if(!props.isOpen) return null

    return (
        <UpdateThresholdsFormStates 
        vesselId={props.vesselId}
        onClose={props.onClose}
        thresholdsToEdit={props.thresholdsToEdit}
        setThresholdsToEdit={props.setThresholdsToEdit} />
    );
}
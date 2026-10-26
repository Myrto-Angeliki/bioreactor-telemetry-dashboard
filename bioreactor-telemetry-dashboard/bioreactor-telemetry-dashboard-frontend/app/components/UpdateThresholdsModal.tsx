import { Thresholds } from "../utils/custom-types";
import { UpdateThresholdsForm } from "./sidebar/UpdateThresholdsForm";

type UpdateThresholdsModalProps = {
    isOpen: boolean,
    onClose: () => void,
    thresholds: Thresholds | undefined,
    setThresholdsToEdit: (thresholds: Thresholds | undefined) => void
}

export function UpdateThresholdsModal({isOpen, onClose, thresholds, setThresholdsToEdit}:UpdateThresholdsModalProps){
    if(!isOpen) return null
    return (
        <UpdateThresholdsForm onClose={onClose}
        thresholds={thresholds}
        setThresholdsToEdit={setThresholdsToEdit} />
    );
}
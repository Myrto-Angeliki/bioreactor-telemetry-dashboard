import { Thresholds } from "../constants/vessel-constants.js";

export class AuditLog {
    private timestamp: string;
    private oldThreshHoldValues: Thresholds;
    private newThreshHoldValues: Thresholds;

    constructor(oldThreshHoldValues: Thresholds, 
        newThreshHoldValues: Thresholds
    ) {
        this.oldThreshHoldValues = oldThreshHoldValues;
        this.newThreshHoldValues = newThreshHoldValues;
        this.timestamp = new Date().toISOString();
    }
}

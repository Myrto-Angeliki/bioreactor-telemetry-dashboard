import { BadRequestException, Injectable } from '@nestjs/common';
import { AuditLog } from './audit-log.js';
import { Threshold } from '../threshold/threshold.js';
import { Thresholds } from '../constants/vessel-constants.js';

@Injectable()
export class AuditLogService {
    
    public auditLogs: AuditLog[];

    constructor() {
        this.auditLogs = [];
    }

    findAll() {
        return this.auditLogs;
    }

    addAuditLog(oldThresholdValues: Thresholds, newThreshHoldValues: Thresholds) {
        const newAuditLog = new AuditLog(
            oldThresholdValues,
            newThreshHoldValues
        );
        this.auditLogs.push(newAuditLog);
        console.log(this.auditLogs);
        return this.auditLogs;
    }
}

"use client";

import { useEffect, useState } from 'react';
import { AuditLogs, Thresholds } from '@/app/utils/custom-types';
import { fetchData } from '@/app/utils/helper-funcs';
import { AuditLog } from './AuditLog';
import './Sidebar.css';




export default function Sidebar({thresholdsToEdit}: {thresholdsToEdit: Thresholds | undefined}) {
    const [isOpen, setIsOpen] = useState(false);
    const [auditLogs, setAuditLogs] = useState<AuditLogs[]>([]);

    useEffect(() => {
        const handleSidebar = async () => {
            if (isOpen) {
                const auditLogData = await fetchData<AuditLogs[]>(
                    'http://localhost:3001/api/audit-logs');

                //console.log(JSON.stringify(auditLogData));

                if (auditLogs.length > 10){
                    setAuditLogs((auditLogData.splice(-10,-1).toReversed()));
                }
                else
                    setAuditLogs(auditLogData.toReversed());
            }
            else {
                setAuditLogs([]);
            }
        }
        handleSidebar();
    }, [isOpen, thresholdsToEdit]);


    return (
        <section className="flex pt-8 ">
            <div className={`sidebar ${isOpen ? 'sidebarOpen' : 'sidebarClosed'}`}>
                <h1 className="text-3xl font-bold py-5 underline decoration-2">10 Most recent threshold changes</h1>
                {auditLogs.map((auditLog) => {
                    return (
                        <AuditLog key={auditLog.timestamp}
                            timestamp={auditLog.timestamp} 
                            oldThreshHoldValues={auditLog.oldThreshHoldValues}
                            newThreshHoldValues={auditLog.newThreshHoldValues} 
                        />
                    );
                })}
            </div>
            <div >
                <button
                    className= {
                        `cursor-pointer rounded-full fixed border-2
                        z-900 ${isOpen ? 'close-btn-open' : 'close-btn-closed'} 
                        ${isOpen ? 'bg-red-900' : 'bg-olive-600'}
                        ${isOpen ? 'text-red-100' : 'text-olive-200'}`
                    }
                    onClick={() => setIsOpen(!isOpen)}
                    >
                    {isOpen ? (<span>&times;</span>)
                        : (<span>Show Logs</span>)}
                </button>
            </div>
        </section>
    );
}
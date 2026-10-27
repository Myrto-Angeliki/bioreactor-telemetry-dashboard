"use client";

import { useEffect, useState } from 'react';
import './Sidebar.css';
import { AuditLogs } from '@/app/utils/custom-types';
import { fetchData } from '@/app/utils/helper-funcs';
import { AuditLog } from './AuditLog';

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const [sidebarWidth, setSidebarWidth] = useState(16);
    const [auditLogs, setAuditLogs] = useState<AuditLogs[]>([]);

    useEffect(() => {
        const handleSidebar = async () => {
            if (isOpen) {
                setSidebarWidth(16);

                const auditLogData = await fetchData<AuditLogs[]>(
                    'http://localhost:3001/api/audit-logs');

                console.log(auditLogs);

                if (auditLogs.length > 10)
                    setAuditLogs(auditLogData.splice(-10));
                else
                    setAuditLogs(auditLogData);
            }
            else {
                setSidebarWidth(0);
                setAuditLogs([]);
            }
        }
        handleSidebar();
    }, [isOpen]);

    return (
        <section className="flex pt-8">
            <div className={isOpen ? "border-2": "border-0"}>
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
                    className="cursor-pointer rounded-full bg-olive-600 text-olive-200 p-4 mx-2"
                    onClick={() => setIsOpen(!isOpen)}
                    style={{
                        left: isOpen ? `calc(${sidebarWidth}px + 20px)` : '20px'
                    }} >
                    {isOpen ? (<span>Close Logs</span>)
                        : (<span>Show Logs</span>)}
                </button>
            </div>
        </section>
    );
}
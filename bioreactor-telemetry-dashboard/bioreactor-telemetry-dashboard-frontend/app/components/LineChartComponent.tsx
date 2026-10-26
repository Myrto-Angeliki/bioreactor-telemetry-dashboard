"use client";

import { Label, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { SensorMetric, Threshold } from '../utils/custom-types'

type LineChartComponentProps = {
    metricData: {
        metricName: string,
        recentValues: SensorMetric[],
        isInsideThreshold: boolean
    }
}

interface ValidLineProps {
    isInsideThreshold: boolean
}

const ValidLine = ({ isInsideThreshold}: ValidLineProps) => {
            return <Line type="monotone" dataKey="value" stroke="#8884d8"
                    dot={{r:4,  fill:isInsideThreshold ? "#65ff65" : "#ff4444", strokeWidth:1}} />

    };


export function LineChartComponent({ metricData }: LineChartComponentProps) {
    if (!metricData.recentValues?.length) return <p>Loading…</p>;

    return (

        <ResponsiveContainer width="100%" height={300}>
            <LineChart
                data={metricData.recentValues}>
                <XAxis dataKey="timestamp" />
                <Label value="Time (sec)" offset={0} position="centerBottom" />
                <YAxis />
                <Tooltip />
                <ValidLine isInsideThreshold={metricData.isInsideThreshold} />
            </LineChart>
        </ResponsiveContainer>
    )
}

export default LineChartComponent;
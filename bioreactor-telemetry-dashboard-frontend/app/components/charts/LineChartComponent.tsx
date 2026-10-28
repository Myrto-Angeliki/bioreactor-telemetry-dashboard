"use client";

import { Label, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { SensorMetric, Threshold } from '../../utils/custom-types'
import { CustomTooltip } from './CustomTooltip';

type LineChartComponentProps = {
    metricData: {
        metricName: string,
        recentValues: SensorMetric[],
        isInsideThreshold: boolean
    }
}

export function LineChartComponent({ metricData }: LineChartComponentProps) {
    if (!metricData.recentValues?.length) return <p>Loading…</p>;

    return (

        <ResponsiveContainer width="100%" height={300}>
            <LineChart
                data={metricData.recentValues}>
                <XAxis dataKey="timestamp" />
                <Label value="Time (sec)" offset={0} position="centerBottom" />
                <YAxis />
                <Tooltip content={(props) => (
                    <CustomTooltip {...props} isInsideThreshold={metricData.isInsideThreshold} />
                )} />
                <Line type="monotone" dataKey="value" stroke="#8884d8"
                    dot={{r:4,  fill: "#4444ff", strokeWidth:1}} />
            </LineChart>
        </ResponsiveContainer>
    )
}

export default LineChartComponent;
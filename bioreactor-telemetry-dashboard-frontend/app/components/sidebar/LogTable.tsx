import { Thresholds } from "@/app/utils/custom-types";

type LogTableProps = {
    threshHoldValues: Thresholds
}

export function LogTable({ threshHoldValues }: LogTableProps) {
    return (
        <div className="flex justify-center ">
            <table className="">
                <thead>
                    <tr>
                        <th>Metric Name</th>
                        <th>Minimum</th>
                        <th>Maximum</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>pH</td>
                        <td>{threshHoldValues.pHThreshold.minimumAllowedValue}</td>
                        <td>{threshHoldValues.pHThreshold.maximumAllowedValue}</td>
                    </tr>
                    <tr>
                        <td>Temperature</td>
                        <td>{threshHoldValues.temperatureThreshold.minimumAllowedValue}</td>
                        <td>{threshHoldValues.temperatureThreshold.maximumAllowedValue}</td>
                    </tr>
                    <tr>
                        <td>Dissolved Oxygen</td>
                        <td>{threshHoldValues.dissolvedOxygenThreshold.minimumAllowedValue}</td>
                        <td>{threshHoldValues.dissolvedOxygenThreshold.maximumAllowedValue}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
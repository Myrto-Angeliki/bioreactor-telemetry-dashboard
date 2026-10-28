
import { CustomTooltipProps } from "@/app/utils/custom-types"


export const CustomTooltip = (
  {payload, active, contentStyle, label, isInsideThreshold} : CustomTooltipProps) => {
  const firstPayload = payload?.[0];
  const isVisible = active && firstPayload != null;
  return (
    <div
      className="custom-tooltip"
      style={{
        ...contentStyle,
        visibility: isVisible ? 'visible' : 'hidden',
      }}
    >
      {isVisible && (
        <>
          <p className="label">{`Value ${firstPayload.value} at time ${label} sec`}</p>
          <p className={`desc ${isInsideThreshold ? 'text-green-600': 'text-red-600'}`}>
          {isInsideThreshold 
            ? 'The value is inside the allowed range' 
            : 'Warning: The value is out of the allowed range'}
          </p>
        </>
      )}
    </div>
  );
};
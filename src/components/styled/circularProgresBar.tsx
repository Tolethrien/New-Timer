import styled from "styled-components";

//=======TYPES========

interface CircularProps {
  config: {
    /** width and height of element in rem*/
    size: string;
    /**stroke width of back circle in rem*/
    trackWidth: string;
    /** hsla  of back circle*/
    trackColor: string;
    /**stroke width of front circle in rem*/
    indicatorWidth: string;
    /** hsla  of front circle */
    indicatorColor: string;
    /** line cap of front circle*/
    indicatorCap: "inherit" | "butt" | "round" | "square";
    /** glow effect on back circle
     * @optional
     */
    glow?: {
      /**@desc strength of glow "aura" in pixels */
      strength: number;
      /**@desc hsla of glow */
      color: string;
    };
    /** font data of children element(center text)
     * @optional
     */
    text?: {
      /** @desc font family. @default "inherit" */
      family?: string;
      /** @desc font size. @default "1rem" */
      size?: number;
      /** @desc background with color. @default false */
      background?: boolean;
      /** @desc background color. @default hsla(0,0%,0%,0.5) */
      backgroundColor?: string;
      /** @desc background backblur. @default 0 (none) */
      backBlur?: number;
      /** @desc padding-block in rems. @default 0 (none) */
      paddingBlock?: number;
    };
  };
  /**children element e.g. Text in center of component */
  children?: React.ReactNode;
  /**percent of complition*/
  progress: number;
}

//=======COMPONENT========
/**
 *@desc costomize circular progress bar with text
 * @param config configuration data
 * @param  children displayed text on center
 * @param  progress percent of complition
 * @returns JSX
 */
const CircularProgressBar: React.FC<CircularProps> = ({
  config,
  children,
  progress,
}) => {
  const {
    size,
    trackWidth,
    trackColor,
    indicatorWidth,
    indicatorColor,
    indicatorCap,
    glow,
    text,
  } = config;
  // center position of svg element
  const componentCenter = `${size}/2`;

  const radius = `${size}/2 - ${
    trackWidth > indicatorWidth ? trackWidth : indicatorWidth
  }/2`;
  const strokeDasharray = `2 *  ${Math.PI} * (${size}/2 - ${indicatorWidth}/2)`;
  const strokeDashoffset = `(${strokeDasharray}) * ((100 - ${progress}) / 100)`;
  return (
    <>
      <ComponentBody width={size} height={size} glow={glow}>
        <SvgClock width="100%" height="100%">
          <CirclePath
            cx={`calc(${componentCenter})`}
            cy={`calc(${componentCenter})`}
            r={`calc(${radius})`}
            stroke={trackColor}
            strokeWidth={trackWidth}
          />
          <CirclePath
            cx={`calc(${componentCenter})`}
            cy={`calc(${componentCenter})`}
            r={`calc(${radius})`}
            stroke={indicatorColor}
            strokeWidth={indicatorWidth}
            strokeDasharray={`calc(${strokeDasharray})`}
            strokeDashoffset={`calc(${strokeDashoffset})`}
            strokeLinecap={indicatorCap}
          />
        </SvgClock>
        <TimerOnCenter
          fontFamily={text?.family ?? "inherit"}
          fontSize={text?.size ?? 1}
          background={text?.background ?? false}
          backgroundColor={text?.backgroundColor ?? "hsla(0,0%,0%,0.5)"}
          backBlur={text?.backBlur ?? 0}
          paddingBlock={text?.paddingBlock ?? 0}
        >
          {children}
        </TimerOnCenter>
      </ComponentBody>
    </>
  );
};
export default CircularProgressBar;

//=======STYLES========

const ComponentBody = styled.div<{
  width: string;
  height: string;
  glow?: { strength: number; color: string };
}>`
  position: relative;
  border-radius: 100%;
  box-sizing: border-box;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  ${({ glow }) =>
    glow && `filter: drop-shadow(0px 0px ${glow.strength}px ${glow.color})`};
`;

const SvgClock = styled.svg`
  position: absolute;
  vertical-align: middle;
  transform: rotate(-90deg);
  overflow: visible;
  z-index: 2;
`;
const CirclePath = styled.circle`
  fill: transparent;
`;

const TimerOnCenter = styled.p<{
  fontFamily: string;
  fontSize: number;
  background: boolean;
  backgroundColor: string;
  backBlur: number;
  paddingBlock: number;
}>`
  width: 100%;
  background-color: ${({ background, backgroundColor }) =>
    background && backgroundColor};
  backdrop-filter: ${({ backBlur }) => `blur(${backBlur}px)`};
  overflow: hidden;
  text-align: center;
  font-family: ${({ fontFamily }) => fontFamily};
  font-size: ${({ fontSize }) => fontSize}rem;
  padding-block: ${({ paddingBlock }) => paddingBlock}rem;
`;

import styled from "styled-components";

//=======TYPES========

interface CircularProps {
  config: {
    /** width and height of element in pixels*/
    size: number;
    /**stroke width of back circle*/
    trackWidth: number;
    /** hsla hue of back circle*/
    trackHue: number;
    /**stroke width of front circle*/
    indicatorWidth: number;
    /** hsla hue of front circle */
    indicatorHue: number;
    /** line cap of front circle*/
    indicatorCap: "inherit" | "butt" | "round" | "square";
    /** glow effect on back circle
     * @optional
     */
    glow?: {
      /**@desc strength of glow "aura" in pixels */
      strength: number;
      /**@desc hsla hue of glow */
      hue: number;
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
      /** @desc background opacity. @default 1 (none) */
      opacity?: number;
      /** @desc background backblur. @default 0 (none) */
      backBlur?: number;
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
    trackHue,
    indicatorWidth,
    indicatorHue,
    indicatorCap,
    glow,
    text,
  } = config;
  // center position of svg element
  const center = size / 2;
  //radius of circles
  const radius =
    center -
    (trackWidth > indicatorWidth ? trackWidth / 2 : indicatorWidth / 2);
  // filling of "Full" circles
  const dashArray = 2 * Math.PI * radius;
  // filling of front circle based on progress
  const dashOffset = dashArray * ((100 - progress) / 100);

  return (
    <>
      <ComponentBody width={size} height={size} glow={glow}>
        <SvgClock width={size} height={size}>
          <CirclePath
            cx={center}
            cy={center}
            r={radius}
            stroke={`hsla(${trackHue}, 70%, 60%, 1)`}
            strokeWidth={trackWidth}
          />
          <CirclePath
            cx={center}
            cy={center}
            r={radius}
            stroke={`hsla(${indicatorHue}, 70%, 60%, 1)`}
            strokeWidth={indicatorWidth}
            strokeDasharray={dashArray}
            strokeDashoffset={dashOffset}
            strokeLinecap={indicatorCap}
          />
        </SvgClock>
        <TimerOnCenter
          backgroundColor={trackHue}
          fontFamily={text?.family ?? "inherit"}
          fontSize={text?.size ?? 1}
          background={text?.background ?? false}
          opacity={text?.opacity ?? 1}
          backBlur={text?.backBlur ?? 0}
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
  width: number;
  height: number;
  glow?: { strength: number; hue: number };
}>`
  position: relative;
  border-radius: 100%;
  border: 1px solid black;
  box-sizing: border-box;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  ${({ glow }) =>
    glow &&
    `filter: drop-shadow(0px 0px ${glow.strength}px hsla(${glow.hue}, 100%, 50%,0.5))`};
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
  backgroundColor: number;
  opacity: number;
  backBlur: number;
}>`
  width: 100%;
  background-color: ${({ background, backgroundColor, opacity }) =>
    background && `hsla(${backgroundColor}, 70%, 60%, ${opacity})`};
  backdrop-filter: ${({ backBlur }) => `blur(${backBlur}px)`};
  overflow: hidden;
  text-align: center;
  font-family: ${({ fontFamily }) => fontFamily};
  font-size: ${({ fontSize }) => fontSize}rem;
`;

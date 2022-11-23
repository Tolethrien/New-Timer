import styled, { css } from "styled-components";

//=======TYPES========

interface CircularProps {
  config: {
    /** width and height of element in pixels*/
    size: number;
    /**stroke width of back circle*/
    trackWidth: number;
    /** color of back circle*/
    trackColor: string;
    /**stroke width of front circle*/
    indicatorWidth: number;
    /** color of front circle */
    indicatorColor: string;
    /** line cap of front circle*/
    indicatorCap: "inherit" | "butt" | "round" | "square";
    /** glow effect on back circle
     * @optional
     * @param strength strength of glow "aura" in pixels
     * @param color color of glow
     */
    glow?: { strength: number; color: string };
    /** font data of children element(center text)
     * @optional
     * @param family font family
     * @param size font size in em
     */
    font?: { family: string; size: number };
  };
  /**children element e.g. Text in center of component */
  children?: React.ReactNode;
  /**percent of complition*/
  progress: number;
}
interface CircleStyle {
  cx: number;
  cy: number;
  r: number;
  stroke: string;
  strokeWidth: number;
  strokeDasharray?: number;
  strokeDashoffset?: number;
  strokeLinecap?: string;
  glow?: { strength: number; color: string };
}

//=======COMPONENT========
/**
 *@desc costomize circular progress bar with text
 * @param {Object} config configuration data
 * @param {text} children displayed text on center
 * @param {number} progress percent of complition
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
    font,
  } = config;
  // center position of svg element
  const center = size / 2;
  //radius of circles
  const radius =
    center - (trackWidth > indicatorWidth ? trackWidth : indicatorWidth);
  // filling of "Full" circles
  const dashArray = 2 * Math.PI * radius;
  // filling of front circle based on progress
  const dashOffset = dashArray * ((100 - progress) / 100);

  return (
    <>
      <Wrap width={size} height={size}>
        <SvgCircle width={size} height={size}>
          <CirclePath
            cx={center}
            cy={center}
            r={radius}
            stroke={trackColor}
            strokeWidth={trackWidth}
            glow={glow}
          />
          <CirclePath
            cx={center}
            cy={center}
            r={radius}
            stroke={indicatorColor}
            strokeWidth={indicatorWidth}
            strokeDasharray={dashArray}
            strokeDashoffset={dashOffset}
            strokeLinecap={indicatorCap}
          />
        </SvgCircle>
        <Time
          fontFamily={font ? font.family : "inherit"}
          fontSize={font ? font.size : 1}
        >
          <span>{children}</span>
        </Time>
      </Wrap>
    </>
  );
};
export default CircularProgressBar;

//=======STYLES========

const Wrap = styled.div<{ width: number; height: number }>`
  position: relative;
  display: flex;
  justify-content: center;
`;
const SvgCircle = styled.svg<{ width: number; height: number }>`
  vertical-align: middle;
  transform: rotate(-90deg);
  overflow: visible;
`;
const CirclePath = styled.circle<CircleStyle>`
  fill: transparent;
  ${({ glow }) =>
    glow && `filter: drop-shadow(0px 0px ${glow!.strength}px ${glow!.color})`};
`;
const Time = styled.div<{ fontFamily: string; fontSize: number }>`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-family: ${({ fontFamily }) => fontFamily};
  font-size: ${({ fontSize }) => fontSize}em;
`;

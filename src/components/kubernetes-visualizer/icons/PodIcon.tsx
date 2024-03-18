import { SVGProps, memo } from "react";

interface SVGRProps {
  title?: string;
  titleId?: string;
  fillColor?: string;
}
const _PodIcon = ({
  title,
  titleId,
  fillColor = "#326ce5",
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 18.035 17.5"
    aria-labelledby={titleId}
    {...props}
  >
    <path
      d="M-6.85 4.272a1.12 1.11 0 0 0-.428.109l-5.852 2.796a1.12 1.11 0 0 0-.606.753l-1.444 6.282a1.12 1.11 0 0 0 .152.85 1.12 1.11 0 0 0 .064.089l4.05 5.037a1.12 1.11 0 0 0 .876.417l6.496-.001a1.12 1.11 0 0 0 .875-.417l4.049-5.038a1.12 1.11 0 0 0 .216-.939L.152 7.93a1.12 1.11 0 0 0-.605-.753L-6.307 4.38a1.12 1.11 0 0 0-.542-.109Z"
      style={{
        fill: fillColor,
        fillOpacity: 1,
        stroke: "none",
        strokeWidth: 0,
        strokeMiterlimit: 4,
        strokeDasharray: "none",
        strokeOpacity: 1,
      }}
      transform="matrix(1.01489 0 0 1.01489 15.91 -3.873)"
    />
    <path
      d="M-6.852 3.818a1.181 1.172 0 0 0-.452.115l-6.18 2.951a1.181 1.172 0 0 0-.638.795l-1.524 6.63a1.181 1.172 0 0 0 .16.9 1.181 1.172 0 0 0 .067.093l4.276 5.317a1.181 1.172 0 0 0 .924.44h6.858a1.181 1.172 0 0 0 .923-.44L1.837 15.3a1.181 1.172 0 0 0 .228-.99L.54 7.677a1.181 1.172 0 0 0-.64-.795l-6.178-2.95a1.181 1.172 0 0 0-.573-.115Zm.003.455a1.12 1.11 0 0 1 .542.108l5.853 2.795a1.12 1.11 0 0 1 .606.753l1.446 6.281a1.12 1.11 0 0 1-.216.94l-4.05 5.037a1.12 1.11 0 0 1-.875.417l-6.496.001a1.12 1.11 0 0 1-.875-.417l-4.05-5.037a1.12 1.11 0 0 1-.064-.088 1.12 1.11 0 0 1-.152-.851l1.444-6.281a1.12 1.11 0 0 1 .605-.753l5.853-2.797a1.12 1.11 0 0 1 .429-.108z"
      style={{
        color: "#000",
        fontStyle: "normal",
        fontVariant: "normal",
        fontWeight: 400,
        fontStretch: "normal",
        fontSize: "medium",
        lineHeight: "normal",
        fontFamily: "Sans",
        textIndent: 0,
        textAlign: "start",
        textDecoration: "none",
        textDecorationLine: "none",
        letterSpacing: "normal",
        wordSpacing: "normal",
        textTransform: "none",
        writingMode: "horizontal-tb",
        direction: "ltr",
        baselineShift: "baseline",
        display: "inline",
        overflow: "visible",
        visibility: "visible",
        fill: "#fff",
        fillOpacity: 1,
        fillRule: "nonzero",
        stroke: "none",
        strokeWidth: 0,
        strokeMiterlimit: 4,
        strokeDasharray: "none",
        marker: "none",
      }}
      transform="matrix(1.01489 0 0 1.01489 15.91 -3.873)"
    />
    <text
      xmlSpace="preserve"
      x={10.017}
      y={16.812}
      style={{
        fontStyle: "normal",
        fontWeight: 400,
        fontSize: "10.58333302px",
        lineHeight: "6.61458349px",
        fontFamily: "Sans",
        letterSpacing: 0,
        wordSpacing: 0,
        fill: "#fff",
        fillOpacity: 1,
        stroke: "none",
        strokeWidth: ".26458332px",
        strokeLinecap: "butt",
        strokeLinejoin: "miter",
        strokeOpacity: 1,
      }}
      transform="translate(-.993 -1.174)"
    >
      <tspan
        x={10.017}
        y={16.812}
        style={{
          fontStyle: "normal",
          fontVariant: "normal",
          fontWeight: 400,
          fontStretch: "normal",
          fontSize: "2.82222223px",
          fontFamily: "Arial",
          textAlign: "center",
          writingMode: "horizontal-tb",
          fill: "#fff",
          fillOpacity: 1,
          strokeWidth: ".26458332px",
        }}
        textAnchor="middle"
      >
        {title}
      </tspan>
    </text>
    <path
      d="m6.262 7.036 3.62-1.05 3.621 1.05-3.62 1.05ZM6.262 7.438v3.853l3.373 1.869.017-4.713zM13.503 7.438v3.853L10.13 13.16l-.017-4.713z"
      style={{
        fill: "#fff",
        fillRule: "evenodd",
        stroke: "none",
        strokeWidth: 0.26458332,
        strokeLinecap: "square",
        strokeMiterlimit: 10,
      }}
      transform="translate(-.865 -1.174)"
    />
  </svg>
);
const PodIcon = memo(_PodIcon);
export default PodIcon;

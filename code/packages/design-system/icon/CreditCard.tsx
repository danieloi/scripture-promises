import * as React from "react";

import Svg, { SvgProps, Path } from "react-native-svg";

const SvgCreditCard = (props: SvgProps) => (
  <Svg viewBox="0 0 24 24" width={24} height={24} {...props}>
    <Path
      fill={props.color}
      d="M15.25 14a.75.75 0 0 0 0 1.5h3.5a.75.75 0 0 0 0-1.5h-3.5Z"
    />
    <Path
      fill={props.color}
      d="M1.75 3h20.5c.966 0 1.75.784 1.75 1.75v14.5A1.75 1.75 0 0 1 22.25 21H1.75A1.75 1.75 0 0 1 0 19.25V4.75C0 3.784.784 3 1.75 3Zm-.25 7v9.25c0 .138.112.25.25.25h20.5a.25.25 0 0 0 .25-.25V10Zm0-5.25V8.5h21V4.75a.25.25 0 0 0-.25-.25H1.75a.25.25 0 0 0-.25.25Z"
    />
  </Svg>
);

export default SvgCreditCard;
import * as React from "react";

import Svg, { SvgProps, Path } from "react-native-svg";

function SvgTwitter(props: SvgProps) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M22.15 5.457a8.315 8.315 0 0 1-2.392.655 4.172 4.172 0 0 0 1.83-2.304 8.343 8.343 0 0 1-2.644 1.011 4.157 4.157 0 0 0-3.04-1.315c-2.689 0-4.664 2.509-4.057 5.113a11.822 11.822 0 0 1-8.583-4.351 4.17 4.17 0 0 0 1.288 5.56 4.147 4.147 0 0 1-1.885-.52c-.046 1.928 1.337 3.733 3.34 4.135a4.175 4.175 0 0 1-1.881.071 4.168 4.168 0 0 0 3.89 2.892 8.373 8.373 0 0 1-6.165 1.725A11.789 11.789 0 0 0 8.235 20c7.732 0 12.1-6.53 11.836-12.387a8.478 8.478 0 0 0 2.078-2.156Z"
        fill={props.color}
      />
    </Svg>
  );
}

export default SvgTwitter;
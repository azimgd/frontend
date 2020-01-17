import React from 'react'
import Svg, { Path } from 'react-native-svg'

const Logo = ({ fill = '#333', style = {}, height = 28 }) => (
  <Svg width="87" height="23" style={style} fill={fill} viewBox="0 0 87 23">
    <Path d="M14.5218 23L10.2018 16.76H9.94575H5.43375V23H0.24975V0.599998H9.94575C11.9298 0.599998 13.6471 0.930665 15.0978 1.592C16.5698 2.25333 17.7004 3.192 18.4898 4.408C19.2791 5.624 19.6738 7.064 19.6738 8.728C19.6738 10.392 19.2684 11.832 18.4578 13.048C17.6684 14.2427 16.5378 15.16 15.0658 15.8L20.0898 23H14.5218ZM14.4258 8.728C14.4258 7.46933 14.0204 6.50933 13.2098 5.848C12.3991 5.16533 11.2151 4.824 9.65775 4.824H5.43375V12.632H9.65775C11.2151 12.632 12.3991 12.2907 13.2098 11.608C14.0204 10.9253 14.4258 9.96533 14.4258 8.728ZM41.125 18.84V23H23.781V0.599998H40.709V4.76H28.933V9.624H39.333V13.656H28.933V18.84H41.125ZM60.0018 18.2H49.6018L47.6178 23H42.3057L52.2898 0.599998H57.4098L67.4258 23H61.9858L60.0018 18.2ZM58.3698 14.264L54.8178 5.688L51.2658 14.264H58.3698ZM69.7498 0.599998H74.9338V18.776H86.1658V23H69.7498V0.599998Z" />
  </Svg>
)

export default Logo
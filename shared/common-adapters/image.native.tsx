import * as React from 'react'
import {NativeImage} from './native-image.native'
import {Props, ReqProps} from './image'

const Image = ({onLoad, src, style}: Props) => (
  <NativeImage onLoad={onLoad} source={{uri: src}} style={style} resizeMode="contain" />
)

const RequireImage = ({src, style}: ReqProps) => (
  <NativeImage source={src} style={style} resizeMode="contain" />
)

export default Image
export {RequireImage}

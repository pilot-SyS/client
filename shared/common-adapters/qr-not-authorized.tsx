import * as React from 'react'
import * as ConfigGen from '../actions/config-gen'
import {namedConnect} from '../util/container'
// @ts-ignore not converted
import Text from './text'
// @ts-ignore not converted
import {Box2} from './box'
// @ts-ignore not converted
import Icon from './icon'
import {styleSheetCreate, globalColors} from '../styles'

type OwnProps = {}

const QRScanNotAuthorized = ({onOpenSettings}: {onOpenSettings: () => void}) => (
  <Box2 direction="vertical" style={styles.container} gap="tiny">
    <Icon type="iconfont-camera" color={globalColors.white_40} />
    <Text center={true} type="BodyTiny" style={styles.text}>
      You need to allow access to the camera.
    </Text>
    <Text center={true} type="BodyTiny" onClick={onOpenSettings} style={styles.text} underline={true}>
      Open settings
    </Text>
  </Box2>
)

const styles = styleSheetCreate({
  container: {
    alignItems: 'center',
    backgroundColor: globalColors.black,
    flexGrow: 1,
    justifyContent: 'center',
  },
  text: {color: globalColors.white_40},
})

const mapDispatchToProps = dispatch => ({
  onOpenSettings: () => dispatch(ConfigGen.createOpenAppSettings()),
})

export default namedConnect(
  () => ({}),
  mapDispatchToProps,
  (stateProps, dispatchProps, ownProps) => ({
    ...dispatchProps,
  }),
  'QRScanNotAuthorized'
)(QRScanNotAuthorized)

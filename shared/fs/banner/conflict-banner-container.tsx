import * as Constants from '../../constants/fs'
import * as Types from '../../constants/types/fs'
import * as FsGen from '../../actions/fs-gen'
import * as RouteTreeGen from '../../actions/route-tree-gen'
import {namedConnect} from '../../util/container'
import ConflictBanner, {Props} from './conflict-banner'
import openUrl from '../../util/open-url'

type OwnProps = {
  path: Types.Path
}

const mapStateToProps = (state, ownProps: OwnProps) => ({
  _tlf: Constants.getTlfFromPath(state.fs.tlfs, ownProps.path),
})

type DispatchProps = {
  onFeedback: () => void
  onFinishResolving: () => void
  onGoToTlf: (tlfPath: Types.Path) => void
  onHelp: () => void
  onStartResolving: () => void
}
const mapDispatchToProps = (dispatch, ownProps: OwnProps) => ({
  onFeedback: () => {},
  onFinishResolving: dispatch(FsGen.createFinishManualConflictResolution({localViewTlfPath: ownProps.path})),
  onGoToTlf: (tlfPath: Types.Path) =>
    dispatch(RouteTreeGen.createNavigateAppend({path: [{props: {path: tlfPath}, selected: 'main'}]})),
  onHelp: () => openUrl('https://keybase.io/docs/kbfs/understanding_kbfs#conflict_resolution'),
  onStartResolving: () => dispatch(FsGen.createStartManualConflictResolution({tlfPath: ownProps.path})),
})

const mergeProps = (s, d, o: OwnProps) => ({
  ...d,
  conflictState: s._tlf.conflictState,
  tlfName: s._tlf.name,
})

const ConnectedBanner = namedConnect<OwnProps, {}, DispatchProps, Props, {}>(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
  'ConflictBanner'
)(ConflictBanner)

export default ConnectedBanner

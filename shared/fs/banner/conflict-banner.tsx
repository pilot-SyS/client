import * as React from 'react'
import * as Kb from '../../common-adapters'
import * as Flow from '../../util/flow'
import * as Types from '../../constants/types/fs'

export type Props = {
  conflictState: Types.ConflictState
  onFeedback: () => void
  onFinishResolving: () => void
  onGoToTlf: (tlfPath: Types.Path) => void
  onHelp: () => void
  onStartResolving: () => void
  tlfName: string
}

const getMessage = (tlf: string, conflictState: Types.ConflictState): string => {
  switch (conflictState.type) {
    case Types.ConflictStateType.Automatic:
      return conflictState.isStuck
        ? `Your changes to ${tlf} conflict with changes made to this` +
            ' folder on another device. Automatic conflict resolution has failed,' +
            ' so you need to manually resolve the conflict. This is not' +
            ' supposed to happen!'
        : 'This should not happen.'
    case Types.ConflictStateType.ManualLocalView:
      return (
        `You're resolving a conflict in ${tlf}. This is your local view.` +
        'When you click finish, this view will go away. You should make ' +
        'sure to copy any changes you want to keep into the global view.'
      )
    case Types.ConflictStateType.ManualServerView:
      return (
        `This is the rest of the world's view of ${tlf}.` +
        " When you're satisfied with this view, you can click finish."
      )
    case Types.ConflictStateType.None:
      return 'This should not happen.'
    default:
      Flow.ifFlowComplainsAboutThisFunctionYouHaventHandledAllCasesInASwitch(conflictState)
      return 'Unknown conflictState: ' + conflictState
  }
}

const ConflictBanner = (props: Props) => {
  const commonProps = {
    color: 'red',
    text: getMessage(props.tlfName, props.conflictState),
  } as const

  const helpAction = {onClick: props.onHelp, title: 'What does this mean?'}
  const feedbackAction = {onClick: props.onFeedback, title: 'Please let us know'}
  const startRes = {onClick: props.onStartResolving, title: 'Start resolving'}
  const finishRes = {onClick: props.onFinishResolving, title: 'Finish resolving'}

  switch (props.conflictState.type) {
    case Types.ConflictStateType.Automatic:
      return (
        props.conflictState.isStuck && (
          <Kb.Banner {...commonProps} actions={[startRes, feedbackAction, helpAction]} />
        )
      )
    case Types.ConflictStateType.ManualLocalView:
      const tlfPath = props.conflictState.serverViewTlfPath
      const onSeeGlobalView = {
        onClick: () => props.onGoToTlf(tlfPath),
        title: 'See the global view',
      }
      return <Kb.Banner {...commonProps} actions={[onSeeGlobalView, finishRes, feedbackAction, helpAction]} />
    case Types.ConflictStateType.ManualServerView:
      const count = props.conflictState.localViewTlfPaths.size
      const onSeeLocalViews = props.conflictState.localViewTlfPaths.toArray().map((tlfPath, idx) => ({
        onClick: () => props.onGoToTlf(tlfPath),
        title: 'See local changes' + (count > 1 ? ` (version ${idx.toString} of ${count}` : ''),
      }))
      return <Kb.Banner {...commonProps} actions={[...onSeeLocalViews, feedbackAction, helpAction]} />
    case Types.ConflictStateType.None:
      return null
    default:
      Flow.ifFlowComplainsAboutThisFunctionYouHaventHandledAllCasesInASwitch(props.conflictState)
      return null
  }
}

export default ConflictBanner

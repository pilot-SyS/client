import * as React from 'react'
import {isMobile} from '../../constants/platform'

export type OverlayParentProps = {
  getAttachmentRef: () => React.Component<any> | null
  showingMenu: boolean
  setAttachmentRef: (arg0: React.Component<any> | null) => void
  setShowingMenu: (arg0: boolean) => void
  toggleShowingMenu: () => void
}

export type PropsWithOverlay<Props> = {} & Props & OverlayParentProps

type OverlayParentState = {
  showingMenu: boolean
}

const OverlayParentHOC = <T extends OverlayParentProps>(
  ComposedComponent: React.ComponentType<T>
): React.ComponentType<Exclude<T, OverlayParentProps>> => {
  class _OverlayParent extends React.Component<Exclude<T, OverlayParentProps>, OverlayParentState> {
    state = {showingMenu: false}
    _ref: React.Component<any> | null = null
    setShowingMenu = (showingMenu: boolean) =>
      this.setState(oldState => (oldState.showingMenu === showingMenu ? null : {showingMenu}))
    toggleShowingMenu = () => this.setState(oldState => ({showingMenu: !oldState.showingMenu}))
    setAttachmentRef = isMobile
      ? () => {}
      : (attachmentRef: React.Component<any> | null) => {
          this._ref = attachmentRef
        }
    getAttachmentRef = () => this._ref

    render() {
      return (
        <ComposedComponent
          {...this.props}
          setShowingMenu={this.setShowingMenu}
          toggleShowingMenu={this.toggleShowingMenu}
          setAttachmentRef={this.setAttachmentRef}
          getAttachmentRef={this.getAttachmentRef}
          showingMenu={this.state.showingMenu}
        />
      )
    }
  }
  const OverlayParent: React.ComponentType<Exclude<T, OverlayParentProps>> = _OverlayParent
  OverlayParent.displayName = ComposedComponent.displayName || 'OverlayParent'
  return OverlayParent
}

export default OverlayParentHOC

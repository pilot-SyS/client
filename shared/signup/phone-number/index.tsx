import * as React from 'react'
import * as Kb from '../../common-adapters'
import * as Styles from '../../styles'
import {SignupScreen} from '../common'
import PhoneInput from './phone-input'
import {ButtonType} from '../../common-adapters/button'

type Props = {
  onContinue: (phoneNumber: string, allowSearch: boolean) => void
  onSkip: () => void
}

const EnterPhoneNumber = (props: Props) => {
  const [phoneNumber, onChangePhoneNumber] = React.useState('')
  const [valid, onChangeValidity] = React.useState(false)
  const [allowSearch, onChangeAllowSearch] = React.useState(false)
  const disabled = !valid
  const onContinue = () => (disabled ? {} : props.onContinue(phoneNumber, allowSearch))
  return (
    <SignupScreen
      buttons={[
        {disabled, label: 'Continue', onClick: onContinue, type: 'Success' as ButtonType},
        ...(Styles.isMobile
          ? []
          : [{label: 'Skip for now', onClick: props.onSkip, type: 'Dim' as ButtonType}]),
      ]}
      rightActionLabel="Skip"
      onRightAction={props.onSkip}
      title="Your phone number"
      showHeaderInfoicon={true}
    >
      <Kb.Box2 direction="vertical" gap="tiny" gapStart={Styles.isMobile}>
        <PhoneInput
          style={styles.input}
          onChangeNumber={onChangePhoneNumber}
          onChangeValidity={onChangeValidity}
          error=""
        />
        <Kb.Checkbox
          label="Allow friends to find you by this phone number"
          checked={allowSearch}
          onCheck={onChangeAllowSearch}
          style={styles.checkbox}
        />
      </Kb.Box2>
    </SignupScreen>
  )
}

const styles = Styles.styleSheetCreate({
  checkbox: {width: '100%'},
  input: Styles.platformStyles({
    isElectron: {
      height: 38,
      width: 368,
    },
    isMobile: {
      height: 48,
      width: '100%',
    },
  }),
})

export default EnterPhoneNumber

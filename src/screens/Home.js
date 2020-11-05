import React, { memo, PureComponent } from 'react'
import { SafeAreaView } from 'react-native'
import { Button } from 'react-native-elements'

class Home extends PureComponent {
  constructor(props) {
    super(props)
  }

  _handleOpenDrawer = () => {
    this.props.navigation.openDrawer()
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1, padding: 10, alignItems: 'center', justifyContent: 'center' }}>
        <Button title='Open Drawer' onPress={() => this._handleOpenDrawer()} />
      </SafeAreaView>
    )
  }
}

export default memo(Home)
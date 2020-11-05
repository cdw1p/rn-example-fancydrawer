import { AppRegistry, LogBox } from 'react-native'
import { name as appName } from './app.json'
import { enableScreens } from 'react-native-screens'
import 'react-native-gesture-handler'
import App from './src/App'

enableScreens()
LogBox.ignoreAllLogs(true)

AppRegistry.registerComponent(appName, () => App)
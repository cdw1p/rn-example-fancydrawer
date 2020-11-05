import React, { useContext, createContext, useState } from 'react'
import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import { Icon, Avatar } from 'react-native-elements'
import Animated, { interpolate } from 'react-native-reanimated'
import styled from 'styled-components/native'
import _ from 'lodash'

// Screen & Transition
import HomeScreen from './screens/Home'
import { TransitionIOS } from './Transition'

// Setting Default Props
Text.defaultProps = { ...(Text.defaultProps || {}), allowFontScaling: false }

// Stack Configuration
const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()
const AnimatedContext = createContext(void 0)
const TransitionContainer = styled(Animated.View)` flex: 1; align-items: center; justify-content: center; `
const TransparentCard = styled(Animated.View)` width: 100%; height: 100%; background-color: white; opacity: 0.3; border-radius: 30px; `
const Card = styled.View` width: 100%; height: 100%; background-color: white; position: absolute; top: 0; left: 0; overflow: hidden; `

function withFancyDrawer(Component) {
  function Wrapper({ children }) {
    const animated = useContext(AnimatedContext)
    const scale = interpolate(animated, { inputRange: [0, 1], outputRange: [1, 0.8] })
    const translateMainCard = interpolate(animated, { inputRange: [0, 1], outputRange: [0, 20] });
    const animatedBorderRadius = interpolate(animated, { inputRange: [0, 1], outputRange: [0, 30] })
    const translateTransparentCard = interpolate(animated, { inputRange: [0, 0.5, 1], outputRange: [0, 0, -50] })
    const CardAnimated = Animated.createAnimatedComponent(Card)
    return (
      <Animated.View style={{ flex: 1, backgroundColor: '#1b438b' }}>
        <TransitionContainer style={{ transform: [{ scale, translateX: translateMainCard }] }}>
          <TransparentCard style={{ transform: [{ translateX: translateTransparentCard}, { scale: 0.9 }] }}/>
          <CardAnimated style={{ borderRadius: animatedBorderRadius }}>{children}</CardAnimated>
        </TransitionContainer>
      </Animated.View>
    )
  }
  return (props) => (
    <Wrapper>
      <Component {...props} />
    </Wrapper>
  )
}

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={{ width: '100%', aspectRatio: 1.5, marginLeft: 30, justifyContent: 'center', marginTop: 20 }}>
        <Avatar containerStyle={{ width: 60, height: 60 }} source={{ uri: 'https://knightscollege.edu.au/wp-content/uploads/wp-user-manager-uploads/2020/08/johnkick2.png' }} size='large' rounded/>
        <Text style={{ fontSize: 26, color: '#fff', marginTop: 10 }}>John Doe</Text>
        <Text style={{ fontSize: 16, color: 'rgba(255,255,255,0.4)' }}>example@email.com</Text>
      </View>
      <DrawerItemList
        inactiveBackgroundColor={'transparent'}
        inactiveTintColor={'white'}
        activeBackgroundColor={'transparent'}
        activeTintColor={'white'}
        labelStyle={{ fontSize: 16, marginLeft: -20 }}
        itemStyle={{ marginLeft: 20 }}
        {...props}
      />
      <View style={{ width: '100%', aspectRatio: 1.5, marginLeft: 35, justifyContent: 'center' }}>
        <Text style={{ fontSize: 16, color: 'rgba(255,255,255,0.6)' }}>Logout</Text>
      </View>
    </DrawerContentScrollView>
  )
}

const DrawerStack = () => {
  const [animatedValue, setAnimatedValue] = useState(new Animated.Value(0))
  return (
    <AnimatedContext.Provider value={animatedValue}>
      <View style={{ flex: 1, backgroundColor: '#1b438b' }}>
        <Drawer.Navigator
          drawerStyle={{ backgroundColor: 'transparent' }}
          drawerType={'slide'}
          initialRouteName='Dashboard'
          overlayColor='transparent'
          drawerContent={props => {
            setAnimatedValue(props.progress)
            return <CustomDrawerContent {...props} />
          }}
        >
          <Drawer.Screen
            options={{
              drawerIcon: ({ focused, size }) => (
                <Icon type='material-community' name='home' size={25} color={'#fff'} />
              )
            }}
            name='Dashboard'
            component={withFancyDrawer(HomeScreen)}
          />
          <Drawer.Screen
            options={{
              drawerIcon: ({ focused, size }) => (
                <Icon type='material-community' name='bell' size={25} color={'#fff'} />
              )
            }}
            name='Notifications'
            component={withFancyDrawer(HomeScreen)}
          />
          <Drawer.Screen
            options={{
              drawerIcon: ({ focused, size }) => (
                <Icon type='material-community' name='cog' size={25} color={'#fff'} />
              )
            }}
            name='Settings'
            component={withFancyDrawer(HomeScreen)}
          />
        </Drawer.Navigator>
      </View>
    </AnimatedContext.Provider>
  )
}

export default function RootStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='DrawerStack' headerMode='none' screenOptions={{ gestureEnabled: true, gestureDirection: 'horizontal' }}>
        <Stack.Screen name='Home' component={DrawerStack} options={TransitionIOS} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
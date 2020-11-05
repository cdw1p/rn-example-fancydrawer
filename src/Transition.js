import { CardStyleInterpolators, HeaderStyleInterpolators, TransitionSpecs } from '@react-navigation/stack'

const TransitionIOS = {
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  headerStyleInterpolator: HeaderStyleInterpolators.forFade,
  transitionSpec: {
    open: TransitionSpecs.TransitionIOSSpec,
    close: TransitionSpecs.TransitionIOSSpec
  }
}

module.exports = {
  TransitionIOS
}
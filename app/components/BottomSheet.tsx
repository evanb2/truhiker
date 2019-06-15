import { SimpleLineIcons } from '@expo/vector-icons'
import React, { Component } from 'react'
import { Animated, Dimensions, StyleSheet, View } from 'react-native'
import {
  NativeViewGestureHandler,
  PanGestureHandler,
  State,
  TapGestureHandler,
} from 'react-native-gesture-handler'
import { colors } from 'styles/colors'

const HEADER_HEIGHT = 40
const WINDOW_HEIGHT = Dimensions.get('window').height
const SNAP_POINTS_FROM_TOP = [50, WINDOW_HEIGHT * 0.4, WINDOW_HEIGHT * 0.8]

export class BottomSheet extends Component {
  masterdrawer = React.createRef()
  drawer = React.createRef()
  drawerheader = React.createRef()
  scroll = React.createRef()

  constructor(props) {
    super(props)

    const START = SNAP_POINTS_FROM_TOP[0]
    const END = SNAP_POINTS_FROM_TOP[SNAP_POINTS_FROM_TOP.length - 1]

    this.state = {
      lastSnap: END,
    }

    this._lastScrollYValue = 0
    this._lastScrollY = new Animated.Value(0)
    this._onRegisterLastScroll = Animated.event(
      [{ nativeEvent: { contentOffset: { y: this._lastScrollY } } }],
      { useNativeDriver: true }
    )
    this._lastScrollY.addListener(({ value }) => {
      this._lastScrollYValue = value
    })

    this._dragY = new Animated.Value(0)
    this._onGestureEvent = Animated.event(
      [{ nativeEvent: { translationY: this._dragY } }],
      { useNativeDriver: true }
    )

    this._reverseLastScrollY = Animated.multiply(
      new Animated.Value(-1),
      this._lastScrollY
    )

    this._translateYOffset = new Animated.Value(END)
    this._translateY = Animated.add(
      this._translateYOffset,
      Animated.add(this._dragY, this._reverseLastScrollY)
    ).interpolate({
      inputRange: [START, END],
      outputRange: [START, END],
      extrapolate: 'clamp',
    })
  }

  _onHeaderHandlerStateChange = ({ nativeEvent }) => {
    if (nativeEvent.oldState === State.BEGAN) {
      this._lastScrollY.setValue(0)
    }
    this._onHandlerStateChange({ nativeEvent })
  }

  _onHandlerStateChange = ({ nativeEvent }) => {
    if (nativeEvent.oldState === State.ACTIVE) {
      let { velocityY, translationY } = nativeEvent
      translationY -= this._lastScrollYValue
      const dragToss = 0.05
      const endOffsetY =
        this.state.lastSnap + translationY + dragToss * velocityY

      let destSnapPoint = SNAP_POINTS_FROM_TOP[0]
      for (let i = 0; i < SNAP_POINTS_FROM_TOP.length; i++) {
        const snapPoint = SNAP_POINTS_FROM_TOP[i]
        const distFromSnap = Math.abs(snapPoint - endOffsetY)
        if (distFromSnap < Math.abs(destSnapPoint - endOffsetY)) {
          destSnapPoint = snapPoint
        }
      }
      this.setState({ lastSnap: destSnapPoint })
      this._translateYOffset.extractOffset()
      this._translateYOffset.setValue(translationY)
      this._translateYOffset.flattenOffset()
      this._dragY.setValue(0)
      Animated.spring(this._translateYOffset, {
        velocity: velocityY,
        tension: 68,
        friction: 12,
        toValue: destSnapPoint,
        useNativeDriver: true,
      }).start()
    }
  }

  render() {
    return (
      <TapGestureHandler
        maxDurationMs={100000}
        ref={this.masterdrawer}
        maxDeltaY={this.state.lastSnap - SNAP_POINTS_FROM_TOP[0]}
      >
        <View style={StyleSheet.absoluteFillObject} pointerEvents="box-none">
          <Animated.View
            style={[
              StyleSheet.absoluteFillObject,
              {
                transform: [{ translateY: this._translateY }],
              },
            ]}
          >
            <PanGestureHandler
              ref={this.drawerheader}
              simultaneousHandlers={[this.scroll, this.masterdrawer]}
              shouldCancelWhenOutside={false}
              onGestureEvent={this._onGestureEvent}
              onHandlerStateChange={this._onHeaderHandlerStateChange}
            >
              <Animated.View style={_styles.header}>
                <SimpleLineIcons name="arrow-up" size={25} />
              </Animated.View>
            </PanGestureHandler>
            <PanGestureHandler
              ref={this.drawer}
              simultaneousHandlers={[this.scroll, this.masterdrawer]}
              shouldCancelWhenOutside={false}
              onGestureEvent={this._onGestureEvent}
              onHandlerStateChange={this._onHandlerStateChange}
            >
              <Animated.View style={_styles.container}>
                <NativeViewGestureHandler
                  ref={this.scroll}
                  waitFor={this.masterdrawer}
                  simultaneousHandlers={this.drawer}
                >
                  <Animated.ScrollView
                    style={[
                      _styles.scrollView,
                      { marginBottom: SNAP_POINTS_FROM_TOP[0] },
                    ]}
                    bounces={false}
                    onScrollBeginDrag={this._onRegisterLastScroll}
                    scrollEventThrottle={1}
                  >
                    {this.props.children}
                  </Animated.ScrollView>
                </NativeViewGestureHandler>
              </Animated.View>
            </PanGestureHandler>
          </Animated.View>
        </View>
      </TapGestureHandler>
    )
  }
}

const _styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: colors.gunmetalGrey,
    borderLeftWidth: 1,
    borderLeftColor: colors.gunmetalGrey,
  },
  header: {
    height: HEADER_HEIGHT,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderWidth: 1,
    borderColor: colors.gunmetalGrey,
    borderBottomWidth: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

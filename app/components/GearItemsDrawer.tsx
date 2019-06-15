import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'
import { BottomSheet } from 'components/BottomSheet'
import firebase from 'firebase'
import 'firebase/firestore'
import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Caption, Subheading, Surface } from 'react-native-paper'
import { colors } from 'styles/colors'
import { GearItem } from 'utils/types'

export class GearItemsDrawer extends Component {
  state = {
    gearItems: [],
    gearRef: () => {},
  }

  componentWillMount() {
    const user = firebase.auth().currentUser
    const gearRef = firebase
      .firestore()
      .collection('gear')
      .where('userId', '==', user && user.uid)
      .onSnapshot(querySnapshot => {
        const gearItems: firebase.firestore.DocumentData[] = []
        querySnapshot.forEach(doc =>
          gearItems.push({ uid: doc.id, ...doc.data() })
        )
        this.setState({ gearItems })
      })
    this.setState({ gearRef })
  }

  componentWillUnmount() {
    const { gearRef } = this.state
    gearRef()
  }

  render() {
    const { gearItems } = this.state

    return (
      <View style={{ flex: 1 }}>
        <BottomSheet>
          {/* HEADER */}
          {/* CATEGORY PICKER */}
          {gearItems.map((item: GearItem) => (
            <Surface style={_styles.surface} key={item.uid}>
              <TouchableOpacity
                style={_styles.touchable}
                hitSlop={{ top: 16, bottom: 16, right: 16, left: 16 }}
                // onPress={() => onPress(gearItem)}
              >
                <View style={_styles.leftColumn}>
                  <Subheading style={_styles.nameText}>{item.name}</Subheading>
                  <Caption style={_styles.descriptionText}>
                    {item.description}
                  </Caption>
                </View>
                <View style={_styles.rightColumn}>
                  <Text style={_styles.weightText}>{`${item.weight} ${
                    item.units
                  }`}</Text>
                  {(item.worn || item.consumable) && (
                    <View style={_styles.iconContainer}>
                      {item.worn && (
                        <AntDesign
                          name="skin"
                          size={20}
                          color={colors.lightGreen}
                        />
                      )}
                      {item.consumable && (
                        <MaterialCommunityIcons
                          name="silverware-variant"
                          size={20}
                          style={item.worn && { marginLeft: 8 }}
                          color={colors.lightGreen}
                        />
                      )}
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            </Surface>
          ))}
        </BottomSheet>
      </View>
    )
  }
}

const _styles = StyleSheet.create({
  surface: {
    flex: 1,
    elevation: 3,
    borderRadius: 10,
    padding: 16,
    margin: 8,
    backgroundColor: colors.gunmetalGrey,
  },
  touchable: {
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftColumn: { flex: 2 },
  rightColumn: {
    flex: 0.8,
    alignItems: 'flex-end',
  },
  nameText: { color: 'white' },
  descriptionText: { fontSize: 14, color: 'rgba(255, 255, 255, 0.8)' },
  weightText: { fontSize: 16, color: 'white', paddingRight: 8 },
  iconContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    marginTop: 4,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
})

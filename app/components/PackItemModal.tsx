import {
  AntDesign,
  MaterialCommunityIcons,
  SimpleLineIcons,
} from '@expo/vector-icons'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Modal, Portal, Text, Title } from 'react-native-paper'
import { theme } from 'styles/theme'
import { PackItem } from 'utils/types'

interface Props {
  isVisible: boolean
  packItem: PackItem
  onToggleWorn: () => void
  onToggleConsumable: () => void
  onDismissModal: () => void
  onIncreaseQuantity: () => void
  onDecreaseQuantity: () => void
}

export function PackItemModal({
  isVisible,
  packItem,
  onToggleWorn,
  onToggleConsumable,
  onDismissModal,
  onIncreaseQuantity,
  onDecreaseQuantity,
}: Props) {
  const { name, consumable, worn, quantity } = packItem

  return (
    <Portal>
      <Modal
        visible={isVisible}
        onDismiss={onDismissModal}
        contentContainerStyle={_styles.modalContainer}
      >
        <Title style={{ textAlign: 'center' }}>{name}</Title>
        <View style={_styles.buttonsRow}>
          <View style={{ flex: 1 }} />
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <TouchableOpacity onPress={onToggleWorn} style={_styles.button}>
              <AntDesign
                name="skin"
                size={35}
                color={worn ? theme.colors.primary : theme.colors.disabled}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onToggleConsumable}
              style={_styles.button}
            >
              <MaterialCommunityIcons
                name="silverware-variant"
                size={35}
                color={
                  consumable ? theme.colors.primary : theme.colors.disabled
                }
              />
            </TouchableOpacity>
          </View>

          <View style={{ flex: 1, alignItems: 'center' }}>
            <TouchableOpacity onPress={onIncreaseQuantity}>
              <SimpleLineIcons name="arrow-up" size={30} />
            </TouchableOpacity>
            <Text style={{ textAlign: 'center' }}>{quantity}</Text>
            <TouchableOpacity onPress={onDecreaseQuantity}>
              <SimpleLineIcons name="arrow-down" size={30} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </Portal>
  )
}

const _styles = StyleSheet.create({
  modalContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    padding: 8,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    backgroundColor: theme.colors.background,
  },
  buttonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  button: {
    marginHorizontal: 16,
  },
})

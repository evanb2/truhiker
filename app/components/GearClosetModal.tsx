import { GearListItem } from 'components/GearListItem'
import React from 'react'
import { StyleSheet } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { Modal, Portal, Title } from 'react-native-paper'
import { theme } from 'styles/theme'
import { Category, GearItem } from 'utils/types'

interface Props {
  category: Category
  isVisible: boolean
  gearItems: GearItem[]
  toggleModal: () => void
  onPressItem: (gearItem: GearItem) => void
}

export function GearClosetModal({
  isVisible,
  gearItems,
  toggleModal,
  onPressItem,
  category,
}: Props) {
  return (
    <Portal>
      <Modal
        visible={isVisible}
        onDismiss={toggleModal}
        contentContainerStyle={_styles.modalContainer}
      >
        <Title style={{ color: 'white', textAlign: 'center' }}>
          {category.name}
        </Title>
        <FlatList
          data={gearItems}
          renderItem={({ item }) => (
            <GearListItem gearItem={item} onPress={onPressItem} />
          )}
          keyExtractor={(item: GearItem) => String(item.uid)}
        />
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
    height: 400,
    paddingTop: 8,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: theme.colors.primary,
  },
})

import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Button, Modal, Portal, TextInput } from 'react-native-paper'
import { theme } from 'styles/theme'

interface Props {
  onAddCategory: (newCategory: string) => void
  toggleModal: () => void
  isVisible: boolean
}

interface State {
  newCategory: string
}

export class AddCategoryModal extends Component<Props, State> {
  state = {
    newCategory: '',
    isVisible: false,
  }

  render() {
    const { newCategory } = this.state
    const { onAddCategory, isVisible, toggleModal } = this.props

    return (
      <Portal>
        <Modal
          visible={isVisible}
          onDismiss={toggleModal}
          contentContainerStyle={_styles.addCategoryModal}
        >
          <TextInput
            mode="outlined"
            autoFocus
            autoCorrect={false}
            label="Category"
            value={newCategory}
            onChangeText={val => this.setState({ newCategory: val })}
          />
          <Button
            style={{ marginTop: 4 }}
            uppercase={false}
            onPress={() => onAddCategory(newCategory)}
          >
            Add
          </Button>
        </Modal>
      </Portal>
    )
  }
}

const _styles = StyleSheet.create({
  addCategoryModal: {
    backgroundColor: theme.colors.background,
    padding: 8,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    position: 'absolute',
    right: 0,
    left: 0,
    bottom: 216, // this will need to be adjusted based on screen size
  },
})

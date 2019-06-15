import firebase from 'firebase'
import 'firebase/firestore'
import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import {
  Button,
  FAB,
  Modal,
  Portal,
  Subheading,
  TextInput,
} from 'react-native-paper'
import { NavigationScreenProps } from 'react-navigation'
import { Category } from 'utils/types'

interface State {
  categories: Category[]
  newCategory: string
  modalVisible: boolean
  fabOpen: boolean
}

export class AddGearScreen extends Component<NavigationScreenProps, State> {
  state = {
    categories: [],
    newCategory: '',
    modalVisible: false,
    fabOpen: false,
  }

  componentWillMount() {
    const { navigation } = this.props
    const { setParams } = navigation

    setParams({ rightText: 'Done' })
  }

  componentDidUpdate(prevState) {
    const { categories } = this.state
    if (prevState.categories !== categories) {
      this.updatePacklist()
    }
  }

  updatePacklist = () => {
    const { categories } = this.state
    const { navigation } = this.props
    const { getParam } = navigation

    const packlistRef = getParam('packlistRef')

    packlistRef.update({ categories })
  }

  addCategory = () => {
    const { newCategory } = this.state
    const { navigation } = this.props
    const { getParam } = navigation
    const packlistRef = getParam('packlistRef')

    this.setState(state => ({
      categories: [
        ...state.categories,
        { name: newCategory, items: [], totalWeight: 0 },
      ],
      newCategory: '',
      modalVisible: false,
    }))

    packlistRef.update({})
  }

  openGearItemDrawer = () => {
    console.log('open drawer')
  }

  toggleModal = () => {
    this.setState(state => ({
      modalVisible: !state.modalVisible,
    }))
  }

  toggleFab = () => {
    this.setState(state => ({
      fabOpen: !state.fabOpen,
    }))
  }

  render() {
    const { categories, newCategory, modalVisible, fabOpen } = this.state

    return (
      <View style={{ flex: 1, padding: 8 }}>
        {categories.map((category: Category) => (
          <View key={category.name}>
            <Subheading>{category.name}</Subheading>
          </View>
        ))}
        <Portal>
          <Modal
            visible={modalVisible}
            onDismiss={this.toggleModal}
            contentContainerStyle={{
              backgroundColor: 'white',
              margin: 8,
              padding: 8,
              borderRadius: 10,
            }}
          >
            <TextInput
              label="Category"
              value={newCategory}
              onChangeText={val => this.setState({ newCategory: val })}
            />
            <Button
              style={{ marginTop: 4 }}
              uppercase={false}
              onPress={this.addCategory}
            >
              Add
            </Button>
          </Modal>
          <FAB.Group
            visible
            actions={[
              {
                icon: 'playlist-add',
                label: 'New Category',
                onPress: this.toggleModal,
              },
              {
                icon: 'expand-less',
                label: 'Gear Items',
                onPress: this.openGearItemDrawer,
              },
            ]}
            open={fabOpen}
            icon="add"
            // style={{ position: 'absolute', bottom: 8, right: 8 }}
            onStateChange={({ open }) => this.setState({ fabOpen: open })}
            // onPress={this.toggleModal}
          />
        </Portal>
      </View>
    )
  }
}

const _styles = StyleSheet.create({
  //
})

import { SimpleLineIcons } from '@expo/vector-icons'
import { GearListItem } from 'components/GearListItem'
import firebase from 'firebase'
import 'firebase/firestore'
import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import {
  Button,
  DataTable,
  FAB,
  Modal,
  Portal,
  Surface,
  TextInput,
} from 'react-native-paper'
import { NavigationScreenProps } from 'react-navigation'
import { Category, GearItem, PackItem } from 'utils/types'

interface State {
  categories: string[]
  newCategory: string
  selectedCategory: string
  categoryModal: boolean
  itemModal: boolean
  gearCollectionRef: firebase.firestore.DocumentReference | {}
  packItems: PackItem[]
  gearCloset: GearItem[]
}

export class AddGearScreen extends Component<NavigationScreenProps, State> {
  state = {
    categories: [],
    newCategory: '',
    categoryModal: false,
    selectedCategory: '',
    itemModal: false,
    gearCollectionRef: () => {},
    gearCloset: [],
    packItems: [],
  }

  componentWillMount() {
    const { navigation } = this.props
    const { setParams } = navigation

    setParams({ rightText: 'Done' })
  }

  componentDidMount() {
    this.attachGearItemsListener()
  }

  // componentDidUpdate(prevState) {
  //   const { categories } = this.state
  //   if (prevState.categories !== categories) {
  //     this.updatePacklist()
  //   }
  // }

  componentWillUnmount() {
    const { gearCollectionRef } = this.state
    gearCollectionRef()
  }

  attachGearItemsListener = () => {
    const user = firebase.auth().currentUser
    const gearCollectionRef = firebase
      .firestore()
      .collection('gearItems')
      .where('userId', '==', user && user.uid)
      .onSnapshot(querySnapshot => {
        const gearCloset: firebase.firestore.DocumentData[] = []
        querySnapshot.forEach(doc =>
          gearCloset.push({ uid: doc.id, ...doc.data() })
        )
        this.setState({ gearCloset })
      })
    this.setState({ gearCollectionRef })
  }

  updatePacklist = () => {
    const { packItems } = this.state
    const { navigation } = this.props
    const { getParam } = navigation

    const packlistRef = getParam('packlistRef')

    packlistRef.update({
      packItems,
    })
  }

  addCategory = () => {
    const { newCategory, categories } = this.state
    const { navigation } = this.props
    const { getParam } = navigation

    const packlistRef = getParam('packlistRef')

    packlistRef.update({ categories: [...categories, newCategory] })

    this.setState(state => ({
      categories: [...state.categories, newCategory],
      newCategory: '',
      categoryModal: false,
    }))
  }

  addItemToCategory = gearItem => {
    console.log(gearItem)
    this.setState(state => ({
      packItems: [
        ...state.packItems,
        {
          ...gearItem,
          category: state.selectedCategory,
        },
      ],
    }))
    this.updatePacklist()
  }

  toggleCategoryModal = () => {
    this.setState(state => ({
      categoryModal: !state.categoryModal,
    }))
  }

  toggleItemsModal = () => {
    this.setState(state => ({
      itemModal: !state.itemModal,
    }))
  }

  render() {
    const {
      categories,
      newCategory,
      categoryModal,
      itemModal,
      gearCloset,
      packItems,
    } = this.state

    return (
      <View style={{ flex: 1 }}>
        {categories.map((category: string) => (
          <Surface
            style={{ elevation: 3, padding: 8, margin: 4 }}
            key={category}
          >
            <DataTable>
              <DataTable.Header>
                <DataTable.Title>{category}</DataTable.Title>
                <DataTable.Title numeric>Price</DataTable.Title>
                <DataTable.Title numeric>Weight</DataTable.Title>
              </DataTable.Header>

              {packItems
                .filter((packItem: PackItem) => packItem.category === category)
                .map((gearItem: GearItem) => (
                  <DataTable.Row key={gearItem.name}>
                    <DataTable.Cell>{gearItem.name}</DataTable.Cell>
                    <DataTable.Cell numeric>{gearItem.price}</DataTable.Cell>
                    <DataTable.Cell numeric>{gearItem.weight}</DataTable.Cell>
                  </DataTable.Row>
                ))}
            </DataTable>
            <TouchableOpacity
              style={{ marginTop: 8 }}
              onPress={() => {
                this.setState({ selectedCategory: category })
                this.toggleItemsModal()
              }}
            >
              <SimpleLineIcons name="plus" size={20} />
            </TouchableOpacity>
          </Surface>
        ))}

        <FAB
          icon="playlist-add"
          style={{ position: 'absolute', bottom: 8, right: 8 }}
          onPress={this.toggleCategoryModal}
        />

        <Portal>
          <Modal
            visible={itemModal}
            onDismiss={this.toggleItemsModal}
            contentContainerStyle={{
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
              backgroundColor: 'white',
              height: 400,
              bottom: 0,
              right: 0,
              left: 0,
              position: 'absolute',
              paddingTop: 8,
            }}
          >
            <FlatList
              data={gearCloset}
              renderItem={({ item }) => (
                <GearListItem
                  gearItem={item}
                  onPress={this.addItemToCategory}
                  onDelete={() => {}}
                />
              )}
              keyExtractor={item => String(item.name)}
              contentContainerStyle={{ paddingTop: 8 }}
              ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
            />
          </Modal>
          <Modal
            visible={categoryModal}
            onDismiss={this.toggleCategoryModal}
            contentContainerStyle={{
              backgroundColor: 'white',
              margin: 8,
              padding: 8,
              borderRadius: 10,
            }}
          >
            <TextInput
              autoFocus
              autoCorrect={false}
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
        </Portal>
      </View>
    )
  }
}

const _styles = StyleSheet.create({
  //
})

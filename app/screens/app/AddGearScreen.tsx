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
import { GearItem, PackItem } from 'utils/types'

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

  componentDidUpdate(prevState) {
    const { packItems } = this.state
    if (prevState.packItems !== packItems) {
      this.updatePacklist()
    }
  }

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
    const { packItems, selectedCategory } = this.state
    const _packItems = [
      ...packItems,
      {
        ...gearItem,
        category: selectedCategory,
      },
    ]
    this.setState({ packItems: _packItems })
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

    const _gearCloset = gearCloset.filter(
      (gearItem: GearItem) =>
        !packItems.find((packItem: PackItem) => packItem.name === gearItem.name)
    )

    return (
      <View style={_styles.screenContainer}>
        {categories.map((category: string) => (
          <Surface style={_styles.dataTableSurface} key={category}>
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
                    <DataTable.Cell numeric>
                      {`${gearItem.weight} ${gearItem.units}`}
                    </DataTable.Cell>
                  </DataTable.Row>
                ))}
            </DataTable>
            <TouchableOpacity
              style={_styles.addItemButton}
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
          style={_styles.addCategoryButton}
          onPress={this.toggleCategoryModal}
        />

        <Portal>
          <Modal
            visible={itemModal}
            onDismiss={this.toggleItemsModal}
            contentContainerStyle={_styles.gearClosetModal}
          >
            <FlatList
              data={_gearCloset}
              renderItem={({ item }) => (
                <GearListItem
                  gearItem={item}
                  onPress={this.addItemToCategory}
                  onDelete={() => {}}
                />
              )}
              keyExtractor={item => String(item.name)}
            />
          </Modal>
          <Modal
            visible={categoryModal}
            onDismiss={this.toggleCategoryModal}
            contentContainerStyle={_styles.addCategoryModal}
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
  screenContainer: { flex: 1 },
  dataTableSurface: { elevation: 3, padding: 8, margin: 4 },
  addItemButton: { marginTop: 8, marginLeft: 16 },
  addCategoryButton: { position: 'absolute', bottom: 8, right: 8 },
  gearClosetModal: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: 'white',
    height: 400,
    bottom: 0,
    right: 0,
    left: 0,
    position: 'absolute',
    paddingTop: 8,
  },
  addCategoryModal: {
    backgroundColor: 'white',
    margin: 8,
    padding: 8,
    borderRadius: 10,
  },
})

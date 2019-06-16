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
import { Routes } from 'screens/routes'
import { GearItem, PackItem } from 'utils/types'

interface State {
  newCategory: string
  selectedCategory: string
  categoryModal: boolean
  itemModal: boolean
  gearCollectionRef: firebase.firestore.DocumentReference | {}
  packlistRef: firebase.firestore.DocumentReference | {}
  gearCloset: firebase.firestore.DocumentData[]
  packlist: firebase.firestore.DocumentData
}

export class AddGearScreen extends Component<NavigationScreenProps, State> {
  state = {
    newCategory: '',
    categoryModal: false,
    selectedCategory: '',
    itemModal: false,
    gearCollectionRef: () => {},
    gearCloset: [],
    packlistRef: () => {},
    packlist: {
      name: '',
      categories: [],
      packItems: [],
    },
  }

  componentWillMount() {
    const { navigation } = this.props
    const { setParams, getParam } = navigation

    const packlistId = getParam('packlistId')

    this.attachPacklistListener(packlistId)

    setParams({
      rightText: 'Done',
      rightAction: () => navigation.navigate(Routes.MyGearLists),
    })
  }

  componentDidMount() {
    this.attachGearItemsListener()
  }

  componentWillUnmount() {
    const { gearCollectionRef } = this.state
    gearCollectionRef()
  }

  attachPacklistListener = async (packlistId: string) => {
    const packlistRef = await firebase
      .firestore()
      .collection('packlists')
      .doc(packlistId)

    packlistRef.onSnapshot(
      snapshot => {
        this.setState({ packlist: snapshot.data() })
      },
      error => {
        console.log(error)
      }
    )

    this.setState({ packlistRef })
  }

  attachGearItemsListener = async () => {
    const user = firebase.auth().currentUser
    const gearCollectionRef = await firebase
      .firestore()
      .collection('gearItems')
      .where('userId', '==', user && user.uid)
      .onSnapshot(
        snapshot => {
          const gearCloset: firebase.firestore.DocumentData[] = []
          snapshot.forEach(doc => {
            const item = { uid: doc.id, ...doc.data() }
            gearCloset.push(item)
          })
          this.setState({ gearCloset })
        },
        error => console.log(error)
      )
    this.setState({ gearCollectionRef })
  }

  addCategory = () => {
    const { newCategory, packlistRef } = this.state

    packlistRef.update({
      categories: firebase.firestore.FieldValue.arrayUnion(newCategory),
    })

    this.setState({
      newCategory: '',
      categoryModal: false,
    })
  }

  addItemWithCategory = (gearItem: GearItem) => {
    const { packlistRef, selectedCategory } = this.state

    const packItem = {
      ...gearItem,
      category: selectedCategory,
    }

    packlistRef.update({
      packItems: firebase.firestore.FieldValue.arrayUnion(packItem),
    })
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
      newCategory,
      categoryModal,
      itemModal,
      gearCloset,
      packlist,
    } = this.state
    const { categories, packItems } = packlist

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
                  onPress={this.addItemWithCategory}
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
  addCategoryButton: { position: 'absolute', bottom: 16, right: 16 },
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

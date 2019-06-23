import { AddCategoryModal } from 'components/AddCategoryModal'
import { CategoryTable } from 'components/CategoryTable'
import { GearListItem } from 'components/GearListItem'
import firebase from 'firebase'
import 'firebase/firestore'
import React, { Component } from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import {
  Button,
  FAB,
  Modal,
  Paragraph,
  Portal,
  Title,
} from 'react-native-paper'
import { NavigationScreenProps } from 'react-navigation'
import { theme } from 'styles/theme'
import { GearItem, PackItem } from 'utils/types'

interface State {
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
    selectedCategory: '',
    categoryModal: false,
    itemModal: false,
    gearCloset: [],
    packlistRef: () => {},
    gearCollectionRef: () => {},
    packlist: {
      name: '',
      description: '',
      categories: [],
      packItems: [],
    },
  }

  componentWillMount() {
    const { navigation } = this.props
    const { getParam } = navigation

    const packlistId = getParam('packlistId')

    this.attachPacklistListener(packlistId)
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

  addCategory = (newCategory: string) => {
    const { packlistRef } = this.state

    packlistRef
      .update({
        categories: firebase.firestore.FieldValue.arrayUnion(newCategory),
      })
      .catch((error: Error) => console.log(error))

    this.setState({
      categoryModal: false,
    })
  }

  addItemToCategory = (gearItem: GearItem) => {
    const { packlistRef, selectedCategory } = this.state

    const packItem = {
      ...gearItem,
      category: selectedCategory,
    }

    packlistRef
      .update({
        packItems: firebase.firestore.FieldValue.arrayUnion(packItem),
      })
      .catch((error: Error) => console.log(error))
  }

  handleDeleteCategory = (category: string) => {
    const { packlistRef } = this.state

    packlistRef
      .update({
        categories: firebase.firestore.FieldValue.arrayRemove(category),
      })
      .catch((error: Error) => console.log(error))
  }

  handleAddItems = (category: string) => {
    this.setState({ selectedCategory: category })
    this.toggleItemsModal()
  }

  handlePackItemPress = (packItem: PackItem) => {
    console.log('handlePackItemPress', ' => ', packItem)
    // show modal to edit PackItem
  }

  handleRemoveItemFromCategory = (packItem: PackItem) => {
    const { packlistRef } = this.state

    packlistRef
      .update({
        packItems: firebase.firestore.FieldValue.arrayRemove(packItem),
      })
      .catch((error: Error) => console.log(error))
  }

  toggleItemsModal = () => {
    this.setState(state => ({
      itemModal: !state.itemModal,
    }))
  }

  toggleCategoryModal = () => {
    this.setState(state => ({
      categoryModal: !state.categoryModal,
    }))
  }

  render() {
    const { navigation } = this.props
    const { categoryModal, itemModal, gearCloset, packlist } = this.state
    const { name, description, categories, packItems } = packlist

    const _gearCloset = gearCloset.filter(
      (gearItem: GearItem) =>
        !packItems.find((packItem: PackItem) => packItem.name === gearItem.name)
    )

    return (
      <View style={_styles.screenContainer}>
        <SafeAreaView style={_styles.headerContainer}>
          <Title style={_styles.titleText}>{name}</Title>
          <Button uppercase={false} onPress={() => navigation.goBack()}>
            Done
          </Button>
        </SafeAreaView>
        <ScrollView contentContainerStyle={_styles.scrollContainer}>
          <Paragraph style={_styles.descriptionText}>{description}</Paragraph>
          {categories.map((category: string) => {
            const categoryItems = packItems.filter(
              (packItem: PackItem) => packItem.category === category
            )
            return (
              <CategoryTable
                key={category}
                categoryName={category}
                categoryItems={categoryItems}
                onAddItems={this.handleAddItems}
                onDeleteCategory={this.handleDeleteCategory}
                onPressItem={this.handlePackItemPress}
                onRemoveItem={this.handleRemoveItemFromCategory}
              />
            )
          })}
        </ScrollView>

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
                />
              )}
              keyExtractor={item => String(item.name)}
            />
          </Modal>
        </Portal>
        <AddCategoryModal
          onAddCategory={this.addCategory}
          isVisible={categoryModal}
          toggleModal={this.toggleCategoryModal}
        />
      </View>
    )
  }
}

const _styles = StyleSheet.create({
  screenContainer: { flex: 1, backgroundColor: theme.colors.background },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleText: { paddingLeft: 8, marginVertical: 10 },
  descriptionText: {
    padding: 8,
  },
  scrollContainer: { paddingTop: 8, paddingBottom: 80 },
  dataTableSurface: { elevation: 3, padding: 8, margin: 4 },
  addCategoryButton: { position: 'absolute', bottom: 16, right: 16 },
  gearClosetModal: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: theme.colors.primary,
    height: 400,
    bottom: 0,
    right: 0,
    left: 0,
    position: 'absolute',
    paddingTop: 8,
  },
})

import { AddCategoryModal } from 'components/AddCategoryModal'
import { CategoryTable } from 'components/CategoryTable'
import { GearClosetModal } from 'components/GearClosetModal'
import { PackItemModal } from 'components/PackItemModal'
import firebase from 'firebase'
import 'firebase/firestore'
import React, { Component } from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Button, FAB, Paragraph, Title } from 'react-native-paper'
import { NavigationScreenProps } from 'react-navigation'
import { theme } from 'styles/theme'
import { Category, GearItem, PackItem, Packlist, WeightUnit } from 'utils/types'

interface State {
  selectedCategory: Category
  selectedPackItem: PackItem
  categoryModal: boolean
  itemModal: boolean
  packItemModal: boolean
  gearCollectionRef: firebase.firestore.CollectionReference | null
  categoriesRef: firebase.firestore.CollectionReference | null
  packlistRef: firebase.firestore.DocumentReference | null
  gearCloset: firebase.firestore.DocumentData[]
  packlist: Packlist
  categories: Category[]
}

export class AddGearScreen extends Component<NavigationScreenProps, State> {
  state = {
    categoryModal: false,
    itemModal: false,
    packItemModal: false,
    gearCloset: [],
    packlistRef: null,
    gearCollectionRef: null,
    categoriesRef: null,
    categories: [],
    selectedCategory: {
      uid: '',
      name: '',
      packItems: [],
      totalWeight: 0,
    },
    selectedPackItem: {
      uid: '',
      name: '',
      description: '',
      worn: false,
      consumable: false,
      quantity: 0,
      price: '',
      weight: '',
      units: WeightUnit.OUNCES,
      photoURL: '',
      linkURL: '',
      userId: '',
    },
    packlist: {
      uid: '',
      name: '',
      description: '',
      units: WeightUnit.POUNDS,
      totalPackWeight: 0,
      baseWeight: 0,
      totalConsumableWeight: 0,
      totalWornWeight: 0,
      userId: '',
    },
  }

  componentWillMount() {
    const { navigation } = this.props
    const { getParam } = navigation

    const packlistId = getParam('packlistId')

    this.attachPacklistListener(packlistId)
    this.attachCategoriesListener(packlistId)
    this.attachGearItemsListener()
  }

  componentWillUnmount() {
    const { gearCollectionRef, packlistRef, categoriesRef } = this.state
    gearCollectionRef()
    packlistRef()
    categoriesRef()
  }

  attachPacklistListener = async (packlistId: string) => {
    const packlistRef = await firebase
      .firestore()
      .collection('packlists')
      .doc(packlistId)
      .onSnapshot(
        snapshot => {
          this.setState({
            packlist: { ...snapshot.data(), uid: snapshot.id },
          })
        },
        error => {
          console.log('attachPacklistListener: ', error)
        }
      )

    this.setState({ packlistRef })
  }

  attachCategoriesListener = async (packlistId: string) => {
    const categoriesRef = await firebase
      .firestore()
      .collection('packlists')
      .doc(packlistId)
      .collection('categories')
      .onSnapshot(
        snapshot => {
          const categories: Category[] = []
          snapshot.forEach(category =>
            categories.push({ ...category.data(), uid: category.id })
          )
          console.log('categories', ' => ', categories)
          this.setState({ categories })
        },
        error => {
          console.log('attachCategoriesListener: ', error)
        }
      )

    this.setState({ categoriesRef })
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
        error => console.log('attachGearItemsListener: ', error)
      )

    this.setState({ gearCollectionRef })
  }

  addCategory = (newCategory: string) => {
    const { packlist } = this.state
    const { uid } = packlist

    firebase
      .firestore()
      .collection('packlists')
      .doc(uid)
      .collection('categories')
      .add({
        name: newCategory,
        packItems: [],
        totalWeight: 0,
        created: firebase.firestore.Timestamp.now(),
      })
      .catch((error: Error) => console.log('addCategory: ', error))

    this.setState({
      categoryModal: false,
    })
  }

  addItemToCategory = (gearItem: GearItem) => {
    const { selectedCategory, packlist } = this.state
    const { uid } = packlist

    const packItem = {
      ...gearItem,
      consumable: false,
      worn: false,
      quantity: 1,
    }

    firebase
      .firestore()
      .collection('packlists')
      .doc(uid)
      .collection('categories')
      .doc(selectedCategory.uid)
      .update({
        packItems: firebase.firestore.FieldValue.arrayUnion(packItem),
        updated: firebase.firestore.Timestamp.now(),
      })
      .catch((error: Error) => console.log('addItemToCategory', error))
  }

  handleDeleteCategory = (category: Category) => {
    const { packlist } = this.state
    const { uid } = packlist

    firebase
      .firestore()
      .collection('packlists')
      .doc(uid)
      .collection('categories')
      .doc(category.uid)
      .delete()
      .catch((error: Error) => console.log('handleDeleteCategory', error))
  }

  handleRemovePackItemFromCategory = (
    packItem: PackItem,
    category: Category
  ) => {
    const { packlist } = this.state
    const { uid } = packlist

    firebase
      .firestore()
      .collection('packlists')
      .doc(uid)
      .collection('categories')
      .doc(category.uid)
      .update({
        packItems: firebase.firestore.FieldValue.arrayRemove(packItem),
        updated: firebase.firestore.Timestamp.now(),
      })
      .catch((error: Error) =>
        console.log('handleRemovePackItemFromCategory', error)
      )
  }

  handleAddItems = (category: Category) => {
    this.setState({ selectedCategory: category })
    this.toggleItemsModal()
  }

  handlePackItemPress = (packItem: PackItem) => {
    console.log('handlePackItemPress', ' => ', packItem)
    // show modal to edit PackItem
    this.setState({ selectedPackItem: packItem })
    this.togglePackItemModal()
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

  togglePackItemModal = () => {
    this.setState(state => ({
      packItemModal: !state.packItemModal,
    }))
  }

  handleToggleConsumable = () => {
    //
  }

  handleToggleWorn = () => {
    //
  }

  render() {
    const { navigation } = this.props
    const {
      selectedPackItem,
      categoryModal,
      itemModal,
      packItemModal,
      gearCloset,
      packlist,
      categories,
      selectedCategory,
    } = this.state
    const { name, description } = packlist

    const packItems = categories.flatMap(
      (category: Category) => category.packItems
    )

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
          {categories.map((category: Category) => {
            return (
              <CategoryTable
                key={category.uid}
                category={category}
                onAddItems={this.handleAddItems}
                onDeleteCategory={this.handleDeleteCategory}
                onPressItem={this.handlePackItemPress}
                onRemovePackItem={this.handleRemovePackItemFromCategory}
              />
            )
          })}
        </ScrollView>

        <FAB
          icon="playlist-add"
          style={_styles.addCategoryButton}
          onPress={this.toggleCategoryModal}
        />

        <PackItemModal
          isVisible={packItemModal}
          onDismissModal={this.togglePackItemModal}
          onToggleConsumable={this.handleToggleConsumable}
          onToggleWorn={this.handleToggleWorn}
          packItem={selectedPackItem}
          onDecreaseQuantity={() => {}}
          onIncreaseQuantity={() => {}}
        />
        <GearClosetModal
          category={selectedCategory}
          isVisible={itemModal}
          gearItems={_gearCloset}
          onPressItem={this.addItemToCategory}
          toggleModal={this.toggleItemsModal}
        />
        <AddCategoryModal
          isVisible={categoryModal}
          onAddCategory={this.addCategory}
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
})

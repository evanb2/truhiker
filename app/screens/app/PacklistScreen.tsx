import { AddCategoryModal } from 'components/AddCategoryModal'
import { CategoryTable } from 'components/CategoryTable'
import { GearClosetModal } from 'components/GearClosetModal'
import { PackItemModal } from 'components/PackItemModal'
import firebase from 'firebase'
import 'firebase/firestore'
import React, { Component } from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Button, FAB, Paragraph, Subheading, Title } from 'react-native-paper'
import { NavigationScreenProps } from 'react-navigation'
import { theme } from 'styles/theme'
import { calculateWeight } from 'utils/lib'
import { Category, GearItem, PackItem, Packlist, WeightUnit } from 'utils/types'

interface State {
  selectedCategory: Category
  selectedPackItem: PackItem
  categoryModal: boolean
  itemModal: boolean
  packItemModal: boolean
  gearItemsListener: () => void
  packlistListener: () => void
  packItemsListener: () => void
  selectedPackItemListener: () => void
  packlistRef: firebase.firestore.DocumentReference
  gearCloset: firebase.firestore.DocumentData[]
  packlist: Packlist
  packItems: PackItem[]
}

export class PacklistScreen extends Component<NavigationScreenProps, State> {
  state = {
    categoryModal: false,
    itemModal: false,
    packItemModal: false,
    gearCloset: [],
    packlistRef: firebase
      .firestore()
      .collection('packlists')
      .doc(),
    packlistListener: () => {},
    gearItemsListener: () => {},
    packItemsListener: () => {},
    selectedPackItemListener: () => {},
    selectedCategory: {
      name: '',
      totalWeight: 0,
    },
    selectedPackItem: {
      uid: '',
      name: '',
      description: '',
      category: '',
      worn: false,
      consumable: false,
      quantity: 0,
      price: '',
      weight: '',
      units: WeightUnit.OUNCES,
      photoURL: '',
      linkURL: '',
      userId: '',
      gearItemId: '',
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
      categories: [],
    },
    packItems: [],
  }

  componentWillMount() {
    const { navigation } = this.props
    const { getParam } = navigation

    const packlistId = getParam('packlistId')
    const packlistRef = firebase
      .firestore()
      .collection('packlists')
      .doc(packlistId)
    this.setState({
      packlistRef,
    })

    this.attachPacklistListener(packlistRef)
    this.attachPackItemsListener(packlistRef)
    this.attachGearItemsListener()
  }

  componentWillUnmount() {
    const {
      gearItemsListener,
      packlistListener,
      packItemsListener,
      selectedPackItemListener,
    } = this.state
    gearItemsListener()
    packlistListener()
    packItemsListener()
    selectedPackItemListener()
  }

  attachPacklistListener = async (
    packlistRef: firebase.firestore.DocumentReference
  ) => {
    const packlistListener = await packlistRef.onSnapshot(
      snapshot => {
        this.setState({
          // @TODO revisit Packlist assertion
          packlist: { ...(snapshot.data() as Packlist), uid: snapshot.id },
        })
      },
      error => {
        console.log('attachPacklistListener: ', error)
      }
    )

    this.setState({ packlistListener })
  }

  attachPackItemsListener = async (
    packlistRef: firebase.firestore.DocumentReference
  ) => {
    const packItemsListener = await packlistRef
      .collection('packItems')
      .onSnapshot(
        snapshot => {
          const packItems: PackItem[] = []
          snapshot.forEach(packItem =>
            packItems.push({
              // @TODO revisit PackItem assertion
              ...(packItem.data() as PackItem),
              uid: packItem.id,
            })
          )
          this.setState({ packItems })
        },
        error => {
          console.log('attachPackItemsListener: ', error)
        }
      )

    this.setState({ packItemsListener })
  }

  attachGearItemsListener = async () => {
    const user = firebase.auth().currentUser
    const gearItemsListener = await firebase
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

    this.setState({ gearItemsListener })
  }

  addCategory = (name: string) => {
    const { packlistRef } = this.state

    packlistRef.update({
      categories: firebase.firestore.FieldValue.arrayUnion({
        name,
        totalWeight: 0,
      }),
      updated: firebase.firestore.Timestamp.now(),
    })

    this.setState({
      categoryModal: false,
    })
  }

  handleDeleteCategory = (category: Category) => {
    const { packlistRef } = this.state

    packlistRef
      .update({
        categories: firebase.firestore.FieldValue.arrayRemove(category),
        updated: firebase.firestore.Timestamp.now(),
      })
      .catch((error: Error) => console.log('handleDeleteCategory', error))

    // @TODO remove PackItems in this category
  }

  handleAddPackItemToCategory = (gearItem: GearItem) => {
    const { selectedCategory, packlistRef } = this.state
    const { uid, ...fields } = gearItem

    const packItem = {
      ...fields,
      consumable: false,
      worn: false,
      quantity: 1,
      category: selectedCategory.name,
      gearItemId: uid,
    }

    packlistRef
      .collection('packItems')
      .add(packItem)
      .then(() => {
        packlistRef.update({ updated: firebase.firestore.Timestamp.now() })
      })
      .catch((error: Error) =>
        console.log('handleAddPackItemToCategory', error)
      )
  }

  handleRemovePackItemFromCategory = (packItem: PackItem) => {
    const { packlistRef } = this.state

    packlistRef
      .collection('packItems')
      .doc(packItem.uid)
      .delete()
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
    const { packlistRef } = this.state

    const selectedPackItemListener = packlistRef
      .collection('packItems')
      .doc(packItem.uid)
      .onSnapshot(
        snapshot => {
          this.setState({
            selectedPackItem: {
              ...(snapshot.data() as PackItem),
              uid: snapshot.id,
            },
          })
        },
        error => console.log('handlePackItemPress: ', error)
      )

    this.setState({ selectedPackItemListener })

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
    const { packlistRef, selectedPackItem } = this.state

    packlistRef
      .collection('packItems')
      .doc(selectedPackItem.uid)
      .update({
        consumable: !selectedPackItem.consumable,
      })
      .then(() => {
        packlistRef.update({ updated: firebase.firestore.Timestamp.now() })
      })
      .catch(error => console.log('handleToggleConsumable', error))
  }

  handleToggleWorn = () => {
    const { packlistRef, selectedPackItem } = this.state

    packlistRef
      .collection('packItems')
      .doc(selectedPackItem.uid)
      .update({
        worn: !selectedPackItem.worn,
      })
      .then(() => {
        packlistRef.update({ updated: firebase.firestore.Timestamp.now() })
      })
      .catch(error => console.log('handleToggleWorn', error))
  }

  handleQuantity = (value: number) => {
    const { packlistRef, selectedPackItem } = this.state

    packlistRef
      .collection('packItems')
      .doc(selectedPackItem.uid)
      .update({
        quantity: firebase.firestore.FieldValue.increment(value),
      })
      .then(() => {
        packlistRef.update({
          updated: firebase.firestore.Timestamp.now(),
        })
      })
      .catch(error => console.log('handleQuantity', error))
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
      selectedCategory,
      packItems,
    } = this.state
    const { name, description, categories } = packlist

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
          <View style={{ alignItems: 'center' }}>
            <Subheading>
              {`Total Weight: ${calculateWeight(packItems)} lbs`}
            </Subheading>
          </View>
          {categories.map((category: Category) => {
            const categoryItems = packItems.filter(
              (packItem: PackItem) => packItem.category === category.name
            )
            return (
              <CategoryTable
                key={category.name}
                category={category}
                categoryItems={categoryItems}
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
          onChangeQuantity={this.handleQuantity}
          // category={}
        />
        <GearClosetModal
          category={selectedCategory}
          isVisible={itemModal}
          gearItems={_gearCloset}
          onPressItem={this.handleAddPackItemToCategory}
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

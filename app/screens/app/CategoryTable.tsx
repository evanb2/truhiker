import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Card, DataTable } from 'react-native-paper'

export class CategoryTable extends Component {
  render() {
    return (
      <Card>
        <Card.Content>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title style={styles.descriptionCol}>
                Shelter
              </DataTable.Title>
              <DataTable.Title numeric style={styles.priceCol}>
                Price
              </DataTable.Title>
              <DataTable.Title numeric style={styles.weightCol}>
                Weight
              </DataTable.Title>
              <DataTable.Title numeric style={styles.qtyCol}>
                Qty
              </DataTable.Title>
            </DataTable.Header>

            <DataTable.Row style={styles.tableRow}>
              <DataTable.Cell style={styles.descriptionCol}>
                Borah 7x9
              </DataTable.Cell>
              <DataTable.Cell numeric style={styles.priceCol}>
                99
              </DataTable.Cell>
              <DataTable.Cell numeric style={styles.weightCol}>
                6.0
              </DataTable.Cell>
              <DataTable.Cell numeric style={styles.qtyCol}>
                1
              </DataTable.Cell>
            </DataTable.Row>

            <DataTable.Row style={styles.tableRow}>
              <DataTable.Cell style={styles.descriptionCol}>
                Borah Cuben Bivy
              </DataTable.Cell>
              <DataTable.Cell numeric style={styles.priceCol}>
                179
              </DataTable.Cell>
              <DataTable.Cell numeric style={styles.weightCol}>
                6.0
              </DataTable.Cell>
              <DataTable.Cell numeric style={styles.qtyCol}>
                1
              </DataTable.Cell>
            </DataTable.Row>
          </DataTable>
        </Card.Content>
      </Card>
    )
  }
}

const styles = StyleSheet.create({
  tableRow: {
    height: 32,
  },
  descriptionCol: {
    flex: 4,
  },
  priceCol: {
    flex: 3,
  },
  weightCol: {
    flex: 2,
  },
  qtyCol: {
    flex: 1,
  },
})

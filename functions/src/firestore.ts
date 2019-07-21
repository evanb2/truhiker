import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

admin.initializeApp()

const db = admin.firestore()

export const syncPackItems = functions.firestore
  .document('gearItems/{gearItem}')
  .onUpdate(async snapshot => {
    const afterData = snapshot.after.data() || {}
    const uid = snapshot.after.id

    const querySnapshot = await db
      .collectionGroup('packItems')
      .where('gearItemId', '==', uid)
      .get()

    const batch = db.batch()

    querySnapshot.forEach(doc => {
      return batch.update(db.doc(`packItems/${doc.id}`), { ...afterData })
    })

    return batch.commit()
  })

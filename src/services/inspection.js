import { db } from '../firebase';

export const getPaginationLength = async (collection) => {
  const querySnapshot = await db.collection(collection).get();
  return querySnapshot.size;
};

export const getAllDocuments = async (collection, { limit, lastVisible }) => {
  const collectionRef = await db.collection(collection);
  const total = await collectionRef.get().then((snapshot) => snapshot.size);

  let query = collectionRef.orderBy('inspection.date', 'desc');

  if (lastVisible) {
    query = query.startAfter(lastVisible.inspection.date);
  }

  query = query.limit(limit);

  const querySnapshot = await query.get();

  const data = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    uid: doc.id,
  }));

  const lastVisibleDoc = querySnapshot.docs[querySnapshot.docs.length - 1];

  return {
    data,
    total,
    lastVisible: lastVisibleDoc,
  };
};

export const createDocument = async (collection, data) => {
  const newDoc = await db.collection(collection).add(data);
  return newDoc.id;
};

export const updateDocument = async (collection, id, data) => {
  await db.collection(collection).doc(id).update(data);
};

export const deleteDocument = async (collection, id, data) => {
  await db.collection(collection).doc(id).update(data);
};

export const saveDocumentForLater = async (collection, id, data) => {
  console.log('collection to save for later: ', collection);
};

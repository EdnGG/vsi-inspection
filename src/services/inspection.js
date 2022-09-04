import { db } from '../firebase';

export const getPaginationLength = async (collection) => {
  const querySnapshot = await db.collection(collection).get();
  console.log('size: ', querySnapshot.size);
  return querySnapshot.size;
};

export const getAllDocuments = async (collection, { limit, lastDocument }) => {
  const total = await db
    .collection(collection)
    .get()
    .then((snapshot) => snapshot.size);

  const documents = await db
    .collection(collection)
    .orderBy('inspection')
    .startAfter(lastDocument)
    .limit(limit);

  const documentSnapshots = await documents.get();
  const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];

  const data = documentSnapshots.docs.map((doc) => {
    return { ...doc.data(), uid: doc.id };
  });

  return {
    data,
    total,
    lastVisible,
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
}


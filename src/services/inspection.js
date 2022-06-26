import { db, storage, auth } from '../firebase';

export const getPaginationLength = async (collection) => {
  const querySnapshot = await db.collection(collection).get();
  console.log('size: ', querySnapshot.size);
  return querySnapshot.size;
};

export const getAllDocuments = async (collection, { limit, page }) => {
  console.log('limit: ', limit);
  console.log('page: ', page);
  const total = await db
    .collection(collection)
    .get()
    .then((snapshot) => snapshot.size);

  const lastDocument = limit * page - 1;
  console.log('lastDocument: ', lastDocument);

  const documents = db
    .collection(collection)
    .orderBy('inspection')
    // .startAt(lastDocument)
    .limit(limit);

  const documentSnapshots = await documents.get();

  const data = documentSnapshots.docs.map((doc) => {
    return { ...doc.data(), uid: doc.id };
  });

  return {
    data,
    total,
  };
};

export const createDocument = async (collection, data) => {
  const newDoc = await db.collection(collection).add(data);
  return newDoc.id;
};

export const updateDocument = async (collection, id, data) => {
  await db.collection(collection).doc(id).update(data);
};

// import {
//   collection,
//   query,
//   orderBy,
//   startAfter,
//   limit,
// } from 'firebase/firestore';

import { db } from '../firebase';

export const getPaginationLength = async (collection) => {
  const querySnapshot = await db.collection(collection).get();
  // console.log('size: ', querySnapshot.size);
  return querySnapshot.size;
};

export const getAllDocuments = async (collection, { limit, lastVisible }) => {
  // const collectionRef = await db.collection(collection);
  // const total = await collectionRef.get().then((snapshot) => snapshot.size);

  // const q = db.query(
  //   collectionRef,
  //   orderBy('inspection.date', 'desc'),
  //   startAfter(lastDocument),
  //   limit(limit),
  // );

  // const querySnapshot = await q.get();
  // const data = querySnapshot.docs.map((doc) => ({
  //   ...doc.data(),
  //   uid: doc.id,
  // }));

  // const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

  // return {
  //   data,
  //   total,
  //   lastVisible,
  // };

  // Sugerencia 2

  // const collectionRef = db.collection(collection);
  // const total = await collectionRef.get().then((snapshot) => snapshot.size);

  // const querySnapshot = await collectionRef
  //   .orderBy('inspection.date', 'desc')
  //   .startAfter(lastDocument)
  //   .limit(limit)
  //   .get();

  // const data = querySnapshot.docs.map((doc) => ({
  //   ...doc.data(),
  //   uid: doc.id,
  // }));

  // const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

  // return {
  //   data,
  //   total,
  //   lastVisible,
  // };

  //  End sugerencia 2

  // Sugerencia 3

  // const collectionRef = db.collection(collection);
  // const total = await collectionRef.get().then((snapshot) => snapshot.size);

  // let query = collectionRef.orderBy('inspection.date', 'desc');

  // if (lastVisible) {
  //   query = query.startAfter(lastVisible);
  // }

  // query = query.limit(limit);

  // const querySnapshot = await query.get();

  // const data = querySnapshot.docs.map((doc) => ({
  //   ...doc.data(),
  //   uid: doc.id,
  // }));

  // const lastVisibleDoc = querySnapshot.docs[querySnapshot.docs.length - 1];

  // return {
  //   data,
  //   total,
  //   lastVisible: lastVisibleDoc,
  // };

  // end sugerencia 3

  // Sugerencia 4

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

  // end sugerencia 4

  // const total = await db
  //   .collection(collection)
  //   .get()
  //   .then((snapshot) => {
  //     snapshot.size;
  //   });

  // const documents = await db
  //   .collection(collection)

  //   .orderBy('inspection.date', 'desc')
  //   .startAfter(lastDocument)
  //   .limit(limit);

  // const documentSnapshots = await documents.get();
  // const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];

  // const data = documentSnapshots.docs.map((doc) => {
  //   return { ...doc.data(), uid: doc.id };
  // });

  // return {
  //   data,
  //   total,
  //   lastVisible,
  // };
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

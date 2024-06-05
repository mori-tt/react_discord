import { useEffect, useState } from "react";
import {
  DocumentData,
  Query,
  collection,
  onSnapshot,
  query,
} from "firebase/firestore";
import { db } from "../firebase";

interface Channals {
  id: string;
  channel: DocumentData;
}

const useCollection = (data: string) => {
  const [documents, setDocuments] = useState<Channals[]>([]);
  const collectionRef: Query<DocumentData> = query(collection(db, data));

  useEffect(() => {
    onSnapshot(collectionRef, (querySnapshot) => {
      const channelsResults: Channals[] = [];
      querySnapshot.docs.forEach((doc) =>
        // console.log(doc.id, doc.data())
        channelsResults.push({ id: doc.id, channel: doc.data() })
      );
      setDocuments(channelsResults);
    });
  }, []);
  return { documents };
};

export default useCollection;

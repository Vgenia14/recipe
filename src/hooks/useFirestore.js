import { useReducer } from "react";
import { projectFirestore } from "../firebase/firebase";

let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case "IS_PENDING":
      return { isPending: true, document: null, success: false, error: null };
    case "ADDED_DOCUMENT":
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };
    case "DELETED_DOCUMENT":
      return { isPending: false, document: null, success: true, error: null };

    case "UPDATED_DOCUMENT":
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };
    case "ERROR":
      return {
        isPending: false,
        document: null,
        success: false,
        error: action.payload,
      };

    default:
      return state;
  }
};


export const useFirestore = (_collection) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
//   const [isCancelled, setIsCancelled] = useState(false);

  
  const ref = projectFirestore.collection(_collection);
//   const dispatchIfNotCancelled = (action) => {
//     if (!isCancelled) {
//       dispatch(action);
//     }
//   };
  // add
  const addDocument = async (doc) => {
    dispatch({ type: "IS_PENDING" });
    try {
      const createdAt = new Date();
      const addedDocument = await ref.add({ ...doc, createdAt });
      dispatch({
        type: "ADDED_DOCUMENT",
        payload: addedDocument,
      });
    } catch (err) {
      dispatch({ type: "ERROR", payload: err.message });
    }
  };
  // delete
  const deleteDocument = async (id) => {
    dispatch({ type: "IS_PENDING" });
    dispatch({
      type: "DELETED_DOCUMENT",
    });
    try {
      await ref.doc(id).delete();
    } catch (error) {
      dispatch({
        type: "ERROR",
        payload: "could not delete",
      });
    }
  };
  // update
  const updateDocument = async (id, updates) => {
    dispatch({ type: "IS_PENDING" });
    try {
      const updatedDocument = await ref.doc(id).update(updates);
      dispatch({
        type: "UPDATED_DOCUMENT",
        payload: updatedDocument,
      });
      return updatedDocument;
    } catch (err) {
      dispatch({ type: "ERROR", payload: err.message });
      return null;
    }
  };

//   useEffect(() => {
//     return () => setIsCancelled(true);
//   }, []);

  return { addDocument, deleteDocument, updateDocument, response };
};

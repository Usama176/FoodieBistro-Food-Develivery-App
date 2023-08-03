import { 
    doc, 
    setDoc,
    collection,
    getDocs,
    orderBy,
    query,
} from "firebase/firestore";
import { firestore } from "../firebase.config";

// Function to save or update an item in the Firestore database
export const saveItem = async (data) => {
  try {
    // Generate a unique document ID based on the current timestamp
    const documentId = `${Date.now()}`;

    // Get a reference to the document where the data will be saved or updated.
    // The document reference is created using the 'doc' function, which takes two arguments:
    // 1. The Firestore instance ('firestore' from the imported '../firebase.config').
    // 2. The path to the document in the format 'collection/documentId'.
    const itemRef = doc(firestore, "foodItems", documentId);

    // Save or update the data in the Firestore document.
    // The 'setDoc' function is used to set the data, and the option '{ merge: true }' is provided
    // to merge the new data with the existing data if the document already exists.
    await setDoc(itemRef, data, { merge: true });

    // The operation is successful.
    console.log("Item saved successfully!");
  } catch (error) {
    // An error occurred during the save/update operation.
    console.error("Error saving item:", error.message);
  }
};

// Function to get all food items from Firestore
export const getAllFoodItems = async () => {
    try {
      // Get a snapshot of all documents in the 'foodItems' collection,
      // ordered by 'id' in descending order (latest items first).
      const itemsSnapshot = await getDocs(
        query(collection(firestore, "foodItems"), orderBy("id", "desc"))
      );
  
      // Extract the data from the snapshot and return it as an array of food items.
      // The 'docs' property of the snapshot contains an array of QueryDocumentSnapshot objects,
      // each representing a document in the collection.
      // We use the 'map' function to iterate over the array of documents and extract the 'data' from each document.
      // The 'data' method of the QueryDocumentSnapshot object returns an object containing the document's data.
      // The extracted data for each document is added to the resulting array of food items.
      const foodItems = itemsSnapshot.docs.map((doc) => doc.data());
  
      // Return the array of food items.
      return foodItems;
    } catch (error) {
      // If an error occurs during the data retrieval, handle it here.
      console.error("Error fetching food items:", error.message);
      // Return an empty array as a fallback in case of error.
      return [];
    }
}; 
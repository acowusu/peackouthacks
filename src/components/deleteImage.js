import { getStorage, ref, deleteObject } from "firebase/storage";
export default async function deleteImage(imageRef) {
  const storage = getStorage();

  // Create a reference to the file to delete
  const fileRef = ref(storage, imageRef);

  // Delete the file
  await deleteObject(fileRef);
}

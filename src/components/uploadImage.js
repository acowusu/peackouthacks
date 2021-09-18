import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import store from "../store";

function dec2hex(dec) {
  return dec.toString(16).padStart(2, "0");
}

// generateId :: Integer -> String
function generateId(len) {
  var arr = new Uint8Array((len || 40) / 2);
  window.crypto.getRandomValues(arr);
  return Array.from(arr, dec2hex).join("");
}

export default function ({ file, isProfile, onProgress, onError, onSuccess }) {
  const storage = getStorage();

  const metadata = {
    contentType: file.type,
    size: file.size,
  };

  // Upload file and metadata to the object 'images/mountains.jpg'
  let storageRef;
  if (isProfile) {
    storageRef = ref(
      storage,
      `images/${store.getters.uid}/profile.${file.type.split("/")[1]}`
    );
  } else {
    storageRef = ref(
      storage,
      `images/${store.getters.uid}/${generateId()}.${file.type.split("/")[1]}`
    );
  }
  const uploadTask = uploadBytesResumable(storageRef, file, metadata);

  // Listen for state changes, errors, and completion of the upload.
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + percent + "% done");
      onProgress({ percent });
    },
    (error) => {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      onError(error);
    },
    () => {
      // Upload completed successfully, now we can get the download URL
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log("File available at", downloadURL);
        onSuccess({
          url: downloadURL,
          ref: storageRef.fullPath,
        });
      });
    }
  );
}

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";

import {
  getDatabase,
  ref,
  onValue,
  push,
  set,
  get,
  remove,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";

import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyDAx5MvbVEVM4HsicsjYJjLB6HcyCKEVLk",
  authDomain: "chatreact-a09d8.firebaseapp.com",
  databaseURL: "https://chatreact-a09d8-default-rtdb.firebaseio.com",
  projectId: "chatreact-a09d8",
  storageBucket: "chatreact-a09d8.appspot.com",
  messagingSenderId: "585131826141",
  appId: "1:585131826141:web:ef89389e0a1391f1407434",
  measurementId: "G-2FFEQNRR5Z",
};
import { toast } from "react-toastify";
const toastAtrr = {
  position: "top-right",
  autoClose: 2000,
  hideProgressBar: true,
};
const showErrorMsg = (text) => {
  toast.error(text, toastAtrr);
};
const showSuccessMsg = (text) => {
  toast.success(text, toastAtrr);
};
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const storage = getStorage(app);

async function getDataInDatabase(url) {
  const dataInDb = (await get(ref(database, `${url}`))).val();
  return dataInDb;
}

async function userData(mail) {
  const allUserData = await getDataInDatabase("users");

  return Object.entries(allUserData).filter((data) => data[1].Mail == mail)[0];
}
async function allMsg() {
  let data = await Get("messages");
  data = Array.isArray(data) ? data : [];
  return data;
}

function setDataInDatabase(url, data) {
  set(ref(database, `${url}`), data);
}

function pushDataInDatabase(url, data) {
  push(ref(database, `${url}`), data);
}

async function uploadFile(file) {
  const storageReference = storageRef(storage, `profilePictures/${file.name}`);
  await uploadBytes(storageReference, file);
  const url = await getDownloadURL(storageReference);
  return url;
}
function listenerMsgs(callback) {
  onValue(ref(database, "messages"), (snapshot) => {
    const data = snapshot.val();
    allMsg();
    callback(data);
  });
}

function removeDataFromDatabase(index) {
  const dataRef = ref(database, `messages/${index}`);
  remove(dataRef)
    .then(() => {
      showSuccessMsg("Message removed successfully!");
    })
    .catch((error) => {
      showErrorMsg(`Error removing message:${error}`);
    });
}

const Base = () => {
  return <div></div>;
};

export default Base;

export const Get = getDataInDatabase;
export const Set = setDataInDatabase;
export const Push = pushDataInDatabase;
export const Uploader = uploadFile;
export const UserData = userData;
export const AllMsg = await allMsg();
export const ListenerMsgs = listenerMsgs;
export const DeleteMsg = removeDataFromDatabase;

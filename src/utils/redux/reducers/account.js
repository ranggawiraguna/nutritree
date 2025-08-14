import * as actionTypes from '../action';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, collection, query, where, limit, getDocs, updateDoc } from 'firebase/firestore';
import { auth, db } from 'config/database/firebase';
import { supabaseStorageUpload, supabaseStorageUrl } from 'config/database/supabase';

// Thunk Async Function - RESTORE_SESSION
export function restoreSession(action) {
  return async function restoreSessionThunk(dispatch, getState) {
    let data = getState().accountReducer;

    const docSnapshot = await getDoc(doc(db, 'admins', action.data));
    if (docSnapshot.exists()) {
      data = {
        username: action.data,
        ...docSnapshot.data()
      };
    }

    dispatch({ type: actionTypes.RESTORE_SESSION, data: data });
  };
}

// Thunk Async Function - CREATE_SESSION
export function createSession(action) {
  return async function createSessionThunk(dispatch, getState) {
    if (!action.isLoginProcess && action.data.username.length > 0 && action.data.password.length > 0) {
      action.setIsLoginProcess(true);

      const docSnapshot = await getDocs(query(
        collection(db, "admins"),
        where("username", "==", action.data.username.toString()),
        limit(1)
      ));

      if (!docSnapshot.empty) {
        try {
          signInWithEmailAndPassword(auth, docSnapshot.docs[0].data().email, action.data.password).then((userCredential) => {
            if (userCredential && userCredential.user) {
              action.showAlertToast('success', 'Berhasil Login akun');
             action.clearLoginForm(); 
            }
          });
        } catch (error) {
          if (error.code === 'auth/wrong-password') {
            action.showAlertToast('error', 'Password yang dimasukkan salah');
          } else {
            action.showAlertToast('error', `${error.code} - ${error.message}`);
          }
          action.clearLoginForm();
        }
      } else {
        action.showAlertToast('error', 'Username yang dimasukkan salah');
        action.clearLoginForm();
      }
    } else if (action.data.username.length <= 0 || action.data.password.length <= 0) {
      action.showAlertToast('warning', 'Silahkan lengkapi form login dengan benar');
      action.clearLoginForm();
    } else {
      action.showAlertToast('info', 'Login akun sedang di proses, mohon tunggu beberapa saat');
    }
  };
}

export function updateIdentity(action) {
  return async function updateIdentityThunk(dispatch, getState) {
    if (action.data !== null) {
      let data = getState().accountReducer;

      let result;
      if (action.data['photoUrl']) {
        try {        
          const response = await supabaseStorageUpload(`/admin-profiles/${data.username}`, action.data.photoUrl);
          if(response.error){
            throw response.error.message;
          } else {
            result = supabaseStorageUrl(response.data.path);
          }
        } catch (e) {
          result = null;
        }        
      } else {
        result = ' ';
      }

      if (result) {
        if (action.data['photoUrl']) {
          action.data = {
            ...action.data,
            photoUrl: result
          };
        }

        await updateDoc(doc(db, 'admins', action.username), action.data)
          .catch((error) => {
            action.setIsUpdateProcess(false);
            action.showAlert('warning', error.message);
          })
          .then(() => {
            data = {
              ...data,
              ...action.data
            };
            dispatch({ type: actionTypes.RESTORE_SESSION, data: data });
            action.showAlert('success', 'Data profil berhasil diperbarui');
            action.setIsUpdateProcess(false);
            action.handleClose();
          });
      } else {
        action.showAlert('warning', 'Terjadi kesalahan, silahkan coba kembali');
        action.setIsUpdateProcess(false);
      }
    }
  };
}

const accountReducer = (
  state = {
    isLogin: null,
    uid: '',
    username: '',
    password: '',
    fullname: '',
    email: '',
    photoUrl: '',
    role: ''
  },
  action
) => {
  switch (action.type) {
    case actionTypes.CLEAR_SESSION:
      return {
        ...state,
        isLogin: false
      };

    case actionTypes.RESTORE_SESSION:
      return {
        ...action.data,
        isLogin: true
      };

    default:
      return state;
  }
};

export default accountReducer;

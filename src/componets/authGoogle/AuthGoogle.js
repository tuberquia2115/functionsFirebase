
import firebase from 'firebase';

const AuthGoogle = async () => {
    try {
        const provider = new firebase.auth.GoogleAuthProvider()
        const result = await firebase.auth().signInWithPopup(provider)
        if (result) {
            return result.user
        }
        console("autenticaion correcta", result.user)
        return undefined
    } catch (error) {
        alert("no se puede subir el archivo esta muy pesado", error)
        console.error("Hubo un error en la autenticacion", error)
    }
}
const Salir = async () => {
    const salir = await firebase.auth().onAuthStateChanged(user => {
        if (user) {
            return user.photoURL
        } else {
            firebase.auth().signOut();
        }
    })
    console.log("se salio usuario", salir)
    return salir
}

export default {
    AuthGoogle,
    Salir
}
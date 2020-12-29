import React, { useState } from 'react';
import firebase from 'firebase';
import *  as  imgDefaut from '../../asset/miel.jpeg'
import Auth from '../authGoogle/AuthGoogle';




const FormFile = () => {
    const [file, setFile] = useState()
    const [urlImg, setUrlImg] = useState()
    const [idUser, serIdUser] = useState()
    const [porcentaje, setPorcentaje] = useState(0)
    const [imgUser, setImgUser] = useState();
    const [name, setName] = useState()

    const subirArchivo = async (file, idUser) => {
        if (file) {
            const refStorage = await firebase.storage().ref(`imgsParqueaderos/${idUser}/${file.name}`)
            const task = refStorage.put(file)
            task.on(
                'state_changed',
                snapshot => {
                    const porcentaje = snapshot.bytesTransferred / snapshot.totalBytes * 100
                    setPorcentaje(porcentaje)
                }, err => {
                    console.log("Error subiendo archivo", err);

                }, async () => {
                    try {
                        const url = await task.snapshot.ref.getDownloadURL()
                        setUrlImg(url)
                    } catch (error) {
                        console.error("Error obteniendo la dowloadURL", error);
                    }
                }
            )
        } else {
            alert("No se a ajuntado un archivo")
        }
    }

    const AunteticacionGoogle = async () => {
        const user = await Auth.AuthGoogle()
        setImgUser(user.photoURL);
        setName(user.displayName);
        serIdUser(user.uid)
        firebase.auth().signOut()
    }
    const SignOut = () => {
        Auth.Salir()
    }
    return (
        <div style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "#9999c7", width: "500px", borderRadius: "5rem" }} >
                <input style={{ margin: "10px" }} type="file" onChange={(e) => {
                    const archivo = e.target.files[0]
                    setFile(archivo)
                }}></input>
                <p> <strong>PROGRESO</strong> <br /> <progress style={{ width: "20rem" }} max="100" value={porcentaje}></progress> </p>
                <img style={{ borderRadius: "2rem" }} width="320" alt="imagen" src={Boolean(urlImg) ? urlImg : imgDefaut} />
                <button style={{ marginTop: "1rem", marginBottom: "10px" }} onClick={() => subirArchivo(file, idUser)}>subir Imagen</button>

            </div>
            <div>
                <h1>Autenticacion con Google</h1>

                <img style={{ width: "40rem", height: "25rem" }} alt="Usuario" src={imgUser}></img>
                <h3><strong>Nombre:{name}</strong></h3>
                {Boolean(idUser) ? <div>
                    <button onClick={() => SignOut()}>Salir</button>
                </div> : <button onClick={() => AunteticacionGoogle()}>Inisiar sesion</button>}

            </div>
        </div>
    )

}

export default FormFile;
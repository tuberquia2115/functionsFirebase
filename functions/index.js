const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp()

const db = admin;
const toUpperCase = (string) => string.toUpperCase()
exports.ListVegetables = functions.https.onRequest((resquest, response) => {
    const text = resquest.query.text;
    const secretText = toUpperCase(text);

    db.database()
        .ref('/messages')
        .push({ text: text })
        .then(() => response.json({
            message: 'great!!',
            text
        })).catch(() => {
            response.json({
                message: 'not great :('
            })
        })
})

exports.newMessage = functions.database.ref('/messages/{Id}').onCreate((event, context) => {

    const data = event.val()
    const newData = {
        msg: data.msg.toUpperCase()
    }
    return event.ref.parent.child('copiedData').set(newData)
})


exports.newVerduras = functions.firestore.document('/verduras/{idVerduras}').onCreate(async (data, context) => {
    const idVerduras = context.params.idVerduras;

    const datanew = {
        nombre: 'papa',
        precio: '900',
        cantidad: '9'
    }

    return await data.ref.set(datanew).then(() => console.log(`este es el id que se inserto ${idVerduras}`)
    )
})

exports.updateVerduras = functions.firestore.document('/verduras/{idVerduras}').onUpdate(async (change, context) => {
    const idVerduras = context.params.idVerduras;
    const newValue = change.after.data()
    const previosValur = change.before.data()

    if (newValue.nombre === previosValur.nombre) return null


    let precio = newValue.precio
    if (precio > 1500) {
        precio = 1000
    }


    return change.after.ref.set({
        precio: precio + 500
    }, { merge: true }).then(() => console.log(`este es el id que se aptualizo ${idVerduras}`)
    )


})

exports.validateSTORAGE = functions.storage.bucket('functions-2d8a6.appspot.com').object().onFinalize(async (object, callball) => {
    const filePath = object.name;
    const storageMBByte = 5 * 1000000;
    const fileSize = object.size;

    const validateSize = () => {
        if (fileSize > storageMBByte) {
            return console.log("EL archivo supera los 5MB  de almaceniento")
        } else {
            console.log("Archivo se almacenó correctamente");
        }
        return filePath
    }

    return validateSize()
})
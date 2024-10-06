import React, { useState } from 'react'
import { Button, Divider, IconButton, Modal, Portal, Snackbar, Text, TextInput } from 'react-native-paper'
import { styles } from '../../theme/styles'
import { View } from 'react-native'
import { push, ref, set } from 'firebase/database'
import { database } from '../../config/firebaseConfig'


interface Props {
    mostrarModalProductos: boolean
    setmostratModalProductos: Function //funcion del useState
}

//interface - formulario de productos
interface FormularioProductos {
    codigo: string
    nombreProducto: string
    precio: number
    descripcion: string
    tamanio: string
}

//interfaz - Controlador de mensajes
interface MostrarMensaje {
    visible: boolean,
    mensaje: string,
    color: string
}


export const AgregarProductoComponent = ({ mostrarModalProductos, setmostratModalProductos }: Props) => {
    //usestate para cambiar el estado del formulario
    const [formularioProductos, setformularioProductos] = useState<FormularioProductos>({
        codigo: '',
        nombreProducto: '',
        precio: 0,
        descripcion: '',
        tamanio: ''
    });
    //funcion para actulizar el estado del formulario
    const ActualizarValores = (key: string, value: string) => {
        setformularioProductos({ ...formularioProductos, [key]: value })
    }

    //funcion para guardar los productos
    const GuardarProductos = async () => {
        if (!formularioProductos.codigo || !formularioProductos.descripcion || !formularioProductos.nombreProducto || !formularioProductos.precio || !formularioProductos.tamanio) {
            setmostrarMensaje({
                visible: true,
                mensaje: "Completa todos los campos",
                color: "#7a0808"
            })
            return;
        }
        console.log(formularioProductos);
        //crear la ruta a la base de datos
        const dbRef = ref(database, 'productos')
        //crear una coleccion que agregue datos a la ruta
        const guardarProducto = push(dbRef)
        //almacenar los datos en la base de datos
        try{
            await set(guardarProducto, formularioProductos);
            //cerrar modal
            setmostratModalProductos(false)
        }catch(e){
            console.log(e);
            setmostrarMensaje({
                visible: true,
                mensaje: "Ha existido un error",
                color: "#7a0808"
            })
        }
    }

    //Cambiar el estado del mensaje de alerta
    const [mostrarMensaje, setmostrarMensaje] = useState<MostrarMensaje>({
        visible: false,
        mensaje: "",
        color: "#fff"
    })
    return (
        <>
            <Modal visible={mostrarModalProductos} contentContainerStyle={styles.modalProducts}>
                <View>
                <View style={styles.icon}>
                        <IconButton icon='close-circle-outline'
                            size={30}
                            onPress={() => setmostratModalProductos(false)} />
                    </View>
                    <Text variant='headlineLarge'>Nuevo producto</Text>

                </View>
                <Divider />
                <View>
                    <TextInput
                        label='Codigo'
                        mode='outlined'
                        onChangeText={(value) => { ActualizarValores('codigo', value) }} />
                    <TextInput
                        label='Nombre del producto'
                        mode='outlined'
                        onChangeText={(value) => ActualizarValores('nombreProducto', value)} />
                    <TextInput
                        label='Descripción'
                        mode='outlined'
                        multiline
                        numberOfLines={3}
                        onChangeText={(value) => ActualizarValores('descripcion', value)} />
                    <TextInput
                        label='Tamaño'
                        mode='outlined'
                        onChangeText={(value) => ActualizarValores('tamanio', value)} />
                    <TextInput
                        label='Precio'
                        mode='outlined'
                        keyboardType='numeric'
                        onChangeText={(value) => ActualizarValores('precio', value)} />
                </View>
                <Button
                    mode='contained'
                    onPress={GuardarProductos}
                >Agregar</Button>
            </Modal>
            <Snackbar
                style={{
                    ...styles.message,
                    backgroundColor: mostrarMensaje.color
                }}
                visible={mostrarMensaje.visible}
                onDismiss={() => setmostrarMensaje({ ...mostrarMensaje, visible: false })}>
                {mostrarMensaje.mensaje}
            </Snackbar>
        </>
    )
}

import React, { useEffect, useState } from 'react'
import { ScrollView, View } from 'react-native'
import { Button, Divider, Text, TextInput } from 'react-native-paper'
import { stylesDetalles } from '../theme/stylesDetalles'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Productos } from './HomeScreen'
import { ref, remove, update } from 'firebase/database'
import { auth, database } from '../config/firebaseConfig'
import { reloadAppAsync } from 'expo'

export const DetallesScreen = () => {
    //useRoot-> permite acceder a la informacion de la navegación
    const ruta = useRoute();
    //@ts-ignore
    const { productos } = ruta.params
    console.log(productos);
    //usestate para cambiar el estado del formulario
    const [formularioEditar, setformularioEditar] = useState<Productos>({
        id: '',
        codigo: '',
        nombreProducto: '',
        precio: 0,
        descripcion: '',
        tamanio: ''
    })

    //useEffect: Cargar y mostrar los datos en el formulario
    useEffect(() => {
        //Actualizar los datos en el formulario
        setformularioEditar(productos)
    }, [])

    //funcion para actualizar los datos capturados desde el formularop
    const ActualizarValores = (key: string, value: string) => {
        setformularioEditar({ ...formularioEditar, [key]: value })
    }
    //Navegacion
    const navegation = useNavigation();
    //actualizar los datos
    const ActualizarProdutos = async () => {
        //Direccionar a la tabla de datos y al dato por ID
        const dbRef = ref(database, 'productos/' + auth.currentUser?.uid + '/' + formularioEditar.id)
        //actualizar el dato seleccionado
        try {
            await update(dbRef, {
                codigo: formularioEditar.codigo,
                nombreProducto: formularioEditar.nombreProducto,
                precio: formularioEditar.precio,
                descripcion: formularioEditar.descripcion,
                tamanio: formularioEditar.tamanio
            })
            //Regresar al home
            navegation.goBack();
        } catch (e) {
            console.log(e);
        }
    }

    //funcion para eliminar los datos
    const EliminarProducto = async () => {
        const dbRef = ref(database, 'productos/'+ auth.currentUser?.uid + '/' + formularioEditar.id)
        try {
            await remove(dbRef)
            navegation.reset({
                index:0,
                //@ts-ignore
                routes:[{name:'Home'}]
            })
        } catch (e) {
            console.log(e);
        }
    }
    return (
        <ScrollView>
            <View style={stylesDetalles.rootDetail}>
                <View>
                    <Text variant='headlineMedium'>Código</Text>
                    <TextInput
                        value={formularioEditar.codigo}
                        onChangeText={(value) => ActualizarValores('codigo', value)} />

                </View>
                <View>
                    <Text variant='bodyLarge'>Nombre</Text>
                    <TextInput
                        value={formularioEditar.nombreProducto}
                        onChangeText={(value) => ActualizarValores('nombreProducto', value)} />
                    <Divider />
                </View>
                <View>
                    <Text variant='bodyLarge'>Precio</Text>
                    <TextInput
                        value={formularioEditar.precio.toString()}
                        onChangeText={(value) => ActualizarValores('precio', value)} />
                    <Divider />
                </View>
                <View>
                    <Text variant='bodyLarge'>Descripción: </Text>
                    <TextInput
                        value={formularioEditar.descripcion}
                        multiline
                        numberOfLines={3}
                        onChangeText={(value) => ActualizarValores('descripcion', value)} />
                    <Divider />
                </View>
                <View>
                    <Text variant='bodyLarge'>Tamaño</Text>
                    <TextInput
                        value={formularioEditar.tamanio}
                        onChangeText={(value) => ActualizarValores('tamanio', value)} />
                    <Divider />
                </View>
                <Button
                    mode='contained'
                    icon='update'
                    onPress={ActualizarProdutos}>Actualizar</Button>
                <Button
                    mode='contained'
                    icon='delete'
                    onPress={EliminarProducto}>Eliminar</Button>

            </View>
        </ScrollView>
    )
}

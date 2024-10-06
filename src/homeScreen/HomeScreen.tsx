import React, { useEffect, useState } from 'react'
import { Avatar, Button, Divider, FAB, IconButton, Modal, Portal, Text, TextInput } from 'react-native-paper'
import { auth, database } from '../config/firebaseConfig';
import { FlatList, View } from 'react-native';
import { styles } from '../theme/styles';
import { CommonActions, useNavigation, useRoute } from '@react-navigation/native';
import firebase, { updateProfile } from '@firebase/auth'
import { ProductosComponent } from './components/ProductosComponent';
import { AgregarProductoComponent } from './components/AgregarProductoComponent';
import { onValue, ref } from 'firebase/database';


//interfaz para visualizar al usuario
interface UsuarioAutenticado {
    name: string;
}
//interfaz - Productos
interface Productos{
    id:string
    codigo:string
    nombreCafe:string
    descripcion:string
    tamanio:string,
    precio:number
}


export const HomeScreen = () => {
    const route = useRoute()
    //hook- useState : cambiar el estado del formulario 
    const [autenticacion, setautenticacion] = useState<UsuarioAutenticado>({
        name: ""
    })
    //capturar y modificar la data del usuario
    const [datosUsuario, setdatosUsuario] = useState<firebase.User | null>(null)

    //gestionar la lista de productos
    const [productos, setproductos] = useState<Productos[]>([
        {id:'1',codigo:'Cafe', nombreCafe:'Mochachino', descripcion: 'Cafe en leche nevado', tamanio:'Grande', precio:9.99},
        {id:'2',codigo:'Cafe', nombreCafe:'Te negro', descripcion: 'Te negro', tamanio:'Pequeño', precio:4.99}
    ])
    //Permitir que el modal se visualice
    const [mostrarModalProductos, setmostrarModalProductos] = useState<boolean>(false)

    //hook: obtener información del usuario autenticado
    useEffect(() => {
        setdatosUsuario(auth.currentUser); 
        setautenticacion({name: auth.currentUser?.displayName ?? ''})

    }, [])
    

    //navegador
    const navigation = useNavigation();

    //funcion para obtener los prudctos y poder listarlos
    const obtenerLosProductos = () =>{
        //Direccionar a la base de datos
        const dbRef = ref(database, 'productos');
        //acceder a la data
        onValue(dbRef, (snapshot) =>{
            const datos = snapshot.val()
            //obtener las keys de cada dato
            const obtenerKeys = Object.keys(datos)
            //crear un arreglo para almacenar cada producto que se obtiene
            const listaDeProductos:Productos[] = []
            //recorrer las key para acceder a los productos
            obtenerKeys.forEach((key) =>{
                const value = {...datos[key]}
            })
        })
    }


    return (
        <>
            <View style={styles.rootHome}>
                <View style={styles.headerHome}>
                    <Avatar.Text size={30} label='DO' />
                    <View>
                        <Text variant='bodySmall'>Bienvenido</Text>
                        <Text variant='labelLarge'>{autenticacion.name}</Text>
                    </View>
                    <View style={styles.iconProfile}>
                        <IconButton
                            icon="account-edit"
                            size={30}
                            mode='contained'
                            onPress={() => navigation.dispatch(CommonActions.navigate({name:'Update'}))}
                        />
                    </View>
                </View>
            <View>
                <FlatList
                data={productos}
                renderItem={({item}) =><ProductosComponent/>}
                keyExtractor={item => item.id}/>
            </View>
            </View>
            <FAB
            icon="plus"
            style={styles.fabProduct}
            onPress={() => setmostrarModalProductos(true)}
            />
            <AgregarProductoComponent mostrarModalProductos={mostrarModalProductos} setmostratModalProductos={setmostrarModalProductos}/>
        </>
    )
}

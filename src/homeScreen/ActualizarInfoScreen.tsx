// Importaciones necesarias
import { CommonActions, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { updatePhoneNumber, updateProfile } from '@firebase/auth';
import { auth } from '../config/firebaseConfig';
import firebase from '@firebase/auth'
import { stylesActualizar } from '../theme/stylesActualizar';
// Interfaz para visualizar al usuario
interface UsuarioAutenticado {
    name: string;
}

export const ActualizarInfoScreen = () => {
    // Hook para manejar el estado del formulario
    const [autenticacion, setAutenticacion] = useState<UsuarioAutenticado>({ name: ""});
    const [datosUsuario, setDatosUsuario] = useState<firebase.User | null>(null);
    
    // Navegador
    const navigation = useNavigation();

    // Hook para obtener información del usuario autenticado
    useEffect(() => {
        setDatosUsuario(auth.currentUser);
        setAutenticacion({ name: auth.currentUser?.displayName ?? '' });
    }, []);

    // Función para actualizar el estado del formulario
    const ActualizarValores = (key: string, value: string) => {
        setAutenticacion({ ...autenticacion, [key]: value });
    };

    // Función para actualizar los datos del usuario autenticado
    const ActualizarInformacion = async () => {
        try {
            await updateProfile(datosUsuario!, { displayName: autenticacion.name});
            // Navegar a la pantalla Home después de actualizar
            navigation.dispatch(CommonActions.navigate({ name: 'Home' }));
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <View style={stylesActualizar.rootUpdate}>
            <Text style={stylesActualizar.headerUpdate} variant='headlineMedium'>Actualizar información</Text>
            <TextInput
            style={stylesActualizar.inputUpdate}
                mode='outlined'
                label='Nombre'
                value={autenticacion.name}
                onChangeText={(value) => ActualizarValores('name', value)}
            />
            <TextInput
            style={stylesActualizar.inputUpdate}
                mode='outlined'
                label='Correo'
                disabled
                value={datosUsuario?.email!}
            />
            <Button
            style={stylesActualizar.buttonUpdate}
                mode='contained'
                onPress={ActualizarInformacion}>
                Actualizar
            </Button>
            <Button
            style={stylesActualizar.cancelButtonUpdate}
                onPress={() => navigation.dispatch(CommonActions.navigate({ name: 'Home' }))}>
                Cancelar
            </Button>
        </View>
    );
};

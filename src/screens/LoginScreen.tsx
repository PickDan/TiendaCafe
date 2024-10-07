import React, { useState } from 'react'
import { View } from 'react-native'
import { styles } from '../theme/styles'
import { Button, Snackbar, Text, TextInput } from 'react-native-paper'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../config/firebaseConfig'
import { CommonActions, useNavigation } from '@react-navigation/native'
//interfaz - Formulario para iniciar sesión
interface FormularioLogin {
    correo: string
    contrasenia: string
}
//interfaz - Controlador de mensajes
interface MostrarMensaje {
    visible: boolean,
    mensaje: string,
    color: string
}



export const LoginScreen = () => {
    //hook useState: cambiar el estado del formulario
    const [formularioLogin, setformularioLogin] = useState<FormularioLogin>({
        correo: "",
        contrasenia: ""
    })
    //actualizar el estado del formulario
    const ActualizarValores = (key: string, value: string) => {
        setformularioLogin({ ...formularioLogin, [key]: value })
    }

    //Permite la navigación entre screens
    const navigation = useNavigation();

    //Cambiar el estado del mensaje de alerta
    const [mostrarMensaje, setmostrarMensaje] = useState<MostrarMensaje>({
        visible: false,
        mensaje: "",
        color: "#fff"
    })
    //Permitir que la contraseña sea visible
    const [ocultarContra, setocultarContra] = useState<boolean>(true)

    //funcion iniciar sesion
    const IniciarSesion = async () => {
        //validar campos
        if (!formularioLogin.correo || !formularioLogin.contrasenia) {
            setmostrarMensaje({
                visible: true,
                mensaje: "Completa los campos",
                color: "#7a0808"
            })
            return;
        }
        console.log(formularioLogin);
        try {
            const response = await signInWithEmailAndPassword(
                auth,
                formularioLogin.correo,
                formularioLogin.contrasenia
            );
            //navegar al home
            navigation.dispatch(CommonActions.navigate({name:'Home'}))
        } catch (e) {
            console.log(e);
            setmostrarMensaje({
                visible: true,
                mensaje: 'Usuario y/o contraseña incorrectos',
                color: '#7a0808'
            })

        }
    }
    return (
        <View style={styles.root}>
            <Text style={styles.text}>Iniciar sesión</Text>
            <TextInput
                label="Correo"
                mode='flat'
                placeholder='Escribe un correo'
                onChangeText={(value) => ActualizarValores('correo', value)}
            />
            <TextInput
                label="Contraseña"
                mode='flat'
                placeholder='Escribe una contraseña'
                secureTextEntry={ocultarContra}
                onChangeText={(value) => ActualizarValores("contrasenia", value)}
                right={<TextInput.Icon icon="eye" onPress={() => setocultarContra(!ocultarContra)} />}
            />
            <Button mode="contained" onPress={IniciarSesion}>
                Iniciar sesión
            </Button>
            <Text style={styles.textRedirect}
            onPress={() => navigation.dispatch(CommonActions.navigate({name:'Register'}))}>
                ¿No tienes cuenta? Regístrate ahora!
            </Text>
            <Snackbar
                style={{
                    ...styles.message,
                    backgroundColor: mostrarMensaje.color
                }}
                visible={mostrarMensaje.visible}
                onDismiss={() => setmostrarMensaje({ ...mostrarMensaje, visible: false })}>
                {mostrarMensaje.mensaje}
            </Snackbar>
        </View>
    )
}

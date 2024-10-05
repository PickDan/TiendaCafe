import React, { useState } from 'react'
import { View } from 'react-native'
import { Button, Snackbar, Text, TextInput } from 'react-native-paper'
import { styles } from '../theme/styles'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../config/firebaseConfig'
import { CommonActions, useNavigation } from '@react-navigation/native'

//interfaz - Formulario para registro
interface FormularioRegistro {
    correo: string
    contrasenia: string
}
//interfaz - Controlador de mensajes
interface MostrarMensaje {
    visible: boolean,
    mensaje: string,
    color: string

}


export const RegistroScreen = () => {
    //HOOK CAMBIAR ESTADO (USESTATE)
    //Cambiar el estado del formulario
    const [formularioRegistro, setformularioRegistro] = useState<FormularioRegistro>({
        correo: "",
        contrasenia: ""
    })
    //Cambiar el estado del mensaje de alerta
    const [mostrarMensaje, setmostrarMensaje] = useState<MostrarMensaje>({
        visible: false,
        mensaje: "",
        color: "#fff"
    })

    //Permitir que la contraseña sea visible
    const [ocultarContra, setocultarContra] = useState<boolean>(true)

    //Permite la navigación entre screens
    const navigation = useNavigation();

    //Función para actualizar el estado del formulario
    const ActualizarValores = (key: string, value: string) => {
        setformularioRegistro({ ...formularioRegistro, [key]: value });
    }

    //Función para registrar un nuevo usuario
    const Registro = async () => {
        if (!formularioRegistro.correo || !formularioRegistro.contrasenia) {
            setmostrarMensaje({ visible: true, mensaje: "Completa todos lo campos", color: "#7a0808" })
            return;
        }
        console.log(formularioRegistro);
        try {
            const response = await createUserWithEmailAndPassword(
                auth,
                formularioRegistro.correo,
                formularioRegistro.contrasenia
            );
            setmostrarMensaje({
                visible: true,
                mensaje: "Registro exitoso",
                color: '#085f06'
            })
        } catch (e) {
            console.log(e);
            setmostrarMensaje({
                visible: true,
                mensaje: "Existe un problema interno, intenta más tarde",
                color: '#f9d423'
            })
        }
    }

    return (
        <View style={styles.root}>
            <Text style={styles.text}>Regístrate</Text>
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
            <Button mode="contained" onPress={Registro}>
                Registrarse
            </Button>
            <Text style={styles.textRedirect}
                onPress={() => navigation.dispatch(CommonActions.navigate({ name: 'Login' }))}>
                ¿Ya tienes cuenta? Inicia sesión!
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

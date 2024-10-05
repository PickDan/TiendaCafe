import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { Avatar, Text } from 'react-native-paper'
import { auth } from '../config/firebaseConfig';
import { View } from 'react-native';
import { styles } from '../theme/styles';

//interface para visualizar al usuario
interface UsuarioAutenticado {
    name: string;
}

export const HomeScreen = () => {
    //hook- useState : cambiar el estado del formulario 
    const [autenticacion, setautenticacion] = useState<UsuarioAutenticado>({
        name: ""
    })
    //hook: validar el esado de autenticacion
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setautenticacion({ name: user.displayName ?? 'NA' })
            }
        })
    })
    return (
        <View style={styles.rootHome}>
            <View style={styles.headerHome}>
                <Avatar.Text size={30} label='IM' />
                <View>
                    <Text variant='bodySmall'>Bienvenido</Text>
                    <Text variant='labelLarge'>{autenticacion.name}</Text>
                </View>
            </View>
        </View>
    )
}

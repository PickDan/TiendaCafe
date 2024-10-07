import React from 'react'
import { View } from 'react-native'
import { IconButton, Text } from 'react-native-paper'
import { styles } from '../../theme/styles'
import { Productos } from '../HomeScreen';
import { CommonActions, useNavigation } from '@react-navigation/native';

//interfaz -Props
interface Props{
    productos:Productos;
}



export const ProductosComponent = ({productos}:Props) => {
    //Navegación
const navigation = useNavigation();
    return (
        <View style={styles.rootListProducts}>
            <View>
                <Text variant='labelLarge'>Nombre: {productos.nombreProducto}</Text>
                <Text variant='bodyMedium'>Precio: {productos.precio}</Text>
            </View>
            <View style={styles.iconHeader}>
                <IconButton
                icon="arrow-right-bold-box"
                size={25}
                mode='contained'
                onPress={() => navigation.dispatch(CommonActions.navigate({name:'Detail', params:{productos}}))}
                />
            </View>
        </View>

    )
}

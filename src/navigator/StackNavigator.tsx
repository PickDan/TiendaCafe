import { createStackNavigator } from "@react-navigation/stack"
import { LoginScreen } from "../screens/LoginScreen";
import { RegistroScreen } from "../screens/RegistroScreen";
import { HomeScreen } from "../homeScreen/HomeScreen";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebaseConfig";
import { ActivityIndicator } from "react-native-paper";
import { View } from "react-native";
import { styles } from "../theme/styles";
//interfaz para gestionar las rutas
interface Rutas {
    name: string
    screen: () => JSX.Element
}

//arreglos con rutas cuando el usuario no esté autenticado
const rutasParaNoAutenticados: Rutas[] = [
    { name: 'Login', screen: LoginScreen },
    { name: 'Register', screen: RegistroScreen }
];

//arreglos con rutas cuando el usuario si está registrado
const rutasParaSiAutenticados: Rutas[] = [
    { name: 'Home', screen: HomeScreen },
];
const Stack = createStackNavigator();

export const StackNavigator = () => {
    //useState: verificar si está autenticado o no
    const [estaAutenticado, setestaAutenticado] = useState<boolean>(false)
    //controlar la carga inicial
    const [estaCargando, setestaCargando] = useState<boolean>(false)

    //useEfect: Validar el estado de autenticación
    useEffect(() => {
        //cargar el indicador
        setestaCargando(true)
        onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log(user);
                setestaAutenticado(true)
            }
            //ocultar el indicador
            setestaCargando(false)
        });
    }, []);

    return (
        <>
            {estaCargando ? (
                <View style={styles.rootActivity}>
                    <ActivityIndicator animating={true} color="#351330" />
                </View>
            ) : (
                <Stack.Navigator>
                    {
                        !estaAutenticado ?
                            rutasParaNoAutenticados.map((item, index) => (
                                <Stack.Screen key={index}
                                    name={item.name}
                                    options={{ headerShown: false }}
                                    component={item.screen} />
                            ))
                            :
                            rutasParaSiAutenticados.map((item, index) => (
                                <Stack.Screen key={index}
                                    name={item.name}
                                    options={{ headerShown: false }}
                                    component={item.screen} />
                            ))
                    }
                </Stack.Navigator>
            )}
        </>
    )
}
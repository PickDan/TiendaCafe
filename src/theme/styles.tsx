import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    root:{
        flex:1,
        justifyContent:'center',
        padding:25,
        gap:15
    },
    text:{
        fontSize:25,
        fontWeight:'bold',
        textAlign:'center'
    },
    message:{
        width:'110%'
    },
    textRedirect:{
        marginTop:20,
        textAlign:'center',
        fontSize:15,
        fontWeight:'bold',
        color: '#6a4a3c'
    },
    rootActivity:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    rootHome:{
        flex:1,
        marginHorizontal:15,
        marginVertical:50
    },
    headerHome:{
        flexDirection: 'row',
        gap:15,
        alignItems:'center'
    }
})
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    root:{
        flex:1,
        justifyContent:'center',
        padding:25,
        gap:15,
        backgroundColor: '#f5f5dc',
    },
    text:{
        fontSize:25,
        fontWeight:'bold',
        textAlign:'center',
        color: '#6a4a3c'
    },
    message:{
        width:'110%',
        color: '#8b4513'
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
        marginVertical:50,
    },
    headerHome:{
        flexDirection: 'row',
        gap:15,
        alignItems:'center'
    },
    iconProfile:{
        alignItems:'flex-end',
        flex:1
    },
    iconHeader:{
        alignItems: 'flex-end',
        flex:1
    },
    modalProducts:{
        padding:20,
        marginHorizontal:20,
        borderBlockColor:'#fff',
        borderRadius:15,
        gap:10,
        backgroundColor: '#fdf5e6'
    },
    rootListProducts:{
        flexDirection: 'row',
        padding:15,
        alignItems:'center',
        backgroundColor: '#f5f5dc',
        borderRadius: 10,
        marginVertical: 5,
    },
    fabProduct:{
        position:'absolute',
        bottom:20,
        right:15,
        backgroundColor: '#ff847c'
    },
    fabLogOut:{
        position:'absolute',
        bottom:20,
        left:15,
        backgroundColor: '#ff847c'
    },
    icon:{
        alignItems:'flex-end',
        flex:1
    },
    rootInputsProduct:{
        flexDirection:'row',
        gap:35
    }
}
)
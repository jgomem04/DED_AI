import { StackActions } from "@react-navigation/native";
import React from "react";
import {View, StyleSheet} from "react-native";
import {Text, Button, TextInput} from "react-native-paper";
import theme from "../theme";

export default function Login({ navigation }){    
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [isValidUsername, setIsValidUsername] = React.useState(true);
    const [isValidPasword, setIsValidPassword] = React.useState(true);

    function updateUsername(user){
        let valid = /^[a-zA-Z0-9]*$/.test(user);
        setUsername(user);

        if(user !== "" && valid){
            setIsValidUsername(true);
        }else{
            setIsValidUsername(false);
        }
    }

    function updatePassword(pass){
        setPassword(pass);

        if(pass !== ""){
            setIsValidPassword(true);
        }else{
            setIsValidPassword(false);
        }
    }

    function signIn(){
        if(isValidUsername && isValidPasword){
            navigation.dispatch(StackActions.replace('Loading', {credentials: {user: username, pass: password}}))
        }
    }

    return(
        <View style={styles.mainContainer}>
            <View>
                <Text style={styles.title}>
                    Login
                </Text>
            </View>
            
            <View style={styles.inputContainer}>
                <TextInput value={username} error={!isValidUsername} onChangeText={text => updateUsername(text)} mode="outlined" label="Usuario"/>
                <TextInput value={password} error={!isValidPasword} secureTextEntry onChangeText={text => updatePassword(text)} mode="outlined" label="Contraseña"/>
            </View>

            <View>
                <Button style={styles.button} labelStyle={styles.buttonFont} icon="login" mode="outlined" onPress={() => {signIn()}}>
                    Continuar
                </Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: theme.flexes.default,
        backgroundColor: theme.colors.background,
        justifyContent: theme.aligns.center,
        margin: theme.margins.default
    },
    inputContainer: {
        margin: theme.margins.default
    },
    title: {
        textAlign: theme.aligns.center,
        fontSize: theme.fontSizes.title
    },
    button: {
        borderRadius: theme.borders.default,
        margin: theme.margins.default
    },
    buttonFont: {
        fontSize: theme.fontSizes.button
    }
})
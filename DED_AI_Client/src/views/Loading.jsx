import React from "react";
import {View, StyleSheet} from 'react-native';
import {Text, ActivityIndicator} from 'react-native-paper';
import AnalysisService from '../services/AnalysisService';
import AuthService from "../services/AuthService";
import {StackActions} from '@react-navigation/native';
import theme from "../theme";

export default function Loading({ route, navigation }){
    const { toAnalyze } = route.params;
    const { feedback } = route.params;
    const { credentials } = route.params;
    const { accessToken } = route.params;
    const { sample } = route.params;

    React.useEffect(() => {
        if(toAnalyze !== undefined){
            errorMessage = "Ha habido un fallo al enviar la imagen al servidor. Inténtelo de nuevo, o vuelva a comenzar el proceso."

            AnalysisService
                .sendImage(toAnalyze.base64, accessToken)
                .then(res => {
                    navigation.dispatch(StackActions.replace('Results', {sample: res.data, token: accessToken}));
                })
                .catch(error => {
                    navigation.dispatch(StackActions.replace('Error', {analysisToRetry: toAnalyze, message: errorMessage, token: accessToken}));
                })
        }else if(credentials !== undefined){
            errorMessage = "Ha habido un fallo al iniciar sesión. Intentelo de nuevo, o vuelva para reintroducir sus credenciales."

            AuthService
                .getSessionToken(credentials)
                .then(res => {
                    navigation.dispatch(StackActions.replace('Welcome', {accessToken: res.data.accessToken}))
                })
                .catch(error =>{
                    navigation.dispatch(StackActions.replace('Error', {credentialsToRetry: credentials, message: errorMessage}))
                })
        }else if(sample !== undefined){
            errorMessage = "Ha habido un fallo al enviar el feedback al servidor. Inténtelo de nuevo, o vuelva a comenzar el proceso."

            AnalysisService
                .sendFeedback(sample, feedback, accessToken)
                .then(res => {
                    navigation.dispatch(StackActions.replace('Thanks', {token: accessToken}));
                })
                .catch(error => {
                    navigation.dispatch(StackActions.replace('Error', {feedbackToRetry: feedback, aSample:sample, message: errorMessage, token: accessToken}))
                })
        }


    })

    return(
        <View style={styles.mainContainer}>
            <ActivityIndicator animating={true} size="large"/>

            <View style={styles.paragraphContainer}>
                <Text style={styles.paragraph}>
                    Procesando. Espere, por favor.
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: theme.flexes.default,
        backgroundColor: theme.colors.background,
        alignItems: theme.aligns.center,
        justifyContent: theme.aligns.center
    },
    paragraphContainer: {
        margin: theme.margins.default
    },
    paragraph: {
        fontSize: theme.fontSizes.paragraph,
        textAlign: theme.aligns.justify
    },
});
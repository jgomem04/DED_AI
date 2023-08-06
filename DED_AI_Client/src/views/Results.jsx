import React from "react";
import {View, StyleSheet} from "react-native";
import {Text, Button} from "react-native-paper";
import {StackActions} from '@react-navigation/native';
import theme from "../theme";

export default function Results({route, navigation}){
    const { sample } = route.params;
    const { token } = route.params;

    return(
        <View style={styles.mainContainer}>
            <View styles={styles.titleParagraphContainers}>
                {sample.analysisResult ? <Text style={styles.title}>Positivo</Text> : <Text style={styles.title}>Negativo</Text>}
            </View>

            <View style={styles.titleParagraphContainers}>
                <Text style={styles.paragraph}>
                    El análisis de la muestra {sample.fileName} concluyó con éxito. Para ofrecer su retroalimentación, pulse en el botón situado debajo.
                </Text>
            </View>

            <View style={styles.buttonsCotainer}>
                <Button style={styles.button} labelStyle={styles.buttonFont} icon="chevron-right" mode="outlined" onPress={() => {navigation.dispatch(StackActions.replace('Feedback', {aSample: sample, tokenAccess: token}))}}>
                    Siguiente
                </Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: theme.flexes.default,
        backgroundColor: theme.colors.background,
        alignItems: theme.aligns.center,
        justifyContent: theme.aligns.center
    },
    titleParagraphContainers: {
        margin: theme.margins.default
    },
    buttonsCotainer: {
        flexDirection: theme.directions.row
    },
    title: {
        fontSize: theme.fontSizes.title
    },
    paragraph: {
        fontSize: theme.fontSizes.paragraph,
        textAlign: theme.aligns.justify
    },
    button: {
        borderRadius: theme.borders.default,
        margin: theme.margins.default
    },
    buttonFont: {
        fontSize: theme.fontSizes.button
    }
})
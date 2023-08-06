import React from "react";
import {View, StyleSheet} from "react-native";
import {Text, Button} from "react-native-paper";
import {StackActions} from '@react-navigation/native';
import theme from "../theme";

export default function Feedback({route, navigation}){
    const { aSample } = route.params;
    const { tokenAccess } = route.params;

    return(
        <View style={styles.mainContainer}>
            <View styles={styles.titleParagraphContainers}>
                <Text style={styles.title}>
                    Feedback
                </Text>
            </View>

            <View style={styles.titleParagraphContainers}>
                <Text style={styles.paragraph}>
                    ¿Coincide el resultado ofrecido con el diagnóstico clínico?
                </Text>
            </View>

            <View style={styles.buttonsCotainer}>
                <Button style={styles.button} labelStyle={styles.confirmationButtonFont} icon="check" mode="outlined" onPress={() => {navigation.dispatch(StackActions.replace('Loading', {sample: aSample, feedback: true, accessToken: tokenAccess}))}}>
                    Sí
                </Button>
                <Button style={styles.button} labelStyle={styles.cancelButtonFont} icon="close" mode="outlined" onPress={() => {navigation.dispatch(StackActions.replace('Loading', {sample: aSample, feedback: false, accessToken: tokenAccess}))}}>
                    No
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
    confirmationButtonFont: {
        fontSize: theme.fontSizes.button,
        color: theme.colors.green
    },
    cancelButtonFont: {
        fontSize: theme.fontSizes.button,
        color: theme.colors.red
    }
})
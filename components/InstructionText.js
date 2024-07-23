import { StyleSheet, Text, View } from "react-native";
import Colors from "../constants/colors";

function InstructionText({children, style}) {
    return <Text style={[styles.inputContainer, style]}>{children}</Text>
}

export default InstructionText;

const styles = StyleSheet.create({
   inputContainer: {
    fontFamily: 'open-sans',
    color: Colors.accent500,
    fontSize: 24
  },
})
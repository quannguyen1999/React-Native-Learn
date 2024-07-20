import { StyleSheet, Text, View, Alert } from "react-native";
import Title from "../components/Title";
import { useState } from "react";
import PrimaryButton from "../components/PrimaryButton";
import NumberContainer from "../components/game/NumberContainer";
function generateRandomBetween(min, max, exclude) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}

let minBoundary = 1;
let maxBoundary = 100;

function GameScreen({ userNumber }) {
  const initialGuess = generateRandomBetween(1, 100, userNumber);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);

  function nextGuessHandler(direction) {

    if((direction === 'lower' && currentGuess < userNumber) || (direction === 'other' && currentGuess > userNumber)){
      Alert.alert("Don't lie!", "hehe", [{text:'sorry', style:'cancel'}])
      return;
    }

    if (direction === "lower") {
      maxBoundary = currentGuess;
    } else {
      minBoundary = currentGuess + 1;
    }
    const newRndNumber = generateRandomBetween(
      minBoundary,
      maxBoundary,
      currentGuess
    );
    setCurrentGuess(newRndNumber);
  }

  return (
    <View style={styles.screen}>
      <Title>Game Screen!</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      <View>
        <Text>Higher or lower</Text>
        <View>
          <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>+</PrimaryButton>
          <PrimaryButton onPress={nextGuessHandler.bind(this, 'other')}>-</PrimaryButton>
        </View>
      </View>
      <View>
        <Text>Log ROUNDS</Text>
      </View>
    </View>
  );
}

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "red",
    textAlign: "center",
    borderWidth: 2,
    borderColor: "red",
    padding: 4,
  },
});

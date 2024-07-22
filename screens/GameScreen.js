import { StyleSheet, Text, View, Alert } from "react-native";
import Title from "../components/Title";
import { useEffect, useState } from "react";
import PrimaryButton from "../components/PrimaryButton";
import NumberContainer from "../components/game/NumberContainer";
import Card from "../components/Card";
import InstructionText from "../components/InstructionText";
function generateRandomBetween(min, max, exclude) {
  // console.log("call");
  // console.log(min);
  // console.log(max);
  // console.log(exclude);

  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}

let minBoundary = 1;
let maxBoundary = 100;

function GameScreen({ userNumber, onGameOver }) {
  const initialGuess = generateRandomBetween(1, 100, userNumber);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);

  useEffect(() => {
    console.log(currentGuess);
    console.log(userNumber);
    if (currentGuess === userNumber) {
      onGameOver();
    }
  }, [currentGuess, userNumber, onGameOver]);

  function nextGuessHandler(direction) {
    if (
      (direction === "lower" && currentGuess < userNumber) ||
      (direction === "other" && currentGuess > userNumber)
    ) {
      Alert.alert("Don't lie!", "hehe", [{ text: "sorry", style: "cancel" }]);
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
      <Card>
        <View>
          <InstructionText>Higher or lower</InstructionText>
          <View>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "lower")}>
              +
            </PrimaryButton>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "other")}>
              -
            </PrimaryButton>
          </View>
        </View>
        <View>
          <Text>Log ROUNDS</Text>
        </View>
      </Card>
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

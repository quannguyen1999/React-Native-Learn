import { StyleSheet, Text, View, Alert, FlatList } from "react-native";
import Title from "../components/Title";
import { useEffect, useState } from "react";
import PrimaryButton from "../components/PrimaryButton";
import NumberContainer from "../components/game/NumberContainer";
import Card from "../components/Card";
import InstructionText from "../components/InstructionText";
import { AntDesign } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import GuessLogItem from "../components/game/GuessLogItem";
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
  const [guessRoundeds, setGuessRoundeds] = useState([initialGuess]);

  const [fontIsLoaded] = useFonts({
    "open-sans": require("../assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("../assets/fonts/OpenSans-Bold.ttf"),
  });

  useEffect(() => {
    if (currentGuess === userNumber) {
      onGameOver(guessRoundeds.length);
    }
  }, [currentGuess, userNumber, onGameOver]);

  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
  }, []);

  function nextGuessHandler(direction) {
    if (
      (direction === "lower" && currentGuess < userNumber) ||
      (direction === "other" && currentGuess > userNumber)
    ) {
      // Alert.alert("Don't lie!", "hehe", [{ text: "sorry", style: "cancel" }]);
      onGameOver();
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
    setGuessRoundeds((pevGuessRounds) => [newRndNumber, ...pevGuessRounds]);
  }

  const guessRoundsListLength = guessRoundeds.length;

  return (
    <View style={styles.screen}>
      <Title>Game Screen!</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
        <View>
          <InstructionText style={styles.instructionText}>
            Higher or lower
          </InstructionText>
          <View style={styles.buttonsContainer}>
            <View style={styles.buttonContainer}>
              <PrimaryButton onPress={nextGuessHandler.bind(this, "lower")}>
                <AntDesign name="minus" size={24} color="white" />
              </PrimaryButton>
            </View>
            <View style={styles.buttonContainer}>
              <PrimaryButton onPress={nextGuessHandler.bind(this, "other")}>
                <AntDesign name="plus" size={24} color="white" />
              </PrimaryButton>
            </View>
          </View>
        </View>
        <View>
          <Text>Log ROUNDS</Text>
        </View>
      </Card>
      <View style={styles.listContainer}>
        <FlatList
          data={guessRoundeds}
          renderItem={(itemData) => <GuessLogItem roundNumber={guessRoundsListLength - itemData.index} guess={itemData.item} />}
          keyExtractor={(item) => item}
        />
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
  instructionText: {
    marginBottom: 12,
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
    padding: 16
  }
});

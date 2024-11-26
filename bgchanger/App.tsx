import React, { useState } from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';


export default function App(): React.JSX.Element {
  const [randomBgColor, setRandomBgColor] = useState('#FFFFFF');
  const [squareColors, setSquareColors] = useState(['#FFFFFF', '#FFFFFF', '#FFFFFF']);

  const generateRandomColor = () => {
    const hexRange = '0123456789ABCDEF';
    let randomColor = '#';

    for (let i = 0; i < 6; i++) {
      randomColor += hexRange[Math.floor(Math.random() * 16)];
    }

    const newSquareColors = squareColors.map(() => {
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += hexRange[Math.floor(Math.random() * 16)];
      }
      return color;
    });

    setRandomBgColor(randomColor);
    setSquareColors(newSquareColors);
  };

  return (
    <>
      <StatusBar backgroundColor={randomBgColor} />
      <View style={[styles.container, { backgroundColor: randomBgColor }]}>
        <View style={styles.squaresContainer}>
          {squareColors.map((color, index) => (
            <View key={index} style={[styles.square, { backgroundColor: color }]} />
          ))}
        </View>
        <TouchableOpacity onPress={generateRandomColor}>
          <View style={styles.actionButton}>
            <Text style={styles.actionButtonTxt}>Change Colors</Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  squaresContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  square: {
    width: 100,
    height: 100,
    margin: 10,
  },
  actionButton: {
    padding: 10,
    backgroundColor: '#000000',
    borderRadius: 5,
  },
  actionButtonTxt: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

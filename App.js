import { useState, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Animated,
  Easing,
} from 'react-native';
import {
  cardNumberFormatter,
  expirationDateFormatter,
} from './utils/formatter';

export default function App() {
  const [state, setState] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });
  const animatedTranslateX = useRef(new Animated.Value(0)).current;

  Animated.timing(animatedTranslateX, {
    toValue: 1,
    duration: 100,
    easing: Easing.ease,
  }).start(() => {
    Animated.timing(animatedTranslateX, {
      toValue: 1,
      duration: 100,
      easing: Easing.ease,
    }).start(() => {
      Animated.timing(animatedTranslateX, {
        toValue: 1,
        duration: 100,
        easing: Easing.ease,
      }).start(() => {
        Animated.timing(animatedTranslateX, {
          toValue: 1,
          duration: 100,
          easing: Easing.ease,
        }).start();
      });
    });
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='light' />
      <View style={{ padding: 16, flex: 1 }}>
        <Text style={styles.header}>Card Payment</Text>

        <View style={{ flex: 1 }}>
          <View style={{ marginBottom: 16 }}>
            <Text style={styles.textColor}>Card number</Text>
            <TextInput
              style={styles.textInput}
              placeholder='**** **** **** ****'
              value={state.cardNumber}
              maxLength={19}
              onChangeText={(text) => {
                const cardNumber = cardNumberFormatter(state.cardNumber, text);
                setState((prev) => ({ ...prev, cardNumber }));
              }}
            />
          </View>
          <View style={{ flexDirection: 'row', gap: 16 }}>
            <View style={{ flex: 1 }}>
              <Text style={styles.textColor}>Expiry date</Text>
              <Animated.View>
                <TextInput
                  style={styles.textInput}
                  placeholder='00/00'
                  value={state.expiryDate}
                  maxLength={5}
                  onChangeText={(text) => {
                    const expiryDate = expirationDateFormatter(
                      state.expiryDate,
                      text
                    );
                    setState((prev) => ({ ...prev, expiryDate }));
                  }}
                />
              </Animated.View>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.textColor}>CVV</Text>
              <TextInput style={styles.textInput} maxLength={3} />
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.textColor}>Save</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#010101',
  },
  textColor: { color: '#fff' },
  header: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 600,
    marginBottom: 24,
    color: '#fff',
  },
  textInput: {
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: '#A9A9A9',
    padding: 12,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#C51B53',
    borderRadius: 24,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

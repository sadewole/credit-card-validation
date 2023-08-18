import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  cardNumberFormatter,
  expirationDateFormatter,
} from './utils/formatter';
import { ShakeView } from './components/ShakeView';

export default function App() {
  const [data, setData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });
  const [error, setError] = useState({});

  const handleBlur = (name, length) => () => {
    if(data[name].length < length){
  setError((prev) => ({ ...prev, [name]: true }));
    }else {
  setError((prev) => ({ ...prev, [name]: false }));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='light' />
      <View style={{ padding: 16, flex: 1 }}>
        <Text style={styles.header}>Card Payment</Text>

        <View style={{ flex: 1 }}>
          <View style={{ marginBottom: 16 }}>
            <Text style={styles.textColor}>Card number</Text>
            <ShakeView isInvalid={error.cardNumber}>
              <TextInput
                style={styles.textInput}
                placeholder='**** **** **** ****'
                value={data.cardNumber}
                onBlur={handleBlur('cardNumber', 19)}
                maxLength={19}
                onChangeText={(text) => {
                  const cardNumber = cardNumberFormatter(data.cardNumber, text);
                  setData((prev) => ({ ...prev, cardNumber }));
                  setError((prev) => ({ ...prev, cardNumber: false }));
                }}
              />
            </ShakeView>
          </View>
          <View style={{ flexDirection: 'row', gap: 16 }}>
            <View style={{ flex: 1 }}>
              <Text style={styles.textColor}>Expiry date</Text>
              <ShakeView isInvalid={error.expiryDate}>
                <TextInput
                  style={styles.textInput}
                  placeholder='00/00'
                  value={data.expiryDate}
                  onBlur={handleBlur('expiryDate', 5)}
                  maxLength={5}
                  onChangeText={(text) => {
                    const expiryDate = expirationDateFormatter(
                      data.expiryDate,
                      text
                    );
                    setData((prev) => ({ ...prev, expiryDate }));
                                setError((prev) => ({ ...prev, expiryDate: false }));
                  }}
                />
              </ShakeView>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.textColor}>CVV</Text>
              <ShakeView isInvalid={error.cvv}>
                <TextInput
                  style={styles.textInput}
                  value={data.cvv}
                  maxLength={3}
                  onBlur={handleBlur('cvv', 3)}
                  onChangeText={(text) => {
                    setData((prev) => ({ ...prev, cvv: text }));
                                setError((prev) => ({ ...prev, cvv: false }));
                  }}
                />
              </ShakeView>
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

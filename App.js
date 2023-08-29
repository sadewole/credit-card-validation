import { useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  Image,
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
import ActionSheet from 'react-native-actions-sheet';
import MasterCardIcon from './assets/mastercard.svg';
import VisaIcon from './assets/visa.svg';
import creditCardIcon from './assets/credit-card.png';
import { number } from 'card-validator';

const cardType = (cardNumber) => {
  var numberValidation = number(cardNumber);
  return numberValidation?.card?.type;
};

export default function App() {
  const [data, setData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });
  const [error, setError] = useState({});
  const actionSheetRef = useRef(null);

  const errorValidate = {
    cardNumber: data.cardNumber.length !== 19,
    cvv: data.cvv.length !== 3,
    expiryDate: data.expiryDate.length !== 5,
  };

  const handleBlur = (name) => () => {
    setError((prev) => ({ ...prev, [name]: errorValidate[name] }));
  };

  const cards = {
    visa: <VisaIcon />,
    mastercard: <MasterCardIcon />,
  }[cardType(data.cardNumber)];

  const handleSubmit = () => {
    if (Object.values(errorValidate).includes(true)) {
      setError(errorValidate);
      return;
    }
    actionSheetRef.current?.show();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='light' />
      <View style={{ padding: 16, flex: 1 }}>
        <Text style={styles.header}>Card Payment</Text>

        <View style={{ flex: 1 }}>
          <View style={{ marginBottom: 16 }}>
            <Text style={{ color: error.cardNumber ? 'red' : '#fff' }}>
              Card number
            </Text>
            <ShakeView isInvalid={error.cardNumber}>
              <TextInput
                style={[
                  styles.textInput,
                  { borderColor: error.cardNumber ? 'red' : '#A9A9A9' },
                ]}
                placeholder='**** **** **** ****'
                value={data.cardNumber}
                onBlur={handleBlur('cardNumber')}
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
              <Text style={{ color: error.expiryDate ? 'red' : '#fff' }}>
                Expiry date
              </Text>
              <ShakeView isInvalid={error.expiryDate}>
                <TextInput
                  style={[
                    styles.textInput,
                    { borderColor: error.expiryDate ? 'red' : '#A9A9A9' },
                  ]}
                  placeholder='00/00'
                  value={data.expiryDate}
                  onBlur={handleBlur('expiryDate')}
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
              <Text style={{ color: error.cvv ? 'red' : '#fff' }}>CVV</Text>
              <ShakeView isInvalid={error.cvv}>
                <TextInput
                  style={[
                    styles.textInput,
                    { borderColor: error.cvv ? 'red' : '#A9A9A9' },
                  ]}
                  value={data.cvv}
                  maxLength={3}
                  onBlur={handleBlur('cvv')}
                  onChangeText={(text) => {
                    setData((prev) => ({ ...prev, cvv: text }));
                    setError((prev) => ({ ...prev, cvv: false }));
                  }}
                />
              </ShakeView>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.textColor}>Save</Text>
        </TouchableOpacity>
      </View>

      <ActionSheet
        ref={actionSheetRef}
        containerStyle={{
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
        }}
        indicatorStyle={{
          width: 100,
        }}
        gestureEnabled={true}
      >
        <View style={styles.sheet}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 600,
              textAlign: 'center',
            }}
          >
            Card Payment
          </Text>
          <View
            style={{
              borderRadius: 10,
              backgroundColor: '#F5F5F5',
              padding: 16,
              marginVertical: 20,
              flexDirection: 'row',
              gap: 20,
            }}
          >
            {cards || (
              <Image
                source={creditCardIcon}
                style={{ width: 31, height: 24 }}
              />
            )}
            <Text>
              ************{data.cardNumber.slice(data.cardNumber.length - 4)}
            </Text>
          </View>
        </View>
      </ActionSheet>
    </SafeAreaView>
  );
}

// <a
//   href='https://www.flaticon.com/free-icons/business-and-finance'
//   title='business-and-finance icons'
// >
//   Business-and-finance icons created by Ilham Fitrotul Hayat -
//   Flaticon
// </a>;

// https://www.svgrepo.com/collection/payment-icons/

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
    borderWidth: 2,
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
  sheet: {
    height: 200,
    padding: 16,
  },
});

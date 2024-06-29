import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CurrencyDropdown from './CurrencyDropdown';
import Icon from 'react-native-vector-icons/Ionicons';

const InrToOther: React.FC = () => {
  const [currencies, setCurrencies] = useState<string[]>([]);
  const [amount, setAmount] = useState<number | string>(1);
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('USD');
  const [convertedAmount, setConvertedAmount] = useState<string | null>(null);
  const [converting, setConverting] = useState<boolean>(false);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const storedFavorites = await AsyncStorage.getItem('favorites');
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      } else {
        setFavorites(['INR', 'EUR']);
      }
    };

    fetchFavorites();
    fetchCurrencies();
  }, []);

  // fetching all currency name from api
  const fetchCurrencies = async () => {
    try {
      const res = await fetch('https://api.frankfurter.app/currencies');
      const data = await res.json();
      setCurrencies(Object.keys(data));
    } catch (error) {
      console.error('Error Fetching', error);
    }
  };

  // convert one currency to other currency using api
  const convertCurrency = async () => {
    if (!amount) return;
    setConverting(true);
    try {
        if(toCurrency=='INR'){
            Alert.alert("converted currency must not be INR")
            return
        }
      const res = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=INR&to=${toCurrency}`,
      );
      const data = await res.json();
      setConvertedAmount(data.rates[toCurrency] + ' ' + toCurrency);
    } catch (error) {
      console.error('Error Fetching', error);
    } finally {
      setConverting(false);
    }
  };

  // swap currency
  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <View style={styles.container}>
      {/* container for the currency converter logo  */}
      <View
        style={{
          backgroundColor: '#fffff',
          borderRadius: 10,
          elevation: 5,
          padding: 10,
        }}>
        <Text style={styles.title}>Currency Converter</Text>
        <Text style={styles.description}>
          convert INR to other currency
        </Text>
      </View>
      
      {/* container for the currency drop down  */}
      <View
        style={{
          margin: 10,
          elevation: 10,
          backgroundColor: '#ffffff',
          paddingHorizontal: 10,
          borderRadius: 10,
        }}>
        <View style={styles.dropdownContainer}>
          <CurrencyDropdown
            favorites={favorites}
            currencies={currencies}
            currency={toCurrency}
            setCurrency={setToCurrency}
            title="To:"
          />
        </View>
      </View>

      {/* container for the currency amount  */}
      <View
        style={{
          margin: 10,
          elevation: 10,
          backgroundColor: '#ffffff',
          paddingHorizontal: 10,
          borderRadius: 10,
        }}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Amount:</Text>
          <TextInput
            value={amount.toString()}
            onChangeText={text => setAmount(Number(text))}
            keyboardType="numeric"
            style={styles.input}
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={convertCurrency}
            style={[styles.button, converting && styles.buttonDisabled]}>
            {converting ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Convert</Text>
            )}
          </TouchableOpacity>
        </View>

        {convertedAmount ? (
          <Text style={styles.convertedAmount}>
            Converted Amount: {convertedAmount}
          </Text>
        ) : (
          <Text style={styles.convertedAmount}>
            Convert one currency to other currency on your choice
          </Text>
        )}
      </View>
      <View>
        <TouchableOpacity
          onPress={convertCurrency}
          style={[styles.button, converting && styles.buttonDisabled]}>
          <Text style={{textAlign: 'center', color: 'white', fontWeight: 600}}>
            Thank you
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // main container styling 
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#4B5563',
    textAlign: 'center',
  },
  description: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4B5563',
    marginBottom: 20,
    textAlign: 'center',
  }, 
  // styling for the dropdown box 
  dropdownContainer: {
    flexDirection: 'column',
    marginBottom: 20,
    marginTop: 20,
    height: 120,
  },
  swapButton: {
    backgroundColor: 'blue',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    marginVertical: 10,
    width: 50,
    height: 50,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4B5563',
    marginBottom: 5,
  },
  input: {
    borderColor: '#D1D5DB',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 40,
  },
  buttonContainer: {
    alignItems: 'flex-end',
    paddingBottom: 20,
  },
  button: {
    backgroundColor: 'blue',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  convertedAmount: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '600',
    color: '#080808',
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default InrToOther;

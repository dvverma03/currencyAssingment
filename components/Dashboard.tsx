import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';

const Dashboard: React.FC = () => {
  const [currencies, setCurrencies] = useState<string[]>([]);
  const [currenciesValues, setCurrenciesValues] = useState<string[]>([]);

  useEffect(() => {
    fetchCurrencies();
    convertCurrency()
  }, []);
  useEffect(() => {
   if(currencies.length>0){

       convertCurrency()
   }
  }, [currencies]);

  // fetching all currency name from api
  const fetchCurrencies = async () => {
    try {
      const res = await fetch('https://api.frankfurter.app/currencies');
      const data = await res.json();
      setCurrencies(Object.entries(data));
    } catch (error) {
      console.error('Error Fetching', error);
    }
  };

  // convert one currency to other currency using api

  const convertCurrency = async () => {
    if (!currencies) return;
    try {
      const promises = currencies.map(async (currency) => {
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=1&from=INR&to=${currency}`
        );
        const data = await res.json();
        return (data?.rates);
      });
  
      const currenciesValues = await Promise.all(promises);
      setCurrenciesValues(currenciesValues)
    } catch (error) {
      console.error('Error Fetching', error);
    }
  };
  

  return (
    <View>
      <Text
        style={{
          fontSize: 18,
          textAlign: 'center',
          marginTop: 20,
          color: 'black',
          backgroundColor: '#6cf76c',
          marginHorizontal: 30,
          paddingVertical: 10,
          borderRadius: 10,
          marginBottom:20
        }}>
        1 INR equivalence to other currencies
      </Text>
      <ScrollView style={{ marginBottom: 20 }}>
      {currencies &&
        currenciesValues &&
        currencies.map((e, index) => {
          const item = currenciesValues[index];
          console.log(item)
          if (!item) return null;
          const [currency, value] = Object.entries(item)[0];
          return (
            <View
              key={index}
              style={{
                flexDirection: 'row',
                backgroundColor: '#e2dcdc',
                marginVertical: 5,
                marginHorizontal: 10,
                paddingVertical: 10,
                justifyContent: 'space-between'
              }}
            >
              <View style={{ flexDirection: 'row', backgroundColor: '#e2dcdc' }}>
                <Text style={{ fontSize: 18, fontWeight: '600', paddingLeft: 10, paddingRight: 20 }}>{e[0]}</Text>
                <Text style={{ fontSize: 18, fontWeight: '600' }}>{e[1]}</Text>
              </View>
              <Text style={{paddingRight:5, fontSize:15, fontWeight:500}}>{value}Rs</Text>
            </View>
          );
        })}
    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Dashboard;

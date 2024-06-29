import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/FontAwesome';

// currency dropdown intrface 
interface CurrencyDropdownProps {
  currencies: string[];
  currency: string;
  setCurrency: (currency: string) => void;
  favorites: string[];
  handleFavorite: (currency: string) => void;
  title?: string;
}

const CurrencyDropdown: React.FC<CurrencyDropdownProps> = ({
  currencies,
  currency,
  setCurrency,
  favorites,
  handleFavorite,
  title = '',
}) => {

  return (
    <View style={styles.container}>
      {title ? <Text style={styles.label}>{title}</Text> : null}

      <View style={styles.dropdown}>
        <Picker
          selectedValue={currency}
          onValueChange={(itemValue) => setCurrency(itemValue)}
          style={styles.picker}
        >
          {favorites.map((currency) => (
            <Picker.Item label={currency} value={currency} key={currency} />
          ))}
          {currencies
            .filter((c) => !favorites.includes(c))
            .map((currency) => (
              <Picker.Item label={currency} value={currency} key={currency} />
            ))}
        </Picker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4B5563',
    marginBottom: 5,
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor:'#dad5d5',
    borderWidth:1,
    borderRadius:3,
  },
  picker: {
    flex: 1,
    height: 40,
    borderColor: '#D1D5DB',
    borderWidth: 1,
    borderRadius: 5,
  },
  favoriteButton: {
    marginLeft: 10,
    padding: 10,
  },
});

export default CurrencyDropdown;

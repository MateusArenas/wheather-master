import { setStatusBarBackgroundColor } from 'expo-status-bar';
import React from 'react';
import { StyleSheet } from 'react-native' 
import { withSafeAreaInsets } from 'react-native-safe-area-context';
import { Text, View } from '../components/Themed';
import { RootStackScreenProps } from '../types';

export default function Home({ navigation, route }: RootStackScreenProps<'Home'>) {
    return (
        <View style={styles.container}>
        <Text style={styles.title}>Weather Forecast</Text>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#d0efff',
    },

    title: {
      fontSize: 40,
      fontWeight: 'bold', 
      top: '0',
      backgroundColor: '#ffffff',
    },

    separator: {
      marginVertical: 30,
      height: 1,
      width: '80%',
    },
  });
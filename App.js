/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import CompassHeading from 'react-native-compass-heading';

const App = () => {
  const [compassHeading, setCompassHeading] = useState(0);
  useEffect(() => {
    const degree_update_rate = 3;

    // accuracy on android will be hardcoded to 1
    // since the value is not available.
    // For iOS, it is in degrees
    CompassHeading.start(degree_update_rate, (heading, accuracy) => {
      setCompassHeading(heading);
    });

    return () => {
      CompassHeading.stop();
    };
  }, []);

  const isDarkMode = useColorScheme() === 'dark';

  return (
    <>
      <Image
        style={[
          styles.image,
          {transform: [{rotate: `${360 - compassHeading}deg`}]},
        ]}
        resizeMode="contain"
        source={require('./compass.jpeg')}
      />
      <Text style={styles.sectionTitle}>Pray in East direction</Text>
    </>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    alignSelf: 'center',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  image: {
    width: '90%',
    flex: 0.8,
    alignSelf: 'center',
  },
});

export default App;

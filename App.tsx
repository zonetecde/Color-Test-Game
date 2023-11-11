import React from 'react';
import {Image, SafeAreaView, StatusBar, Text, View} from 'react-native';
import Main from './src/Main';

function App(): JSX.Element {
  return (
    <SafeAreaView>
      <StatusBar barStyle={'light-content'} />
      <View className="w-screen h-screen bg-slate-200">
        {/* Background Image */}
        <Image
          source={require('./assets/bg.png')}
          className="w-full h-full absolute z-0"
        />
        <Main />
      </View>
    </SafeAreaView>
  );
}

export default App;

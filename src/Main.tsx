import React from 'react';
import {Button, Pressable, Text, View} from 'react-native';
import Home from './components/Home';
import Game from './components/Game';

const Main = () => {
  const [isPlaying, setIsPlaying] = React.useState(false);

  return (
    <View className="w-screen h-screen justify-center items-center">
      {isPlaying === false ? (
        <>
          <Home setIsPlaying={setIsPlaying} />
        </>
      ) : (
        <>
          <Game setIsPlaying={setIsPlaying} />
        </>
      )}
    </View>
  );
};

export default Main;

import React from 'react';
import {Pressable, Text} from 'react-native';

const Home = (props: {
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  function handlePlayButtonPressed(): void {
    props.setIsPlaying(true);
  }

  return (
    <>
      <Text className="text-5xl text-violet-900 font-bold text-center bg-blue-300 px-8 pt-5 pb-2.5 rounded-2xl border-2 border-gray-600 ">
        Color Test
      </Text>
      <Pressable
        className="w-44 bg-blue-400 rounded-md py-3 border-gray-600 border-2 mt-20 shadow-2xl shadow-black active:bg-blue-500"
        onPress={handlePlayButtonPressed}>
        <Text className="text-center font-bold text-white text-3xl">Jouer</Text>
      </Pressable>
    </>
  );
};

export default Home;

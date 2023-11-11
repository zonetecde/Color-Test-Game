import React, {useEffect} from 'react';
import {Pressable, Text, View} from 'react-native';
import {Color, getRandomColor, getRandomPropositions} from '../Colors';
import Sound from 'react-native-sound';

const Game = (props: {
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [score, setScore] = React.useState(0);
  const [timer, setTimer] = React.useState(3);
  const [color, setColor] = React.useState<Color>({
    name: '',
    hexCode: '',
    invertHex: '',
  });
  const [propositions, setPropositions] = React.useState<Color[]>([]);
  const [startCountdown, setStartCountdown] = React.useState(3);
  const [textRandomColor, setTextRandomColor] = React.useState<Color>();
  const [isGameOver, setIsGameOver] = React.useState(false);

  useEffect(() => {
    if (startCountdown === 3) {
      playSound('countdown.wav', 0.1);
    }
    if (startCountdown > 0) {
      setTimeout(() => {
        setStartCountdown(startCountdown - 1);
      }, 1000);
    } else {
      setRandomColor();

      setTimer(3);
    }
  }, [startCountdown]);

  const timerRef = React.useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (startCountdown === 0 && !isGameOver) {
      if (timer > 0) {
        timerRef.current = setTimeout(() => {
          setTimer(timer - 1);
        }, 1000);
      } else {
        setIsGameOver(true);
      }
    }
  }, [timer]);

  async function playSound(songName: string, volume: number = 0.5) {
    var whoosh = new Sound(songName, Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      whoosh.setVolume(volume);
      whoosh.play();
    });
  }

  function setRandomColor() {
    const randomColor = getRandomColor(color);
    const _propositions = getRandomPropositions(randomColor, propositions);
    setColor(randomColor);
    setPropositions(_propositions);

    setTextRandomColor(
      _propositions
        .filter(x => x.hexCode !== randomColor.hexCode)
        .sort(() => Math.random() - 0.5)[0],
    );
  }

  function handlePlayAgainPressed(): void {
    setIsGameOver(false);
    setStartCountdown(3);
    setScore(0);
  }

  return (
    <>
      {startCountdown === 0 && color && textRandomColor ? (
        <View className="w-screen h-screen justify-center items-center">
          <Text className="absolute translate-x-1/2 top-20 bg-sky-200 pl-7 pr-6 pt-4 pb-2.5 border-2 rounded-xl text-2xl text-black">
            Score : {score}
          </Text>
          <Text className="absolute  translate-x-1/2 top-7 bg-white pl-2.5 pr-2 pt-2 pb-1 border-2 rounded-lg text-lg text-black">
            Temps : {timer}
          </Text>

          <View className="flex flex-row gap-3 w-full flex-wrap items-center justify-center mt-10">
            {propositions.map((proposition, index) => {
              function handlePressColor(proposition: Color): void {
                // Vérifier si la couleur est bonne
                if (proposition.hexCode === color.hexCode) {
                  setScore(score + 1);
                  setRandomColor();
                  // Empêche l'ancien timer de se déclencher
                  if (timerRef.current) {
                    clearTimeout(timerRef.current);
                  }
                  setTimer(3);

                  playSound('correct.wav');
                } else {
                  // Game Over
                  setIsGameOver(true);

                  playSound('wrong.wav');
                }
              }

              return (
                <Pressable
                  onPress={() => handlePressColor(proposition)}
                  key={index}
                  className="w-4/12 border-2 rounded-3xl"
                  style={{
                    backgroundColor: proposition.hexCode,
                    aspectRatio: 1,
                  }}></Pressable>
              );
            })}
          </View>

          <Text
            className="text-3xl font-bold px-8 py-3 pb-1.5 mt-8 rounded-xl border-2 border-black"
            style={{
              backgroundColor: textRandomColor.invertHex,
              color: textRandomColor.hexCode,
            }}>
            {color.name[0].toUpperCase() + color.name.substring(1)}
          </Text>

          {isGameOver && (
            <>
              <View className="absolute w-screen h-screen bg-black opacity-50"></View>
              <View className="absolute">
                <View className="px-12 py-10 bg-orange-200 border-2 rounded-2xl">
                  <Text className="text-3xl text-black text-center mb-5 font-bold">
                    Perdu !
                  </Text>
                  <Text className="text-3xl text-black text-center mb-5 bg-white rounded-xl py-5 border-4 pb-3 px-10 pr-8">
                    Score : {score}
                  </Text>

                  <Pressable onPress={handlePlayAgainPressed}>
                    <Text className="text-2xl text-lime-800 bg-lime-200 pt-4 pb-2 px-8 pl-10 rounded-2xl border-4 text-center pr-10 ">
                      Rejouer
                    </Text>
                  </Pressable>
                  <Pressable onPress={() => props.setIsPlaying(false)}>
                    <Text className="text-2xl text-violet-800 bg-violet-200 pt-4 pb-2 px-8 pl-10 rounded-2xl border-4 text-center pr-10 mt-5">
                      Menu principal
                    </Text>
                  </Pressable>
                </View>
              </View>
            </>
          )}
        </View>
      ) : (
        <>
          <Text className="text-5xl bg-red-300 pt-[50px] pb-[30px] pr-[50px] pl-[60px] text-violet-800 font-bold rounded-full border-4 border-black">
            {startCountdown}
          </Text>
        </>
      )}
    </>
  );
};

export default Game;

import { StyleSheet, Image, Platform, View, Text, Button, TouchableOpacity } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect, useRef, use } from 'react';
import LottieView from 'lottie-react-native';
import PoteAnimation from '../../components/PoteAnimation';
import { useRouter } from 'expo-router';


export default function HomeScreen() {
  const [poteLevel, setPoteLevel] = useState(0);
  const [isCheio, setIsCheio] = useState(false); // false = vazio, true = cheio
  const [mostrarEstrelas, setMostrarEstrelas] = useState(false);
  const estrelaAnim = useRef<LottieView>(null);
  const router = useRouter();

  useEffect(() => {
    return () => {
    }
  }, []);

  // Função para simular preenchimento
  const preencherPote = () => {
    const novoEstado = !isCheio;
    setIsCheio(novoEstado);
    setPoteLevel(novoEstado ? 100 : 0);
    setMostrarEstrelas(true);
    estrelaAnim.current?.play();
  };

  const animation = () => {
    setMostrarEstrelas(true);
    estrelaAnim.current?.play();
  }; 

  const imagemPote = isCheio
    ? require('../../assets/images/potecheio.png')
    : require('../../assets/images/potevazio.png');

  return (
    <SafeAreaProvider style={styles.screen}>
      <SafeAreaView>
        <Image
          style={styles.image}
          source={imagemPote}
        />

         {/* Estrelas animadas */}
         {mostrarEstrelas && (
          <LottieView
            ref={estrelaAnim}
            source={require('../../assets/animation/estrelas.json')}
            autoPlay={false}
            loop={false}
            style={styles.estrelinhas}
          />
        )}

        <View style={styles.pote}>
          <PoteAnimation progress={poteLevel} />
        </View>
        <TouchableOpacity style={styles.botaoTeste} onPress={preencherPote}>
          <Text style={styles.textoBotao}>Despejar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botaoAgendar} onPress={() => router.push('/agendar')}>
          <Text style={styles.textoBotao}>Agendar</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  image: {
    height: 450,
    width: 350,
    bottom: 0,
    marginHorizontal: 'auto',
    marginVertical: 100
  },
  pote: {
    position: 'absolute',
    top: 170,
    left: 73
  },
  botaoTeste: {
    bottom: 20,
    right: 80,
    alignSelf: 'center',
    position: 'absolute',
    backgroundColor: '#A6633C',
    borderRadius: 5, 
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  botaoAgendar: {
    bottom: 20,
    left: 80,
    alignSelf: 'center',
    position: 'absolute',
    backgroundColor: '#A6633C',
    color: '#fff',
    borderRadius: 5, 
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  },
  screen: {
    backgroundColor: '#F2E6D8',
  },
  estrelinhas: {
    position: 'absolute',
    top: 300, // ajuste aqui para colocar próximo da ração
    left: 95,
    width: 200,
    height: 200,
    zIndex: 10,
    pointerEvents: 'none',
  },
});

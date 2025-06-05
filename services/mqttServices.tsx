import mqtt, { MqttClient } from "mqtt";
import { Float } from "react-native/Libraries/Types/CodegenTypes";

const MQTT_BROKER = "ws://test.mosquitto.org:8080"; // Use um broker WebSocket
const MQTT_TOPIC = "projeto/schina/216590";

let client: MqttClient | null = null;

export const connectMqtt = (
  onMessageReceived?: (message: Float) => void
): void => {
  if (client) {
    console.log("MQTT já inicializado.");
    return;
  }

  client = mqtt.connect(MQTT_BROKER);

  client.on("connect", () => {
    console.log("Conectado ao MQTT!");
    client?.subscribe(MQTT_TOPIC, (err) => {
      if (!err) {
        console.log(`Inscrito no tópico: ${MQTT_TOPIC}`);
      } else {
        console.error("Erro ao se inscrever no tópico:", err);
      }
    });
  });

  client.on("message", (topic: string, message: Buffer) => {
    console.log(`Mensagem recebida: ${message.toString()}`);
    const data = message.toString();
    
    if (data == 'toggleBomba' || data == 'toggleSolenoide' || data == 'toggleAuto') {
      return;
    }

    const temperatura = parseFloat(data);
    onMessageReceived?.(temperatura);
  });

  client.on("error", (err) => {
    console.error("Erro MQTT:", err);
  });

  client.on('close', () => {
    console.log('❌ Conexão encerrada');
  });
};

export const publishMessage = (msg: string): void => {
  if (client) {
    client.publish(MQTT_TOPIC, msg);
    console.log(`Mensagem enviada: ${msg}`);
  } else {
    console.warn("Cliente MQTT não está conectado.");
  }
};

export const disconnectMqtt = (): void => {
  if (client) {
    client.end(() => {
      console.log("Desconectado do MQTT");
      client = null;
    });
  } else {
    console.warn("Cliente MQTT já está desconectado.");
  }
};

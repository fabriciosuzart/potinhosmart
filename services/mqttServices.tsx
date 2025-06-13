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
    client?.subscribe(MQTT_TOPIC  + "/status", (err) => {
      if (!err) {
        console.log(`Inscrito no tópico: ${MQTT_TOPIC  + "/status"}`);
      } else {
        console.error("Erro ao se inscrever no tópico:", err);
      }
    });
  });

  client.on("message", (topic: string, message: Buffer) => {
    console.log(`Mensagem recebida: ${topic} ${message.toString()}`);
    try {
      const data = JSON.parse(message.toString()); // transforma em objeto JS
      if (typeof data === "object" && data !== null && "weight_storage" in data) {
        const weight = data.weight_storage;
        onMessageReceived?.(weight); // envia o objeto para o handler
      }
    } catch (error) {
      console.error("Erro ao fazer parse da mensagem JSON:", error);
    }
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

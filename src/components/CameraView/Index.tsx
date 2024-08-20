import { Text, TouchableOpacity, View } from "react-native";
import { CameraViewProps } from "./Props";
import { styles } from "./style";
import { CameraView } from "expo-camera"; // Corrigido para usar Camera

export default function ViewCamera({ cameraRef, isRecording, onRecord, onStop }: CameraViewProps) {
  return (
    <CameraView style={styles.contanier} ref={cameraRef} >
      <View style={styles.buttonContanier}>
        <TouchableOpacity onPress={isRecording ? onStop : onRecord} style={styles.buttonRecord}>
          <Text style={{color: 'black'}}>
            {isRecording ? 'Stop Recording' : "Start Record"}
          </Text>
        </TouchableOpacity>
      </View>
    </CameraView>
  );
}

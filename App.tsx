import { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Camera, CameraRecordingOptions, CameraView } from 'expo-camera'; // Corrigido para importar o Camera
import * as MediaLibrary from 'expo-media-library';

import VideoPlayer from './src/components/VideoPlayer/Index';
import ViewCamera from './src/components/CameraView/Index';
import { shareAsync } from 'expo-sharing';

export default function App() {
  
  const cameraRef = useRef<CameraView>(null); // Corrigido para usar Camera
  const [isRecording, setIsRecording] = useState(false);
  const [video, setVideo] = useState<any>()
  
  
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const [hasMicrophonePermission, setHasMicrophonePermission] = useState(false);
  const [hasMediaLibraryPermission, setMediaLibraryPermission] = useState(false);
  
  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const microphonePermission = await Camera.requestMicrophonePermissionsAsync();
      const albumPermission = await MediaLibrary.requestPermissionsAsync();
      
      setHasCameraPermission(cameraPermission.status === 'granted');
      setHasMicrophonePermission(microphonePermission.status === 'granted');
      setMediaLibraryPermission(albumPermission.status === 'granted');
    })();
  }, []);
  
  if (!hasCameraPermission || !hasMicrophonePermission) {
    return <Text>Não tem Permissão de Camera ou Áudio</Text>;
  }
  
  if (!hasMediaLibraryPermission) {
    return <Text>Não tem acesso à biblioteca</Text>;
  }
  
  const recordVideo = () => {
    setIsRecording(true)
    const options: CameraRecordingOptions = {
      maxDuration: 60,
      
    }
    
    if(cameraRef && cameraRef.current){
      cameraRef.current.recordAsync(options).then((recordVideo: any) => {
        setVideo(recordVideo);
        setIsRecording(false)
      });
    }
    
  };

  const stopRecording = () => {
    setIsRecording(false);
    if(cameraRef && cameraRef.current){
      cameraRef.current.stopRecording()
    }
    
  };

  if(video){
    
    const shareVideo = () => {
      shareAsync(video.uri).then(() => {
        setVideo(undefined)
      })
      
    }
    
    const saveVideo = () => {
     
      MediaLibrary.saveToLibraryAsync(video.uri).then(() => {
        setVideo(undefined)
      })
    }
    
    return (<VideoPlayer video={video} onShare={shareVideo} onSave={saveVideo} onDiscard={() => setVideo(undefined)}/>
  )}
  
  return (
    <ViewCamera 
      cameraRef={cameraRef} 
      isRecording={isRecording} 
      onRecord={recordVideo} 
      onStop={stopRecording} 
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

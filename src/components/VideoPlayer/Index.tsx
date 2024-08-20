
import { Button, SafeAreaView, Text, View } from "react-native"
import { VideoPlayerProps } from "./Props"
import { styles } from "./style"

import { Audio, Video } from "expo-av"


export default function VideoPlayer({video, onShare, onSave, onDiscard}: VideoPlayerProps){
    return(
        
        <SafeAreaView style={styles.container}>
            
            <Video  source={{uri: video.uri}} useNativeControls style={styles.video}/>
            
            <View style={styles.menuButton}>
                <Button title="Share" onPress={onShare} />
                <Button title="Save" onPress={onSave} />
                <Button title="Discard" onPress={onDiscard} />
            </View>
            
        </SafeAreaView>
    )
}
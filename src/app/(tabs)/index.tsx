import { FlatList, StyleSheet } from "react-native";
import { Text, View } from "@/src/components/Themed";
import { tracks } from "@/assets/tracks";
import TrackListItem from "@/src/components/TrackListItem";
import Player from "@/src/components/Player";

export default function HomeScreen() {
  return (
    <View>

      <FlatList
        data={tracks}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <TrackListItem track={item} />}
      // ListFooterComponent={() => <Player />}
      />
      <Player />
    </View>
  )
}

const styles = StyleSheet.create({

});

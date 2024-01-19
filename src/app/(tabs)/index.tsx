import { FlatList, StyleSheet } from "react-native";
import { Text, View } from "@/src/components/Themed";
import { tracks } from "@/assets/tracks";
import TrackListItem from "@/src/components/TrackListItem";

export default function HomeScreen() {
  return (
      <FlatList
        data={tracks}
        showsVerticalScrollIndicator= {false}
        renderItem={({ item }) => <TrackListItem track={item}/> }
      />
  )
}

const styles = StyleSheet.create({

});

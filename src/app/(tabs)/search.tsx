import { TextInput, FlatList, StyleSheet, SafeAreaView, StatusBar, TouchableOpacity } from "react-native";
import { Text, View } from "@/src/components/Themed";
import { tracks } from "@/assets/tracks";
import TrackListItem from "@/src/components/TrackListItem";
import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";

export default function SearchScreen() {

  const [search, setSearch] = useState("");

  const handleSearch = () => {
    
  }
  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <TouchableOpacity onPress={handleSearch}>
          <FontAwesome name={"search"} color={"gray"} size={20} style={{ paddingHorizontal: 5 }} />
        </TouchableOpacity>
        {/* <TextInput
          style={[styles.searchInput, {}]}
          placeholder="What do you want to listen to?"
          placeholderTextColor={"gray"}
          value={search}
          onChangeText={(text) => setSearch(text)}
        /> */}
        <TouchableOpacity onPress={() => setSearch("")}>
          <Text style={{ color: 'gray', fontSize: 15, fontWeight: '300', paddingRight: 5 }}>Cancel</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tracks}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <TrackListItem track={item} />}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight + 5 : 35,
  },
  searchBar: {
    flexDirection: 'row',
    backgroundColor: "#122425",
    borderRadius: 10,
    marginBottom: 5,
    marginHorizontal: 7,
    paddingHorizontal: 7,
    paddingVertical: 5,
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: 5,
    fontSize: 16,
    color: 'white'
  }
});

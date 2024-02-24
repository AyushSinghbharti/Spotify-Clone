import {
  TextInput,
  FlatList,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Text, View } from "@/src/components/Themed";
import { tracks } from "@/assets/tracks";
import TrackListItem from "@/src/components/TrackListItem";
import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import { gql, useQuery } from "@apollo/client";

const query = gql`
  query MyQuery($q: String) {
    search(q: $q) {
      tracks {
        items {
          artists {
            name
            id
          }
          album {
            id
            name
            images {
              height
              url
              width
            }
          }
          id
          name
          preview_url
        }
      }
    }
  }
`;

export default function SearchScreen() {
  const [search, setSearch] = useState("");

  const { data, loading, error } = useQuery(query, {
    variables: { q: search }
  });
  const tracks = data?.search?.tracks?.items || [];

  const handleSearch = () => {};

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <TouchableOpacity onPress={handleSearch}>
          <FontAwesome
            name={"search"}
            color={"gray"}
            size={20}
            style={{ paddingHorizontal: 5 }}
          />
        </TouchableOpacity>
        <TextInput
          style={[styles.searchInput, {}]}
          placeholder="What do you want to listen to?"
          placeholderTextColor={"gray"}
          value={search}
          onChangeText={(text) => setSearch(text)}
        />
        <TouchableOpacity onPress={() => setSearch("")}>
          <Text
            style={{
              color: "gray",
              fontSize: 15,
              fontWeight: "300",
              paddingRight: 5,
            }}
          >
            Cancel
          </Text>
        </TouchableOpacity>
      </View>

      {loading && <ActivityIndicator/>}
      {error && <Text>Error Occured</Text> && search.length > 0}
      <FlatList
        data={tracks}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <TrackListItem track={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight + 5 : 35,
  },
  searchBar: {
    flexDirection: "row",
    backgroundColor: "#122425",
    borderRadius: 10,
    marginBottom: 5,
    marginHorizontal: 7,
    paddingHorizontal: 7,
    paddingVertical: 5,
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: 5,
    fontSize: 16,
    color: "white",
  },
});

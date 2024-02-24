import { ActivityIndicator, FlatList, StyleSheet } from "react-native";
import { Text, View} from "@/src/components/Themed";
import TrackListItem from "@/src/components/TrackListItem";
import Player from "@/src/components/Player";
import { gql, useQuery } from "@apollo/client";

const query = gql`
  query getToken($genres: String!) {
    recommendations(seed_genres: $genres) {
      tracks {
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
`;

export default function HomeScreen() {
  const {data, loading, error} = useQuery(query, {variables: {genres: 'pop'}});

  if (loading) {
    return <ActivityIndicator />
  }

  if(error){
    return <Text style={{color: "white"}}>Failed to fetch recommendations</Text>
    console.log("Error while fetching data ", error);
  }

  const tracks = data.recommendations?.tracks || [];
  // console.log(data.recommendations?.tracks);

  return (
    <View>
      <FlatList
        data={tracks}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <TrackListItem track={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({});

import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
// import { tracks } from "@/assets/tracks";
import TrackListItem from "@/src/components/TrackListItem";
import { gql, useQuery } from "@apollo/client";

const favoritesList = gql`
  query getFavorites($userId: String!) {
    favoritesByUserid(userid: $userId) {
      track {
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
      id
      trackid
      userid
    }
  }
`;

export default function FavoritesScreen() {
  const { data, loading, error, refetch} = useQuery(favoritesList, {
    variables: { userId: "vadim" },
  });
  
  const tracks = (data?.favoritesByUserid || []).map((fav) => fav.track);

  if (loading) return <ActivityIndicator />;
  if (error) {
    console.log(error);
    return (
      <Text
        style={{
          fontSize: 24,
          color: "white",
          textAlign: "center",
          justifyContent: "center",
          flex: 1,
        }}
      >
        Error occured, please try again later
      </Text>
    );
  }
  return (
    <View>
      <Text
        style={{
          color: "white",
          justifyContent: "flex-start",
          paddingHorizontal: 10,
          fontSize: 20,
          fontWeight: "500",
          padding: 5,
          paddingTop: 30,
        }}
      >
        Favorite Songs
      </Text>
      <FlatList
        data={tracks}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <TrackListItem track={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({});

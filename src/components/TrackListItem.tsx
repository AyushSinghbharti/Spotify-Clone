import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import Track from "../types";
import { usePlayerContext } from "../provider/PlayerProvider";

type TrackListItemProps = {
  track: Track;
};

export default function TrackListItem({ track }: TrackListItemProps) {
  const {setTrack} = usePlayerContext();
  // console.log(track.album.images[0].url);
  return (
    <TouchableOpacity onPress={() => setTrack(track)} style={styles.container}>
      <Image
        source={{ uri: track.album.images[0]?.url }}
        style={styles.image}
      />
      <View style={{ marginRight: 50}}>
        <Text style={styles.title}>{track.name}</Text>
        <Text style={styles.subTitle}>{track.artists[0]?.name}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    margin: 5,
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    aspectRatio: 1,
    width: 50,
    borderRadius: 5,
    marginRight: 10,
    // height: 64, 
  },
  title: {
    color: 'white',
    fontWeight: "500",
    fontSize: 16,
    // flex: 1,
    // paddingLeft: 5,
    // marginHorizontal: 2,
  },
  subTitle: {
    color: 'grey',
    // fontWeight: "300",
    // fontSize: 15,
    // paddingLeft: 5,
    // marginHorizontal: 2,
  }
});

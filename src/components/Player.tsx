import { View, Text, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
// import { tracks } from "@/assets/tracks";
import { usePlayerContext } from "../provider/PlayerProvider";
import { useEffect, useState } from "react";
import { AVPlaybackStatus, Audio } from "expo-av";
// const track = tracks[0];
import { gql, useMutation, useQuery } from "@apollo/client";

const insertfavoriateMutation = gql`
  mutation MyMutation($trackid: String, $userid: String) {
    insertFavorites(trackid: $trackid, userid: $userid) {
      id
      trackid
      userid
    }
  }
`;
const isFavoriteQuery = gql`
  query MyQuery($trackid: String!, $userid: String!) {
    favoritesByTrackidAndUserid(trackid: $trackid, userid: $userid) {
      id
      trackid
      userid
    }
  }
`;

const removeFavoriteQuery = gql`
  mutation MyMutation($trackid: String!, $userid: String!) {
    deleteFavorites(trackid: $trackid, userid: $userid) {
      id
      trackid
      userid
    }
  }
`;

const Player = () => {
  const [sound, setSound] = useState();
  const { track } = usePlayerContext();
  const [isPlaying, setIsPlaying] = useState(false);

  const [insertFavorites] = useMutation(insertfavoriateMutation);
  const [removeFavorite] = useMutation(removeFavoriteQuery);

  const { data, refetch } = useQuery(isFavoriteQuery, {
    variables: { userid: "vadim", trackid: track?.id || "" },
  });

  // console.log(data);
  // console.log(data.favoritesByTrackidAndUserid)
  const isLiked = data?.favoritesByTrackidAndUserid?.length > 0;

  const onLike = async () => {
    if (!track) return;
    if (isLiked) {
      await removeFavorite({
        variables: { userid: "vadim", trackid: track.id },
      });
    } else {
      await insertFavorites({
        variables: { userid: "vadim", trackid: track.id },
      });
    }
    refetch();
  };

  useEffect(() => {
    playTrack();
  }, [track]);

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const playTrack = async () => {
    if (sound) {
      await sound.unloadAsync();
    }
    if (!track?.preview_url) {
      return;
    }
    const { sound: newSound } = await Audio.Sound.createAsync({
      uri: track.preview_url,
    });

    setSound(newSound);
    newSound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
    await newSound.playAsync();
  };

  if (!track) {
    return null;
  }

  const image = track.album.images?.[0];

  const onPlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if (!status.isLoaded) {
      return;
    }
    setIsPlaying(status.isPlaying);
  };

  const onPlayPause = async () => {
    if (!sound) {
      return;
    }

    if (isPlaying) {
      await sound.pauseAsync();
    } else {
      await sound.playAsync();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.player}>
        {image && <Image source={{ uri: image.url }} style={styles.image} />}

        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{track.name}</Text>
          <Text style={styles.subtitle}>{track.artists[0]?.name}</Text>
        </View>

        <Ionicons
          onPress={onLike}
          name={isLiked ? "heart" : "heart-outline"}
          size={25}
          color={"white"}
          style={{ marginHorizontal: 15 }}
        />
        <Ionicons
          onPress={onPlayPause}
          disabled={!track?.preview_url}
          name={isPlaying ? "pause" : "play"}
          size={27}
          color={track?.preview_url ? "white" : "gray"}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: -75,
    width: "100%",
    height: 75,
    padding: 10,
  },
  player: {
    backgroundColor: "#286660",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
    padding: 3,
    paddingRight: 15,
  },
  title: {
    color: "white",
  },
  subtitle: {
    color: "lightgray",
    fontSize: 12,
  },
  image: {
    height: "100%",
    aspectRatio: 1,
    marginRight: 10,
    borderRadius: 5,
  },
});

export default Player;

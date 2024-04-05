import React from "react";
import { View, Text, FlatList, Image } from "react-native";
import { Url } from "../Constants/Url";

const ListView = ({title,item}) => {
  return (
    <View>
      <Text
        style={{
          color: "#fff",
          fontSize: 25,
          fontFamily: "quicksand_bold",
        }}
      >
        {title}
      </Text>
      <FlatList
        horizontal={true}
        style={{ marginTop: 10 }}
        data={item}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ marginHorizontal: 5 }}>
            <Image
              source={{
                uri: `${Url.BASE_BACKDROP_IMAGE_URL}` + item.poster_path,
              }}
              style={{ width: 140, height: 240, borderRadius: 10 }}
            />
          </View>
        )}
      />
    </View>
  );
};

export default ListView;

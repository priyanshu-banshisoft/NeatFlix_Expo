import React from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import { Url } from "../Constants/Url";
import { useNavigation } from "@react-navigation/native";


const ListView = ({title,item,type}) => {
  const navigation = useNavigation();
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
          <TouchableOpacity
          activeOpacity={1}
          style={{ marginHorizontal: 5 }}
          onPress={() => {
            navigation.navigate("ShowDetails", {
              item: item.id,
              type: type,
            });
          }}
        >
          <View style={{ marginHorizontal: 5 }}>
            <Image
              source={{
                uri: `${Url.BASE_BACKDROP_IMAGE_URL}` + item.poster_path,
              }}
              style={{ width: 140, height: 240, borderRadius: 10 }}
            />
          </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default ListView;

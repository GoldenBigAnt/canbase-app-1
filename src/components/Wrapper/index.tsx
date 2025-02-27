import React from "react";
// import { SafeAreaView } from "react-native-safe-area-context";
import { WrapperProps } from "@/types/component";
import { View } from 'react-native';

const Wrapper: React.FC<WrapperProps> = ({ children = <></>}) => {
  return (
    <View className="bg-white">
      {/* <SafeAreaView edges={{
        top: 'additive',
        left: 'additive',
        right: 'additive',
        bottom: isFullscreen ? 'additive' : 'off'
      }}> */}
        {children}
      {/* </SafeAreaView> */}
    </View>
  );
};

export default Wrapper;

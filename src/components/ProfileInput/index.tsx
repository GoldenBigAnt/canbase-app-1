import React, { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Pressable, TextInput, View } from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { formatedate, getMaxDate } from "@/lib/functions";
import { ProfileInputPropsInterface } from "@/types/component";

const ProfileInput: React.FC<ProfileInputPropsInterface> = ({
  type = "text",
  value = "",
  placeholder = "",
  onChange,
}) => {
  const [isShown, setShown] = useState(false);
  const [showPicker, setShowPicker] = useState(false);

  const onChangeDate = ({ type }: DateTimePickerEvent, selectedDate?: Date) => {
    if (type === "set") {
      const currentDate = selectedDate;

      onChange(currentDate ? currentDate.toISOString() : "");
      setShowPicker((prev) => !prev);
    } else {
      setShowPicker((prev) => !prev);
    }
  };

  return (
    <View className="flex flex-row justify-between items-center w-full py-1.5 border border-[#EAEAEA] rounded-md">
      {type === "text" && (
        <TextInput
          className="h-5 px-2 outline-none"
          value={value}
          placeholder={placeholder}
          onChangeText={onChange}
        />
      )}
      {type === "email" && (
        <TextInput
          className="h-5 px-2 outline-none"
          inputMode="email"
          value={value}
          placeholder={placeholder}
          onChangeText={onChange}
        />
      )}
      {type === "password" && (
        <>
          <TextInput
            className="h-5 px-2 outline-none"
            value={value}
            placeholder={placeholder}
            onChangeText={onChange}
            secureTextEntry={type === "password" && !isShown}
          />
          {type === "password" && (
            <Pressable
              className="pr-3"
              onPress={() => {
                setShown((prev) => !prev);
              }}
            >
              {isShown ? (
                <FontAwesome name="eye" size={20} color="#777777" />
              ) : (
                <FontAwesome name="eye-slash" size={20} color="#777777" />
              )}
            </Pressable>
          )}
        </>
      )}
      {type === "date" && (
        <>
          <Pressable
            className="w-full"
            onPress={() => setShowPicker((prev) => !prev)}
          >
            <TextInput
              className="h-5 px-2 outline-none"
              value={value === "" ? value : formatedate(value)}
              placeholder={placeholder}
              editable={false}
              onPressIn={() => setShowPicker((prev) => !prev)}
            />
          </Pressable>
          {showPicker && (
            <DateTimePicker
              mode="date"
              value={value === "" ? getMaxDate() : new Date(value)}
              minimumDate={new Date("1900-01-01")}
              maximumDate={getMaxDate()}
              onChange={onChangeDate}
            />
          )}
        </>
      )}
      {type === "textarea" && (
        <TextInput
          className="px-2 outline-none"
          style={{ textAlignVertical: "top" }}
          multiline
          numberOfLines={5}
          value={value}
          placeholder={placeholder}
          onChangeText={onChange}
        />
      )}
    </View>
  );
};

export default ProfileInput;

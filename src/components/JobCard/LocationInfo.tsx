import { Job } from "@/types/job";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Linking } from "react-native";
import { Text, XStack, YStack } from "tamagui";

interface LocationInfoProps {
  job: Job;
}

export const LocationInfo = ({ job }: LocationInfoProps) => {
  const handleLocationPress = () => {
    const address =
      typeof job.company === "object"
        ? job.company.address?.formattedAddress
        : job.location?.address;

    if (address) {
      Linking.openURL(
        `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          address
        )}`
      );
    }
  };

  return (
    <XStack testID="location-press" gap="$3" alignItems="center" onPress={handleLocationPress}>
      <Ionicons name="location" size={24} color="black" />
      <YStack flex={1}>
        <Text fontWeight="600">Location</Text>
        <Text fontSize={14}>
          {typeof job.company === "object"
            ? job.company.address?.formattedAddress
            : job.location?.address || "Address not available"}
        </Text>
        <Text fontSize={12} color="gray">
          {job.location?.distance ||
            (job.milesToTravel
              ? `${job.milesToTravel.toFixed(1)} miles away`
              : "Distance not available")}
        </Text>
      </YStack>
      <Ionicons name="chevron-forward" size={20} color="gray" />
    </XStack>
  );
};

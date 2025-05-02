import { useWorkerProfileQuery } from "@/api";
import { Ionicons } from "@expo/vector-icons";
import { ActivityIndicator } from "react-native";
import { Card, H3, Separator, Text, View, XStack, YStack } from "tamagui";

export function Profile() {
  const { data: profileData, isLoading, error } = useWorkerProfileQuery();

  if (isLoading) {
    return (
      <View flex={1} justifyContent="center" alignItems="center">
        <ActivityIndicator size="large" color="#2FD5AB" />
      </View>
    );
  }

  if (error) {
    return (
      <View flex={1} justifyContent="center" alignItems="center">
        <Text color="red">Error loading profile: {error.message}</Text>
      </View>
    );
  }

  if (!profileData) {
    return (
      <View flex={1} justifyContent="center" alignItems="center">
        <Text>No profile data found</Text>
      </View>
    );
  }

  return (
    <View flex={1} backgroundColor="white">
      <YStack gap="$4">
        <Card
          borderRadius={0}
          elevate
          bordered
          paddingTop={40}
          paddingHorizontal={16}
        >
          <Card.Header paddingBottom={0}>
            <H3>Profile Information</H3>
          </Card.Header>

          <YStack padding="$4" gap="$3">
            {/* Name */}
            <XStack gap="$3" alignItems="center">
              <Ionicons name="person" size={24} color="#555" />
              <YStack>
                <Text fontSize={16} fontWeight="bold">
                  {profileData.firstName} {profileData.lastName}
                </Text>
              </YStack>
            </XStack>
            <Separator />

            {/* Email */}
            <XStack gap="$3" alignItems="center">
              <Ionicons name="mail" size={24} color="#555" />
              <YStack>
                <Text fontSize={14}>{profileData.email}</Text>
              </YStack>
            </XStack>
            <Separator />

            {/* Phone */}
            <XStack gap="$3" alignItems="center">
              <Ionicons name="call" size={24} color="#555" />
              <YStack>
                <Text fontSize={14}>{profileData.phoneNumber}</Text>
              </YStack>
            </XStack>
            <Separator />

            {/* Address */}
            <XStack gap="$3" alignItems="flex-start">
              <Ionicons name="location" size={24} color="#555" />
              <YStack>
                <Text fontSize={14}>
                  {profileData.address.formattedAddress}
                </Text>
                <Text fontSize={12} color="gray8">
                  Timezone: {profileData.address.zoneId}
                </Text>
              </YStack>
            </XStack>
            <Separator />

            {/* Job Preferences */}
            <XStack gap="$3" alignItems="center">
              <Ionicons name="car" size={24} color="#555" />
              <YStack>
                <Text fontSize={14} fontWeight="600">
                  Maximum Job Distance
                </Text>
                <Text fontSize={14}>{profileData.maxJobDistance} miles</Text>
              </YStack>
            </XStack>
            <Separator />

            {/* Worker ID */}
            <XStack gap="$3" alignItems="center">
              <Ionicons name="id-card" size={24} color="#555" />
              <YStack>
                <Text fontSize={14} fontWeight="600">
                  Worker ID
                </Text>
                <Text fontSize={12} color="gray8">
                  {profileData.workerId}
                </Text>
              </YStack>
            </XStack>
          </YStack>
        </Card>
      </YStack>
    </View>
  );
}

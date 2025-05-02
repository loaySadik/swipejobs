import { formatWage } from "@/api";
import { Job } from "@/types/job";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { Card, Separator, Text, XStack, YStack } from "tamagui";
import { LocationInfo } from "./LocationInfo";
import { ShiftInfo } from "./ShiftInfo";
interface JobCardProps {
  job: Job;
}

// Define navigation param list
type RootStackParamList = {
  JobDetails: { job: Job };
};

export const JobCard = ({ job }: JobCardProps) => {
  const { navigate } =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <Card
      onPress={() => navigate("JobDetails", { job })}
      elevate
      animation="bouncy"
      backgroundColor="white"
      borderRadius="$1"
    >
      <Card.Header gap="$1" padding="$3">
        <Text fontSize={18} fontWeight="bold">
          {job.jobTitle?.name || job.title || "Unknown Job"}
        </Text>
        <Text fontSize={14} fontWeight="bold">
          {typeof job.company === "object"
            ? job.company.name
            : job.company || "Unknown Company"}
        </Text>
      </Card.Header>

      <YStack gap="$1">
        {/* Distance and Rate */}
        <XStack
          justifyContent="space-between"
          backgroundColor="#2FD5AB"
          padding="$3"
        >
          <YStack alignItems="flex-start">
            <Text fontWeight="bold" fontSize={12}>
              Distance
            </Text>
            <Text fontWeight="bold" fontSize={26} color="white">
              {job.milesToTravel?.toFixed(1) || job.distance || "0"} miles
            </Text>
          </YStack>
          <YStack alignItems="flex-end">
            <Text fontWeight="bold" fontSize={12}>
              Hourly Rate
            </Text>
            <Text fontWeight="bold" fontSize={26} color="white">
              <Text fontSize={14} color="white">
                $
              </Text>
              {job.wagePerHourInCents
                ? formatWage(job.wagePerHourInCents)
                : job.hourlyRate || "0.00"}
            </Text>
          </YStack>
        </XStack>

        {/* Information */}
        <YStack gap="$3" padding="$3">
          {/* Shift Dates - Using ShiftInfo component */}
          <ShiftInfo shifts={job.shifts || []} />

          {/* Location - Using LocationInfo component */}
          <LocationInfo job={job} />
          <Separator />

          {/* Requirements */}
          {job.requirements && job.requirements.length > 0 && (
            <>
              <XStack gap="$3" alignItems="center">
                <FontAwesome name="warning" size={20} color="black" />
                <YStack>
                  <Text fontWeight="600">Requirements</Text>
                  {job.requirements.map((req: string, index: number) => (
                    <Text key={index} fontSize={14}>
                      {index === 0 ? "- " : "+ "}
                      {req}
                    </Text>
                  ))}
                </YStack>
              </XStack>
              <Separator />
            </>
          )}

          {/* Report To */}
          <XStack gap="$3" alignItems="center">
            <Ionicons name="person" size={24} color="black" />
            <YStack>
              <Text fontWeight="600">Report To</Text>
              <Text fontSize={14}>
                {typeof job.company === "object"
                  ? job.company.reportTo?.name
                  : job.reportTo || "Not specified"}
              </Text>
            </YStack>
          </XStack>
        </YStack>
      </YStack>
    </Card>
  );
};

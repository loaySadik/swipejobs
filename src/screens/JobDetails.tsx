import { useAcceptJobMutation, useRejectJobMutation } from "@/api";
import { JobCard } from "@/components";
import { Job } from "@/types/job";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { ActivityIndicator, Alert } from "react-native";
import { Button, Image, ScrollView, View, XStack } from "tamagui";

interface JobProps {
  job: Job;
}

const JobDetails = (props: { route: { params: JobProps } }) => {
  const { job } = props.route.params;
  const navigation = useNavigation();

  const acceptJobMutation = useAcceptJobMutation();
  const rejectJobMutation = useRejectJobMutation();

  const handleAcceptJob = async () => {
    try {
      acceptJobMutation.mutate(job.jobId, {
        onSuccess: () => {
          Alert.alert("Success", "You have successfully accepted this job!", [
            { text: "OK", onPress: () => navigation.goBack() },
          ]);
        },
        onError: (error) => {
          console.log("Error", `Failed to accept job: ${error.message}`);
        },
      });
    } catch (error) {
      console.log(
        "Error",
        `An unexpected error occurred: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  };

  const handleRejectJob = async () => {
    try {
      rejectJobMutation.mutate(job.jobId, {
        onSuccess: () => {
          Alert.alert("Success", "You have successfully rejected this job", [
            { text: "OK", onPress: () => navigation.goBack() },
          ]);
        },
        onError: (error) => {
          console.log("Error", `Failed to reject job: ${error.message}`);
        },
      });
    } catch (error) {
      console.log(
        "Error",
        `An unexpected error occurred: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  };

  return (
    <View backgroundColor="white" flex={1}>
      <ScrollView
        backgroundColor="white"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <Image
          width="100%"
          height={200}
          source={{
            uri: job.jobTitle?.imageUrl || "",
          }}
        />
        <JobCard job={job} />
      </ScrollView>
      <XStack gap="$2" padding="$3" paddingBottom={30}>
        <Button
          bordered
          flex={1}
          borderRadius={4}
          backgroundColor="white"
          onPress={handleRejectJob}
          disabled={rejectJobMutation.isPending}
          testID="job-action-button"
        >
          {rejectJobMutation.isPending ? (
            <ActivityIndicator size="small" color="#2FD5AB" testID="loading-indicator" />
          ) : (
            "No Thanks"
          )}
        </Button>
        <Button
          flex={1}
          borderRadius={4}
          themeInverse
          onPress={handleAcceptJob}
          disabled={acceptJobMutation.isPending}
          testID="job-action-button"
        >
          {acceptJobMutation.isPending ? (
            <ActivityIndicator size="small" color="white" testID="loading-indicator" />
          ) : (
            "I'll Take it"
          )}
        </Button>
      </XStack>
    </View>
  );
};

export default JobDetails;

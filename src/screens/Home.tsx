import { JobCard } from "@/components";
import { ActivityIndicator, FlatList, StyleSheet } from "react-native";
import { Text, View } from "tamagui";
import { useWorkerMatchesQuery } from "../api/job/jobMatch";

export function Home() {
  const { data: jobs, isLoading, error } = useWorkerMatchesQuery();
  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#2FD5AB" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text color="red">Error loading jobs: {error.message}</Text>
      </View>
    );
  }

  if (!jobs || jobs.length === 0) {
    return (
      <View style={styles.centered}>
        <Text fontSize={16}>No job matches found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container} paddingTop={40}>
      <FlatList
        data={jobs}
        keyExtractor={(item) => item.jobId}
        renderItem={({ item }) => <JobCard job={item} />}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View height="$3" />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    padding: 14,
    paddingVertical: 24,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});

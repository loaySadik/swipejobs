import { Home, NotFound, Profile } from "@/screens";
import JobDetails from "@/screens/JobDetails";
import { Job } from "@/types/job";
import Ionicons from "@expo/vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  createStaticNavigation,
  StaticParamList,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const HomeTabs = createBottomTabNavigator({
  screens: {
    Home: {
      screen: Home,
      options: {
        title: "Jobs",
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="albums" size={size} color={color} />
        ),
      },
    },
    Profile: {
      screen: Profile,
      options: {
        headerShown: false,
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="person" size={size} color={color} />
        ),
      },
    },
  },
});

const RootStack = createNativeStackNavigator({
  screens: {
    HomeTabs: {
      screen: HomeTabs,
      options: {
        title: "Home",
        headerShown: false,
      },
    },
    JobDetails: {
      screen: JobDetails,
      options: ({ route }) => ({
        title:
          (route.params as { job: Job })?.job?.jobTitle?.name ||
          (route.params as { job: Job })?.job?.title ||
          "Job Details",
      }),
    },
    Profile: {
      screen: Profile,
      linking: {
        path: ":user(@[a-zA-Z0-9-_]+)",
        parse: {
          user: (value) => value.replace(/^@/, ""),
        },
        stringify: {
          user: (value) => `@${value}`,
        },
      },
    },
    NotFound: {
      screen: NotFound,
      options: {
        title: "404",
      },
      linking: {
        path: "*",
      },
    },
  },
});

export const Navigation = createStaticNavigation(RootStack);

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  // Use direct interface augmentation
  interface ReactNavigation {
    RootParamList: RootStackParamList;
  }
}

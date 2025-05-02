// Mocks for common components and libraries used in tests

// Mock Expo vector icons
jest.mock("@expo/vector-icons", () => ({
    Ionicons: "Icon",
    MaterialIcons: "Icon",
    FontAwesome: "Icon",
    // Add any other icon sets your app uses
}));

// Mock Tamagui components
jest.mock("tamagui", () => ({
    Text: "Text",
    XStack: "View",
    YStack: "View",
    Stack: "View",
    View: "View",
    ScrollView: "ScrollView",
    H1: "Text",
    H2: "Text",
    H3: "Text",
    Button: "Button",
    Image: "Image",
    Separator: "View",
    // Add any other Tamagui components your app uses
}));

// Mock the navigation hook
jest.mock("@react-navigation/native", () => ({
    useNavigation: () => ({
        goBack: jest.fn(),
    }),
}));


// Reset all mocks before each test
beforeEach(() => {
    jest.clearAllMocks();
});

// No need for manual mocks anymore, they are handled by setupMocks.ts
import { LocationInfo } from "@/components/JobCard/LocationInfo";
import mockData from "@/test/mockData.json";
import { renderWithWrapper } from "@/test/TestWrapper";
import { Job } from "@/types/job";
import React from "react";
import { Linking } from "react-native";

// Get the basic job data directly from JSON
const basicJob = mockData.jobs.basicJob as Job;

// Mock React Native's Linking module
jest.spyOn(Linking, "openURL").mockImplementation(() => Promise.resolve());

describe("LocationInfo", () => {
  beforeEach(() => {
    // Clear mocks before each test
    jest.clearAllMocks();
  });

  it("opens Google Maps when location.address is provided and company is string", () => {
    // Use our custom renderWithWrapper function instead of the standard render
    const { getByTestId } = renderWithWrapper(
      <LocationInfo job={basicJob} />
    );

    // Test works the same but we don't need to manually mock Linking.openURL
    getByTestId("location-press").props.onPress();

    // Use the mocked Linking.openURL directly
    expect(Linking.openURL).toHaveBeenCalledWith(
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        basicJob.location?.address ?? ""
      )}`
    );
  });
});

import { useAcceptJobMutation, useRejectJobMutation } from "@/api";
import mockData from "@/test/mockData.json";
import { renderWithWrapper } from "@/test/TestWrapper";
import { Job } from "@/types/job";
import React from "react";
import { Alert } from "react-native";
import JobDetails from "../JobDetails";

// Get typed job data directly from JSON
const jobMatch = mockData.jobs.jobMatch as Job;

// Mock the JobCard component
jest.mock("@/components", () => ({
    JobCard: function MockJobCard() {
        return "JobCard";
    }
}));

// Mock the API mutation hooks
jest.mock("@/api", () => ({
    useAcceptJobMutation: jest.fn(),
    useRejectJobMutation: jest.fn(),
}));

// Mock Alert
jest.spyOn(Alert, "alert").mockImplementation((title, message, buttons) => {
    // When the OK button is pressed, call the onPress handler
    if (buttons && buttons.length > 0 && buttons[0].onPress) {
        buttons[0].onPress();
    }
    return null;
});

// Create mock implementation for mutations
const createMockMutation = (isPending = false) => ({
    mutate: jest.fn((_, options) => {
        if (options?.onSuccess) {
            options.onSuccess();
        }
    }),
    isPending,
});

describe("JobDetails", () => {
    beforeEach(() => {
        jest.clearAllMocks();

        // Set up default mock implementations
        (useAcceptJobMutation as jest.Mock).mockReturnValue(createMockMutation());
        (useRejectJobMutation as jest.Mock).mockReturnValue(createMockMutation());
    });

    it("renders job details correctly", () => {
        const { getAllByTestId } = renderWithWrapper(
            <JobDetails route={{ params: { job: jobMatch } }} />
        );

        // Check if buttons are rendered
        const buttons = getAllByTestId("job-action-button");
        expect(buttons).toHaveLength(2);
    });

    it("handles accept job button press", () => {
        const mockAcceptMutation = createMockMutation();
        (useAcceptJobMutation as jest.Mock).mockReturnValue(mockAcceptMutation);

        const { getAllByTestId } = renderWithWrapper(
            <JobDetails route={{ params: { job: jobMatch } }} />
        );

        // Get the buttons (assuming the accept button is the second one)
        const buttons = getAllByTestId("job-action-button");
        const acceptButton = buttons[1];

        // Click the accept button
        acceptButton.props.onPress();

        // Verify the mutation was called with the correct job ID
        expect(mockAcceptMutation.mutate).toHaveBeenCalledWith(
            jobMatch.jobId,
            expect.any(Object)
        );

        // Verify Alert was shown
        expect(Alert.alert).toHaveBeenCalledWith(
            "Success",
            "You have successfully accepted this job!",
            expect.any(Array)
        );
    });

    it("handles reject job button press", () => {
        const mockRejectMutation = createMockMutation();
        (useRejectJobMutation as jest.Mock).mockReturnValue(mockRejectMutation);

        const { getAllByTestId } = renderWithWrapper(
            <JobDetails route={{ params: { job: jobMatch } }} />
        );

        // Get the buttons (assuming the reject button is the first one)
        const buttons = getAllByTestId("job-action-button");
        const rejectButton = buttons[0];

        // Click the reject button
        rejectButton.props.onPress();

        // Verify the mutation was called with the correct job ID
        expect(mockRejectMutation.mutate).toHaveBeenCalledWith(
            jobMatch.jobId,
            expect.any(Object)
        );

        // Verify Alert was shown
        expect(Alert.alert).toHaveBeenCalledWith(
            "Success",
            "You have successfully rejected this job",
            expect.any(Array)
        );
    });
}); 
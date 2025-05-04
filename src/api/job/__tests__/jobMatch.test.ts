import mockData from '../../../test/mockData.json';
import { createMockMutation, createMockQuery } from '../../../test/utils/reactQueryMocks';
import { JobActionResponse } from '../../../types/api';
import { Job } from '../../../types/job';
import apiClient from '../../common/client';
import { useAcceptJobMutation, useRejectJobMutation, useWorkerMatchesQuery } from '../jobMatch';

// Mock API client and React Query hooks
jest.mock('../../common/client', () => ({
    __esModule: true,
    default: { get: jest.fn() },
    DEFAULT_WORKER_ID: 'ABC123',
}));

jest.mock('@tanstack/react-query', () => ({
    useQuery: jest.fn(),
    useMutation: jest.fn(),
}));

import { useMutation, useQuery } from '@tanstack/react-query';

const mockedApiClient = apiClient as jest.Mocked<typeof apiClient>;
const mockedUseQuery = useQuery as jest.MockedFunction<typeof useQuery>;
const mockedUseMutation = useMutation as jest.MockedFunction<typeof useMutation<JobActionResponse, Error, string, unknown>>;

// Test data
const mockJobMatches = [mockData.jobs.jobMatch as Job, mockData.jobs.basicJob as Job];
const mockSuccessResponse = { success: true, message: 'Operation successful' };

describe('Job Match API Integration', () => {
    beforeEach(() => jest.clearAllMocks());

    describe('useWorkerMatchesQuery', () => {
        test('should fetch worker matches successfully', () => {
            mockedApiClient.get.mockResolvedValueOnce({ data: mockJobMatches });

            mockedUseQuery.mockReturnValueOnce(createMockQuery<Job[], Error>({
                data: mockJobMatches,
                isSuccess: true
            }));

            const result = useWorkerMatchesQuery();
            expect(result.data).toHaveLength(2);
            expect(result.data?.[0].jobId).toBe(mockJobMatches[0].jobId);
        });

        test('should handle error and loading states', () => {
            const error = new Error('Network error');

            // Test error state
            mockedUseQuery.mockReturnValueOnce(createMockQuery<Job[], Error>({
                isError: true,
                error
            }));

            let result = useWorkerMatchesQuery();
            expect(result.isError).toBe(true);

            // Test loading state
            mockedUseQuery.mockReturnValueOnce(createMockQuery<Job[], Error>({
                isLoading: true
            }));

            result = useWorkerMatchesQuery();
            expect(result.isLoading).toBe(true);
        });
    });

    describe('Job Mutations', () => {
        const testMutationHook = (hookName: string, useHook: () => ReturnType<typeof useAcceptJobMutation>) => {
            test(`should handle ${hookName} successfully`, () => {
                const mockMutate = jest.fn();
                mockedUseMutation.mockReturnValue(createMockMutation<JobActionResponse, Error, string>({
                    isSuccess: true,
                    data: mockSuccessResponse,
                    mockMutate
                }));

                const result = useHook();
                const jobId = '123';
                result.mutate(jobId);
                expect(mockMutate).toHaveBeenCalledWith(jobId);
            });

            test(`should handle ${hookName} errors and loading`, () => {
                // Error state
                const error = new Error(`Failed to ${hookName}`);
                mockedUseMutation.mockReturnValue(createMockMutation<JobActionResponse, Error, string>({
                    isError: true,
                    error
                }));

                let result = useHook();
                expect(result.isError).toBe(true);
                expect(result.error).toBe(error);

                // Loading state
                mockedUseMutation.mockReturnValue(createMockMutation<JobActionResponse, Error, string>({
                    isPending: true
                }));
                result = useHook();
                expect(result.isPending).toBe(true);
            });
        };

        testMutationHook('accept job', useAcceptJobMutation);
        testMutationHook('reject job', useRejectJobMutation);
    });
});

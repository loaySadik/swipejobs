import { useMutation, useQuery } from '@tanstack/react-query';
import { JobActionResponse } from '../../types/api';
import { Job } from '../../types/job';
import apiClient, { DEFAULT_WORKER_ID } from '../common/client';
import { mapResponseToJob } from '../common/utils';

/**
 * Get worker job matches query
 */
export const useWorkerMatchesQuery = () => useQuery({
    queryKey: ['workerMatches', DEFAULT_WORKER_ID],
    queryFn: async () => {
        try {
            const response = await apiClient.get<Job[]>(`/worker/${DEFAULT_WORKER_ID}/matches`);
            console.log('API Response:', JSON.stringify(response.data, null, 2));

            // Map the response data to our unified Job type
            return response.data.map((jobData) => mapResponseToJob(jobData));
        } catch (error) {
            console.error('Failed to fetch worker matches:', error);
            throw error;
        }
    },
});

/**
 * Accept job mutation
 */
export const useAcceptJobMutation = () => useMutation({
    mutationFn: async (jobId: string) => {
        try {
            const response = await apiClient.get<JobActionResponse>(
                `/worker/${DEFAULT_WORKER_ID}/job/${jobId}/accept`
            );
            return response.data;
        } catch (error) {
            console.error('Failed to accept job:', error);
            throw error;
        }
    },
});

/**
 * Reject job mutation
 */
export const useRejectJobMutation = () => useMutation({
    mutationFn: async (jobId: string) => {
        try {
            const response = await apiClient.get<JobActionResponse>(
                `/worker/${DEFAULT_WORKER_ID}/job/${jobId}/reject`
            );
            return response.data;
        } catch (error) {
            console.error('Failed to reject job:', error);
            throw error;
        }
    },
}); 
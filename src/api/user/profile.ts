import { useQuery } from '@tanstack/react-query';
import { WorkerProfile } from '../../types/api';
import apiClient, { DEFAULT_WORKER_ID } from '../common/client';

/**
 * Get worker profile query
 */
export const useWorkerProfileQuery = () => useQuery({
    queryKey: ['workerProfile', DEFAULT_WORKER_ID],
    queryFn: async () => {
        const response = await apiClient.get<WorkerProfile>(`/worker/${DEFAULT_WORKER_ID}/profile`);
        return response.data;
    },
}); 
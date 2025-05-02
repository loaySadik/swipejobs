import { UseMutationResult, UseQueryResult } from '@tanstack/react-query';

/**
 * Creates a mock mutation result for testing React Query useMutation hooks
 * 
 * @param options Configuration options for the mock mutation result
 * @returns A mocked UseMutationResult object
 */
export const createMockMutation = <TData = unknown, TError = Error, TVariables = unknown>(
    options: Partial<{
        isSuccess: boolean;
        isError: boolean;
        isPending: boolean;
        data: TData;
        error: TError;
        mockMutate: jest.Mock;
    }> = {}
): UseMutationResult<TData, TError, TVariables, unknown> => {
    const {
        isSuccess = false,
        isError = false,
        isPending = false,
        data = undefined,
        error = null,
        mockMutate = jest.fn(),
    } = options;

    const status = isPending ? 'pending' : isError ? 'error' : isSuccess ? 'success' : 'idle';

    return {
        mutate: mockMutate,
        data,
        isSuccess,
        isError,
        error,
        isPending,
        status,
        variables: undefined,
        isIdle: !isPending && !isError && !isSuccess,
        failureCount: isError ? 1 : 0,
        failureReason: error,
        mutateAsync: jest.fn(),
        reset: jest.fn(),
        context: undefined,
        isPaused: false,
        submittedAt: Date.now()
    } as unknown as UseMutationResult<TData, TError, TVariables, unknown>;
};

/**
 * Creates a mock query result for testing React Query useQuery hooks
 * 
 * @param options Configuration options for the mock query result
 * @returns A mocked UseQueryResult object
 */
export const createMockQuery = <TData = unknown, TError = Error>(
    options: Partial<{
        isSuccess: boolean;
        isError: boolean;
        isLoading: boolean;
        data: TData;
        error: TError;
    }> = {}
): UseQueryResult<TData, TError> => {
    const {
        isSuccess = false,
        isError = false,
        isLoading = false,
        data = undefined,
        error = null,
    } = options;

    const status = isLoading ? 'loading' : isError ? 'error' : isSuccess ? 'success' : 'idle';

    return {
        data,
        isSuccess,
        isError,
        error,
        isLoading,
        status,
        isIdle: !isLoading && !isError && !isSuccess,
        isFetching: isLoading,
        isPending: isLoading,
        isStale: false,
        isPaused: false,
        isRefetching: false,
        isPlaceholderData: false,
        refetch: jest.fn(),
        failureCount: isError ? 1 : 0,
        failureReason: error,
        errorUpdateCount: 0,
        dataUpdateCount: isSuccess ? 1 : 0,
        fetchStatus: isLoading ? 'fetching' : 'idle'
    } as unknown as UseQueryResult<TData, TError>;
};
// Worker Profile interface
export interface WorkerProfile {
    address: {
        formattedAddress: string;
        zoneId: string;
    };
    email: string;
    firstName: string;
    lastName: string;
    maxJobDistance: number;
    phoneNumber: string;
    workerId: string;
}

// API Response interfaces
export interface ApiResponse<T> {
    data: T;
    status: number;
    statusText: string;
}

// Accept/Reject Job Response
export interface JobActionResponse {
    success: boolean;
    message?: string;
    errorCode?: string;
} 
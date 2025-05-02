export interface JobLocation {
    address: string;
    distance: string;
}

export interface Job {
    id?: string;
    title?: string;
    jobId: string;
    jobTitle?: {
        name: string;
        imageUrl: string;
    };
    company: {
        name: string;
        address: {
            formattedAddress: string;
            zoneId: string;
        };
        reportTo: {
            name: string;
            phone?: string;
        };
    } | string;
    distance?: string;
    hourlyRate?: string;
    wagePerHourInCents: number;
    milesToTravel: number;
    shifts: Array<{
        startDate: string;
        endDate: string;
    }> | string[];
    branch?: string;
    branchPhoneNumber?: string;
    location?: JobLocation;
    requirements?: string[];
    reportTo?: string;
}
import { Job } from '@/types/job';
import moment from 'moment';
import momentTZ from 'moment-timezone';
/**
 * Format currency in cents to dollars
 */
export function formatCurrency(cents: number): string {
    return (cents / 100).toFixed(2);
}

/**
 * Format date from ISO string to readable format
 */
export function formatDate(dateString: string): string {
    return moment(dateString).format('ddd, MMM D');
}

/**
 * Convert API Job to the app's Job format with additional fields
 */
export function mapResponseToJob(apiJob: Job): Job {
    // Handle company which can be either string or object
    const companyObj = typeof apiJob.company === 'string'
        ? { name: apiJob.company, address: { formattedAddress: "Address not available", zoneId: "" }, reportTo: { name: "Not specified" } }
        : apiJob.company;

    return {
        jobId: apiJob.jobId,
        jobTitle: apiJob.jobTitle,
        company: companyObj,
        wagePerHourInCents: apiJob.wagePerHourInCents || 0,
        milesToTravel: apiJob.milesToTravel || 0,
        shifts: apiJob.shifts || [],
        requirements: apiJob.requirements || [],
        // Support for the old Job interface
        distance: apiJob.milesToTravel?.toString() || "0",
        hourlyRate: formatCurrency(apiJob.wagePerHourInCents || 0),
        location: {
            address: typeof companyObj === 'string' ? 'Address not available' : companyObj.address?.formattedAddress || 'Address not available',
            distance: `${apiJob.milesToTravel?.toFixed(1) || "0"} miles from your job search location.`,
        },
        reportTo: typeof companyObj === 'string' ? 'Not specified' : companyObj.reportTo?.name || 'Not specified',
    };
}

// Format wage from cents to dollars
export function formatWage(cents: number): string {
    return (cents / 100).toFixed(2);
}

// Format date and time to readable format with time range
export function formatShiftDate(startDate: string, endDate: string): string {
    const start = moment(startDate);
    const end = moment(endDate);

    // Format using moment
    const month = start.format('MMM').toUpperCase();
    const day = start.date();
    const weekday = start.format('ddd').toUpperCase();
    const startTime = start.format('h:mm A');
    const endTime = end.format('h:mm A');
    const timezone = momentTZ.tz('America/Chicago').format('zz'); // Get the user's timezone

    // Combine all parts into the desired format
    return `${month} ${day}, ${weekday} ${startTime} - ${endTime} ${timezone}`;
}

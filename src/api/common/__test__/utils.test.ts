import mockData from '@/test/mockData.json';
import { Job } from '@/types/job';
import moment from 'moment';
import { formatCurrency, formatDate, formatShiftDate, formatWage, mapResponseToJob } from '../utils';

// Get typed data directly from JSON
const jobMatch = mockData.jobs.jobMatch as Job;
const dates = mockData.dates;
const currency = mockData.currency;

// Mock moment-timezone to return a fixed timezone for consistent tests
jest.mock('moment-timezone', () => {
    const actual = jest.requireActual('moment-timezone');
    return {
        ...actual,
        tz: jest.fn(() => ({
            format: jest.fn(() => 'CDT')
        }))
    };
});

describe('Utility Functions', () => {
    test('formatCurrency should convert cents to dollars', () => {
        const result = formatCurrency(currency.standard);
        expect(result).toBe('12.50');
    });

    test('formatDate should convert ISO date to readable format', () => {
        const result = formatDate(dates.isoDate);
        expect(result).toBe(moment(dates.isoDate).format('ddd, MMM D'));
    });

    test('formatWage should convert cents to dollars', () => {
        const result = formatWage(currency.wage);
        expect(result).toBe('18.50');
    });

    test('formatShiftDate should format date range with proper timezone', () => {
        const result = formatShiftDate(dates.shiftStart, dates.shiftEnd);

        // Due to timezone differences, we'll test the pattern rather than exact values
        expect(result).toMatch(/[A-Z]{3} \d+, [A-Z]{3} \d+:\d+ [AP]M - \d+:\d+ [AP]M CDT/);
    });

    test('mapResponseToJob should convert JobMatch to Job format', () => {
        const result = mapResponseToJob(jobMatch);

        expect(result.jobId).toBe('123');
        expect(result.wagePerHourInCents).toBe(2500);
        expect(result.hourlyRate).toBe('25.00');
        expect(result.milesToTravel).toBe(5.3);
        expect(result.distance).toBe('5.3');
        expect(result.location?.distance).toBe('5.3 miles from your job search location.');
        expect(result.requirements).toEqual(['Laptop', 'Experience with React']);
        expect(result.company).toEqual({
            name: 'Tech Company',
            address: {
                formattedAddress: '123 Tech St, San Francisco, CA',
                zoneId: 'America/Los_Angeles'
            },
            reportTo: {
                name: 'John Manager',
                phone: '555-123-4567'
            }
        });
    });
});
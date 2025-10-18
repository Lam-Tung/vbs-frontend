/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LocalDateTime } from './LocalDateTime';
export type BookingDTO = {
    /**
     * The unique identifier of the booking
     */
    id?: number | null;
    /**
     * The unique identifier of the vehicle
     */
    vehicleId?: number | null;
    /**
     * The unique identifier of the user
     */
    userId?: number | null;
    /**
     * The start date of the booking
     */
    startDate?: (LocalDateTime | null);
    /**
     * The end date of the booking
     */
    endDate?: (LocalDateTime | null);
};


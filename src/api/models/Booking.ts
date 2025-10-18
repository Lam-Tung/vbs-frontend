/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LocalDateTime } from './LocalDateTime';
import type { User } from './User';
import type { Vehicle } from './Vehicle';
export type Booking = {
    id?: number | null;
    vehicle: Vehicle;
    user: User;
    startDate?: (LocalDateTime | null);
    endDate?: (LocalDateTime | null);
    created?: (LocalDateTime | null);
    updated?: (LocalDateTime | null);
};


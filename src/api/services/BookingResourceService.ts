/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Booking } from '../models/Booking';
import type { BookingDTO } from '../models/BookingDTO';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BookingResourceService {
    /**
     * Get Bookings
     * @returns Booking OK
     * @throws ApiError
     */
    public static getBooking(): CancelablePromise<Array<Booking>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/booking',
        });
    }
    /**
     * Delete Booking
     * @param requestBody
     * @returns void
     * @throws ApiError
     */
    public static deleteBooking(
        requestBody: BookingDTO,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/booking',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Create Booking
     * @param requestBody
     * @returns Booking OK
     * @throws ApiError
     */
    public static postBooking(
        requestBody: BookingDTO,
    ): CancelablePromise<Booking> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/booking',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * Get Booking By Id
     * @param id
     * @returns Booking OK
     * @throws ApiError
     */
    public static getBookingId(
        id: number = 1,
    ): CancelablePromise<Booking> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/booking/id/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Get Bookings By Page
     * @param pageNumber
     * @param pageSize
     * @returns Booking OK
     * @throws ApiError
     */
    public static getBookingPage(
        pageNumber?: number,
        pageSize: number = 10,
    ): CancelablePromise<Array<Booking>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/booking/page',
            query: {
                'pageNumber': pageNumber,
                'pageSize': pageSize,
            },
        });
    }
}

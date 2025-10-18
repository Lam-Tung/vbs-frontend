/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Vehicle } from '../models/Vehicle';
import type { VehicleDTO } from '../models/VehicleDTO';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class VehicleResourceService {
    /**
     * Update Vehicle
     * @param requestBody
     * @returns Vehicle OK
     * @throws ApiError
     */
    public static putVehicle(
        requestBody: VehicleDTO,
    ): CancelablePromise<Vehicle> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/vehicle',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * Get Vehicles
     * @returns Vehicle OK
     * @throws ApiError
     */
    public static getVehicle(): CancelablePromise<Array<Vehicle>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/vehicle',
        });
    }
    /**
     * Delete Vehicle
     * @param requestBody
     * @returns void
     * @throws ApiError
     */
    public static deleteVehicle(
        requestBody: VehicleDTO,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/vehicle',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Create Vehicle
     * @param requestBody
     * @returns Vehicle OK
     * @throws ApiError
     */
    public static postVehicle(
        requestBody: VehicleDTO,
    ): CancelablePromise<Vehicle> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/vehicle',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * Get Vehicles By Page
     * @param pageNumber
     * @param pageSize
     * @returns Vehicle OK
     * @throws ApiError
     */
    public static getVehiclePage(
        pageNumber?: number,
        pageSize: number = 10,
    ): CancelablePromise<Array<Vehicle>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/vehicle/page',
            query: {
                'pageNumber': pageNumber,
                'pageSize': pageSize,
            },
        });
    }
    /**
     * Get Vehicle By Id
     * @param id
     * @returns Vehicle OK
     * @throws ApiError
     */
    public static getVehicle1(
        id: number = 1,
    ): CancelablePromise<Vehicle> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/vehicle/{id}',
            path: {
                'id': id,
            },
        });
    }
}

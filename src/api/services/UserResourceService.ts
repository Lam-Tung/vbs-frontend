/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { User } from '../models/User';
import type { UserDTO } from '../models/UserDTO';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UserResourceService {
    /**
     * Update User
     * @param requestBody
     * @returns User OK
     * @throws ApiError
     */
    public static putUser(
        requestBody: UserDTO,
    ): CancelablePromise<User> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/user',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * Get Users
     * @returns User OK
     * @throws ApiError
     */
    public static getUser(): CancelablePromise<Array<User>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user',
        });
    }
    /**
     * Delete User
     * @param requestBody
     * @returns void
     * @throws ApiError
     */
    public static deleteUser(
        requestBody: UserDTO,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/user',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Create User
     * @param requestBody
     * @returns User OK
     * @throws ApiError
     */
    public static postUser(
        requestBody: UserDTO,
    ): CancelablePromise<User> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * Get User By Id
     * @param id
     * @returns User OK
     * @throws ApiError
     */
    public static getUserId(
        id: number = 1,
    ): CancelablePromise<User> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/id/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Get Users By Page
     * @param pageNumber
     * @param pageSize
     * @returns User OK
     * @throws ApiError
     */
    public static getUserPage(
        pageNumber?: number,
        pageSize: number = 10,
    ): CancelablePromise<Array<User>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/page',
            query: {
                'pageNumber': pageNumber,
                'pageSize': pageSize,
            },
        });
    }
}

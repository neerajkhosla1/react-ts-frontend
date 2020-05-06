import {Dispatch} from "redux";
import {User} from "../domains/user";
import {UserService} from "../domains/user.service";

export const FETCH_USERS = "FETCH_USERS";
export const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
export const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE";

export const FETCH_USER = "FETCH_USER";
export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
export const FETCH_USER_FAILURE = "FETCH_USER_FAILURE";

export const ADD_USER = "ADD_USER";
export const ADD_USER_SUCCESS = "ADD_USER_SUCCESS";
export const ADD_USER_FAILURE = "ADD_USER_FAILURE";

export const UPDATE_USER = "UPDATE_USER";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAILURE = "UPDATE_USER_FAILURE";

export const DELETE_USER = "DELETE_USER";
export const DELETE_USER_SUCCESS = "DELETE_USER_SUCCESS";
export const DELETE_USER_FAILURE = "DELETE_USER_FAILURE";

export interface UAction {
    type: string,
    [key: string]: any
}

function fetchUsersLoader(): UAction {
    return {
        type: FETCH_USERS
    }
}
function fetchUserLoader(): UAction {
    return {
        type: FETCH_USER
    }
}
export function fetchUsers(dispatch: Dispatch<UAction>): Promise<UAction> {
    dispatch(fetchUsersLoader());
    return UserService.fetchUsers()
        .then((result: User[])=> {
            return {
                type: FETCH_USERS_SUCCESS,
                users: result
            }
        })
        .catch((error: any) => {
            return {
                type: FETCH_USERS_FAILURE,
                error: error.message
            }
        });
}
export function fetchUser(dispatch: Dispatch<UAction>, id: string): Promise<UAction> {
    dispatch(fetchUserLoader());
    return UserService.fetchUser(id)
        .then((result: User)=> {
            return {
                type: FETCH_USER_SUCCESS,
                user: result
            }
        })
        .catch((error: any) => {
            return {
                type: FETCH_USER_FAILURE,
                error: error.message
            }
        });
}
export function addUser(name: string, email: string, dob: string, gender: string): Promise<UAction> {
    return UserService.addUser(name, email, dob, gender)
        .then((result: User[])=> {
            return {
                type: ADD_USER_SUCCESS,
                users: result
            }
        })
        .catch((error: any) => {
            return {
                type: ADD_USER_FAILURE,
                error: error.message
            }
        });
}
export function updateUser(id: string, name: string, email: string, dob: string, gender: string): Promise<UAction> {
    return UserService.updateUser(id, name, email, dob, gender)
        .then((result: User[])=> {
            return {
                type: UPDATE_USER_SUCCESS,
                users: result
            }
        })
        .catch((error: any) => {
            return {
                type: UPDATE_USER_FAILURE,
                error: error.message
            }
        });
}
export function deleteUser(id: string): Promise<UAction> {
    return UserService.deleteUser(id)
        .then((result: any)=> {
            return {
                type: DELETE_USER_SUCCESS,
                data: result
            }
        })
        .catch((error: any) => {
            return {
                type: DELETE_USER_FAILURE,
                error: error.message
            }
        });
}
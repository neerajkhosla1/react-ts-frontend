import {User} from "../domains/user";
import {
    ADD_USER_SUCCESS, FETCH_USER, FETCH_USER_FAILURE, FETCH_USER_SUCCESS,
    FETCH_USERS,
    FETCH_USERS_FAILURE,
    FETCH_USERS_SUCCESS,
    DELETE_USER,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAILURE,
    UPDATE_USER,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAILURE,
    UAction
} from "../actions/user.actions";

export interface UserState {
    users: User[],
    selectedUser: User,
    loading: boolean,
    error: string
}
export const initialUserState: UserState = {
    users: [],
    selectedUser: null,
    loading: false,
    error: null
};

export function UserReducer(state: UserState = initialUserState, action: UAction): UserState {
    switch (action.type) {
        case FETCH_USERS:
            return {
                ...state,
                loading: true
            };
        case FETCH_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                users: action.users
            };
        case FETCH_USERS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case ADD_USER_SUCCESS:
            return {
                ...state,
                users: action.users
            };
        case FETCH_USER:
            return {
                ...state,
                loading: true
            };
        case FETCH_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                selectedUser: action.user
            };
        case FETCH_USER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case DELETE_USER:
            return {
                ...state,
                loading: true
            };
        case DELETE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                selectedUser: action.user
            };
        case DELETE_USER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
            case UPDATE_USER:
                return {
                    ...state,
                    loading: true
                };
            case UPDATE_USER_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    selectedUser: action.user
                };
            case UPDATE_USER_FAILURE:
                return {
                    ...state,
                    loading: false,
                    error: action.error
                };
        default:
            return state;
    }
}

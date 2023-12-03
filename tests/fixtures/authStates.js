import { testUserCredentials } from "./testUser"

testUserCredentials
export const initialState = {
        status: 'checking',
        user: {},
        errorMessage: undefined,
}

export const authenticatedState = {
        status: 'authenticated',
        user: {
            uid: testUserCredentials.uid,
            name: testUserCredentials.name
        },
        errorMessage: undefined,
}

export const notauthenticatedState = {
        status: 'notauthenticated',
        user: {},
        errorMessage: undefined,
    }
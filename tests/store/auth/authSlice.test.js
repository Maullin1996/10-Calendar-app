import { authSlice, clearErrorMessage, onChecking, onLogin, onLogout } from '../../../src/store/auth/authSlice';
import { authenticatedState, initialState } from '../../fixtures/authStates';
import { testUserCredentials } from '../../fixtures/testUser';

describe('Pruebas en authSlice', () => {

    test('Debe de regresar el estado inicial', () => {

        expect( authSlice.getInitialState() ).toEqual( initialState )
    });

    test('Debe de realizar un login', () => {

        const state = authSlice.reducer( initialState, onLogin( testUserCredentials ) );
        expect( state ).toEqual({
            status: 'authenticated',
            user: testUserCredentials,
            errorMessage: undefined
        });
    });

    test('Debe de realizar el logout', () => {
        const state = authSlice.reducer( authenticatedState, onLogout() );
        expect( state ).toEqual({
            status: 'not-authenticated',
            user: {},
            errorMessage: undefined
        });
    });

    test('Debe de realizar el logout con mensaje', () => {
        const errorMessage = 'Invalid credentials'
        const state = authSlice.reducer( authenticatedState, onLogout(errorMessage) );
        expect( state ).toEqual({
            status: 'not-authenticated',
            user: {},
            errorMessage: errorMessage
        });
    });
    test('Debe de limpiar el mensaje de error', () => {
        const errorMessage = 'Invalid credentials'
        let state = authSlice.reducer( authenticatedState, onLogout(errorMessage) );
        state = authSlice.reducer( state, clearErrorMessage() );
        expect( state.errorMessage ).toBe( undefined );
    });
    test('Debe de verificar el estado del usuario', () => {

        const state = authSlice.reducer( authenticatedState, onChecking() );
        expect( state ).toEqual({
            status: 'checking',
            user: {},
            errorMessage: undefined
        })

    });
});
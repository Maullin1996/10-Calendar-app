import { configureStore } from '@reduxjs/toolkit';
import { act, renderHook, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { authSlice } from '../../src/store';
import { useAuthStore } from '../../src/hooks/useAuthStore';
import { notauthenticatedState, initialState } from '../fixtures/authStates'
import { testUserCredentials } from '../fixtures/testUser';
import calendarApi from '../../src/api/calendarApi';


const getMockStore = ( initialState ) => {
    return configureStore({
        reducer: {
            auth: authSlice.reducer,
        },
        preloadedState: {
            auth: { ...initialState }
        }
    })
}

const usuario = {
    email: 'algo@google.com',
    password: '123456789',
    name: 'Test User 2'
}

describe('Pruebas en useAuthStore', () => {
    beforeEach( () => localStorage.clear() );
    test('Debe de regresar los valores por defecto', () => {
        const mockStore = getMockStore({ 
            status: 'checking',
            user: {},
            errorMessage: undefined, });
        const {result} = renderHook( () => useAuthStore(), {
            wrapper: ({ children }) => 
            <Provider store={mockStore}>{ children }</Provider> 
        });
        //console.log(result)
        expect( result.current ).toEqual({
            errorMessage: undefined,
            status: 'checking',
            user: {},
            checkAuthToken: expect.any(Function),
            startLogin: expect.any(Function),
            startLogout: expect.any(Function),
            startRegister: expect.any(Function)
        });
    });

    test('startLogin debe de realizar el login correctamente', async() => {
        const mockStore = getMockStore({ ...notauthenticatedState });
        const {result} = renderHook( () => useAuthStore(), {
            wrapper: ({ children }) => 
            <Provider store={mockStore}>{ children }</Provider> 
        });
        await act( async() => {
            await result.current.startLogin(testUserCredentials)
        });
        //console.log(result)
        const { errorMessage, status, user } = result.current;
        expect({ errorMessage, status, user }).toEqual({
            errorMessage: undefined,
            status: 'authenticated',
            user: { name: 'Test User', uid: '656a8963ab9a7002721dd66d' }
        });
        expect( localStorage.getItem('token') ).toEqual( expect.any(String) );
        expect( localStorage.getItem('token-init-date') ).toEqual( expect.any(String) );
    });

    test('startLogin debe de fallar la autenticción', async() => {
        const mockStore = getMockStore({ ...notauthenticatedState });
        const {result} = renderHook( () => useAuthStore(), {
            wrapper: ({ children }) => 
            <Provider store={mockStore}>{ children }</Provider> 
        });
        await act( async() => {
            await result.current.startLogin(usuario)
        });
        const { errorMessage, status, user } = result.current;
        //console.log({errorMessage, status, user});
        //console.log(localStorage.getItem('token'));
        expect(localStorage.getItem('token')).toBe(null);
        expect( {errorMessage, status, user} ).toEqual({
            errorMessage: expect.any(String),
            status: 'not-authenticated',
            user: {}
        });
        waitFor(
            () => expect(result.current.errorMessage ).toBe(undefined)
        );
    });

    test('startRegister debe de crear un nuevo usuario', async() => {

        const mockStore = getMockStore({ ...notauthenticatedState });
        const {result} = renderHook( () => useAuthStore(), {
            wrapper: ({ children }) => 
            <Provider store={mockStore}>{ children }</Provider> 
        });

        const spy = jest.spyOn( calendarApi, 'post' ).mockReturnValue({
            data: {
                ok: true,
                uid: "algunuid",
                name: "Test User",
                token: "algun-token"
            }
        });

        await act( async() => {
            await result.current.startRegister(usuario)
        });

        const { errorMessage, status, user } = result.current;
        //console.log({errorMessage, status, user});

        expect({errorMessage, status, user}).toEqual({
            errorMessage: undefined,
            status: 'authenticated',
            user: { name: 'Test User', uid: 'algunuid' }
        });

        spy.mockRestore();

    });

    test('startRegister debe fallar la creacion', async() => {

        const mockStore = getMockStore({ ...notauthenticatedState });
        const {result} = renderHook( () => useAuthStore(), {
            wrapper: ({ children }) => 
            <Provider store={mockStore}>{ children }</Provider> 
        });

        await act( async() => {
            await result.current.startRegister(testUserCredentials)
        });

        const { errorMessage, status, user } = result.current;
        //console.log({errorMessage, status, user});

        expect({errorMessage, status, user}).toEqual({
            errorMessage: 'Un usuario existente con ese correo',
            status: 'not-authenticated',
            user: {}
        });

    });

    test('checkAuthToken debe de fallar si no hay token', async() => {

        const mockStore = getMockStore({ ...initialState });
        const {result} = renderHook( () => useAuthStore(), {
            wrapper: ({ children }) => 
            <Provider store={mockStore}>{ children }</Provider> 
        });
        //console.log('token', localStorage.getItem('token'));
        await act( async() => {
            await result.current.checkAuthToken()
        });
        const { errorMessage, status, user } = result.current;
        expect({errorMessage, status, user}).toEqual({
            errorMessage: undefined,
            status: 'not-authenticated',
            user: {}
        });
    });

    test('checkAuthToken debe autenticar el usuario si hay token', async() => {

        const { data } = await calendarApi.post('/auth', testUserCredentials);
        localStorage.setItem('token', data.token );

        const mockStore = getMockStore({ ...initialState });
        const {result} = renderHook( () => useAuthStore(), {
            wrapper: ({ children }) => 
            <Provider store={mockStore}>{ children }</Provider> 
        });
        //console.log('token', localStorage.getItem('token'));
        await act( async() => {
            await result.current.checkAuthToken()
        });
        const { errorMessage, status, user } = result.current;
        //console.log({errorMessage, status, user});
        expect({errorMessage, status, user}).toEqual({
            errorMessage: undefined,
            status: 'authenticated',
            user: { name: 'Test User', uid: '656a8963ab9a7002721dd66d' }
        });
    });
});
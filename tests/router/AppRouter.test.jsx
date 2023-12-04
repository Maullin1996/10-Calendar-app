import { render, screen } from '@testing-library/react';
import { useAuthStore } from '../../src/hooks';
import { AppRouter } from '../../src/router/AppRouter';
import { MemoryRouter } from 'react-router-dom';
import { CalendarPage } from '../../src/calendar';

jest.mock('../../src/hooks/useAuthStore.js');

jest.mock('../../src/calendar', () => ({
    CalendarPage: () => <h1>CalendarPage</h1>
}))


describe('Pruebas en <AppRouter', () => {

    const mockCheckAuthToken = jest.fn();

    beforeEach( () => jest.clearAllMocks() );

    test('Debe de mostrar la patalla de carga y llamar checkAuthToken', () => {

        useAuthStore.mockReturnValue({
            status: 'checking',
            checkAuthToken: mockCheckAuthToken
        });

        render( <AppRouter /> );

        //screen.debug();

        expect( screen.getByText('Cargando...') ).toBeTruthy();
        expect( mockCheckAuthToken ).toHaveBeenCalled();

    });

    test('Debe de mostrar el login en caso de no estar autenticado', () => {
        
        useAuthStore.mockReturnValue({
            status: 'not-authenticated',
            checkAuthToken: mockCheckAuthToken
        });
        const { container } = render(
            <MemoryRouter>
                <AppRouter />
            </MemoryRouter>
            );
        //screen.debug();
        expect( screen.getByText('Ingreso') ).toBeTruthy();
        expect( container ).toMatchSnapshot();
    });

    test('Debe de mostrar el calendario si estamos autenticados', () => {
        
        useAuthStore.mockReturnValue({
            status: 'authenticated',
            checkAuthToken: mockCheckAuthToken
        });
        
        render(
            <MemoryRouter>
                <AppRouter />
            </MemoryRouter>
            );
        //screen.debug();
        expect( screen.getByText('CalendarPage') ).toBeTruthy();
    });

});
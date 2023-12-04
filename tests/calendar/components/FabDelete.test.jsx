import { fireEvent, render, screen } from '@testing-library/react';
import { FabDelete } from '../../../src/calendar/components/FabDelete';
import { useCalendarStore } from '../../../src/hooks';

jest.mock('../../../src/hooks/useCalendarStore.js');

describe('Pruebas en <FabDelete />', () => {

    const mockstartDeletingEvent = jest.fn();

    beforeEach( () => jest.clearAllMocks() );

    test('Debe de mostrar el componente correctamente', () => {
        useCalendarStore.mockReturnValue({
            hasEventSelected: false
        });
        render(<FabDelete />)
        //screen.debug();
        const btn  = screen.getByLabelText('btn-detele');
        //console.log(btn.classList.toString())
        expect( btn.classList ).toContain('btn');
        expect( btn.classList ).toContain('btn-danger');
        expect( btn.style.display ).toBe('none');
    });

    test('Debe de mostrar el boton si hay un evento activo', () => {
        useCalendarStore.mockReturnValue({
            hasEventSelected: true
        });
        render(<FabDelete />)
        //screen.debug();
        const btn  = screen.getByLabelText('btn-detele');
        expect( btn.style.display ).toBe('');
    });

    test('Debe de llamar startDeletingEvent si hay evento activo', () => {
        useCalendarStore.mockReturnValue({
            hasEventSelected: true,
            startDeletingEvent: mockstartDeletingEvent
        });
        render(<FabDelete />)
        //screen.debug();
        const btn  = screen.getByLabelText('btn-detele');
        fireEvent.click(btn);

        expect( mockstartDeletingEvent ).toHaveBeenCalledWith();
    });

});

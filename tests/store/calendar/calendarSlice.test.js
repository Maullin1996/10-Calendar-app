import { calendarSlice, onAddNewEvent, onDeleteEvent, onLoadEvents, onLogoutCalendar, onSetActiveEvent, onUpdateEvent } from "../../../src/store/calendar/calendarSlice"
import { calendarWithActiveEventState, calendarWithEventsState, events, initialState } from "../../fixtures/calendarStates";

describe('Pruebas en el calendarSlice', () => {
    test('Debe de regresar el estado por defecto', () => {
        const state = calendarSlice.getInitialState();
        expect( state ).toEqual( initialState )
    });

    test('onSetActiveEvent debe de activar el evento', () => {

        const state = calendarSlice.reducer( calendarWithEventsState, onSetActiveEvent(events[0]) );
        //console.log(state)
        expect(state.activeEvent).toEqual( events[0] );
    });

    test('onAddNewEvent debe de agregar el evento', () => {

        const newEvent ={
                id: '3',
                start: new Date('2023-11-18 13:00:00'),
                end: new Date('2023-11-18 15:00:00'),
                title: 'Cumpleaños de melissa!!',
                notes: 'Hay que comprar el pastel',
        };

        const state = calendarSlice.reducer( calendarWithEventsState, onAddNewEvent(newEvent) )
        //console.log(state)
        expect( state.event ).toEqual([ ...events, newEvent ]);
    });

    test('onUpdateEvent debe de actualizar el evento', () => {

        const updatedEvent ={
                id: '1',
                start: new Date('2023-11-18 13:00:00'),
                end: new Date('2023-11-18 15:00:00'),
                title: 'Cumpleaños de melissa actualizado',
                notes: 'Hay que comprar el pastel!!',
        };

        const state = calendarSlice.reducer( calendarWithEventsState, onUpdateEvent(updatedEvent) );
        //console.log(state)
        expect( state.event ).toContain(updatedEvent)
    });

    test('onDeleteEvent debe de borrar el evento', () => {
        //calendarWithActiveState
        const state = calendarSlice.reducer( calendarWithActiveEventState, onDeleteEvent() );
        expect( state.activeEvent ).toBe(null);
        expect( state.event ).not.toContain( events[0] );
        
    });

    test('onLoadEvents debe de establecer los eventos', () => {

        let state = calendarSlice.reducer( initialState, onLoadEvents(events) )
        expect( state.isLoadingEvents ).toBeFalsy();
        expect( state.event ).toEqual(events);
        state = calendarSlice.reducer( state, onLoadEvents(events) );
        expect( state.event.length ).toBe(events.length);

    });

    test('onLogoutCalendar debe de limpiar el estado', () => {
        const state = calendarSlice.reducer( calendarWithEventsState, onLogoutCalendar() );
        expect( state ).toEqual(initialState)
    });

});
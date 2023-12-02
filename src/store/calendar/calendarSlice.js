import { createSlice } from '@reduxjs/toolkit';
//import { addHours } from 'date-fns';

// const tempEvent = {
//     _id: new Date().getTime(),
//     title: 'Cumpleaños del Jafe',
//     notes: 'Hay que comprar el pastel',
//     start: new Date(),
//     end: addHours( new Date(), 2 ),
//     bgColor: '#fafafa',
//     user: {
//         _id: '123',
//         name: 'Fernando'
//     }
// }

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        isLoadingEvents: true,
        event: [ ],
        activeEvent: null
    },
    reducers: {
        onSetActiveEvent: ( state, action ) => {
            state.activeEvent = action.payload;
        },
        onAddNewEvent: ( state, action ) => {
            state.event.push( action.payload );
            state.activeEvent = null;
        },
        onUpdateEvent: ( state, action ) => {
            state.event = state.event.map( event => {
                if ( event.id === action.payload.id ){
                    return action.payload;
                }
                return event
            });
        },
        onDeleteEvent: ( state ) => {
            if( state.activeEvent ) {
                state.event = state.event.filter(
                    event => event.id !== state.activeEvent.id
                );
                state.activeEvent = null;
            }
        },
        onLoadEvents: ( state, { payload = [] } ) => {
            state.isLoadingEvents = false;
            //state.event = payload;
            payload.forEach( event => {
                const exists = state.event.some( 
                    dbEvent => dbEvent.id === event.id );
                if( !exists ){
                    state.event.push( event );
                }
            } );
        },
        onLogoutCalendar: (state) => {
            state.isLoadingEvents= true,
            state.event= [ ],
            state.activeEvent = null

        }

    }
});


// Action creators are generated for each case reducer function
export const { 
    onAddNewEvent, 
    onDeleteEvent, 
    onLoadEvents,
    onLogoutCalendar,
    onSetActiveEvent, 
    onUpdateEvent,
    } = calendarSlice.actions;
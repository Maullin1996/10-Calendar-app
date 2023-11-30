import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "../store";


export const useCalendarStore = () => {


    const dispatch = useDispatch();
    const { event, activeEvent } = useSelector( state => state.calendar )

    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent( calendarEvent ) )
    }

    const startSavingEvent = async( calendarEvent ) => {
        //TODO: llegar al backend

        //TODO bien
        if( calendarEvent._id ){
            dispatch( onUpdateEvent( ...calendarEvent ) );
        } else{
            dispatch( onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }) )
        }
    }

    const startDeletingEvent = () => {
        //TODO Llegar al backend
        dispatch( onDeleteEvent() );
    }
    return{
        // Propiedades
        event, 
        activeEvent,
        hasEventSelected: !!activeEvent,

        //Metodos
        setActiveEvent,
        startSavingEvent,
        startDeletingEvent,
    }

}

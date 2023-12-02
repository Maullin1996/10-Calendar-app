import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onLoadEvents, 
        onSetActiveEvent, onUpdateEvent } from "../store";
import calendarApi from "../api/calendarApi";
import { convertEventsToDateEvents } from "../helpers";
import Swal from "sweetalert2";


export const useCalendarStore = () => {


    const dispatch = useDispatch();
    const { event, activeEvent } = useSelector( state => state.calendar );
    const { user } = useSelector( state => state.auth );

    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent( calendarEvent ) )
    }

    const startSavingEvent = async( calendarEvent ) => {
        //TODO: llegar al backend
        try{
            if( calendarEvent.id ){

                await calendarApi.put(`/events/${ calendarEvent.id }`, calendarEvent);
                dispatch( onUpdateEvent({ ...calendarEvent, user }) );
                return;
            }
    
                const { data } = await calendarApi.post('/events', calendarEvent);
                //console.log({data})
                dispatch( onAddNewEvent({ ...calendarEvent, id: data.event.id, user  }) )
        }catch(error){
            console.log(error);
            Swal.fire('Error al guardar', error.response.data.msg, 'error')
        }

    }

    const startDeletingEvent = async() => {
        //TODO Llegar al backend

        try{

            await calendarApi.delete(`/events/${ activeEvent.id }`);
            dispatch( onDeleteEvent() );

        }catch(error){
            console.log(error);
            Swal.fire('Error al guardar', error.response.data.msg, 'error')
        }
    }

    const startLoadingEvents = async() => {

        try{
            const { data } = await calendarApi.get('/events');
            const events = convertEventsToDateEvents( data.event );
            dispatch( onLoadEvents( events ) )
            //console.log({events});

        }catch (error){
            console.log('Error cargando eventos');
            console.log(error)
        }


    }
    return{
        // Propiedades
        event, 
        activeEvent,
        hasEventSelected: !!activeEvent,

        //Metodos
        setActiveEvent,
        startDeletingEvent,
        startLoadingEvents,
        startSavingEvent,
    }

}

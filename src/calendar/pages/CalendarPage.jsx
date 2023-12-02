import { useEffect, useState } from 'react'
import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { CalendarEvent, CalendarModal, FabAddNew, FabDelete, Navbar } from "../"
import { localizer, getMessagesEs } from '../../helpers'
import { useUiStore, useCalendarStore, useAuthStore } from '../../hooks'


export const CalendarPage = () => {

    const { user } = useAuthStore();
    const { openDateModal } = useUiStore();
    const { event, setActiveEvent, startLoadingEvents } = useCalendarStore();

    const [lastView, setlastView] = useState(localStorage.getItem('lastView') || 'week' )

    const eventStyleGetter = (event, start, end, isSelected) => {
        
        const isMyEvent = ( user.uid === event.user._id ) || ( user.uid === event.user.uid )

        const style = {
            backgroundColor: isMyEvent ? '#73C6B6':'#BDC3C7',
            borderRadius: '3px',
            opacity: 0.9,
            color: 'black'
        }

        return{
            style
        }
    }

    const onDoubleClick = ( event ) => {
        //console.log({ doubleClick: event })
        openDateModal();
    }

    const onSelecet = ( event ) => {
        // console.log({ click: event })
        setActiveEvent(event)
    }

    const onViewChanged = ( event ) => {
        localStorage.setItem('lastView', event);
        setlastView( event )
    }

    useEffect(() => {
        startLoadingEvents();
    }, []);


    return (
        <>
            <Navbar />

            <Calendar
                culture='es'
                localizer={localizer}
                events={event}
                defaultView={ lastView }
                startAccessor="start"
                endAccessor="end"
                style={{ height: 'calc( 100vh - 80px )' }}
                messages={ getMessagesEs() }
                eventPropGetter={ eventStyleGetter }
                components={{
                    event: CalendarEvent
                }}
                onDoubleClickEvent={ onDoubleClick }
                onSelectEvent={ onSelecet }
                onView={ onViewChanged }
    />

    <CalendarModal/>

    <FabAddNew />
    <FabDelete />

    </>
    )
}

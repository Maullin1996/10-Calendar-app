import { useState } from 'react'
import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { CalendarEvent, CalendarModal, FabAddNew, FabDelete, Navbar } from "../"
import { localizer, getMessagesEs } from '../../helpers'
import { useUiStore, useCalendarStore } from '../../hooks'


export const CalendarPage = () => {

    const { openDateModal } = useUiStore();

    const { event, setActiveEvent } = useCalendarStore();

    const [lastView, setlastView] = useState(localStorage.getItem('lastView') || 'week' )

    const eventStyleGetter = (event, start, end, isSelected) => {
        //console.log({event, start, end, isSelected})

        const style = {
            backgroundColor: '#7fffd4',
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

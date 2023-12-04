
export const events = [
    {
        id: '1',
        start: new Date('2022-10-21 13:00:00'),
        end: new Date('2022-10-21 15:00:00'),
        title: 'Cumpleaños del Jafe',
        notes: 'Hay que comprar el pastel',
    },
    {
        id: '2',
        start: new Date('2023-11-18 13:00:00'),
        end: new Date('2023-11-18 15:00:00'),
        title: 'Cumpleaños de melissa',
        notes: 'Hay que comprar el pastel',
    },
];

export const initialState = {
        isLoadingEvents: true,
        event: [ ],
        activeEvent: null
}

export const calendarWithEventsState = {
    isLoadingEvents: false,
    event: [ ...events ],
    activeEvent: null
}

export const calendarWithActiveEventState = {
    isLoadingEvents: false,
    event: [ ...events ],
    activeEvent: { ...events[0] }
}

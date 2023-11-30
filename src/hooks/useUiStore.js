import { useDispatch, useSelector } from 'react-redux'
import { onCloseDateModal, onOpenDateModal } from '../store';


export const useUiStore = () => {

    const dispatch = useDispatch();

    const {
        isDateModalOpen
    } = useSelector( state => state.ui );

    const openDateModal = () => {
        dispatch( onOpenDateModal() )
    }

    const closeDateModal = () => {
        dispatch( onCloseDateModal() )
    }

    /*No es necesario, solo por si se desea */
    const toggleDateModal = () => {
        (isDateModalOpen)
            ? openDateModal()
            : closeDateModal();
    }

    return{
        // Propiedades
        isDateModalOpen,

        // Métodos
        openDateModal,
        closeDateModal,
        toggleDateModal,
    }
}

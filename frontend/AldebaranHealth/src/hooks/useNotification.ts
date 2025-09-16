import { useState } from "react"

interface UseNotificationProps {
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
    isVisible?: boolean;
}

const useNotification = () => {
    const [notification, setNotification] = useState<UseNotificationProps>({
        message: "",
        type: 'info',
        isVisible: false,
    });

    const showNotification = (message: string, type: 'success' | 'error' | 'info' | 'warning') => {
        setNotification({
            message,
            type,
            isVisible: true,
        });
    }

    const hideNotification = () => {
        setNotification((prev) => ({
            ...prev,
            isVisible: false
        }));
    }

    return {
        notification,
        showNotification,
        hideNotification
    }
}

export default useNotification;
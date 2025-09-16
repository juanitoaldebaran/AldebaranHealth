import { Check, X, AlertCircle, Info } from "lucide-react";
import { useEffect } from "react";

interface NotificationProps {
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
    isVisible?: boolean;
    onClose: () => void;
    duration?: number;
    position?: 'top-right' | 'top-center' | 'top-left' | 'bottom-right' | 'bottom-center' | 'bottom-left';
}

const Notification: React.FC<NotificationProps> = ({message, type, isVisible, onClose, duration = 1000, position = 'bottom-right'}) => {
    useEffect(() => {
        if (isVisible && duration > 0) {
            const timeOut = setTimeout(() => {
                onClose();
            }, duration);

            return () => clearTimeout(timeOut);
        }
    }, []);
    
    
    const getPositionClasses = () => {
        const baseClasses = 'fixed z-50 transform transition-all duration-300 ease-in-out';
    
        switch (position) {
        case 'top-right':
            return `${baseClasses} top-4 right-4 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`;
        case 'top-center':
            return `${baseClasses} top-4 left-1/2 -translate-x-1/2 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`;
        case 'top-left':
            return `${baseClasses} top-4 left-4 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`;
        case 'bottom-right':
            return `${baseClasses} bottom-4 right-4 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`;
        case 'bottom-center':
            return `${baseClasses} bottom-4 left-1/2 -translate-x-1/2 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`;
        case 'bottom-left':
            return `${baseClasses} bottom-4 left-4 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`;
        default:
            return `${baseClasses} top-4 right-4 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`;
        }
    }
    
    const getIcon = () => {
        switch (type) {
        case 'success':
            return <Check className="w-5 h-5" />;
        case 'error':
            return <X className="w-5 h-5" />;
        case 'warning':
            return <AlertCircle className="w-5 h-5" />;
        case 'info':
            return <Info className="w-5 h-5" />;
        default:
            return null;
    }
    }

    const getColors = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'info':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const getIconColors = () => {
    switch (type) {
      case 'success':
        return 'text-green-500';
      case 'error':
        return 'text-red-500';
      case 'warning':
        return 'text-yellow-500';
      case 'info':
        return 'text-blue-500';
      default:
        return 'text-gray-500';
    }
  };
    
    return (
        <div className={getPositionClasses()}>
           <div className={`max-w-sm w-full shadow-lg rounded-lg border-l-4 p-4 ${getColors()}`}>
                <div className="flex items-start">
                    <div className={`flex-shrink-0 ${getIconColors()}`}>
                            {getIcon()}
                        </div>
                        <div className="ml-3 flex-1">
                            <p className="text-sm font-medium">
                                {message}
                            </p>
                        </div>
                        <div className="ml-4 flex-shrink-0 flex">
                            <button
                                className={`
                                    rounded-md inline-flex focus:outline-none focus:ring-2 focus:ring-offset-2
                                    ${type === 'success' ? 'text-green-400 hover:text-green-600 focus:ring-green-500' : ''}
                                    ${type === 'error' ? 'text-red-400 hover:text-red-600 focus:ring-red-500' : ''}
                                    ${type === 'warning' ? 'text-yellow-400 hover:text-yellow-600 focus:ring-yellow-500' : ''}
                                    ${type === 'info' ? 'text-blue-400 hover:text-blue-600 focus:ring-blue-500' : ''}
                                `}
                                onClick={onClose}
                                >
                            <X className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
           </div>
    )
}

export default Notification;
import { useRef } from 'react';
import TawkMessengerReact from '@tawk.to/tawk-messenger-react';

interface TawkMessengerWrapperProps {
    user?: {
        name?: string;
        email?: string;
    };
}

const TawkMessengerWrapper = ({ user }: TawkMessengerWrapperProps) => {
    const tawkMessengerRef = useRef<any>(null);

    const handleLoad = () => {
        if (!user) return;

        if (tawkMessengerRef.current) {
            tawkMessengerRef.current.setAttributes(
                {
                    name: user.name,
                    email: user.email,
                },
                (error: any) => {
                    if (error) console.error('Tawk setAttributes error:', error);
                }
            );
        }
    };

    const propertyId = import.meta.env.VITE_TAWK_PROPERTY_ID;
    const widgetId = import.meta.env.VITE_TAWK_WIDGET_ID;

    if (!propertyId || !widgetId) {
        console.warn('Tawk.to propertyId or widgetId is missing in environment variables.');
        return null;
    }

    return (
        <TawkMessengerReact
            propertyId={propertyId}
            widgetId={widgetId}
            ref={tawkMessengerRef}
            onLoad={handleLoad}
        />
    );
};

export default TawkMessengerWrapper;

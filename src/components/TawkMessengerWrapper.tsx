import { useRef } from 'react';
import TawkMessengerReact from '@tawk.to/tawk-messenger-react';

interface TawkSetAttributesCallback {
    (error?: Error | null): void;
}

interface TawkMessengerRef {
    setAttributes: (
        attributes: Record<string, string | undefined>,
        callback: TawkSetAttributesCallback
    ) => void;
}

interface TawkMessengerWrapperProps {
    user?: {
        name?: string;
        email?: string;
    };
}

const TawkMessengerWrapper = ({ user }: TawkMessengerWrapperProps) => {
    const tawkMessengerRef = useRef<TawkMessengerRef | null>(null);

    const handleLoad = () => {
        if (!user) return;

        if (tawkMessengerRef.current) {
            tawkMessengerRef.current.setAttributes(
                {
                    name: user.name,
                    email: user.email,
                },
                (error) => {
                    if (error) console.error('Tawk setAttributes error:', error);
                }
            );
        }
    };

    const propertyId = import.meta.env.VITE_TAWK_PROPERTY_ID;
    const widgetId = import.meta.env.VITE_TAWK_WIDGET_ID;

    if (!propertyId || !widgetId) {
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

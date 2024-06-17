import React, { useContext } from 'react';
export const MessageContext = React.createContext(undefined);
export const MessageProvider = ({ children, value, }) => (React.createElement(MessageContext.Provider, { value: value }, children));
export const useMessageContext = (componentName) => {
    const contextValue = useContext(MessageContext);
    if (!contextValue) {
        console.warn(`The useMessageContext hook was called outside of the MessageContext provider. Make sure this hook is called within the Message's UI component. The errored call is located in the ${componentName} component.`);
        return {};
    }
    return contextValue;
};
/**
 * Typescript currently does not support partial inference, so if MessageContext
 * typing is desired while using the HOC withMessageContext, the Props for the
 * wrapped component must be provided as the first generic.
 */
export const withMessageContext = (Component) => {
    const WithMessageContextComponent = (props) => {
        const messageContext = useMessageContext();
        return React.createElement(Component, { ...props, ...messageContext });
    };
    WithMessageContextComponent.displayName = (Component.displayName ||
        Component.name ||
        'Component').replace('Base', '');
    return WithMessageContextComponent;
};

import React, { useContext } from 'react';
export const ComponentContext = React.createContext(undefined);
export const ComponentProvider = ({ children, value, }) => (React.createElement(ComponentContext.Provider, { value: value }, children));
export const useComponentContext = (componentName) => {
    const contextValue = useContext(ComponentContext);
    if (!contextValue) {
        console.warn(`The useComponentContext hook was called outside of the ComponentContext provider. Make sure this hook is called within a child of the Channel component. The errored call is located in the ${componentName} component.`);
        return {};
    }
    return contextValue;
};
/**
 * Typescript currently does not support partial inference, so if ComponentContext
 * typing is desired while using the HOC withComponentContext, the Props for the
 * wrapped component must be provided as the first generic.
 */
export const withComponentContext = (Component) => {
    const WithComponentContextComponent = (props) => {
        const componentContext = useComponentContext();
        return React.createElement(Component, { ...props, ...componentContext });
    };
    WithComponentContextComponent.displayName = (Component.displayName ||
        Component.name ||
        'Component').replace('Base', '');
    return WithComponentContextComponent;
};

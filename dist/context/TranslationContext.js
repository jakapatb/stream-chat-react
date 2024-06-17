import React, { useContext } from 'react';
import Dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { getDisplayName } from './utils/getDisplayName';
import { defaultTranslatorFunction } from '../i18n';
Dayjs.extend(calendar);
Dayjs.extend(localizedFormat);
export const isLanguageSupported = (language) => {
    const translations = ['de', 'en', 'es', 'fr', 'hi', 'it', 'ja', 'ko', 'nl', 'pt', 'ru', 'tr'];
    return translations.some((translation) => language === translation);
};
export const isDayOrMoment = (output) => !!output?.isSame;
export const isDate = (output) => !!output?.getMonth;
export const isNumberOrString = (output) => typeof output === 'string' || typeof output === 'number';
export const defaultDateTimeParser = (input) => Dayjs(input);
export const TranslationContext = React.createContext({
    t: defaultTranslatorFunction,
    tDateTimeParser: defaultDateTimeParser,
    userLanguage: 'en',
});
export const TranslationProvider = ({ children, value, }) => (React.createElement(TranslationContext.Provider, { value: value }, children));
export const useTranslationContext = (componentName) => {
    const contextValue = useContext(TranslationContext);
    if (!contextValue) {
        console.warn(`The useTranslationContext hook was called outside of the TranslationContext provider. Make sure this hook is called within a child of the Chat component. The errored call is located in the ${componentName} component.`);
        return {};
    }
    return contextValue;
};
export const withTranslationContext = (Component) => {
    const WithTranslationContextComponent = (props) => {
        const translationContext = useTranslationContext();
        return React.createElement(Component, { ...props, ...translationContext });
    };
    WithTranslationContextComponent.displayName = `WithTranslationContext${getDisplayName(Component)}`;
    return WithTranslationContextComponent;
};

import deutsch from './de.json';
import english from './en.json';
import french from './fr.json';

const LANGUAGES = {
    DEUTSCH: 'de',
    ENGLISH: 'en',
    FRENCH: 'fr'
}

export const getI18N = ({ currentLocale }: { currentLocale: string }) => {
    if ( currentLocale === LANGUAGES.DEUTSCH ) return deutsch
    if ( currentLocale === LANGUAGES.ENGLISH ) return english
    if ( currentLocale === LANGUAGES.FRENCH ) return french
    return deutsch
}
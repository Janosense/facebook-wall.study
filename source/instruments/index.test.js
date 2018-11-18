import { sum, delay, getUniqueID, getFullApiUrl } from './';


describe('instruments', () => {
    test('sum function should be a function', () => {
        expect(sum).toBeInstanceOf(Function);
    });

    test('sum function should throw, when called with non-number type as first argument', () => {
        expect(() => sum('hi!', 2)).toThrow();
    });

    test('sum function should throw, when called with non-number type as second argument', () => {
        expect(() => sum(2, 'hi!')).toThrow();
    });

    test('sum function should return an additional of two arguments passed', () => {
        expect(sum(2, 3)).toBe(5);
        expect(sum(1, 7)).toMatchSnapshot();
    });

    test('delay function should return a resolved promise', async () => {
        await expect(delay()).resolves.toBeUndefined();
    });

    test('getUniqueID function should be a function', () => {
        expect(getUniqueID).toBeInstanceOf(Function);
    });

    test('getUniqueID should throw, when called with non-number type as argument', () => {
        expect(() => getUniqueID('hi!')).toThrow();
    });

    test('getUniqueID function should produce a string of a desired given length ', () => {
        expect(typeof getUniqueID()).toBe('string');
        expect(getUniqueID(5)).toHaveLength(5);
        expect(getUniqueID(13)).toHaveLength(13);
    });

    test('getFullApiUrl should be a function', () => {
        expect(getFullApiUrl).toBeInstanceOf(Function);
    });

    test('getFullApiUrl function should throw, when called with non-string type as first argument', () => {
        expect(() => getFullApiUrl(100, 'rjhw1w4388')).toThrow();
    });

    test('getFullApiUrl function should throw, when called with non-string type as second argument', () => {
        expect(() => getFullApiUrl('rjhw1w4388', 100)).toThrow();
    });

    test('getFullApiUrl function should return a valid string of API url', () => {
        expect(typeof getFullApiUrl('api', 'groupID')).toBe('string');
        expect(getFullApiUrl('api', 'groupID')).toBe('api/groupID');
    });
});

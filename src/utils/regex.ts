export function onlyCapitalLetters (value: string) {
    return value.replace(/[^A-Z]+/g, "").substring(0,2);
}
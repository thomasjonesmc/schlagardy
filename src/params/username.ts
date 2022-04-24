
// allow alphanumeric and underscores from length 2-15
export function match(param: string): boolean {

    param = param.toLowerCase();

    const isLetter = (char: string) => char.toLowerCase() != char.toUpperCase();
    const isNumber = (char: string) => !isNaN(parseInt(char));

    if (param.length < 2 || param.length > 15) return false;

    for (const char of param) {
        if (!isLetter(char) && !isNumber(char) && char !== "_") {
            return false;
        }
    }

    return true;
}
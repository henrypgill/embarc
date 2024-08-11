export function capitaliseString(string: string): string {
    function capitaliseWord(word: string): string {
        const letters = word.split("");
        const capital = letters.shift()!.toUpperCase();
        letters.unshift(capital);
        return letters.join("");
    }

    const str = string.trim();

    try {
        if (str.length === 0) {
            return "";
        }

        return str
            .split(" ")
            .map((w) => capitaliseWord(w))
            .join(" ");
    } catch {
        return str;
    }
}

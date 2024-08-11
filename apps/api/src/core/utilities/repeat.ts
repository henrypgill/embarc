export function repeat(amount: number, fn: () => void) {
    for (let i = 0; i < amount; i++) {
        fn();
    }
}

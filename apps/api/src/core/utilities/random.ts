export const randomInt = (max = 99) => Math.floor(Math.random() * max);

export const randomArrItem = <T>(arr: T[]) =>
    arr[Math.floor(Math.random() * arr.length - 1)];

export const randomChance = (chance: number): boolean => Math.random() < chance;

export const cutRandomArrayElement = <T>(arr: T[]): T | undefined => {
    // Check if the array is empty
    if (arr.length === 0) {
        return undefined; // Return undefined for an empty array
    }

    // Generate a random index within the array bounds
    const randomIndex = Math.floor(Math.random() * arr.length);

    // Get the item at the random index
    const removedItem = arr[randomIndex];

    // Remove the item from the array by overwriting it with the last item
    // and then removing the last item
    arr[randomIndex] = arr[arr.length - 1];
    arr.pop();

    // Return the removed item
    return removedItem;
};

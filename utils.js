export function arrayHasElement(arr1, arr2) {
    arr1 = arr1.sort((a, b) => {
        return a - b;
    });
    
    arr2 = arr2.sort((a, b) => {
        return a - b;
    })

    return arr1.every((value, index) => {
        value = arr2[index];
    });
}
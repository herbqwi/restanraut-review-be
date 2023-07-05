

const checkArr = (arr1: any[] | null, arr2: any[] | null) => {
    let found = false;
    if (!arr1 || !arr2) return found;
    for (const item of arr1) {
        if (arr2.includes(item)) {
            found = true;
            break;
        }
    }
    return found;
}

export { checkArr };
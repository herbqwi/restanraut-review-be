

const checkArr = (arr1: any[], arr2: any[]) => {
    let found = false;
    for (const item of arr1) {
        if (arr2.includes(item)) {
            found = true;
            break;
        }
    }
    return found;
}

export { checkArr };
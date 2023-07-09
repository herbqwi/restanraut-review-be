

const checkArr = (arr1: any[] | null, arr2: any[] | null) => {
    console.log('arr1: ', arr1)
    console.log('arr2: ', arr2)
    let found = false;
    if (!arr1 || !arr2) return found;
    for (const item of arr1) {
        if (arr2.includes(parseInt(item))) {
            found = true;
            break;
        }
    }
    return found;
}

export { checkArr };
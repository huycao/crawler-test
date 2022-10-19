export const extractRootDomain = (url: string) => {

    const domain = new URL(url).hostname;
    const elems = domain.split('.');
    const iMax = elems.length - 1;

    const elem1 = elems[iMax - 1];
    const elem2 = elems[iMax];

    const isSecondLevelDomain = iMax >= 3 && (elem1 + elem2).length <= 5;
    return (isSecondLevelDomain ? elems[iMax - 2] + '.' : '') + elem1 + '.' + elem2;

}
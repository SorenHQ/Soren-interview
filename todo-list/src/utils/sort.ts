

/**
 * 
 * @param array any object of array
 * @param base the basis which used to sort the array
 * @param ascending should array be sorted ascending or not
 * @returns the sorted input array also known as arg[0]  
 */

const sortArrayByBoolean = <T>(array: T[], base: string, ascending: boolean): T[] => {
  return array.sort((a, b) =>
    a[base] && !b[base]
      ? ascending
        ? 1
        : -1
      : !a[base] && b[base]
      ? ascending
        ? -1
        : 1
      : 0
  );
};

export { sortArrayByBoolean };

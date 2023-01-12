//=======FILTERS
/**
 * @desc Filters Tasks or Projects by name
 * @param Element search element
 * @param SearchText text to find inside element
 * @returns boolean
 */

export const filterTPByName = (
  value: { data: { name: string } },
  searchText: string
) => {
  return value.data.name.toLowerCase().includes(searchText.toLowerCase());
};
//=======SORTERS
/**
 * @desc Sort Tasks or Projects by status(Active, OnHold, Done)
 * @param valueA first element to compare
 * @param valueB second element to compare
 * @returns number
 */
export const sortTPByStatus = (
  valueA: { data: { status: string } },
  valueB: { data: { status: string } }
) => {
  let statusIndex: { [key: string]: number } = {
    Active: 1,
    "On Hold": 2,
    Done: 3,
  };
  return statusIndex[valueA.data.status] - statusIndex[valueB.data.status];
};

import { FiltersDto } from "../dto/filters.dto";

export const escapeSpecialCharacters = function (input: string) {
  return input.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};
export function parseFiltersArrayToQueryObject(
  filters: FiltersDto[]
): Record<string, any> {
  const queryObject: Record<string, any> = {};

  filters.forEach((filter) => {
    switch (filter.filterType) {
      case "dateRange":
        filter.filterValues.forEach(({ id, value }) => {
          if (id === "start") {
            queryObject["startDate"] = value ? new Date(value) : null;
          } else if (id === "end") {
            queryObject["endDate"] = value ? new Date(value) : null;
          }
        });
        break;
      // Add cases for other filter types
      default:
        break;
    }
  });
  return queryObject;
}

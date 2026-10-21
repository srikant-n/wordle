import type { TileProps } from "../types";

/**
 * Renders a single tile in the wordle grid.
 *
 * @param letter - The letter to be displayed in the tile. Defaults to an empty string.
 * @param status - The status of the tile. Can be 'correct', 'present', 'absent', or 'empty'. Defaults to 'empty'.
 * @returns The rendered tile component.
 */
function Tile({ letter = "", status = "" }: TileProps) {
  const getBgColor = () => {
    switch (status) {
      case "correct":
        return "bg-green-500";
      case "present":
        return "bg-yellow-500";
      case "absent":
        return "bg-gray-500";
      default:
        return "bg-white";
    }
  };

  const getTextColor = () => {
    switch (status) {
      case "correct":
      case "present":
      case "absent":
        return "text-white";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div
      className={`w-12 h-12 rounded-lg border-2 border-gray-300 ${getBgColor()} ${getTextColor()} uppercase font-bold text-4xl text-center m-0 p-0`}
    >
      {letter}
    </div>
  );
}

export default Tile;

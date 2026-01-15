type FAQChipsProps = {
  chips: string[];
  onSelect: (chip: string) => void;
  disabled?: boolean;
};

const FAQChips = ({ chips, onSelect, disabled = false }: FAQChipsProps) => {
  return (
    <div className="  sm:mt-10 flex flex-wrap justify-center gap-3 text-xs font-medium text-[#A1A2A3] sm:text-sm">
      {chips.map((chip) => (
        <button
          type="button"
          key={chip}
          className="rounded-sm sm:rounded-lg bg-[#1E1E1E] px-2 py-1 sm:px-4 sm:py-2 hover:bg-black/80 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-[#1E1E1E] cursor-pointer"
          onClick={() => onSelect(chip)}
          disabled={disabled}
        >
          {chip}
        </button>
      ))}
    </div>
  );
};

export default FAQChips;

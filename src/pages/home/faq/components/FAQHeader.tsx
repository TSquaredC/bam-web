type FAQHeaderProps = {
  title: string;
  subtitle: string;
};

const FAQHeader = ({ title, subtitle }: FAQHeaderProps) => {
  return (
    <div className="mx-auto max-w-3xl text-center py-16 sm:py-24">
      <h2 className="text-3xl font-extrabold uppercase tracking-tight sm:text-[42px]">
        {title}
      </h2>
      <p className="mt-2 text-[32px] font-semibold text-[#BD0308] sm:text-2xl max-w-xs sm:max-w-3xl mx-auto">
        {subtitle}
      </p>
    </div>
  );
};

export default FAQHeader;

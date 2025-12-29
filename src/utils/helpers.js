export const formatDate = (value) => {
  if (!value) return "";
  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(value));
};

export const classNames = (...classes) => classes.filter(Boolean).join(" ");

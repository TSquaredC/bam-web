import React from "react";

type PublicLayoutProps = {
  children: React.ReactNode;
};

const PublicLayout = ({ children }: PublicLayoutProps) => {
  return <div className="public-layout">{children}</div>;
};

export default PublicLayout;

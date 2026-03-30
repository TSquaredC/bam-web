import React from "react";

type AppLayoutProps = {
  children: React.ReactNode;
};

const AppLayout = ({ children }: AppLayoutProps) => {
  return <div className="app-layout">{children}</div>;
};

export default AppLayout;

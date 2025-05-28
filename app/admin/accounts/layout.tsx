import NavBar from "@/components/portfolioBuilder/NavBar";
import Provider from "@/components/portfolioBuilder/Provider";

function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="p-6">
      <Provider>
        <NavBar />
        {children}
      </Provider>
    </div>
  );
}

export default RootLayout;

import { Inter } from "next/font/google";
import { StoreProvider } from "./StoreProvider";
import { AntdRegistry } from "@ant-design/nextjs-registry";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <html lang="en">
        <body className={inter.className}>
          <AntdRegistry>{children}</AntdRegistry>
        </body>
      </html>
    </StoreProvider>
  );
}

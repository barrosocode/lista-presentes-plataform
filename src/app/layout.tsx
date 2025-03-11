import type {Metadata} from "next";
// import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";

import {Poppins, Dancing_Script} from "next/font/google";
// import "@/styles/global.css"; // Certifique-se de que seus estilos globais estão sendo importados

// Fonte Padrão (Poppins)
const poppins = Poppins({
    subsets: ["latin"],
    weight: ["300", "400", "600", "700"], // Escolha os pesos que deseja
    variable: "--font-poppins",
});

// Fonte específica para títulos (Dancing Script)
const dancingScript = Dancing_Script({
    subsets: ["latin"],
    weight: ["400", "700"], // Escolha os pesos que deseja
    variable: "--font-dancing-script",
});

// const geistSans = Geist({
//     variable: "--font-geist-sans",
//     subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//     variable: "--font-geist-mono",
//     subsets: ["latin"],
// });

export const metadata: Metadata = {
    title: "Chá de Panela B&b",
    description: "Nosso convite",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pt-br">
            <body className={`${poppins.className} ${dancingScript.className}`}>
                {/* Fundo separado do conteúdo */}
                <div className="stamp-background"></div>
                {/* Container do conteúdo para evitar interferências */}
                <div style={{position: "relative", zIndex: 1}}>{children}</div>
            </body>
        </html>
    );
}

// Imports
import Image from "next/image";

interface CircleImageProps {
    image: string; // Define que a prop `image` deve ser uma string
    sizeFactor?: number;
}

// Component
const CircleImage = ({image, sizeFactor = 1}: CircleImageProps) => {
    const size = 200 * sizeFactor;
    return (
        <Image
            src={image}
            alt={`Imagem ${image} em formato circular`}
            width={size} // Largura da imagem
            height={size} // Altura da imagem
            style={{
                borderRadius: "50%", // Torna a imagem circular
                objectFit: "cover", // Ajusta a imagem ao contêiner
                border: "2px solid #ca6234", // Opcional: Adiciona uma borda
                maxWidth: "100%", // Responsividade
                height: "auto", // Mantém a proporção
            }}
        />
    );
};

// Export
export default CircleImage;

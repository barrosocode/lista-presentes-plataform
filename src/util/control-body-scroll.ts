// Antes de exibir o alert, bloqueie o deslocamento lateral
const blockBodyScroll = () => {
    document.body.style.overflow = "hidden"; // Impede o scroll horizontal
};

// Depois de fechar o alert, libere o scroll
const unblockBodyScroll = () => {
    document.body.style.overflow = ""; // Restaura o scroll normal
};

export {blockBodyScroll, unblockBodyScroll};

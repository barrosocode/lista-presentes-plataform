// Base URL
const BASE_URL = "https://lista-presentes-api-production.up.railway.app";

/**
 * CRUD Convidados
 */

// Create
async function createConvidado(params) {
    // Tratar url da requisição
    const finalUrl = `${BASE_URL}/convidados/`;

    // Realizar requisição
    try {
        const response = await fetch(finalUrl, {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({name: params.name, confirmed: params.confirmed})});
        const data = await response.json();

        return data;
    } catch (error) {
        console.error("Erro ao cadastrar convidado:", error);

        return null;
    }
}

// Read
async function readConvidados() {
    // Tratar url da requisição
    const finalUrl = `${BASE_URL}/convidados/`;

    // Realizar requisição
    try {
        const response = await fetch(finalUrl, {method: "GET"});
        const data = await response.json();

        return data;
    } catch (error) {
        console.error("Erro ao buscar convidados:", error);
        return null; // Retorna null para evitar erro no código que consome essa função
    }
}

// Update
async function updateConvidado(id, params) {
    // tratar url da requisição
    const finalUrl = `${BASE_URL}/convidados/${id}/`;

    // realizar requisição
    try {
        const response = await fetch(finalUrl, {method: "PUT", headers: {"Content-Type": "application/json"}, body: JSON.stringify({name: params.name, confirmed: params.confirmed})});
        const data = await response.json();

        return data;
    } catch (error) {
        console.log(error);

        return null;
    }
}

/**
 * CRUD Presentes
 */

// Create
async function createPresentes(params) {
    // Tratar url da requisição
    const finalUrl = `${BASE_URL}/presentes/`;

    // Realizar requisição
    try {
        const response = await fetch(finalUrl, {method: "POST", body: params});
        const data = response.json();

        return data;
    } catch (error) {
        console.log(error);

        return null;
    }
}

// Read
async function readPresentes() {
    // Tratar url da requisição
    const finalUrl = `${BASE_URL}/presentes/`;

    // realizar requisição
    try {
        const response = await fetch(finalUrl, {method: "GET"});
        const data = await response.json();

        return data;
    } catch (error) {
        console.log(error);

        return null;
    }
}

// Find
async function findPresente(id) {
    const finalUrl = `${BASE_URL}/presentes/${id}/`;

    // realizar requisição
    try {
        const response = await fetch(finalUrl, {method: "GET"});
        const data = response.json();

        return data;
    } catch (error) {
        console.log(error);

        return null;
    }
}

// Update
async function updatePresente(id, params) {
    // Tratar url da requisição
    const finalUrl = `${BASE_URL}/presentes/${id}/`;

    // Realizar requisição
    try {
        const response = await fetch(finalUrl, {method: "PUT", body: params});
        const data = await response.json();

        return data;
    } catch (error) {
        console.log(error);

        return null;
    }
}

// Delete
async function deletePresente(id) {
    // Tratar url da requisição
    const finalUrl = `${BASE_URL}/presentes/${id}/`;

    // realizar requisição
    try {
        const response = await fetch(finalUrl, {method: "DELETE"});
        const data = response.ok;

        return data;
    } catch (error) {
        console.log(error);

        return null;
    }
}

/**
 * CRUD Presente_convidado
 */

// Create
async function createPresenteConvidado(params) {
    // Tratar url da requisição
    const finalUrl = `${BASE_URL}/presentes-convidados/`;

    // Realizar requisição
    try {
        const response = await fetch(finalUrl, {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({presente: params.idPresente, convidado: params.idConvidado})});
        const data = await response.json();

        return data;
    } catch (error) {
        console.log(error);

        return null;
    }
}

// Read
async function readPresentesConvidados() {
    // Tratar url da requisição
    const finalUrl = `${BASE_URL}/presentes-convidados/`;

    // Realizar requisição
    try {
        const response = await fetch(finalUrl, {method: "GET"});
        const data = await response.json();

        return data;
    } catch (error) {
        console.log(error);

        return null;
    }
}

export {
    // Convidados
    createConvidado,
    readConvidados,
    updateConvidado,
    // Presentes
    createPresentes,
    readPresentes,
    findPresente,
    updatePresente,
    deletePresente,
    // Presente_Convidado
    createPresenteConvidado,
    readPresentesConvidados,
};

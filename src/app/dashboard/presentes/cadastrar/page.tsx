"use client";
// Imports
import {createPresentes} from "@/services/lista-api";
import {Avatar, Box, Button, Card, CardHeader, TextField, Typography} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {useState} from "react";
import Swal from "sweetalert2";

// Export
export default function CreatePresente() {
    // Constantes para atribuir valor ao nome
    const [name, setName] = useState<string>("");
    // const [image, setImage] = useState<File>();
    const [link, setLink] = useState<string>("");
    const [store, setStore] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [amount, setAmount] = useState<string>("");
    // Para controle de previsão da imagem
    const [imagem, setImagem] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const handleImagemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImagem(file);
            setPreview(URL.createObjectURL(file)); // Gera URL temporária para preview
        }
    };

    // Função para cadastrar convidado
    const cadastrarPresente = async () => {
        // Tratar parâmetros da requisição
        const params = new FormData();
        params.append("name", name);
        params.append("link", link);
        params.append("store", store);
        params.append("description", description);
        params.append("amount", amount);
        params.append("status", "true");
        if (imagem) {
            params.append("image", imagem);
        }

        // Realizar requisição
        try {
            const data = await createPresentes(params);

            if (data.id) {
                Swal.fire("Sucesso!", "Presente cadastrado com sucesso", "success").then(() => {
                    window.location.href = "/dashboard/presentes";
                });
            } else {
                Swal.fire("Erro!", `Erro ao cadastrar presente: ${JSON.stringify(data)}`, "error");
            }
        } catch (error) {
            Swal.fire("Erro!", `Erro ao cadastrar presente: ${JSON.stringify(error)}`, "error");
        }
    };

    console.log(imagem);

    return (
        <Grid container padding={5}>
            <Grid container minWidth={"100%"}>
                <Grid size={12}>
                    <Typography variant="h3">Presentes</Typography>
                </Grid>
                <Grid size={12}>
                    <Typography variant="h5">Dashboard / Presentes / Cadastrar Presente</Typography>
                </Grid>
            </Grid>
            <Grid container minWidth={"100%"} marginY={3}>
                <Card sx={{minWidth: "100%"}}>
                    <CardHeader title="Cadastrar Presente" />
                    <Grid>
                        <Grid container minWidth={"100%"} padding={2} justifyContent={"center"}>
                            <Grid size={6}>
                                <Typography>Nome</Typography>
                                <TextField onChange={(e) => setName(e.target.value)} value={name} fullWidth />
                            </Grid>
                        </Grid>
                        <Grid container minWidth={"100%"} padding={2} justifyContent={"center"}>
                            <Grid size={6}>
                                <Typography>Imagem</Typography>
                                <Box display="flex" alignItems="center" gap={2} mt={2} mb={2}>
                                    {preview ? (
                                        <Avatar
                                            src={preview}
                                            alt="Preview da imagem"
                                            variant="square" // <-- Quadrado
                                            sx={{width: 150, height: 150}} // <-- Tamanho maior
                                        />
                                    ) : (
                                        <Avatar
                                            variant="square" // <-- Quadrado
                                            sx={{width: 150, height: 150}} // <-- Tamanho maior
                                        />
                                    )}

                                    <Button variant="contained" component="label">
                                        Selecionar Imagem
                                        <input type="file" accept="image/*" hidden onChange={handleImagemChange} />
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                        <Grid container minWidth={"100%"} padding={2} justifyContent={"center"}>
                            <Grid size={6}>
                                <Typography>Link</Typography>
                                <TextField onChange={(e) => setLink(e.target.value)} value={link} fullWidth />
                            </Grid>
                        </Grid>
                        <Grid container minWidth={"100%"} padding={2} justifyContent={"center"}>
                            <Grid size={6}>
                                <Typography>Loja</Typography>
                                <TextField onChange={(e) => setStore(e.target.value)} value={store} fullWidth />
                            </Grid>
                        </Grid>
                        <Grid container minWidth={"100%"} padding={2} justifyContent={"center"}>
                            <Grid size={6}>
                                <Typography>Descrição</Typography>
                                <TextField multiline rows={4} onChange={(e) => setDescription(e.target.value)} value={description} fullWidth />
                            </Grid>
                        </Grid>
                        <Grid container minWidth={"100%"} padding={2} justifyContent={"center"}>
                            <Grid size={6}>
                                <Typography>Quantidade</Typography>
                                <TextField type="number" onChange={(e) => setAmount(e.target.value)} value={amount} fullWidth />
                            </Grid>
                        </Grid>
                        <Grid container minWidth={"100%"} padding={2} justifyContent={"center"}>
                            <Grid size={3}>
                                <Button onClick={() => cadastrarPresente()} variant="outlined" fullWidth sx={{borderColor: "#ca6234", color: "#ca6234"}}>
                                    Cadastrar
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Card>
            </Grid>
        </Grid>
    );
}

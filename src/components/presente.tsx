// Imports
import ConvidadosInterface from "@/interfaces/convidados-interface";
import PresentesInterface from "@/interfaces/presentes-interface";
import {createPresenteConvidado, updatePresente} from "@/services/lista-api";
import {Button, Card, CardHeader, Link, MenuItem, Select, Typography} from "@mui/material";
import Grid from "@mui/material/Grid2";
import Image from "next/image";
import {useState} from "react";
import {blockBodyScroll, unblockBodyScroll} from "@/util/control-body-scroll";
import Swal from "sweetalert2";

interface PresenteProps {
    presente: PresentesInterface;
    convidados: ConvidadosInterface[];
}

// Component
const Presente: React.FC<PresenteProps> = ({presente, convidados}) => {
    const [idConvidado, setIdConvidado] = useState<string>("");

    // Assinar presente
    const assinarPresente = async ({
        idPresente,
        idConvidado,
        presente, // Agora o presente vem como parâmetro
    }: {
        idPresente: string;
        idConvidado: string;
        presente: PresentesInterface; // Ajuste conforme a interface correta
    }) => {
        // Verificar se o presente existe
        if (!presente) {
            console.log("Presente não encontrado!");
            Swal.fire("Erro!", "Presente não encontrado", "error");
            return;
        }

        // Verificar se algum usuário foi selecionado
        if (!idConvidado) {
            console.log("Por favor, selecione seu nome!");
            Swal.fire("Erro!", "Por favor, selecione seu nome", "error");
            return;
        }

        // Preparando o objeto com os parâmetros para cadastro
        const params = {
            idPresente,
            idConvidado,
        };

        // Realizar requisição
        try {
            // Cadastrando a assinatura do convidado no presente
            await createPresenteConvidado(params);

            // Criando parâmetros para atualização do presente
            const paramsAtualizacao = {
                name: presente.name,
                link: presente.link,
                store: presente.store,
                description: presente.description,
                amount: presente.amount > 1 ? presente.amount - 1 : 0,
                status: presente.amount > 1,
            };

            console.log("Atualizando presente com:", paramsAtualizacao);

            // Atualizando o presente
            await updatePresente(presente.id, paramsAtualizacao);

            // Exibir sucesso e recarregar
            blockBodyScroll();
            Swal.fire("Sucesso!", "Presente confirmado com sucesso!", "success")
                .then(unblockBodyScroll)
                .then(() => {
                    window.location.reload();
                });
        } catch (error) {
            console.log(error);
            blockBodyScroll();
            Swal.fire("Erro", `${error}`, "error");
            unblockBodyScroll();
        }
    };

    return (
        <Card>
            <CardHeader title={presente.name} sx={{textAlign: "center"}} />
            <Grid container spacing={5} marginTop={3} marginBottom={3} alignItems="center" justifyContent="center" style={{minWidth: "100%"}} textAlign={"center"} padding={2}>
                <Grid size={12}>
                    <Image src={presente.image} alt={presente.name} width={300} height={300} />
                </Grid>

                <Grid size={12}>
                    <Typography textAlign={"center"}>{presente.description}</Typography>
                </Grid>
                <Grid size={12}>
                    <Link href={presente.link}>
                        <Typography>{presente.link}</Typography>
                    </Link>
                </Grid>
                <Grid size={12}>
                    <Typography variant={"h6"} textAlign={"center"}>
                        Quero te dar esse presente!
                    </Typography>
                </Grid>
                <Grid size={12}>
                    <Typography>Procure seu nome</Typography>
                    <Select
                        value={idConvidado}
                        onChange={(e) => {
                            setIdConvidado(e.target.value);
                        }}
                        fullWidth
                        MenuProps={{disableScrollLock: true}} // ✅ Evita o deslocamento da página
                    >
                        <MenuItem value={""}>Nenhum</MenuItem>
                        {convidados.map((convidado, index) => (
                            <MenuItem key={index} value={convidado.id}>
                                {convidado.name}
                            </MenuItem>
                        ))}
                    </Select>
                </Grid>
                <Grid size={12}>
                    <Button
                        onClick={() => {
                            assinarPresente({idPresente: presente.id, idConvidado, presente});
                        }}
                        fullWidth
                        variant="outlined"
                        sx={{borderColor: "#ca6234", color: "#ca6234"}}
                    >
                        Confirmar
                    </Button>
                </Grid>
            </Grid>
        </Card>
    );
};

// Export
export default Presente;

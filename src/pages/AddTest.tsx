import {
    Box,
    Button,
    Divider,
    Typography,
    Autocomplete,
    TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAlert from "../hooks/useAlert";
import useAuth from "../hooks/useAuth";
import api, {
    Category,
    PlainDiscipline,
    TeachersByDisciplines,
} from "../services/api";

const styles = {
    title: {
        fontWeight: "500",
        fontSize: "24px",
        letterSpacing: "0.15px",
        color: "rgba(0, 0, 0, 0.8)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginX: "auto",
        marginBottom: "50px",
        width: "450px",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: "50px",
        paddingBottom: "50px",
        width: "100%",
        gap: "20px",
    },
};

interface TestData {
    title: string | null;
    pdfUrl: string | null;
    category: string | null;
    discipline: string | null;
    teacher: string | null;
}

interface PlainData {
    categories: Category[] | null;
    disciplines: PlainDiscipline[] | null;
    teachers: TeachersByDisciplines[] | null;
}

function AddTest() {
    const navigate = useNavigate();
    const { token } = useAuth();
    const { setMessage } = useAlert();
    const [formData, setFormData] = useState<TestData>({
        title: "",
        pdfUrl: "",
        category: null,
        discipline: null,
        teacher: null,
    });

    const [categoryArray, setCategoryArray] = useState<string[]>([]);
    const [disciplineArray, setDisciplineArray] = useState<string[]>([]);
    const [teacherArray, setTeacherArray] = useState<string[]>([]);
    const [plainDataArrays, setPlainDataArrays] = useState<PlainData>({
        categories: null,
        disciplines: null,
        teachers: null,
    });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function loadPage() {
            try {
                if (!token) {
                    return;
                }
                setFormData({ ...formData, teacher: null });
                const { filteredCategoriesArray, categories } =
                    await getCategoryArray(token);
                setCategoryArray(filteredCategoriesArray);

                const { filteredDisciplinesArray, disciplines } =
                    await getDisciplinesArray(token);

                if (formData.discipline) {
                    const { filteredTeachersArray, teachers } =
                        (await getTeachersArray(disciplines, token)) as {
                            filteredTeachersArray: string[];
                            teachers: TeachersByDisciplines[];
                        };
                    setPlainDataArrays({ categories, disciplines, teachers });
                    setTeacherArray(filteredTeachersArray);
                }
                setDisciplineArray(filteredDisciplinesArray);
            } catch (error) {
                setMessage({
                    type: "error",
                    text: "Impossible to load input data options.",
                });
            }
        }
        loadPage();
    }, [formData.discipline]);

    async function getCategoryArray(token: string) {
        const { data } = await api.getCategories(token);
        const { categories } = data;
        const filteredCategoriesArray = categories.map((category) => {
            return category.name;
        });

        return { filteredCategoriesArray, categories };
    }

    async function getDisciplinesArray(token: string) {
        const { data } = await api.getDisciplines(token);
        const { disciplines } = data;
        const filteredDisciplinesArray = disciplines.map((discipline) => {
            return discipline.name;
        });
        return { filteredDisciplinesArray, disciplines };
    }

    async function getTeachersArray(
        disciplines: PlainDiscipline[],
        token: string
    ) {
        const disciplineId = getDisciplineId(disciplines);
        if (!disciplineId) {
            return;
        }
        const { data } = await api.getTeachersByDisciplineId(
            token,
            disciplineId
        );

        const filteredTeachersArray = data.teachers.map((item) => {
            return item.teacher.name;
        });
        return { filteredTeachersArray, teachers: data.teachers };
    }

    function getDisciplineId(disciplines: PlainDiscipline[]) {
        const item = disciplines.find(
            (discipline) => discipline.name === formData.discipline
        );
        return item?.id;
    }
    function getCategoryId(categories: Category[]) {
        const item = categories.find(
            (category) => category.name === formData.category
        );
        return item?.id;
    }
    function getTeacherId(teachers: TeachersByDisciplines[]) {
        const item = teachers.find(
            ({ teacher }) => teacher.name === formData.teacher
        );
        return item?.teacher.id;
    }

    function handleChangeTextField(e: any) {
        const name = e.target.name;
        const value = e.target.value;
        setFormData({ ...formData, [`${name}`]: value });
    }

    function handleSubmit(e: any) {
        e.preventDefault();
        setIsLoading(true);
        if (
            !token ||
            !plainDataArrays.categories ||
            !plainDataArrays.disciplines ||
            !plainDataArrays.teachers
        ) {
            setIsLoading(false);
            return;
        }
        const categoryId = getCategoryId(plainDataArrays.categories);
        const disciplineId = getDisciplineId(plainDataArrays.disciplines);
        const teacherId = getTeacherId(plainDataArrays.teachers);

        const test = {
            name: formData.title,
            pdfUrl: formData.pdfUrl,
            categoryId,
            disciplineId,
            teacherId,
        };

        const promise = api.postTest(token, test);
        promise.then((response) => {
            setMessage({ type: "success", text: "Prova criada com sucesso!" });
            setIsLoading(false);
            navigate("/app/disciplinas");
        });
        promise.catch((error) => {
            setIsLoading(false);
            setMessage({
                type: "error",
                text: "Não foi possível criar a prova, tente mais tarde.",
            });
        });
    }

    return (
        <>
            <Typography sx={styles.title} variant="h4" component="h1">
                Adicione uma prova
            </Typography>
            <Divider sx={{ marginBottom: "35px" }} />
            <Box
                sx={{
                    marginX: "auto",
                    width: "700px",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                    }}
                >
                    <Button
                        variant="outlined"
                        onClick={() => navigate("/app/disciplinas")}
                    >
                        Disciplinas
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={() => navigate("/app/pessoas-instrutoras")}
                    >
                        Pessoa Instrutora
                    </Button>
                    <Button
                        variant="contained"
                        onClick={() => navigate("/app/adicionar")}
                    >
                        Adicionar
                    </Button>
                </Box>
                <Box component="form" onSubmit={handleSubmit} sx={styles.form}>
                    <TextField
                        InputLabelProps={{ required: false }}
                        required
                        name="title"
                        value={formData.title}
                        onChange={handleChangeTextField}
                        sx={{ width: "100%", height: "55px" }}
                        label="Titulo da prova"
                        variant="outlined"
                    />
                    <TextField
                        InputLabelProps={{ required: false }}
                        required
                        name="pdfUrl"
                        value={formData.pdfUrl}
                        onChange={handleChangeTextField}
                        sx={{ width: "100%", height: "55px" }}
                        label="PDF da prova"
                        variant="outlined"
                    />
                    <Autocomplete
                        options={categoryArray}
                        sx={{ width: "100%", height: "55px" }}
                        value={formData.category}
                        onChange={(e: any, newValue: string | null) => {
                            setFormData({
                                ...formData,
                                category: newValue,
                            });
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                InputLabelProps={{ required: false }}
                                required
                                label="Categoria"
                            />
                        )}
                    />
                    <Autocomplete
                        options={disciplineArray}
                        sx={{ width: "100%", height: "55px" }}
                        value={formData.discipline}
                        onChange={(e, newValue: string | null) => {
                            setFormData({ ...formData, discipline: newValue });
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                InputLabelProps={{ required: false }}
                                required
                                label="Disciplina"
                            />
                        )}
                    />
                    <Autocomplete
                        options={teacherArray}
                        sx={{ width: "100%", height: "55px" }}
                        value={formData.teacher}
                        onChange={(e, newValue) => {
                            setFormData({ ...formData, teacher: newValue });
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                InputLabelProps={{ required: false }}
                                required
                                label="Pessoa Instrutora"
                            />
                        )}
                        disabled={!formData.discipline}
                    />
                    <Button
                        disabled={isLoading}
                        sx={{ width: "100%", height: "45px" }}
                        variant="contained"
                        type="submit"
                    >
                        Enviar
                    </Button>
                </Box>
            </Box>
        </>
    );
}

export default AddTest;

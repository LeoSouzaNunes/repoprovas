import axios from "axios";

const baseAPI = axios.create({
    baseURL: "http://localhost:5000/",
});

interface UserData {
    email: string;
    password: string;
}

function getConfig(token: string) {
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
}

async function signUp(signUpData: UserData) {
    await baseAPI.post("/sign-up", signUpData);
}

async function signIn(signInData: UserData) {
    return baseAPI.post<{ token: string }>("/sign-in", signInData);
}

export interface Term {
    id: number;
    number: number;
}

export interface Discipline {
    id: number;
    name: string;
    teacherDisciplines: TeacherDisciplines[];
    term: Term;
}

export interface PlainDiscipline {
    id: number;
    name: string;
}

export interface TeacherDisciplines {
    id: number;
    discipline: Discipline;
    teacher: Teacher;
    tests: Test[];
}

export interface Teacher {
    id: number;
    name: string;
}

export interface Category {
    id: number;
    name: string;
}

export interface Test {
    id: number;
    name: string;
    pdfUrl: string;
    category: Category;
    views: number;
}

export interface TestCreateData {
    name: string;
    pdfUrl: string;
    categoryId: number;
    disciplineId: number;
    teacherId: number;
}

export type TestByDiscipline = Term & {
    disciplines: Discipline[];
};

export type TestByTeacher = TeacherDisciplines & {
    teacher: Teacher;
    disciplines: Discipline[];
    tests: Test[];
};

type DisciplineData = Omit<Discipline, "teacherDisciplines" | "term">;

export interface TeachersByDisciplines {
    teacher: Teacher;
    discipline: DisciplineData;
}

async function getTestsByDiscipline(token: string) {
    const config = getConfig(token);
    return baseAPI.get<{ tests: TestByDiscipline[] }>(
        "/tests?groupBy=disciplines",
        config
    );
}
async function getTestsByDisciplineName(token: string, disciplineName: string) {
    const config = getConfig(token);
    return baseAPI.get<{ tests: TestByDiscipline[] }>(
        `/tests?groupBy=disciplines&whereContent=${disciplineName}`,
        config
    );
}

async function getTestsByTeacher(token: string) {
    const config = getConfig(token);
    return baseAPI.get<{ tests: TestByTeacher[] }>(
        "/tests?groupBy=teachers",
        config
    );
}

async function getTestsByTeacherName(token: string, teacherName: string) {
    const config = getConfig(token);
    return baseAPI.get<{ tests: TestByTeacher[] }>(
        `/tests?groupBy=teachers&whereContent=${teacherName}`,
        config
    );
}

async function getCategories(token: string) {
    const config = getConfig(token);
    return baseAPI.get<{ categories: Category[] }>("/categories", config);
}

async function getDisciplines(token: string) {
    const config = getConfig(token);
    return baseAPI.get<{ disciplines: PlainDiscipline[] }>(
        "/disciplines",
        config
    );
}

async function getTeachersByDisciplineId(token: string, disciplineId: number) {
    const config = getConfig(token);
    return baseAPI.get<{ teachers: TeachersByDisciplines[] }>(
        `/teachers/${disciplineId}`,
        config
    );
}

async function postTest(token: string, body: any) {
    const config = getConfig(token);
    return baseAPI.post(`/tests`, body, config);
}

async function updateTestViews(token: string, testId: number) {
    const config = getConfig(token);
    return baseAPI.put(`/tests/${testId}/views`, {}, config);
}

const api = {
    signUp,
    signIn,
    getTestsByDiscipline,
    getTestsByTeacher,
    getCategories,
    getTestsByDisciplineName,
    getTestsByTeacherName,
    updateTestViews,
    getDisciplines,
    getTeachersByDisciplineId,
    postTest,
};

export default api;

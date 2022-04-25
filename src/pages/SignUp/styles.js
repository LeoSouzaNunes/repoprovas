const styles = {
    div: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "120px",
        minHeight: "100vh",
        padding: "55px 55px",
    },
    main: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "30px",
        width: "30%",
    },
    h1: {
        fontFamily: "Poppins",
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: "24px",
        lineHeight: "24px",
        display: "flex",
        alignItems: "center",
        letterSpacing: "0.15px",
        color: "rgba(0, 0, 0, 0.8)",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",

        gap: "25px",
        width: "100%",
    },
    input: {
        width: "100%",
        height: "55px",
    },
    divSpace: {
        width: "100%",

        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    a: {
        fontSize: "0.9rem",
        letterSpacing: "0.15px",
        textDecorationLine: "underline",
        color: "rgba(70, 115, 202, 0.8)",
        "&:hover": {
            cursor: "pointer",
        },
    },
};
export default styles;

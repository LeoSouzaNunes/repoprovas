const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
    },
    header: {
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        width: "100%",
        height: "100px",
    },
    iconContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
    },
    icon: {
        height: "40px",
        width: "36px",
        color: "rgba(0,0,0,0.8)",
    },
    input: {
        width: "465px",
        height: "55px",
        marginTop: "40px",
        marginBottom: "25px",
    },
    divider: {
        width: "100%",
        "&::before, &::after": {
            borderColor: "#C4C4C4",
        },
    },
    navbar: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        marginBottom: "20px",
    },
    containerMainContent: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",

        gap: "5px",
        padding: "30px 0px",
        width: "700px",
    },
};

export default styles;

export default function Loading()
{
    const loadingContainer = {
        height: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "3rem",
        backgroundColor: "var(--bg4)",
        color: "var(--text5)",
    }
    return(
        <div style={loadingContainer}>Loading...</div>
    )
}
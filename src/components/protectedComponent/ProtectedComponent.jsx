import Header from "../header/Header";
import Main from "../main/Main";

function ProtectedComponent ({ userEmail, ...props }) {
    return (
        <>
            <Header dataUser={userEmail} />
            <Main name="main" {...props} />
        </>
    );
}

export default ProtectedComponent;
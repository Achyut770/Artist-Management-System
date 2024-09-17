import { MdError } from "react-icons/md";
import "./styles/error.css";

const Error = ({ error, resetErrorBoundary }) => (
    <div className="error-container">
        <MdError className="erro_icon" />
        <h1 className="error-title">Oops! Something went wrong.</h1>
        <p className="error-message">{error.message}</p>
        <button className="retry-button" onClick={resetErrorBoundary}>Try Again</button>
    </div>
);

export default Error;

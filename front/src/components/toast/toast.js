import { ToastContainer as LocalToastContainer, Slide, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './toast.scss'


export const toastError = (message) => toast.error(message, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
});

export const toastSuccess = (message, closed) => toast.success(message, {
    position: "top-center",
    autoClose: closed || 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
});
export const Toast = () => {
    return (
        <LocalToastContainer transition={Slide} />
    );
}
import './Modal.css';

interface Props {
    isOpen: boolean;
    title: string;
    children: React.ReactNode;
    onRequestClose: () => void;
}

const Modal = (props: Props): JSX.Element => {
    if (!props.isOpen) return null;

    return (
        <>
            <div className="dimmer" onClick={() => props.onRequestClose()} />
            <div className="modal-wrapper">
                <div className="modal">
                    <div className="title">{props.title}</div>
                    <div className="content">
                        {props.children}
                    </div>
                    <button onClick={() => props.onRequestClose()}>Close</button>
                </div>
            </div>
        </>
    );
};

export default Modal;

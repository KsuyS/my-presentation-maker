import styles from './ButtonWithImage.module.css'

type ButtonProps = {
    image: string;
    text: string,
    onClick: () => void,
    className: string,
}

function Button({image, text, onClick, className}: ButtonProps) {
    return (
        <button className={`${styles.button} ${className}`} onClick={onClick} title={text}>
            <img src={image}></img>
        </button>
    )
}

export {
    Button,
}

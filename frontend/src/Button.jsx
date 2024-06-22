import "./Button.css"

function Button(props) {
    return (

        <button onClick={() =>
            {props.onClick()}
                }>{props.name}
            {props.children}
        </button>
    )
}

export default Button;

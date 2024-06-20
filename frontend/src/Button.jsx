import "./Button.css"

function Button(props) {
    return (
        <button onClick={() =>
            {props.name.includes("Create") ? props.displayForm():props.onClick()}
                }>{props.name}</button>
    )
}

export default Button;

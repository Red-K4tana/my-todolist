
type ButtonPropsType = {
    name: string
    callback: () => void
    style?: string
    classNameSpanButton?: string
    disabled?: boolean
}

export const Button = (props: ButtonPropsType) => {
    return (
        <label className={props.classNameSpanButton}>
            <button className={`${props.style} `}
                    onClick={()=>props.callback()}
            >
                {props.name}
            </button>
            <span></span>
        </label>
    );
};

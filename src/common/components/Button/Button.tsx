import {FC, memo} from "react";

type ButtonProps = {
    name: string
    callback: () => void
    style?: string
    classNameSpanButton?: string
    disabled?: boolean
}

export const Button: FC<ButtonProps> = memo(({
                                               name,
                                               callback,
                                               style,
                                               classNameSpanButton,
                                               disabled,
                                             }) => {
    return (
        <label className={classNameSpanButton}>
            <button className={`${style}`}
                    onClick={()=> callback()}
                    disabled={disabled}
            >
                {name}
            </button>
            <span></span>
        </label>
    );
});

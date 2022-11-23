import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, KeyboardEvent} from 'react';

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
type InputCustomPropsType = DefaultInputPropsType & {
    onChangeText?: (value: string) => void
    onEnter?: () => void
    error?: string

}

export const InputCustom: React.FC<InputCustomPropsType> = ({
                                                                type,
                                                                onChange, onChangeText,
                                                                onKeyPress, onEnter,
                                                                error, value, ...props
                                                            }) => {

    const inputOnChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(event)

        onChangeText &&
        onChangeText(event.currentTarget.value)

    }
    const inputOnKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        onKeyPress && onKeyPress(event)

        onEnter &&
        event.key === 'Enter' &&
        onEnter()
    }
    return (
        <div>
            <input type={"text"}
                   value={value}
                   onChange={inputOnChangeHandler}
                   onKeyPress={inputOnKeyPressHandler}/>
        </div>
    );
};


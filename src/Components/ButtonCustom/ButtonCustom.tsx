import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react';

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
type ButtonCustomPropsType = DefaultButtonPropsType & {
    title?: string
    callBack?: () => void
    callBackTitled?: (title: string) => void
}
export const ButtonCustom: React.FC<ButtonCustomPropsType> = ({
                                                                  title, callBack,
                                                                  callBackTitled, ...props
                                                              }) => {
    const onclickHandler = () => {
        callBack && callBack()

        callBackTitled
        && title
        && callBackTitled(title)
    }
    return (
        <div>
            <button onClick={onclickHandler}>{title}</button>
        </div>
    );
};


import {ChangeEvent, useState} from "react";

type UseFormType = {
    name?: string;
    email?: string;
    password?: string;
    token?: string;
    type?: string;
    icon?: string;
}

export function useForm(inputValues: UseFormType) {
    const [values, setValues] = useState(inputValues);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {value, name} = event.target;
        setValues({...values, [name]: value});
    };
    return {values, handleChange, setValues};
}
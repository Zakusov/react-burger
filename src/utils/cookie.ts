export const getCookie = (name: string) => {
    const matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

type PropsType = {
    path?: string;
    expires?: Date | string | number;
    [propName: string]: any
}

export const setCookie = (name: string, value: string, props?: PropsType) => {
    props = {
        path: '/',
        ...props
    };
    let exp = props.expires;
    if (typeof exp == 'number' && exp) {
        const d = new Date();
        d.setTime(d.getTime() + exp * 1000);
        exp = props.expires = d;
    }
    if (exp instanceof Date) {
        props.expires = exp.toUTCString();
    }

    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
    for (const propName in props) {
        updatedCookie += "; " + propName;
        const propValue = props[propName];
        if (propValue !== true) {
            updatedCookie += "=" + propValue;
        }
    }
    document.cookie = updatedCookie;
}

export const deleteCookie = (name: string) => {
    setCookie(name, '', {expires: -1});
}

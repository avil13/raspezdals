
/**
 *  myCookie('test', 123123) // set cookie
 *  myCookie('test') // get cookie
 *  myCookie('test', false) // delete cookie
 */
export default function myCookie(
    name: string,
    value?: string | number | undefined | boolean
) {
    name = encodeURIComponent(name);

    if (value === undefined) {
        // if value - empty then return cookie
        const results = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
        let res = results ? unescape(results[2]) : 'null';

        try {
            res = JSON.parse(res);
        } catch (e) {
            res += '';
        }

        return res; // возвращаем полученное значение
    }

    let cookie_string = '';

    if (value === false) {
        // delete cookie
        cookie_string = `${name}=''; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/; `;
    } else {
        cookie_string = name + '=' + encodeURIComponent(JSON.stringify(value));
        const expires = new Date();
        expires.setFullYear(expires.getFullYear() + 1);
        cookie_string += '; expires=' + expires.toUTCString(); // toGMTString();
        cookie_string += '; path=/; ';
    }

    document.cookie = cookie_string;
}

import { parseCookies } from "nookies";

export default function checkToken(){
    const cookies = parseCookies();
    const token = cookies['@nextauth.token'];
    return token;
}

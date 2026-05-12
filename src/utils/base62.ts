const CHARSET = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
export function encodeBase62(num: number): string{
    let res = "";
    while(num > 1){
        res = CHARSET[num%62] + res;
        num = Math.floor(num/62);
    }
    return res || "0";    
}
export default class Validate {
    static isEmpty(string) {
        return string === null || string === '' || /^\s*$/.test(string)
    }
}

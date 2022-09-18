declare class Pangu {
    version: string;
    constructor();
    convertToFullwidth(symbols: string): string;
    spacing(text: string): string;
    spacingText(text: string, callback?: () => void): string;
    spacingTextSync(text: string): string;
}
declare const pangu: Pangu;
export default pangu;
export { pangu, Pangu };

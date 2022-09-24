declare class Pangu {
    version: string;
    constructor();
    convertToFullwidth(symbols: string): string;
    spacing(text: string): string;
    spacingText(text: string, callback?: Function): any;
    spacingTextSync(text: string): string;
}
declare const pangu: Pangu;

export { Pangu, pangu as default, pangu };

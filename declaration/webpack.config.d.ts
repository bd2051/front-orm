export const entry: string;
export namespace output {
    const filename: string;
    const path: string;
}
export const mode: string;
export namespace devServer {
    export namespace _static {
        const directory: string;
    }
    export { _static as static };
    export const compress: boolean;
    export const port: number;
}

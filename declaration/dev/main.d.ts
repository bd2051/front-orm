import { EntityManager } from "../src";
declare global {
    interface Window {
        em: EntityManager;
    }
}
declare const em: EntityManager;
export default em;

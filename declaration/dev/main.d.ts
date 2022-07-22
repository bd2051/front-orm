import { EntityManager } from "../src";
declare global {
    interface Window {
        em: EntityManager;
    }
}

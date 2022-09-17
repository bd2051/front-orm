var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export default class Repository {
    constructor(em, model, repositories) {
        this.model = model;
        this.em = em;
        Object.entries(repositories).forEach(([methodName, repository]) => {
            repository.setEntityManager(em);
            this[methodName] = (values) => this._methodsHandler(values, repository);
        });
    }
    _methodsHandler(values, methodRepository) {
        return __awaiter(this, void 0, void 0, function* () {
            return methodRepository.find(values, this.model);
        });
    }
}

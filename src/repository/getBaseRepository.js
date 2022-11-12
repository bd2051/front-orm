var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Collection from "../types/Collection";
export default (em, model) => Object.create({}, {
    $em: {
        writable: false,
        configurable: false,
        enumerable: false,
        value: em
    },
    $model: {
        writable: false,
        configurable: false,
        enumerable: false,
        value: model
    },
    $refreshCollection: {
        writable: false,
        configurable: false,
        enumerable: false,
        value(collection) {
            return __awaiter(this, void 0, void 0, function* () {
                const meta = this.$em.collectionCache.get(collection);
                if (typeof meta === 'undefined') {
                    return;
                }
                const result = yield meta.method(meta.options, this.$model);
                collection.splice(0, collection.length);
                result.forEach((el) => {
                    collection.push(el);
                });
            });
        }
    },
    _methodsHandler: {
        writable: false,
        configurable: false,
        enumerable: false,
        value(values, methodRepository) {
            return __awaiter(this, void 0, void 0, function* () {
                const result = yield methodRepository.find(values, this.$model);
                let data = result;
                if (methodRepository instanceof Collection) {
                    data = this.$em._setReactivity(result);
                    this.$em.collectionCache.set(data, {
                        options: values,
                        method: methodRepository.find,
                        repository: this
                    });
                    this.$em.onAddCollection(this, new WeakRef(data));
                }
                return data;
            });
        }
    }
});

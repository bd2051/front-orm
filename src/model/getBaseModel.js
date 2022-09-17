var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import PrimaryKey from "../fields/PrimaryKey";
export default (em) => Object.create({}, {
    $em: {
        writable: false,
        configurable: false,
        enumerable: false,
        value: em
    },
    _pkName: {
        writable: true,
        configurable: false,
        enumerable: false,
        value: null
    },
    _name: {
        writable: true,
        configurable: false,
        enumerable: false,
        value: null
    },
    $setName: {
        writable: false,
        configurable: false,
        enumerable: false,
        value(val) {
            return Object.defineProperty(this, '_name', {
                writable: false,
                configurable: false,
                enumerable: false,
                value: val
            });
        }
    },
    $getName: {
        writable: false,
        configurable: false,
        enumerable: false,
        value() {
            if (!this._name) {
                throw new Error('Logic error');
            }
            return this._name;
        }
    },
    $getPkName: {
        writable: false,
        configurable: false,
        enumerable: false,
        value() {
            if (this._pkName === null) {
                let pkName = Object.keys(this).find((key) => this[key] instanceof PrimaryKey);
                if (typeof pkName !== 'string') {
                    pkName = Object.keys(Object.getPrototypeOf(this)).find((key) => this[key] instanceof PrimaryKey);
                    if (typeof pkName !== 'string') {
                        throw new Error('Add PrimaryKey');
                    }
                }
                Object.defineProperty(this, '_pkName', {
                    writable: false,
                    configurable: false,
                    enumerable: false,
                    value: pkName
                });
            }
            return this._pkName;
        }
    },
    $get: {
        writable: false,
        configurable: false,
        enumerable: false,
        value(pk) {
            return this.$em.hooks.get(this, pk);
        }
    },
    $create: {
        writable: false,
        configurable: false,
        enumerable: false,
        value(value, commit) {
            return this.$em.hooks.create(this, value, commit);
        }
    },
    $update: {
        writable: false,
        configurable: false,
        enumerable: false,
        value(value, commit) {
            return this.$em.hooks.update(this, value, commit);
        }
    },
    $delete: {
        writable: false,
        configurable: false,
        enumerable: false,
        value(pk, commit) {
            return this.$em.hooks.delete(this, pk, commit);
        }
    },
    $refresh: {
        writable: false,
        configurable: false,
        enumerable: false,
        value(pk) {
            return __awaiter(this, void 0, void 0, function* () {
                const data = yield this.$get(pk);
                const updatedData = this.$em._updateDataByCommits(this, pk, data);
                let model = this;
                if (!(model[model.$getPkName] instanceof PrimaryKey)) {
                    model = Object.getPrototypeOf(this);
                }
                this.$em.setStorageValue(model, pk, updatedData);
            });
        }
    }
});

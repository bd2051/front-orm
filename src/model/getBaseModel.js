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
            return this._name = val;
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
                const pkName = Object.keys(this).find((key) => this[key] instanceof PrimaryKey);
                if (typeof pkName !== 'string') {
                    throw new Error('Add PrimaryKey');
                }
                this._pkName = pkName;
            }
            return this._pkName;
        }
    },
    $getPkField: {
        writable: false,
        configurable: false,
        enumerable: false,
        value() {
            return this[this.getPkName()];
        }
    },
    $getRepository: {
        writable: false,
        configurable: false,
        enumerable: false,
        value() {
            return this.$em.getRepository(this.$getName());
        }
    }
});

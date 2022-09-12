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
                console.log('pkName', pkName);
                if (typeof pkName !== 'string') {
                    pkName = Object.keys(Object.getPrototypeOf(this)).find((key) => this[key] instanceof PrimaryKey);
                    if (typeof pkName !== 'string') {
                        throw new Error('Add PrimaryKey');
                    }
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
    }
});

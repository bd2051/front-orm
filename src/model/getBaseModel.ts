import EntityManager from "../EntityManager";
import PrimaryKey from "../fields/PrimaryKey";
import Repository from "../Repository";
import {BaseModel} from "../types";

export default (em: EntityManager) : BaseModel => Object.create({}, {
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
    value(val: string) {
      return this._name = val
    }
  },
  $getName: {
    writable: false,
    configurable: false,
    enumerable: false,
    value(): string {
      if (!this._name) {
        throw new Error('Logic error')
      }
      return this._name
    }
  },
  $getPkName: {
    writable: false,
    configurable: false,
    enumerable: false,
    value(): string {
      if (this._pkName === null) {
        const pkName = Object.keys(this).find((key) => this[key] instanceof PrimaryKey)
        if (typeof pkName !== 'string') {
          throw new Error('Add PrimaryKey')
        }
        this._pkName = pkName
      }
      return this._pkName
    }
  },
  $getPkField: {
    writable: false,
    configurable: false,
    enumerable: false,
    value(): PrimaryKey {
      return this[this.getPkName()]
    }
  },
  $getRepository: {
    writable: false,
    configurable: false,
    enumerable: false,
    value(): Repository {
      return this.$em.getRepository(this.$getName())
    }
  },
  $create: {
    writable: false,
    configurable: false,
    enumerable: false,
    value(value: any, commit: any) {
      return this.$em.hooks.create(this, value, commit)
    }
  },
  $update: {
    writable: false,
    configurable: false,
    enumerable: false,
    value(value: any, commit: any) {
      return this.$em.hooks.update(this, value, commit)
    }
  }
})
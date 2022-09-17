import EntityManager from "../EntityManager";
import PrimaryKey from "../fields/PrimaryKey";
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
      return Object.defineProperty(this, '_name', {
        writable: false,
        configurable: false,
        enumerable: false,
        value: val
      })
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
        let pkName = Object.keys(this).find((key) => this[key] instanceof PrimaryKey)
        if (typeof pkName !== 'string') {
          pkName = Object.keys(Object.getPrototypeOf(this)).find((key) => this[key] instanceof PrimaryKey)
          if (typeof pkName !== 'string') {
            throw new Error('Add PrimaryKey')
          }
        }
        Object.defineProperty(this, '_pkName', {
          writable: false,
          configurable: false,
          enumerable: false,
          value: pkName
        })
      }
      return this._pkName
    }
  },
  $get: {
    writable: false,
    configurable: false,
    enumerable: false,
    value(pk: number | string) {
      return this.$em.hooks.get(this, pk)
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
  },
  $delete: {
    writable: false,
    configurable: false,
    enumerable: false,
    value(pk: number | string, commit: any) {
      return this.$em.hooks.delete(this, pk, commit)
    }
  }
})
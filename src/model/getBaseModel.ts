import EntityManager from "../EntityManager";
import PrimaryKey from "../fields/PrimaryKey";
import Repository from "../Repository";
import {BaseModel} from "../types";

// interface Fields {
//   [key: string]: any
// }

export default (em: EntityManager) : BaseModel => Object.create(Object, {
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
  // _fields: {
  //   writable: true,
  //   configurable: false,
  //   enumerable: false,
  //   value: null
  // },
  // fields: {
  //   writable: false,
  //   configurable: false,
  //   enumerable: false,
  //   get() : Fields {
  //     if (this._fields === null) {
  //       this._fields = Object.entries(this)
  //         .reduce((acc: Fields, [key]) => {
  //           acc[key] = true
  //           return acc
  //         }, {})
  //     }
  //     return this._fields
  //   }
  // },
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
  // $validateFields: {
  //   writable: false,
  //   configurable: false,
  //   enumerable: false,
  //   value(data: Fields) {
  //     if (!Object.entries(data).every(([key, item]) => {
  //       return this[key].validate(item)
  //     })) {
  //       throw new Error('Invalid fields')
  //     }
  //     return this
  //   }
  // },
  // $convertFields: {
  //   writable: false,
  //   configurable: false,
  //   enumerable: false,
  //   value(data: any) {
  //     return Object.keys(data).reduce((acc: Fields, key) => {
  //       acc[key] = this[key].convert(data, key)
  //       return acc
  //     }, {})
  //   }
  // },
  $getRepository: {
    writable: false,
    configurable: false,
    enumerable: false,
    value(): Repository {
      return this.$em.getRepository(this.$getName())
    }
  }
})
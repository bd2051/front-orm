import { suite, test } from '@testdeck/mocha';
import * as _chai from 'chai';
import {assert, expect} from 'chai';
import {Entity, EntityManager, PrimaryKey, StringField} from "../../src";
import {Model, ModelData, ModelInit, ModelView} from "../../src/types";

_chai.should();

function Story(em: EntityManager): ModelInit {
  return {
    id: new PrimaryKey(em),
    name: new StringField(em),
  }
}

@suite class EntityManagerModuleTest {
  private SUT: EntityManager;
  private model: typeof Story

  before() {
    this.SUT = new EntityManager();
    this.model = Story
  }

  @test 'Em is created' () {
    this.SUT.models.should.to.not.be.undefined
    this.SUT.storage.should.to.not.be.undefined
    this.SUT.repositories.should.to.not.be.undefined
    this.SUT.hooks.should.to.not.be.undefined
  }

  @test 'Set model' () {
    this.SUT.setModel(this.model, {
      findByPk: new Entity(this.SUT, (values) => {
        return values
      })
    })
    expect(this.SUT.models['Story']).should.to.not.be.undefined
    expect(this.SUT.storage['Story']).should.to.not.be.undefined
    expect(this.SUT.repositories['Story']).should.to.not.be.undefined

    expect(this.SUT.getModel('Story')).should.to.not.be.undefined
    expect(this.SUT.getStorageModel('Story')).should.to.not.be.undefined
    expect(this.SUT.getRepository('Story')).should.to.not.be.undefined

    assert.throws(() => this.SUT.getModel('Unknown'))
    assert.throws(() => this.SUT.getStorageModel('Unknown'))
    assert.throws(() => this.SUT.getRepository('Unknown'))
  }

  @test 'create proxy' (done) {
    this.SUT.setModel(this.model, {})
    this.SUT.setHooks({
      async get(model,pk) {
        console.log(model.$getName())
        return new Promise((resolve) => {
          setTimeout(() => resolve({
            id: pk,
            name: 'story'
          }), 0)
        })
      },
      async create(data, value) {
        console.log(data, value)
        return value
      },
      async update(data, value) {
        console.log(data, value)
        return value
      },
      async delete(data, pk) {
        console.log(data, pk)
        return pk
      }
    })


    let proxy;
    try {
      const pk = 1
      proxy = this.SUT._createProxy(
        this.SUT.getModel('Story'),
        pk,
        async (done) => {
          const data = await this.SUT.getModel('Story').$get(pk)
          this.SUT.setStorageValue(this.SUT.getModel('Story'), pk, data)
          done()
        }
      )
    } catch (e) {
      done(e)
    }

    let name = proxy.name
    assert.equal(name, null)
    setTimeout(() => {
      let name = proxy.name
      assert.equal(name, 'story')
      const cacheKey = this.SUT.getStorageModel('Story')[1]!
      assert.exists(cacheKey)
      const cacheValue = this.SUT.storageCache.get(cacheKey)!
      assert.exists(cacheValue)
      assert.equal(cacheValue['name'], 'story')

      done()
    }, 200)
  }

  @test 'create cache proxy and check create, update, delete' (done) {
    this.SUT.setModel(this.model, {
      findByPk: new Entity(this.SUT, (pk) => {
        return {
          id: pk,
          name: 'story'
        }
      }),
      find: new Entity(this.SUT, (pk) => {
        return {
          id: pk,
          name: 'find'
        }
      })
    })
    this.SUT.setHooks({
      async get(data, pk) {
        console.log(data, pk)
        return data
      },
      async create(data, value) {
        assert.equal(data['name'], 'new name')
        assert.equal(value.name, 'new name')
        return new Promise((resolve) => resolve(2))
      },
      async update(data, value) {
        assert.equal(value.name, 'updated name')
        return new Promise((resolve) => resolve(data['id'] as number | string))
      },
      async delete(data, pk) {
        assert.instanceOf(data['id'], PrimaryKey)
        assert.equal(pk, 2)
        return new Promise((resolve) => resolve(pk))
      }
    })
    const test = async () => {
      let proxy;
      try {
        const pk = 1
        const find = this.SUT.getRepository('Story')['find']
        if (typeof find === 'undefined') {
          throw new Error('Logic error')
        }
        proxy = await find(pk)
      } catch (e) {
        done(e)
      }
      return proxy
    }
    test().then(proxy => {
      let name = proxy.name
      assert.equal(name, 'find')

      this.SUT.put({
        name: 'wrong name'
      }, proxy)
      assert.equal(proxy.name, 'wrong name')
      this.SUT.revertAll()
      assert.equal(proxy.name, 'find')
      this.SUT.put({
        name: 'updated name'
      }, proxy)
      assert.equal(proxy.name, 'updated name')
      const newElement = this.SUT.post({
        name: 'new name'
      }, this.SUT.models['Story']!)
      assert.equal(newElement['name'], 'new name')
      this.SUT.flush().then(() => {
        assert.equal(newElement['id'], 2)
        this.SUT.remove(newElement)
        this.SUT.flush().then(() => {
          done()
        })
      })
    }).catch(done)
  }

  @test 'check default hooks' (done) {
    const arr = []
    const preFlushResult = this.SUT.hooks.preFlush(arr)
    assert.equal(preFlushResult, arr)

    const checkError = async (cb, message) => {
      let error = ''
      try {
        await cb()
      } catch (e) {
        assert.equal(e.message, message)
      }
    }

    Promise.all([
      checkError(() => this.SUT.hooks.get({} as Model, 'pk'), 'Add get hook'),
      checkError(() => this.SUT.hooks.create({} as ModelData, {}), 'Add create hook'),
      checkError(() => this.SUT.hooks.update({} as ModelData, {}), 'Add update hook'),
      checkError(() => this.SUT.hooks.delete({} as ModelData, 'pk'), 'Add delete hook'),
    ]).then(() => {
      done()
    })
  }

  @test 'convert value' () {
    const testValue = {
      string: 'string',
      array: [
        {
          _target: 'target'
        } as any as ModelView
      ],
      obj: {
        _target: 'target'
      } as any as ModelView,
    }
    const {string, array, obj} = this.SUT._convertValue(testValue)
    assert.equal(string, 'string')
    const arrElement = array![0]
    assert.equal(arrElement, 'target')
    assert.equal(obj, 'target')
  }

  @test 'check put' () {

  }
}
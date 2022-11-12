import { suite, test } from '@testdeck/mocha';
import * as _chai from 'chai';
import {assert, expect} from 'chai';
import {Entity, EntityManager, PrimaryKey, StringField} from "../../src";
import {ModelInit} from "../../src/types";

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

  @test 'create cache proxy' (done) {
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
      done()
    }).catch(done)
  }
}
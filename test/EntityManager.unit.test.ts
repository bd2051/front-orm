import { suite, test } from '@testdeck/mocha';
import * as _chai from 'chai';
import {assert, expect} from 'chai';
import EntityManager from '../src/EntityManager';
import BaseModel from "../src/model/BaseModel";
import PrimaryKey from "../src/fields/PrimaryKey";
import StringField from "../src/fields/StringField";
import Entity from "../src/types/Entity";

_chai.should();

class Story extends BaseModel {
  id: PrimaryKey
  name: StringField

  constructor(em: EntityManager) {
    super(em);
    this.id = new PrimaryKey(em)
    this.name = new StringField(em)
  }
}

@suite class EntityManagerModuleTest {
  private SUT: EntityManager;
  private model: Story

  before() {
    this.SUT = new EntityManager();
    this.model = new Story(this.SUT)
  }

  @test 'Em is created' () {
    this.SUT.models.should.to.not.be.undefined
    this.SUT.storage.should.to.not.be.undefined
    this.SUT.repositories.should.to.not.be.undefined
    this.SUT.updateList.should.to.not.be.undefined
    this.SUT.createList.should.to.not.be.undefined
    this.SUT.deleteList.should.to.not.be.undefined
    this.SUT.cache.should.to.not.be.undefined
    this.SUT.hooks.should.to.not.be.undefined
  }

  @test 'Set hooks' () {
    this.SUT.setHooks({
      create(value) {return value['result']},
      update(value, oldItem) {return value['result'] + oldItem['result']},
      delete(pk, oldItem) {return pk + oldItem['result']},
      refresh(value, pk) {return value['result'] + pk},
      cancelRefresh(value, pk) {return value['result'] + pk}
    })
    const createResult = this.SUT.hooks.create({result: 'testCreate'})
    const updateResult = this.SUT.hooks.update({result: 'testUpdate'}, {result: ' oldItem'})
    const deleteResult = this.SUT.hooks.delete('testPk', {result: ' testCreate'})
    const refreshResult = this.SUT.hooks.refresh({result: 'testCreate'}, ' testPk')
    const cancelRefreshResult = this.SUT.hooks.cancelRefresh({result: 'testCreate'}, ' testPk')
    expect(createResult).to.be.equal('testCreate')
    expect(updateResult).to.be.equal('testUpdate oldItem')
    expect(deleteResult).to.be.equal('testPk testCreate')
    expect(refreshResult).to.be.equal('testCreate testPk')
    expect(cancelRefreshResult).to.be.equal('testCreate testPk')
  }

  @test 'hooks Error' () {
    assert.throw(() => this.SUT.hooks.create({e: 'error'}))
    assert.throw(() => this.SUT.hooks.update({e: 'error'}, {e: 'error'}))
    assert.throw(() => this.SUT.hooks.delete('err', {e: 'error'}))
    assert.throw(() => this.SUT.hooks.refresh({}, 'err'))
    assert.throw(() => this.SUT.hooks.cancelRefresh({}, 'err'))
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
    expect(this.SUT.updateList['Story']).should.to.not.be.undefined
    expect(this.SUT.createList['Story']).should.to.not.be.undefined
    expect(this.SUT.deleteList['Story']).should.to.not.be.undefined

    expect(this.SUT.getModel('Story')).should.to.not.be.undefined
    expect(this.SUT.getStorageModel('Story')).should.to.not.be.undefined
    expect(this.SUT.getRepository('Story')).should.to.not.be.undefined
    expect(this.SUT.getUpdateListModel('Story')).should.to.not.be.undefined
    expect(this.SUT.getCreateListModel('Story')).should.to.not.be.undefined
    expect(this.SUT.getDeleteListModel('Story')).should.to.not.be.undefined

    assert.throws(() => this.SUT.getModel('Unknown'))
    assert.throws(() => this.SUT.getStorageModel('Unknown'))
    assert.throws(() => this.SUT.getRepository('Unknown'))
    assert.throws(() => this.SUT.getUpdateListModel('Unknown'))
    assert.throws(() => this.SUT.getCreateListModel('Unknown'))
    assert.throws(() => this.SUT.getDeleteListModel('Unknown'))
  }

  @test 'flush error' (done) {
    this.SUT.setModel(this.model, {
      findByPk: new Entity(this.SUT, (values) => {
        return values
      })
    })
    this.SUT.setHooks({
      create() {},
      update() {},
      delete() {},
      refresh() {},
      cancelRefresh() {}
    })

    this.SUT.updateList['Story']![1] = {
      id: 1,
      name: 'Story'
    }

    const testError = async () => {
      let error = {
        message: 'unknown'
      }
      try {
        await this.SUT.flush()
      } catch (e) {
        error = e
      }
      return error
    }

    testError().then((error) => {
      error.message.should.to.be.equal('Logic error')
      done()
    }).catch((e) => {
      done(e)
    })
  }

  @test 'flush' (done) {
    this.SUT.setModel(this.model, {
      findByPk: new Entity(this.SUT, (values) => {
        return values
      })
    })
    this.SUT.setHooks({
      create() {},
      update() {},
      delete() {},
      refresh() {},
      cancelRefresh() {}
    })

    this.SUT.updateList['Story']![1] = {
      id: 1,
      name: 'Story'
    }
    this.SUT.createList['Story']!['uuid'] = {
      name: 'Story'
    }
    this.SUT.deleteList['Story']![1] = {
      id: 1,
      name: 'Story'
    }
    this.SUT.storage['Story']![1] = {
      id: 1,
      name: 'Story'
    }

    const test = async () => {
      let error = {
        message: 'unknown'
      }
      try {
        await this.SUT.flush()
      } catch (e) {
        error = e
      }
      return this.SUT
    }

    test().then((em) => {
      assert.isUndefined(em.updateList['Story']![1])
      assert.isUndefined(em.createList['Story']![1])
      assert.isUndefined(em.deleteList['Story']![1])
      done()
    }).catch((e) => {
      done(e)
    })
  }

  @test 'create proxy' (done) {
    this.SUT.setModel(this.model, {
      findByPk: new Entity(this.SUT, (pk) => {
        return {
          id: pk,
          name: 'story'
        }
      })
    })
    this.SUT.setHooks({
      create() {},
      update() {},
      delete() {},
      refresh() {},
      cancelRefresh() {}
    })

    const test = async () => {
      let proxy;
      try {
        const pk = 1
        proxy = await this.SUT._createProxy(
          this.SUT.getModel('Story'),
          this.SUT.getModel('Story'),
          pk,
          () => {
            const result = this.SUT.getRepository('Story').methodsCb.findByPk(pk)
            this.SUT.getStorageModel('Story')[pk]  = result
            return result
          }
        )
      } catch (e) {
        done(e)
      }
      return proxy
    }

    test().then(async (proxy) => {
      let name = await proxy.name
      assert.equal(name, 'story')
      assert.exists(this.SUT.getStorageModel('Story')[1])
      assert.equal(this.SUT.getStorageModel('Story')[1]!['name'], 'story')
      proxy.name = 'New story'
      name = await proxy.name
      assert.equal(name, 'New story')
      assert.exists(this.SUT.getUpdateListModel('Story')[1])
      assert.equal(this.SUT.getStorageModel('Story')[1]!['name'], 'story')
      assert.equal(this.SUT.getUpdateListModel('Story')[1]!['name'], 'New story')
      proxy.name = 'Last story'
      name = await proxy.name
      assert.equal(name, 'Last story')
      let id = await proxy.id
      assert.equal(id, 1)
      const cancelUpdate = await proxy.cancelUpdate
      cancelUpdate()
      name = await proxy.name
      assert.equal(name, 'story')
      proxy.author = 'Author unknown'

      this.SUT.getCreateListModel('Story')[1] = {
        id: 1,
        name: 'creating'
      }
      name = await proxy.name
      assert.equal(name, 'creating')
      await proxy.cancelCreate.then(cb => cb())
      name = await proxy.name
      assert.equal(name, 'story')

      proxy.cancelDelete.then(cb => cb())
      proxy.cancelRefresh.then(cb => cb())

      done()
    }).catch((e) => {
      done(e)
    })
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
      create() {},
      update() {},
      delete() {},
      refresh() {},
      cancelRefresh() {}
    })
    const test = async () => {
      let proxy;
      try {
        const pk = 1
        const find = this.SUT.getRepository('Story')['find']
        if (typeof find !== 'function') {
          throw new Error('Logic error')
        }
        proxy = await find(pk)
      } catch (e) {
        done(e)
      }
      return proxy
    }
    test().then(async proxy => {
      let name = await proxy.name
      assert.equal(name, 'find')

      Object.keys(this.SUT.cache).forEach(key => {
        delete this.SUT.cache[key]
      })

      name = await proxy.name
      assert.equal(name, 'find')
      done()
    }).catch(done)
  }
}
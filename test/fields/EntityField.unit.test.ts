import { suite, test } from '@testdeck/mocha';
import * as _chai from 'chai';
import {assert, expect} from 'chai';
import {EntityManager, EntityField, BaseModel, PrimaryKey, StringField, Entity} from '../../src';

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

@suite class EntityFieldModuleTest {
  private SUT: EntityField
  protected model: Story
  protected em: EntityManager

  before() {
    this.em = new EntityManager()
    this.em.setHooks({
      create() {},
      update() {},
      delete() {},
      refresh() {},
      cancelRefresh() {}
    })
    this.model = new Story(this.em)
    this.em.setModel(this.model, {
      findByPk: new Entity(this.em, (pk) => {
        return {
          id: pk,
          name: 'story'
        }
      }),
    })
    this.SUT = new EntityField(this.em, 'Story', (value) => value.id)
  }

  @test 'validate' () {
    expect(this.SUT.validate(null)).to.be.true
    expect(this.SUT.validate(111)).to.be.true
  }

  @test 'convert' (done) {
    expect(this.SUT.convert(null)).to.be.equal(null)
    const proxy = this.SUT.convert({id: 1})
    const name = proxy.name
    assert.equal(name, null)
    setTimeout(() => {
      const name = proxy.name
      assert.equal(name, 'story')
      done()
    }, 200)
  }

  @test 'convert default' (done) {
    const defaultSUT = new EntityField(this.em, 'Story')
    expect(defaultSUT.convert(null)).to.be.equal(null)
    const proxy = defaultSUT.convert( 1)
    const name = proxy.name
    assert.equal(name, null)
    setTimeout(() => {
      const name = proxy.name
      assert.equal(name, 'story')
      done()
    }, 200)
  }
}

import { suite, test } from '@testdeck/mocha';
import * as _chai from 'chai';
import {assert, expect} from 'chai';
import {EntityManager, EntityField, PrimaryKey, StringField, Entity, getBaseModel} from '../../../src';
import {ModelInit} from "../../../src/types";

_chai.should();

function Story(em: EntityManager): ModelInit {
  return {
    id: new PrimaryKey(em),
    name: new StringField(em),
  }
}

@suite class EntityFieldModuleTest {
  private SUT: EntityField
  protected model: typeof Story
  protected em: EntityManager

  before() {
    this.em = new EntityManager()
    this.em.setHooks({})
    this.em.setModel(Story, {
      findByPk: new Entity(this.em, (pk) => {
        return {
          id: pk,
          name: 'story'
        }
      }),
    })
    this.SUT = new EntityField(this.em, 'Story', (value) => value.id)
  }

  @test 'view' () {
    const modelData = this.em.setStorageValue(this.em.getModel('Story'), 1, {
      id: 1,
      name: 'name'
    })
    const modelView = this.SUT.view(modelData)
    const name = modelView['name']
    expect(name).to.be.equal('name')
  }

  @test 'link' () {
    const modelData = this.em.setStorageValue(this.em.getModel('Story'), 1, {
      id: 1,
      name: 'name'
    })
    expect(this.SUT.link(modelData)['name']).to.be.equal(modelData['name'])
  }
}

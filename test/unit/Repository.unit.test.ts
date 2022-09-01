import { suite, test } from '@testdeck/mocha';
import * as _chai from 'chai';
import {assert, expect} from 'chai';
import {BaseModel, Entity, EntityManager, PrimaryKey, Repository, StringField} from "../../src";

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

@suite class RepositoryModuleTest {
  private SUT: Repository
  protected model: Story
  protected em: EntityManager


  before() {
    this.em = new EntityManager()
    this.em.setHooks({
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
      find: new Entity(this.em, (pk) => {
        return {
          id: pk,
          name: 'find'
        }
      })
    })
    this.SUT = this.model.getRepository()
  }

  @test 'Repository is created' () {
    this.SUT.model.should.to.not.be.undefined
    this.SUT.em.should.to.not.be.undefined
    this.SUT.methodsCb.should.to.not.be.undefined
    this.SUT.methodsCb['findByPk']!.should.to.not.be.undefined
    this.SUT.methodsCb['find']!.should.to.not.be.undefined
    this.SUT['findByPk']!.should.to.not.be.undefined
    this.SUT['find']!.should.to.not.be.undefined

    const rep = new Repository(this.em, this.model, {})
    const findByPk = rep.methodsCb['findByPk']
    expect(findByPk('value')).to.be.equal('value')
  }
}
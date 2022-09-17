import { suite, test } from '@testdeck/mocha';
import * as _chai from 'chai';
import {assert, expect} from 'chai';
import {Entity, EntityManager, PrimaryKey, Repository, StringField} from "../../src";
import {Model, ModelInit} from "../../src/types";
import {mode} from "../../declaration/webpack.config";

_chai.should();

function Story(em: EntityManager): ModelInit {
  return {
    id: new PrimaryKey(em),
    name: new StringField(em),
  }
}

@suite class RepositoryModuleTest {
  private SUT: Repository
  protected model: Model
  protected em: EntityManager


  before() {
    this.em = new EntityManager()
    this.em.setHooks({
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

    this.em.setModel(Story, {
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
    this.model = this.em.getModel(Story.name)
    this.SUT = this.em.getRepository(this.model.$getName())
  }

  @test 'Repository is created' () {
    this.SUT.model.should.to.not.be.undefined
    this.SUT.em.should.to.not.be.undefined
    this.SUT['findByPk']!.should.to.not.be.undefined
    this.SUT['find']!.should.to.not.be.undefined
  }
}
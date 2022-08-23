import { suite, test } from '@testdeck/mocha';
import * as _chai from 'chai';
import {assert, expect} from 'chai';
import {BaseModel, Collection, EntityManager} from "../../../src";

_chai.should();

@suite class CollectionModuleTest {
  private SUT: Collection
  protected em: EntityManager


  before() {
    this.em = new EntityManager()
    this.em.storage['BaseModel'] = {}
    this.SUT = new Collection(this.em, () => ({}))
  }

  @test 'convertResult' () {
    expect(typeof (this.SUT.convertResult([], new BaseModel(this.em)))).to.be.equal('object')
  }
}

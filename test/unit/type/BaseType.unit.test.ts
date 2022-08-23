import { suite, test } from '@testdeck/mocha';
import * as _chai from 'chai';
import {assert, expect} from 'chai';
import {BaseModel, BaseType, EntityManager} from "../../../src";

_chai.should();

@suite class BaseTypeModuleTest {
  private SUT: BaseType
  protected em: EntityManager


  before() {
    this.em = new EntityManager()
    this.SUT = new BaseType(this.em, () => ({}))
  }

  @test 'convertResult' () {
    expect(typeof (this.SUT.convertResult({}, new BaseModel(this.em)))).to.be.equal('object')
  }
}

import { suite, test } from '@testdeck/mocha';
import * as _chai from 'chai';
import {assert, expect} from 'chai';
import {BaseField, EntityManager} from "../../src";

_chai.should();

@suite class BaseFieldModuleTest {
  private SUT: BaseField
  protected em: EntityManager


  before() {
    this.em = new EntityManager()
    this.SUT = new BaseField(this.em)
  }

  @test 'validate' () {
    expect(this.SUT.validate('value')).to.be.true
  }
}

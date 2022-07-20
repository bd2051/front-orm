import { suite, test } from '@testdeck/mocha';
import * as _chai from 'chai';
import {assert, expect} from 'chai';
import {EntityManager, NumberField} from '../../src';

_chai.should();

@suite class NumberFieldModuleTest {
  private SUT: NumberField
  protected em: EntityManager


  before() {
    this.em = new EntityManager()
    this.SUT = new NumberField(this.em)
  }

  @test 'validate' () {
    expect(this.SUT.validate(null)).to.be.false
    expect(this.SUT.validate(111)).to.be.true
  }
}

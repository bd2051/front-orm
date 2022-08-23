import { suite, test } from '@testdeck/mocha';
import * as _chai from 'chai';
import {assert, expect} from 'chai';
import {BooleanField, EntityManager } from '../../../src';

_chai.should();

@suite class BooleanFieldModuleTest {
  private SUT: BooleanField
  protected em: EntityManager


  before() {
    this.em = new EntityManager()
    this.SUT = new BooleanField(this.em)
  }

  @test 'validate' () {
    expect(this.SUT.validate(null)).to.be.false
    expect(this.SUT.validate(true)).to.be.true
    expect(this.SUT.validate(false)).to.be.true
  }
}

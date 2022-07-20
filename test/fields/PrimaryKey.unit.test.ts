import { suite, test } from '@testdeck/mocha';
import * as _chai from 'chai';
import {assert, expect} from 'chai';
import EntityManager from "../../src/EntityManager";
import PrimaryKey from "../../src/fields/PrimaryKey";

_chai.should();

@suite class PrimaryKeyModuleTest {
  private SUT: PrimaryKey
  protected em: EntityManager


  before() {
    this.em = new EntityManager()
    this.SUT = new PrimaryKey(this.em)
  }

  @test 'validate' () {
    expect(this.SUT.validate(null)).to.be.false
    expect(this.SUT.validate(1)).to.be.true
  }
}

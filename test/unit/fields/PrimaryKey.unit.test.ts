import { suite, test } from '@testdeck/mocha';
import * as _chai from 'chai';
import {assert, expect} from 'chai';
import {EntityManager, getBaseModel, PrimaryKey} from '../../../src';

_chai.should();

@suite class PrimaryKeyModuleTest {
  private SUT: PrimaryKey
  protected em: EntityManager


  before() {
    this.em = new EntityManager()
    this.SUT = new PrimaryKey(this.em)
  }

  @test 'view' () {
    const modelData = Object.create(getBaseModel(this.em))
    expect(this.SUT.view(modelData)).to.be.equal(modelData)
  }

  @test 'link' () {
    const modelData = Object.create(getBaseModel(this.em))
    expect(this.SUT.link(modelData)).to.be.equal(modelData)
  }
}

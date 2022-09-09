import { suite, test } from '@testdeck/mocha';
import * as _chai from 'chai';
import {assert, expect} from 'chai';
import {BooleanField, EntityManager, getBaseModel} from '../../../src';

_chai.should();

@suite class BooleanFieldModuleTest {
  private SUT: BooleanField
  protected em: EntityManager


  before() {
    this.em = new EntityManager()
    this.SUT = new BooleanField(this.em)
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

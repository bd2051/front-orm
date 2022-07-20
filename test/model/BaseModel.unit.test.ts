import { suite, test } from '@testdeck/mocha';
import * as _chai from 'chai';
import {assert, expect} from 'chai';
import {BaseModel, EntityManager, PrimaryKey, StringField} from "../../src";

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


@suite class BaseModelModuleTest {
  private SUT: BaseModel
  protected em: EntityManager
  protected model: Story


  before() {
    this.em = new EntityManager()
    this.model = new Story(this.em)
    this.SUT = new BaseModel(this.em)
  }

  @test 'primary key error' () {
    assert.throw(this.SUT.getPkName.bind(this.SUT), 'Add PrimaryKey')
  }

  @test 'validateFields error' () {
    const values = {id: 'qwe', name: 123}
    assert.throw(this.model.validateFields.bind(this.model, values), 'invalid fields')
  }

  @test 'validateFields' () {
    const values = {id: 1, name: 'qwe', author: 10}
    const result = this.model.validateFields(values)
    assert.equal(result, this.model)
  }
}

import { suite, test } from '@testdeck/mocha';
import * as _chai from 'chai';
import {assert, expect} from 'chai';
import {EntityManager} from "../../src";
import em from "../../dev/main";
import { RequestInfo, RequestInit } from 'node-fetch';

const fetch = (url: RequestInfo, init?: RequestInit) => import('node-fetch').then(({ default: fetch }) => fetch(url, init));
(<any>global).fetch = fetch;

_chai.should();

@suite class EntityManagerFunctionalTest {
  private SUT: EntityManager;
  private findAuthor: (value: any) => any

  before() {
    this.SUT = em;
    const author = this.SUT.repositories['Author'];
    if (typeof author === 'undefined') {
      throw new Error('Model Author dont add');
    }
    const findAuthor = author['find'];
    if (typeof findAuthor !== 'function') {
      throw new Error('method find missing');
    }

    this.findAuthor = findAuthor
  }

  @test 'Em is created' () {
    this.SUT.models.should.to.not.be.undefined
    this.SUT.storage.should.to.not.be.undefined
    this.SUT.repositories.should.to.not.be.undefined
    this.SUT.updateList.should.to.not.be.undefined
    this.SUT.createList.should.to.not.be.undefined
    this.SUT.deleteList.should.to.not.be.undefined
    this.SUT.cache.should.to.not.be.undefined
    this.SUT.hooks.should.to.not.be.undefined
  }

  @test 'check collection' (done) {
    const test = async () => {
      try {
        const author = await this.findAuthor(10)
        expect(author.stories).to.be.length(2)
        expect(author.stories[0].name).to.be.null
        author.stories.push(6)
        expect(author.stories[2].name).to.be.null
        setTimeout(() => {
          expect(author.stories[0].name).to.be.equal('Excellent story')
          expect(author.stories[2].name).to.be.equal('Great story')
          done()
        }, 500)
      } catch (e) {
        done(e)
      }
    }
    test();
  }

}
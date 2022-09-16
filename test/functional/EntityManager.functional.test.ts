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
  private findStory: (value: any) => any
  private checkingId: number

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

    const story = this.SUT.repositories['Story'];
    if (typeof story === 'undefined') {
      throw new Error('Model Author dont add');
    }
    const findStory = story['find'];
    if (typeof findStory !== 'function') {
      throw new Error('method find missing');
    }

    this.findStory = findStory
  }

  @test 'Em is created' () {
    this.SUT.models.should.to.not.be.undefined
    this.SUT.storage.should.to.not.be.undefined
    this.SUT.repositories.should.to.not.be.undefined
    this.SUT.cache.should.to.not.be.undefined
    this.SUT.hooks.should.to.not.be.undefined
  }

  @test 'check collection' (done) {
    const test = async () => {
      try {
        const author = await this.findAuthor(10)
        expect(author.stories).to.be.length(2)
        expect(author.stories[0].name).to.be.null
        setTimeout(() => {
          expect(author.stories[0].name).to.be.equal('Excellent story')
          done()
        }, 500)
      } catch (e) {
        done(e)
      }
    }
    test();
  }

  @test 'check put' (done) {
    const test = async () => {
      try {
        const author = await this.findAuthor(10)
        expect(author.name).to.be.equal('John Doe')
        const storyNew = this.SUT.put({
            name: '123 Story',
            author: author
        }, this.SUT.models['Story']!)
        this.SUT.put({
          age: 50
        }, author)
        this.SUT.put({
            stories: [...author.stories, storyNew]
        }, author)
        expect(author.age).to.be.equal(50)
        expect(author.stories[2].name).to.be.equal('123 Story')
        await this.SUT.flush()
        done()
      } catch (e) {
        done(e)
      }
    }
    test();
  }

  @test 'check post' (done) {
    const test = async () => {
      try {
        const story = await this.findStory(6)
        expect(story.name).to.be.equal('Great story')
        const authorNew = this.SUT.put({
            name: 'Name',
            age: 27,
            stories: [story]
        }, this.SUT.models['Author']!)
        expect(authorNew!['stories'][0].name).to.be.equal('Great story')
        expect(authorNew!['name']).to.be.equal('Name')
        await this.SUT.flush()
        done()
      } catch (e) {
        done(e)
      }
    }
    test();
  }

  @test 'check flush' (done) {
    const test = async () => {
      try {
        const storyNew = this.SUT.put({
            name: 'qwe Story',
            author: null
        }, this.SUT.models['Story']!)
        expect(storyNew['name']).to.be.equal('qwe Story')
        await this.SUT.flush()
        setTimeout(() => {
          this.checkingId = storyNew['id']
          expect(typeof this.checkingId).to.be.equal('number')
          const cacheKey = this.SUT.reverseStorageCache.get(storyNew._target)!.deref()
          if (typeof cacheKey === 'undefined') {
            throw new Error('Logic error')
          }
          expect(cacheKey.pk).to.be.equal(this.checkingId)
          expect(this.SUT.commits.length).to.be.equal(0)
          done()
        }, 200)
      } catch (e) {
        done(e)
      }
    }
    test();
  }
}
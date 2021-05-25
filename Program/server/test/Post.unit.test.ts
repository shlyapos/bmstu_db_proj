import { PostRepository } from '../src/repository/Post'
import { ArrayStorage } from '../src/storage/ArrayStorage'

import { suite, test } from '@testdeck/mocha';
import * as _chai from 'chai';
import { expect } from 'chai';
import * as _chaiAsPromised from 'chai-as-promised'

import * as fs from 'fs';
import * as path from 'path';

_chai.expect;
_chai.should();
_chai.use(_chaiAsPromised);

@suite class PostRepositoryTest {
    private SUT: PostRepository;
    private testData: any;
    private testCUD: any;

    before() {
        this.SUT = new PostRepository(new ArrayStorage());
        this.testCUD = {
            id: 5,
            authorId: 123,
            rating: 456,
            publicDate: '21-07-2013'
        };

        let testPath = path.join(__dirname, '/testconfig.json');
        this.testData = JSON.parse(fs.readFileSync(testPath, 'utf-8')).Post;

        for (let row of this.testData) {
            this.SUT.create(row);
        }
    }

    @test '"Take all"'() {
        return expect(this.SUT.takeAll()).to.eventually.eql(this.testData);
    }

    @test '"Take all" with empty data base'() {
        for (let i = 1; i < 5; i++) {
            this.SUT.delete(i).should.notify(done);
        }

        return expect(this.SUT.takeAll()).to.eventually.rejectedWith('Table is empty');
    }

    @test '"Take by id" with existing record'() {
        return expect(this.SUT.takeById(4)).to.eventually.fulfilled;
    }

    @test '"Take by id" with non-existing record'() {
        return expect(this.SUT.takeById(10)).to.eventually.rejectedWith('Record with id: 10 not exist');
    }

    @test '"Create" with correct data'() {
        this.SUT.create(this.testCUD).should.notify(done);
        return expect(this.SUT.takeById(5)).to.eventually.eql(this.testCUD);
    }

    @test '"Update" existing record'() {
        this.testCUD.id = 4;

        this.SUT.update(4, this.testCUD).should.notify(done);
        return expect(this.SUT.takeById(4)).to.eventually.eql(this.testCUD);
    }

    @test '"Update" non-existing record'() {
        return expect(this.SUT.update(10, this.testCUD)).to.eventually.rejectedWith('Record with id: 10 not exist');
    }

    @test '"Delete" existing record'() {
        this.SUT.delete(3).should.notify(done);
        return expect(this.SUT.takeById(3)).to.eventually.rejectedWith('Record with id: 3 not exist');
    }

    @test '"Delete" non-existing record'() {
        return expect(this.SUT.delete(10)).to.eventually.rejectedWith('Record with id: 10 not exist');
    }
};

function done(done: any) {
    throw new Error('Function not implemented.');
}
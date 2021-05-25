import { AccountRepository } from '../src/repository/Account'
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

@suite class AccountRepositoryTest {
    private SUT: AccountRepository;
    private testData: any;
    private testCUD: any;

    before() {
        this.SUT = new AccountRepository(new ArrayStorage());
        this.testCUD = {
            id: 5,
            name: 'Floppa',
            login: 'floppa',
            email: 'flopp@yandex.ru',
            avatar: 'src/img/catava.png',
            salt: 'djhsaj',
            hash: 'uh1piu1p2iuhdb8'
        };

        let testPath = path.join(__dirname, '/testconfig.json');
        this.testData = JSON.parse(fs.readFileSync(testPath, 'utf-8')).Account;

        for (let row of this.testData) {
            this.SUT.create(row);
        }
    }

    @test async '"Take all"'() {
        return expect(this.SUT.takeAll()).to.eventually.eql(this.testData);
    }

    @test async '"Take all" with empty data base'() {
        for (let i = 1; i < 5; i++) {
            await this.SUT.delete(i).should.notify(done);
        }

        return expect(this.SUT.takeAll()).to.eventually.rejectedWith('Table is empty');
    }

    @test async '"Take by id" with existing record'() {
        return expect(this.SUT.takeById(4)).to.eventually.fulfilled;
    }

    @test async '"Take by id" with non-existing record'() {
        return expect(this.SUT.takeById(10)).to.eventually.rejectedWith('Record with id: 10 not exist');
    }

    @test async '"Create" with correct data'() {
        await this.SUT.create(this.testCUD).should.notify(done);
        return expect(this.SUT.takeById(5)).to.eventually.eql(this.testCUD);
    }

    @test async '"Update" existing record'() {
        this.testCUD.id = 4;

        await this.SUT.update(4, this.testCUD).should.notify(done);
        return expect(this.SUT.takeById(4)).to.eventually.eql(this.testCUD);
    }

    @test async '"Update" non-existing record'() {
        return expect(this.SUT.update(10, this.testCUD)).to.eventually.rejectedWith('Record with id: 10 not exist');
    }

    @test async '"Delete" existing record'() {
        await this.SUT.delete(3).should.notify(done);
        return expect(this.SUT.takeById(3)).to.eventually.rejectedWith('Record with id: 3 not exist');
    }

    @test async '"Delete" non-existing record'() {
        return expect(this.SUT.delete(10)).to.eventually.rejectedWith('Record with id: 10 not exist');
    }
};

function done(done: any) {
    throw new Error('Function not implemented.');
}

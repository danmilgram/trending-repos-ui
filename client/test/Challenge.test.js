const Challenge = artifacts.require('Challenge');

let instance;

beforeEach(async () => {
    instance = await Challenge.new();
});

contract('Challenge', accounts => {
    it('should return storage pointer for address', async () => {
        let pointer = await instance.getValue(accounts[0]);
        assert(pointer != null);
    });

});
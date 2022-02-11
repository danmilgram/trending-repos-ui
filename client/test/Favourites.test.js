const Favourites = artifacts.require('Favourites');

let instance;

beforeEach(async () => {
    instance = await Favourites.new();
});

contract('Favourites', accounts => {
    it('should return array empty when no favourites', async () => {
        let favourites = await instance.getUserFavourites();
        assert(favourites.length == 0);
    });

    it('should allow users to set and get favourites', async () => {

        let favId = 1;
        await instance.setFavorite(favId, { from: accounts[0]});
        let favourites = await instance.getUserFavourites();

        assert(favourites.length > 0);
        assert(favourites[0] == favId);
    });

    it('should allow users to unset favourites', async () => {

        let favId = 1;
        await instance.setFavorite(favId, { from: accounts[0]});
        let favourites = await instance.getUserFavourites();
        await instance.unsetFavorite(favId, { from: accounts[0]});
        let favourites_modified = await instance.getUserFavourites();

        assert(favourites[0] == favId);
        assert(favourites_modified[0] == 0 )
        assert(favourites_modified != favourites);
        
    });

});
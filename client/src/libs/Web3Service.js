import Web3 from 'web3'

class Web3Service {

    constructor() {
        this.web3inst = null; // store the web3 instace
        this.contractInst = null; // store the smart contract instance

        // general info about connection and user information
        this.info = {
            isConnected: false,
        };
    };

    /**
     * Initialize the Web3 instance.
     *
     * @param {string} addressUrl Provider address URL like http://127.0.0.1:7545
     * @return {Promise}
     */
    init(addressUrl) {
        return new Promise((resolve, reject) => {
            // checking if the provider is already set by mist or metamask
            if (window.ethereum) {
                window.web3 = new Web3(ethereum);

                try {
                    // Request account access if needed
                    window.ethereum.request({ method: 'eth_requestAccounts' })
                    .then(() => {
                        this.setWeb3(window.web3, addressUrl);

                        resolve(window.web3);
                    })
                    .catch(error => reject(error));
                } catch (error) {
                    reject(error);
                }
            } else {
                if (typeof web3 !== 'undefined') {
                    var web3js = new Web3(web3.currentProvider);
                } else {
                    if (typeof addressUrl == 'undefined') {
                        reject( new Error('BcExplorer error: impossible to connect.') );
                    }

                    // set the provider you want from Web3.providers
                    var provider = new Web3.providers.HttpProvider(addressUrl);

                    try {
                        var web3js = new Web3(provider);
                    } catch (e) {
                        // this is in case metamask/mist is off and avoid the exception web3 is not instatiated
                        var web3js = new Web3(provider);
                    }
                }

                this.setWeb3(web3js, addressUrl);
                resolve(web3js);
            }
        })
    }

    /**
     * Set the Web3 instance and general information.
     *
     * @param {Object} web3js web3 instance
     * @param {string} addressUrl Provider address URL like http://127.0.0.1:7545
     * @return {void}
     */
    setWeb3(web3js, addressUrl) {
        this.info.addressUrl = addressUrl;
        this.info.isConnected = web3js.isConnected(); // setting the connection
        this.web3inst = web3js;
    }

    /**
     * Initialize Web3 and a smart contract.
     * The compiledJson parameter is the JSON of the smart contract settings
     * that you can find in the folder /build/contracts/YourContract.json after
     * the migration.
     *
     * @param {Object} compiledJson
     * @param {string} addressUrl
     * @param {string} contractName contract name (required if you are initializing more then one contract)
     * @return {Promise}
     */
    initWithContractJson(compiledJson, addressUrl, contractName, networkId) {
        return new Promise((resolve, reject) => {
            this.init(addressUrl)
            .then(() => resolve( this.performInitContractJson(networkId, compiledJson, contractName)))
            .catch(error => reject(error));
        });
    }

    /**
     * Return the web3 instance.
     * If there is mist/metamask running on the client browser then it will
     * return the global web3 instance. Otherwise it return the local web3 instance.
     *
     * @return {object}
     */
    web3() {
        if (typeof web3 !== 'undefined') return web3;
        else if (typeof window.web3 !== 'undefined') return window.web3;

        if (this.web3inst) return this.web3inst;

        console.error('BcExplorer error: Web3 is not initialized.');
    }


    /**
     * Initialize the smart contract.
     *
     * @param {number} networkId
     * @param {object} compiledJson Truffle compiled JSON after the migration of the smart contract (file you find in /build/contract after smart contract migration)
     * @return boolean
     */
    performInitContractJson(networkId, compiledJson, contractName) {
        if (typeof compiledJson['abi'] == undefined) {
            console.error('BcExplorer error: missing ABI in the compiled Truffle JSON.');
            return false;
        }

        var abiArray = compiledJson['abi'];

        if (
            (typeof compiledJson['networks'] == undefined) ||
            (compiledJson['networks'][networkId] == undefined)
        ) {
            console.error('BcExplorer error: missing networkId in the compiled Truffle JSON.');

            return false;
        }

        var contractAddr = compiledJson['networks'][networkId].address;

        if (!this.web3().isAddress(contractAddr)) return false;

        this.initContract(abiArray, contractAddr, contractName);
    }



    /**
     * Initialize the smart contract.
     *
     * @param {object} abiArray ABI of the smart contract
     * @param {string} contractAddr Smart contract address
     * @param {string} contractName contract name (required if you are initializing more then one contract)
     * @return {void}
     */
    initContract(abiArray, contractAddr, contractName)
    {
        this.contractInst = this.web3().eth.contract(abiArray).at(contractAddr);
       
    }

    getUserFavourites() {
        return new Promise((resolve, reject) => {
            this.getMainAccount()
            .then(account => {
                console.log(account)
                this.contractInst.getUserFavorites({ from: account }, (error, res) => {
                    if (error) reject(error);
                    
                    resolve(res);
                    
                    //Convert BigInt to string
                    for (let i = 0; i < res.length; i++) {
                        res[i] = res[i].toString();
                      }
                });
            })
            .catch(error => reject(error));
        });
    }


    setFavourite(id) {
        return new Promise((resolve, reject) => {
            this.getMainAccount()
            .then(account => {
                console.log(account)
                this.contractInst.setFavorite(id , { from: account }, (error, res) => {
                    if (error) reject(error);

                    resolve(res);
                });
            })
            .catch(error => reject(error));
        });
    }

    /**
     * Return the selected wallet address.
     *
     * @return {Promise}
     */
    getMainAccount() {
        return new Promise((resolve, reject) => {
            if (this.info.mainAccount) resolve(this.info.mainAccount);

            this.web3().eth.getAccounts((error, accounts) => {
                if (error) {
                   reject(new Error('BcExplorer error: accounts not available.'))
                } else {
                    this.info.mainAccount = accounts[0];

                    resolve(accounts[0]);
                }
            });
        });
    }
}

export default Web3Service;

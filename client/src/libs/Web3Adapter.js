import Web3Service from './Web3Service'
import ChallengeContract from '../../build/contracts/Challenge.json';

export default {
    data() {
        return {}
    },

    created() {
        this.init();
    },

    methods: {
        /**
         * Initialize the BcExplore object (this means the connection with the
         * blockchin and initialise the contract).
         *
         * @return {void}
         */
        init() {
            // when this file is imported to other component it checks if the BcExplorer
            // is instatiated.
            if (window.w3 == undefined) {
                window.w3 = new Web3Service;

                // connecting to the blockchain and intializing the Users smart contract
                window.w3.initWithContractJson(ChallengeContract, 'http://127.0.0.1:7545', 'Challenge', 5777)
            } 
        }
    }
}

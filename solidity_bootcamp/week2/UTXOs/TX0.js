class TXO {
    constructor(owner, amount) {
        this.amount = amount 
        this.owner = owner
        this.spent = false
    }
    spend() {
        this.spent = true
    }
}

module.exports = TXO;

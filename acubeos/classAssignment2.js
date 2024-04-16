class Transaction {
	constructor(type, amount) {
		this._type = type
		this._amount = amount
		this._timestamp = new Date()
	}

	get type() {
		return this._type
	}

	get amount() {
		return this._amount
	}

	get timestamp() {
		return this._timestamp
	}
}

class BankAccount {
	constructor(
		accountNumber,
		firstName,
		lastName,
		initialBalance = 0,
		dailyWithdrawalLimit = Infinity
	) {
		this._accountNumber = accountNumber
		this._firstName = firstName
		this._lastName = lastName
		this._balance = initialBalance
		this._transactions = []
		this._dailyWithdrawalLimit = dailyWithdrawalLimit
	}

	get accountNumber() {
		return this._accountNumber
	}

	get firstName() {
		return this._firstName
	}

	get lastName() {
		return this._lastName
	}

	get accountHolder() {
		return `${this._firstName} ${this._lastName}`
	}

	get balance() {
		return `Your balance is :$${this._balance}`
	}

	get transactions() {
		return this._transactions.map((transaction) => ({
			type: transaction.type,
			amount: transaction.amount,
			timestamp: transaction.timestamp,
		}))
	}

	get dailyWithdrawalLimit() {
		return this._dailyWithdrawalLimit
	}
	set dailyWithdrawalLimit(newLimit) {
		this._dailyWithdrawalLimit = newLimit
	}

	// Method to deposit money
	deposit(amount) {
		if (amount <= 0) {
			throw new Error("Deposit amount must be positive.")
		}
		this._balance += amount
		this._transactions.push(new Transaction("Deposit", amount))
	}

	// Method to withdraw money
	withdraw(amount) {
		if (amount <= 0) {
			throw new Error("Withdrawal amount must be positive.")
		}
		if (amount > this._balance) {
			throw new Error("Insufficient funds.")
		}
		if (amount > this._dailyWithdrawalLimit) {
			console.log("Exceeds daily withdrawal limit")
			return
		}
		this._balance -= amount
		this._transactions.push(new Transaction("Withdrawal", amount))
	}

	// Method to transfer money to another account
	transfer(amount, recipientAccount) {
		if (amount > this._balance) {
			console.log("Insufficient funds")
			return
		}
		if (amount > this._dailyWithdrawalLimit) {
			console.log("Exceeds daily withdrawal limit")
			return
		}
		this._balance -= amount
		this._transactions.push(
			new Transaction("Transfer to " + recipientAccount.accountNumber, amount)
		)
		recipientAccount.deposit(amount)
	}

	// Method to get all transactions
	getTransactions() {
		return [...this._transactions]
	}
}

// Usage example:
const account1 = new BankAccount(123456789, "Aziz", "Akande", 1000, 600)
const account2 = new BankAccount(987654321, "Betha", "Sofian", 2000)

account1.deposit(800)
account1.withdraw(200)
account1.withdraw(700)

account1.transfer(300, account2)

console.log("Balance for account 1:", account1.balance)
const transactionsAccount1 = account1.getTransactions()
console.log("Transactions on Account 1:", transactionsAccount1)

console.log("Balance for account 2:", account2.balance)
const transactionsAccount2 = account2.getTransactions()
console.log("Transactions on Account 2:", transactionsAccount2)

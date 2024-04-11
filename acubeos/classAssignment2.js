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
	constructor(accountNumber, firstName, lastName, initialBalance = 0) {
		this._accountNumber = accountNumber
		this._firstName = firstName
		this._lastName = lastName
		this._balance = initialBalance
		this._transactions = []
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
		return this._transactions
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
		this._balance -= amount
		this._transactions.push(new Transaction("Withdrawal", amount))
	}

	// Method to get all transactions
	getTransactions() {
		return [...this._transactions]
	}
}

const account = new BankAccount(123456789, "Aziz", "Akande")

console.log("Account number:", account.accountNumber)
console.log("First name:", account.firstName)
console.log("Last name:", account.lastName)

account.deposit(1000)
account.withdraw(500)

const transactions = account.getTransactions()
console.log("Account holder:", account.accountHolder)
console.log("Balance:", account.balance)
console.log("Transactions:", transactions)

for (const transaction of transactions) {
	console.log(
		`Transaction type: ${transaction.type}, Amount: ${transaction.amount}, Timestamp: ${transaction.timestamp}`
	)
}

//done

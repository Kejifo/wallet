using DigitalWallet.API.Models;

namespace DigitalWallet.API.Services
{
    public class WalletService : IWalletService
    {
        private readonly object _lock = new();
        private readonly List<Transaction> _transactions = new();
        private decimal _currentBalance = 1000m;

        public WalletBalance GetBalance()
        {
            lock (_lock)
            {
                return new WalletBalance
                {
                    CurrentBalance = _currentBalance,
                    Transactions = _transactions.ToList(),
                    LastUpdate = DateTime.UtcNow
                };
            }
        }

        public Transaction AddTransaction(TransactionRequest request)
        {
            lock (_lock)
            {
                if (request.Type == TransactionType.Withdrawal && request.Amount > _currentBalance)
                {
                    throw new InvalidOperationException("Insufficient balance");
                }

                if (request.Type == TransactionType.Deposit)
                {
                    _currentBalance += request.Amount;
                }
                else
                {
                    _currentBalance -= request.Amount;
                }

                var transaction = new Transaction
                {
                    Id = _transactions.Count + 1,
                    Amount = request.Amount,
                    Type = request.Type,
                    Date = DateTime.UtcNow,
                    Description = request.Description ?? string.Empty,
                    BalanceAfter = _currentBalance
                };

                _transactions.Add(transaction);
                return transaction;
            }
        }

        public IReadOnlyList<Transaction> GetTransactions()
        {
            lock (_lock)
            {
                return _transactions.ToList();
            }
        }
    }
}

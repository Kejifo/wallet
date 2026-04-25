namespace DigitalWallet.API.Models
{
    public enum TransactionType
    {
        Deposit,
        Withdrawal
    }

    public class Transaction
    {
        public int Id { get; set; }
        public decimal Amount { get; set; }
        public TransactionType Type { get; set; }
        public DateTime Date { get; set; }
        public string Description { get; set; } = string.Empty;
        public decimal BalanceAfter { get; set; }
    }

    public class TransactionRequest
    {
        public decimal Amount { get; set; }
        public TransactionType Type { get; set; }
        public string Description { get; set; } = string.Empty;
    }

    public class WalletBalance
    {
        public decimal CurrentBalance { get; set; }
        public List<Transaction> Transactions { get; set; } = new();
        public DateTime LastUpdate { get; set; }
    }

    public class ApiResponse<T>
    {
        public bool Success { get; set; }
        public string Message { get; set; } = string.Empty;
        public T? Data { get; set; }
    }
}

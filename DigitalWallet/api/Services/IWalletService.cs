using DigitalWallet.API.Models;

namespace DigitalWallet.API.Services
{
    public interface IWalletService
    {
        WalletBalance GetBalance();
        Transaction AddTransaction(TransactionRequest request);
        IReadOnlyList<Transaction> GetTransactions();
    }
}

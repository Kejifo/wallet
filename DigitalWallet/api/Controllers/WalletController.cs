using DigitalWallet.API.Models;
using DigitalWallet.API.Services;
using Microsoft.AspNetCore.Mvc;

namespace DigitalWallet.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WalletController : ControllerBase
    {
        private readonly IWalletService _walletService;

        public WalletController(IWalletService walletService)
        {
            _walletService = walletService;
        }

        [HttpGet("balance")]
        public ActionResult<ApiResponse<WalletBalance>> GetBalance()
        {
            var balance = _walletService.GetBalance();
            return Ok(new ApiResponse<WalletBalance>
            {
                Success = true,
                Message = "Balance retrieved successfully",
                Data = balance
            });
        }

        [HttpGet("transactions")]
        public ActionResult<ApiResponse<List<Transaction>>> GetTransactions()
        {
            var transactions = _walletService.GetTransactions().ToList();
            return Ok(new ApiResponse<List<Transaction>>
            {
                Success = true,
                Message = "Transactions retrieved successfully",
                Data = transactions
            });
        }

        [HttpPost("transaction")]
        public ActionResult<ApiResponse<Transaction>> PostTransaction([FromBody] TransactionRequest request)
        {
            if (request.Amount <= 0)
            {
                return BadRequest(new ApiResponse<Transaction>
                {
                    Success = false,
                    Message = "Amount must be greater than zero"
                });
            }

            try
            {
                var transaction = _walletService.AddTransaction(request);
                return Created(string.Empty, new ApiResponse<Transaction>
                {
                    Success = true,
                    Message = "Transaction created successfully",
                    Data = transaction
                });
            }
            catch (InvalidOperationException ex)
            {
                return UnprocessableEntity(new ApiResponse<Transaction>
                {
                    Success = false,
                    Message = ex.Message
                });
            }
        }
    }
}

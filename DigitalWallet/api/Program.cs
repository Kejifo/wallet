using System.Text.Json;
using System.Text.Json.Serialization;
using DigitalWallet.API.Models;
using DigitalWallet.API.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSingleton<IWalletService, WalletService>();
builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
    options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
});

// Add CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        var allowedOrigins = builder.Configuration.GetSection("AllowedOrigins").Get<string[]>() 
            ?? new[] { "http://localhost:4200" };
        
        policy.WithOrigins(allowedOrigins)
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

var app = builder.Build();

// Use CORS
app.UseCors("AllowFrontend");

app.MapControllers();

app.Run();

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY DigitalWallet.API.csproj ./
RUN dotnet restore "DigitalWallet.API.csproj"
COPY Program.cs ./
COPY appsettings.json ./
COPY Controllers/ ./Controllers/
COPY Models/ ./Models/
COPY Services/ ./Services/
COPY Properties/ ./Properties/
RUN dotnet build "DigitalWallet.API.csproj" -c Release -o /app/build
 
FROM build AS publish
RUN dotnet publish "DigitalWallet.API.csproj" -c Release -o /app/publish /p:UseAppHost=false
 
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*
RUN groupadd -r appuser && useradd -r -g appuser appuser
COPY --from=publish --chown=appuser:appuser /app/publish .
USER appuser
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 CMD curl -f http://localhost:8080/api/wallet/balance || exit 1
ENTRYPOINT ["dotnet", "DigitalWallet.API.dll"]
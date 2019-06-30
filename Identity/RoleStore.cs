using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Dapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using WinfADD.Models;

namespace WinfADD.Identity
{
    public class RoleStore : IRoleStore<UserRole>
    {
        private readonly string _connectionString;

        public RoleStore(IConfiguration configuration)
        {
            _connectionString =  "Host=localhost;Port=5432;Username=postgres;Password=postgres;Database=postgres;";
            //configuration.GetConnectionString("DefaultConnection");
        }

        public async Task<IdentityResult> CreateAsync(UserRole role, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();

            using (var connection = new SqlConnection(_connectionString))
            {
                await connection.OpenAsync(cancellationToken);
                role.Id = await connection.QuerySingleAsync<int>($@"INSERT INTO [UserRole] ([Name], [NormalizedName])
                    VALUES (@{nameof(UserRole.Name)}, @{nameof(UserRole.NormalizedName)});
                    SELECT CAST(SCOPE_IDENTITY() as int)", role);
            }

            return IdentityResult.Success;
        }

        public async Task<IdentityResult> UpdateAsync(UserRole role, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();

            using (var connection = new SqlConnection(_connectionString))
            {
                await connection.OpenAsync(cancellationToken);
                await connection.ExecuteAsync($@"UPDATE [UserRole] SET
                    [Name] = @{nameof(UserRole.Name)},
                    [NormalizedName] = @{nameof(UserRole.NormalizedName)}
                    WHERE [Id] = @{nameof(UserRole.Id)}", role);
            }

            return IdentityResult.Success;
        }

        public async Task<IdentityResult> DeleteAsync(UserRole role, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();

            using (var connection = new SqlConnection(_connectionString))
            {
                await connection.OpenAsync(cancellationToken);
                await connection.ExecuteAsync($"DELETE FROM [UserRole] WHERE [Id] = @{nameof(UserRole.Id)}", role);
            }

            return IdentityResult.Success;
        }

        public Task<string> GetRoleIdAsync(UserRole role, CancellationToken cancellationToken)
        {
            return Task.FromResult(role.Id.ToString());
        }

        public Task<string> GetRoleNameAsync(UserRole role, CancellationToken cancellationToken)
        {
            return Task.FromResult(role.Name);
        }

        public Task SetRoleNameAsync(UserRole role, string roleName, CancellationToken cancellationToken)
        {
            role.Name = roleName;
            return Task.FromResult(0);
        }

        public Task<string> GetNormalizedRoleNameAsync(UserRole role, CancellationToken cancellationToken)
        {
            return Task.FromResult(role.NormalizedName);
        }

        public Task SetNormalizedRoleNameAsync(UserRole role, string normalizedName, CancellationToken cancellationToken)
        {
            role.NormalizedName = normalizedName;
            return Task.FromResult(0);
        }

        public async Task<UserRole> FindByIdAsync(string roleId, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();

            using (var connection = new SqlConnection(_connectionString))
            {
                await connection.OpenAsync(cancellationToken);
                return await connection.QuerySingleOrDefaultAsync<UserRole>($@"SELECT * FROM [UserRole]
                    WHERE [Id] = @{nameof(roleId)}", new { roleId });
            }
        }

        public async Task<UserRole> FindByNameAsync(string normalizedRoleName, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();

            using (var connection = new SqlConnection(_connectionString))
            {
                await connection.OpenAsync(cancellationToken);
                return await connection.QuerySingleOrDefaultAsync<UserRole>($@"SELECT * FROM [UserRole]
                    WHERE [NormalizedName] = @{nameof(normalizedRoleName)}", new { normalizedRoleName });
            }
        }

        public void Dispose()
        {
            // Nothing to dispose.
        }
    }
}
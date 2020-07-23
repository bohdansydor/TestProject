using Announcement.DAL.Repository;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Announcement.DAL.UnitOfWork
{
    public class UnitOfWork : IUnitOfWork
    {
        
        private DbContext Context { get; }
        public UnitOfWork(DbContext context)
        {
            Context = context;
        }


        public IRepository<TEntity> Repository<TEntity>() where TEntity : class
        {
            return new Repository<TEntity>(Context.Set<TEntity>());
        }
        public async Task<int> SaveChangesAsync()
        {
            return await Context.SaveChangesAsync();
        }

        public void Dispose()
        {
            Context.Dispose();
        }
    }
}

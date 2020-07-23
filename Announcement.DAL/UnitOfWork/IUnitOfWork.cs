using Announcement.DAL.Repository;
using System;
using System.Threading.Tasks;

namespace Announcement.DAL.UnitOfWork
{
    public interface IUnitOfWork: IDisposable
    {
        IRepository<TEntity> Repository<TEntity>() where TEntity : class;
        Task<int> SaveChangesAsync();
    }
}

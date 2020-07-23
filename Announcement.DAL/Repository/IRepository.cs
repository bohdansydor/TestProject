using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Announcement.DAL.Repository
{
    public interface IRepository<TEntity> where TEntity : class
    {
        Task<TEntity> Get(Expression<Func<TEntity, bool>> predicate = null);
        Task<IEnumerable<TEntity>> GetAllAsync(Expression<Func<TEntity, bool>> predicate = null);
        IQueryable<TEntity> GetAll();
        void Remove(TEntity entity);
        void Add(TEntity entity);
        void Update(TEntity entity);
    }
}

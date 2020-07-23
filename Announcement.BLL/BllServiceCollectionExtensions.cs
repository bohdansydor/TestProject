using Announcement.DAL;
using Announcement.DAL.UnitOfWork;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;


namespace Announcement.BLL
{
    public static class BllServiceCollectionExtensions
    {
        public static IServiceCollection AddMainContext(this IServiceCollection services, string connectionString)
        {
            return services.AddDbContext<AppDbContext>(options => options.UseSqlServer(connectionString));
        }

        public static IServiceCollection AddUnitOfWork(this IServiceCollection services)
        {
            return services.AddTransient<IUnitOfWork, UnitOfWork>(provider =>
                new UnitOfWork(provider.GetRequiredService<AppDbContext>()));
        }
    }
}

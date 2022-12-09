using System.Collections.Generic;
using System.Threading.Tasks;
using Brum.API.Models;

namespace Brum.API.Data.Repositories
{
    public interface IAdminRepository
    {   
        void Add<T>(T entity) where T: class;
        void Delete<T>(T entity) where T: class;
        Task<bool> SaveAll();
        Task<IEnumerable<object>> GetUsersWithRoles();
        Task<IEnumerable<object>> GetPhotosForModeration();
        Task<Photo> GetPhoto(int id);
    }
}
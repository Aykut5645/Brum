using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Brum.API.Models;
using Microsoft.EntityFrameworkCore;

namespace Brum.API.Data.Repositories
{
    public class AdminRepository : IAdminRepository
    {
        private readonly DataContext _context;
        public AdminRepository(DataContext context)
        {
            _context = context;

        }
        public void Add<T>(T entity) where T : class
        {
             _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<Photo> GetPhoto(int id)
        {
             var photo = await _context.Photos
                .IgnoreQueryFilters()
                .FirstOrDefaultAsync(p => p.Id == id);
            
            return photo;
        }

        public async Task<IEnumerable<object>> GetPhotosForModeration()
        {
             var photos = await _context.Photos
                .Include(u => u.User)
                .IgnoreQueryFilters()
                .Where(p => p.IsApproved == false)
                .Select(u => new
                {
                    Id = u.Id,
                    UserName = u.User.UserName,
                    Url = u.Url,
                    IsApproved = u.IsApproved
                }).ToListAsync();

            return photos;
        }

        public async Task<IEnumerable<object>> GetUsersWithRoles()
        {
            var userList = await _context.Users
                .OrderBy(x => x.UserName)
                .Select(user => new
                {
                    Id = user.Id,
                    UserName = user.UserName,
                    Roles = (from userRole in user.UserRoles
                            join role in _context.Roles
                            on userRole.RoleId
                            equals role.Id
                            select role.Name).ToList()
                 }).ToListAsync();
            
            return userList;
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
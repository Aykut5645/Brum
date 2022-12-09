using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Brum.API.Helpers;
using Brum.API.Helpers.Params;
using Brum.API.Models;
using Microsoft.EntityFrameworkCore;

namespace Brum.API.Data
{
    public class UsersRepository : IUsersRepository
    {
        private readonly DataContext _context;
        public UsersRepository(DataContext context)
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
        public async Task<Like> GetLike(int userId, int resipientId)
        {
            return await _context.Likes.FirstOrDefaultAsync(u => u.LikerId == userId && u.LikeeId == resipientId);
        }
        public async Task<Photo> GetMainPhotoForUser(int userId)
        {
            return await _context.Photos.Where(u => u.UserId == userId).FirstOrDefaultAsync(p=> p.IsMain);
        }
        public async Task<Photo> GetPhoto(int id)
        {
            var photo = await _context.Photos.IgnoreQueryFilters().FirstOrDefaultAsync(p => p.Id == id);
            return photo;
        }
        public async Task<User> GetUser(int id, bool isCurrentUser)
        {
            var query =  _context.Users.AsQueryable();

            if(isCurrentUser)
                query = query.IgnoreQueryFilters();
            
            var user = await query.FirstOrDefaultAsync(u => u.Id == id);

            return user;
        }
        public async Task<PagedList<User>> GetUsers(UserParams userParams)
        {
            var users = _context.Users.OrderByDescending(u => u.LastActive).AsQueryable();
            users = users.Where(u => u.Id != userParams.UserId);
            users = users.Where(user => user.Gender == userParams.Gender);

            if(userParams.Likers)
            {
                var userLikers = await GetUserLikes(userParams.UserId, userParams.Likers);
                users = users.Where(u => userLikers.Contains(u.Id));
            }
            if(userParams.Likees) 
            {
                var userLikees = await GetUserLikes(userParams.UserId, userParams.Likers);
                users = users.Where(u => userLikees.Contains(u.Id));
            }

            if(userParams.MinAge != 18 || userParams.MaxAge != 99)
            {
                var minDateOfBirth = DateTime.Today.AddYears(-userParams.MaxAge - 1);
                var maxDateOfBirth = DateTime.Today.AddYears(-userParams.MinAge);

                users = users.Where(u => u.DateOfBirth >= minDateOfBirth && u.DateOfBirth <= maxDateOfBirth);
            }
            if(!string.IsNullOrEmpty(userParams.OrderBy))
            {
                switch(userParams.OrderBy)
                {
                    case "created": 
                        users = users.OrderByDescending(u => u.Created);
                        break;
                    default:
                        users = users.OrderByDescending(u => u.LastActive);
                        break;
                }
            }

            return await PagedList<User>.CreateAsync(users, userParams.PageNumber, userParams.PageSize);

        }
        private async Task<IEnumerable<int>> GetUserLikes(int id, bool likers)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == id);

            if(likers) 
            {
                return user.Likers.Where(u => u.LikeeId == id).Select(u => u.LikerId);
            }

            return user.Likees.Where(u => u.LikerId == id).Select(u => u.LikeeId);
        } 
        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
        public async Task<Message> GetMessage(int id)
        {
            return await _context.Messages.FirstOrDefaultAsync(m => m.Id == id);
        }
        public async Task<IEnumerable<Message>> GetMessageThread(int userId, int recipientId)
        {
            var messages = await _context.Messages
                .Where(m => m.RecipientId == userId && m.RecipientDeleted == false && m.SenderId == recipientId 
                || m.RecipientId == recipientId && m.SenderDeleted == false && m.SenderId == userId)
                .OrderByDescending(m => m.MessageSent)
                .ToListAsync();

                return messages;
        }
        public async Task<PagedList<Message>> GetMessagesForUser(MessageParams messageParams)
        {
            var messages = _context.Messages.AsQueryable();

            switch (messageParams.MessageContainer)
            {
                case "Inbox":
                    messages = messages.Where(u => u.RecipientId == messageParams.UserId && u.RecipientDeleted == false);
                    break;
                case "Outbox":
                    messages = messages.Where(u => u.SenderId == messageParams.UserId && u.SenderDeleted == false);
                    break;
                default:
                    messages = messages.Where(u => u.RecipientId == messageParams.UserId && u.IsRead == false && u.RecipientDeleted == false);
                    break;
            }
            messages = messages.OrderByDescending(d => d.MessageSent);
            return await PagedList<Message>.CreateAsync(messages, messageParams.PageNumber, messageParams.PageSize);
        }
        public async Task<Ride> GetRide(int rideId)
        {
            var ride =  await _context.Rides.FirstOrDefaultAsync(r => r.Id == rideId);
            return ride;
        }
        public async Task<PagedList<Ride>> GetRides(RideParams rideParams, int userId)
        {
            var rides = _context.Rides.OrderByDescending(r => r.Created).AsQueryable();   

            if(!string.IsNullOrEmpty(rideParams.StartPoint))
            {
                rides = rides.Where(r => r.StartPoint == rideParams.StartPoint.Trim());
            }
            if(!string.IsNullOrEmpty(rideParams.EndPoint))
            {
                rides = rides.Where(r => r.EndPoint == rideParams.EndPoint.Trim());
            }
            if(rideParams.Date.CompareTo(new DateTime()) !=0)
            {
                var day = rideParams.Date.Day;
                var month = rideParams.Date.Month;
                var year = rideParams.Date.Year;

                rides = rides.Where(r => r.Date.Day == day && r.Date.Month == month && r.Date.Year == year);
            }

            return await PagedList<Ride>.CreateAsync(rides, rideParams.PageNumber, rideParams.PageSize);  
      
        }
        public async Task<UserRide> GetUserRide(int rideId, int passengerId)
        {
            return await _context.UserRides.FirstOrDefaultAsync(ur => ur.PassengerId == passengerId && ur.RideId == rideId);
        }

        public async Task<IEnumerable<UserRide>> GetRideWithPassengers(int rideId)
        {
            return await  _context.UserRides.Where(ur => ur.RideId == rideId).ToListAsync();
        }
    }
}

using System.Collections.Generic;
using System.Threading.Tasks;
using Brum.API.Helpers;
using Brum.API.Helpers.Params;
using Brum.API.Models;

namespace Brum.API.Data
{
    public interface IUsersRepository
    {
        void Add<T>(T entity) where T: class;
        void Delete<T>(T entity) where T: class;
        Task<bool> SaveAll();
        Task<PagedList<User>> GetUsers(UserParams userParams);
        Task<User> GetUser( int id, bool isCurrentUser);
        Task<Photo> GetPhoto(int id);
        Task<Photo> GetMainPhotoForUser(int userId);
        Task<Like> GetLike(int userId, int resipientId);
        Task<Message> GetMessage(int id);
        Task<PagedList<Message>> GetMessagesForUser(MessageParams messageParams);
        Task<IEnumerable<Message>> GetMessageThread(int userId, int resipientId);
        Task<Ride> GetRide(int rideId);
        Task<UserRide> GetUserRide(int rideId, int passengerId);
        Task<PagedList<Ride>> GetRides(RideParams rideParams, int userId);
        Task<IEnumerable<UserRide>> GetRideWithPassengers(int rideId);
    }
}
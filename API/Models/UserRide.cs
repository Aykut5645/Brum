using Brum.API.Helpers.Enums;

namespace Brum.API.Models
{
    public class UserRide
    {
        public int PassengerId { get; set; }
        public virtual User Passenger { get; set; }

        public int RideId { get; set; }
        public virtual Ride Ride { get; set; }

        public PassengerStatus Status { get; set; }  = PassengerStatus.Requested;
  
    }
}